from django.http import HttpResponse, JsonResponse
from django.db.models import F, FloatField, ExpressionWrapper
from .models import BoardHolds  # Replace with your actual model import
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
import openai
from openai import OpenAI
import os
import neo4j
import pandas as pd
import json
from neo4j import GraphDatabase

def index(request):
    return HttpResponse("This is the account index page.")


@csrf_exempt
@api_view(['POST'])
def identify_hold(request):
    # Assuming the incoming data is sent as JSON
    data = json.loads(request.body)
    x = data.get('x')
    y = data.get('y')
    print("x: ", x)
    print("y: ", y)

    if x is not None and y is not None:
        # Calculate the distance for each hold
        holds = BoardHolds.objects.annotate(
            distance=ExpressionWrapper(
                ((F('x_coordinate') - x) ** 2 + (F('y_coordinate') - y) ** 2),
                output_field=FloatField()
            )
        ).order_by('distance')

        # Get the hold with the smallest distance
        nearest_hold = holds.first()

        if nearest_hold:
            return JsonResponse({
                'success': True,
                'holdId': nearest_hold.id,
                'type': nearest_hold.type,
                'function': nearest_hold.function,
                'depth': nearest_hold.depth,
                'orientation': nearest_hold.orientation,
                'size': nearest_hold.size,
                'x_coordinate': nearest_hold.x_coordinate,
                'y_coordinate': nearest_hold.y_coordinate,
                # You can add other fields if needed
            })
        else:
            return JsonResponse({'success': False, 'message': 'No holds found'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid coordinates'})
    

# Example Django view for processing the holds data


def convert_holds_to_json(holds_list):
    converted_holds = []

    for hold in holds_list:
        if isinstance(hold, dict):
            converted_hold = {
                "hold_id": hold.get('id'),
                "x_coordinate": hold.get('x_grid'),
                "y_coordinate": hold.get('y_grid'),
                "type": hold.get('hold_type'),
                "depth": hold.get('hold_depth'),
                "orientation": hold.get('hold_orientation'),
                "size": hold.get('hold_size'),
                "position_in_route": hold.get('hold_position_in_route', 'middle') if hold.get('hold_position_in_route') != "Foot Only" else "middle",
                "foot_restriction": "foot-only" if hold.get('hold_position_in_route') == "Foot Only" else "foot-or-hand"
            }
            converted_holds.append(converted_hold)

    return {"holds": converted_holds}

@csrf_exempt
@api_view(['POST'])
def create_route(request):
    data = request.data
    holds = data.get('holds')
    
    prompt = json.dumps(convert_holds_to_json(holds), indent=4)
    holds_from_prompt = json.loads(prompt).get("holds", [])
    print("holds_from_prompt: ", holds_from_prompt)
    
    print("holds: ", holds)
    print("prompt: ", prompt)
    os.environ["OPENAI_API_KEY"] = "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"

    result = None
    is_json = False
    while not is_json:
        print("Generating response...")
        client = OpenAI()
        response = client.chat.completions.create(
            model="ft:gpt-3.5-turbo-1106:personal::8TS3FIVF",
            messages=[
                {"role": "system", "content": "You are an expert route setter in indoor climbing and an expert climber on the Kilter Board. Given a Kilter Board route in json dict, where holds are defined by id, x, y coordinates, type, position_in_route, depth, orientation, size, and foot_restriction, provide the following fields in a JSON dict, where applicable: \"step1\",  \"step2\", \"step3\", \"step4\", and so on.For orientation of the holds, o represents up, negative values represent up & left, positive values represent up & right.For depth of the holds, 0 represents for the most difficult holds, and 3 represents for the easiest.For size of the holds, 1 represents for the smallest holds, and 5 represents for the largest.For foot restriction of the holds, foot-only represents for the holds that can only be used by feet, and foot-or-hand represents for the holds that can be used by both feet and hands."},
                {"role": "user", "content": prompt}
            ]
        )
        try:
            # Try to parse the result as JSON
            result = json.loads(response.choices[0].message.content)
            is_json = True
        except json.JSONDecodeError:
            # If parsing fails, the result is not valid JSON
            print("Result is not valid JSON, regenerating...")

    create_neo4j_nodes(holds_from_prompt)
    create_neo4j_edges(result)
    print("Valid JSON result obtained", result)
    return JsonResponse({'result': result})


def connect_db_1():
    driver = neo4j.GraphDatabase.driver(uri="neo4j://0.0.0.0:7687", auth=("neo4j","password"))
    session = driver.session(database="neo4j")
    return session
    
def wipe_out_db(session):
    # wipe out database by deleting all nodes and relationships
    
    # similar to SELECT * FROM graph_db in SQL
    query = "match (node)-[relationship]->() delete node, relationship"
    session.run(query)
    
    query = "match (node) delete node"
    session.run(query)


def connect_db():
    uri = "neo4j://0.0.0.0:7687"
    user = "neo4j"
    password = "password"
    driver = GraphDatabase.driver(uri, auth=(user, password))
    return driver

def run_commands(driver, commands):
    with driver.session(database="neo4j") as session:
        for command in commands:
            session.run(command)

# Create Neo4j nodes
def create_neo4j_nodes(holds_from_prompt):
    try:
        session = connect_db_1()
        wipe_out_db(session)
        cypher_commands = []

        for hold in holds_from_prompt:
            command = "CREATE (:Hold {"
            command += f"hold_id: {hold['hold_id']}, "
            command += f"x_coordinate: {hold['x_coordinate']}, "
            command += f"y_coordinate: {hold['y_coordinate']}, "
            command += f"type: '{hold['type']}', "
            command += f"position_in_route: '{hold['position_in_route']}', "
            command += f"depth: {hold['depth']}, "
            command += f"orientation: {hold['orientation']}, "
            command += f"size: {hold['size']}, "
            command += f"foot_restriction: '{hold['foot_restriction']}'"
            command += "});"
            cypher_commands.append(command)

        for cmd in cypher_commands:
            print(cmd)
        driver = connect_db()
        run_commands(driver, cypher_commands)
        print("Neo4j graph created successfully")
    except Exception as e:
        print("Error creating Neo4j graph", e)


# Create Neo4j edges
def create_neo4j_edges(result):
    try:
        beta = result.get("beta", [])
        cypher_commands = []

        for move in beta:
            command = (
                f"MATCH (start:Hold {{hold_id: {move['start_hold']}}}), "
                f"(end:Hold {{hold_id: {move['end_hold']}}}) "
                f"CREATE (start)-[:MOVE_TO {{"
                f"step: {move['step']}, "
                f"move_type: '{move['move_type']}', "
                f"body_part: '{move['body_part']}'"
                f"}}]->(end);"
            )
            cypher_commands.append(command)

        for cmd in cypher_commands:
            print(cmd)
        driver = connect_db()
        run_commands(driver, cypher_commands)        
        print("Neo4j graph created successfully")
    except Exception as e:
        print("Error creating Neo4j graph", e)