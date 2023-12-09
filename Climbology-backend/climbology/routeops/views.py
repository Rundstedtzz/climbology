from django.http import HttpResponse, JsonResponse
from django.db.models import F, FloatField, ExpressionWrapper
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json
import os
import neo4j
import pandas as pd
from neo4j import GraphDatabase


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

# Update Hold
@csrf_exempt
@api_view(['POST'])
def update_hold(request):
    data = json.loads(request.body)
    hold_id = data.get('holdId')
    # hold_id = int(hold_id)
    property_to_update = data.get('property')
    new_value = data.get('value')
    driver = connect_db()

    with driver.session() as session:
        result = session.run(
            f"MATCH (h:Hold {{hold_id: {hold_id}}}) "
            f"SET h.{property_to_update} = '{new_value}' "
            f"RETURN h;"
        )
    print(result)
    return JsonResponse({'status': 'success'})



# @csrf_exempt
# @api_view(['POST'])
# def delete_hold(request):
#     data = json.loads(request.body)
#     hold_id = data.get('holdId')
#     driver = connect_db()
#     with driver.session() as session:
#         try:
#             result = session.run(
#                 "MATCH (h:Hold {hold_id: $hold_id}) DETACH DELETE h",
#                 {"hold_id": hold_id}
#             )
#             return JsonResponse({'status': 'success'})
#         except Exception as e:
#             print(f"An error occurred: {e}")
#             return JsonResponse({'status': 'failed'})


@csrf_exempt
@api_view(['POST'])
def delete_hold(request):
    data = json.loads(request.body)
    hold_id = data.get('holdId')
    # hold_id = int(hold_id)
    driver = connect_db()
    print(hold_id)

    with driver.session() as session:
        try:
            result = session.run(
                f"MATCH (h:Hold {{hold_id: {hold_id}}}) DETACH DELETE h RETURN COUNT(h) as deleted_count"
            )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            print(f"An error occurred: {e}")
            return JsonResponse({'status': 'failed'})

    # Assuming run_commands takes a list of commands and their corresponding parameters
    # run_commands(driver, [(command, parameters)])

    # return JsonResponse({'status': 'success'})


    # Delete Hold
# @csrf_exempt
# @api_view(['POST'])
# def delete_hold(request):
#     data = json.loads(request.body)
#     hold_id = data.get('holdId')
#     driver = connect_db()
#     print(hold_id)
#     commands = (
#             "MATCH (h:Hold) WHERE h.hold_id = $hold_id DETACH DELETE h",
#         {"hold_id": hold_id}
#     )
#     run_commands(driver, commands)
#     return JsonResponse({'status': 'success'})


# Update Move
@csrf_exempt
@api_view(['POST'])
def update_move(request):
    data = json.loads(request.body)
    start_hold_id = data.get('startHoldId')
    end_hold_id = data.get('endHoldId')
    property_to_update = data.get('property')
    new_value = data.get('value')
    driver = connect_db()

    with driver.session() as session:
        result = session.run(
            f"MATCH (start:Hold {{hold_id: {start_hold_id}}}), "
            f"(end:Hold {{hold_id: {end_hold_id}}}), "
            f"(start)-[r:MOVE_TO]->(end) "
            f"SET r.{property_to_update} = '{new_value}' "
            f"RETURN r;"
        )
    print(result)
    return JsonResponse({'status': 'success'})


# Delete Move
@csrf_exempt
@api_view(['POST'])
def delete_move(request): 
    data = json.loads(request.body)
    start_hold = data.get('startHoldId')
    end_hold = data.get('endHoldId')
    driver = connect_db()

    with driver.session() as session:
        result = session.run(
            f"MATCH (start:Hold {{hold_id: {start_hold}}})-[r:MOVE_TO]->(end:Hold {{hold_id: {end_hold}}}) "
            f"DELETE r"
         )
    print(result)
    return JsonResponse({'status': 'success'})

# Find Holds by Property
# @csrf_exempt
# @api_view(['POST'])
# def find_holds_by_property(request):
#     data = json.loads(request.body)
#     property = data.get('property')
#     value = data.get('value')
#     driver = connect_db()

#     with driver.session() as session:
#         result = session.run(
#             f"MATCH (h:Hold) "
#             f"WHERE h.{property} = '{value}' "
#             f"RETURN h.id as hold_id"
#         )

#         # Convert the result to a list of dictionaries
#         # holds = [record.get('hold') for record in result]
#     print(result)
#     # Return the list of holds as JSON
#     return JsonResponse({'result': "success"})

# @csrf_exempt
# @api_view(['POST'])
# def find_holds_by_property(request):
#     data = json.loads(request.body)
#     property = data.get('property')
#     value = data.get('value')
#     driver = connect_db()


#     try:
#         with driver.session() as session:
#             result = session.run(
#                     f"MATCH (h:Hold) "
#                     f"WHERE h.{property} = {value} "
#                     f"RETURN h"
#                 )

#         # print(result["h"])
#         # Iterate over the result to collect nodes
#         nodes = [record["h"] for record in result]

    
       
#     except Exception as e:
#         with driver.session() as session:
#             result = session.run(
#                     f"MATCH (h:Hold) "
#                     f"WHERE h.{property} = '{value}' "
#                     f"RETURN h"
#                 )

#         # print(result["h"])
#         # Iterate over the result to collect nodes
#         nodes = [record["h"] for record in result]
#     nodes_data = []
#     for node in nodes:
#         node_dict = {
#             'id': node.id,  # or any other identifier you have for the node
#             'labels': list(node.labels),  # Convert frozenset of labels to a list
#             'properties': dict(node._properties)  # Convert properties to a dictionary
#         }
#         nodes_data.append(node_dict)

#     # Convert the list of dictionaries to a JSON string
#     nodes_json = json.dumps(nodes_data)
#     return JsonResponse({'result': nodes_json})


@csrf_exempt
@api_view(['POST'])
def find_holds_by_property(request):
    data = json.loads(request.body)
    property = data.get('property')
    value = data.get('value')
    driver = connect_db()

    nodes_data = []
    try:
        with driver.session() as session:
            result = session.run(
                f"MATCH (h:Hold) "
                f"WHERE h.{property} = {value} "
                f"RETURN h"
            )
            # Process the result within the same 'with' block
            nodes = [record["h"] for record in result]
            for node in nodes:
                node_dict = {
                    'id': node.id,
                    'labels': list(node.labels),
                    'properties': dict(node._properties)
                }
                nodes_data.append(node_dict)
    except Exception as e:
        with driver.session() as session:
            result = session.run(
                f"MATCH (h:Hold) "
                f"WHERE h.{property} = '{value}' "
                f"RETURN h"
            )
            # Process the result within the same 'with' block
            nodes = [record["h"] for record in result]
            for node in nodes:
                node_dict = {
                    'id': node.id,
                    'labels': list(node.labels),
                    'properties': dict(node._properties)
                }
                nodes_data.append(node_dict)

    # Convert the list of dictionaries to a JSON string
    nodes_json = json.dumps(nodes_data)
    return JsonResponse({'result': nodes_json})




    # with driver.session() as session:
    #     result = session.run(
    #         f"MATCH (h:Hold) "
    #         f"WHERE h.{property} = '{value}' "
    #         f"RETURN h as hold_id"
    #     )

    #     nodes = [record["h"] for record in result]
    #     output = to_dataframe(nodes)
    #     print(output)
    # Return the list of holds as JSON
    return JsonResponse({'result': "holds"})


# def fetch_nodes_with_type_jug(driver):
#     with driver.session() as session:
#         result = session.run("MATCH (n) WHERE n.type = 'jug' RETURN n")
#         nodes = [record["n"] for record in result]
#         return nodes

# def to_dataframe(nodes):
#     nodes_data = [node._properties for node in nodes]
#     return pd.DataFrame(nodes_data)

# nodes = fetch_nodes_with_type_jug(driver)
# nodes_df = to_dataframe(nodes)
# nodes_df







# @csrf_exempt
# @api_view(['POST'])
# def find_holds_by_property(request):
#     data = json.loads(request.body)
#     property = data.get('property')
#     value = data.get('value')
#     driver = connect_db()
#     print("property: ", property)
#     print("value: ", value)
#     try:
#         with driver.session() as session:
#             result = session.run(
#                 f"MATCH (h:Hold) "
#                 f"WHERE h.{property} = '{value}' "
#                 f"RETURN h.id as hold_id"
#             )

#             # records, summary, keys = session.run(
#             #     f"MATCH (h:Hold) "
#             #     f"WHERE h.{property} = '{value}' "
#             #     f"RETURN h.id as hold_id"
#             # )


#             # print("records: ", records)
#             # print("summary: ", summary)
#             # print("keys: ", keys)   
#             print("result: ", result)
#             # print("trying: ", [r.values() for r in result])
#             # print("trying2: ", [record.data() for record in result])
#             # hold_ids = [record['hold_id'] for record in result]
#             # print("hold_ids: ", hold_ids)
#     #         # Extracting the results
#     #         holds = [record['hold_id'] for record in result]
#     #        change result to 
#     # )
#             # print("result[0]: ", result[0])
#             return JsonResponse({'result': [result]})

#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return JsonResponse({'status': 'failed', 'error': str(e)})


# Find Routes by Property
# @csrf_exempt
# @api_view(['POST'])
# def find_moves_by_property(request):
#     data = json.loads(request.body)
#     property_to_find = data.get('property')
#     value = data.get('value')
#     driver = connect_db()

#     with driver.session() as session:
#         result = session.run(
#             f"MATCH (start)-[r:{property_to_find}]->(end) "
#             f"WHERE r.{property_to_find} = '{value}' "
#             f"RETURN r"
#         )
#     print(result)
#     return JsonResponse({'status': 'success'})


# @csrf_exempt
# @api_view(['POST'])
# def find_moves_by_property(request):
#     data = json.loads(request.body)
#     property = data.get('property')
#     value = data.get('value')
#     driver = connect_db()
#     print(type(value))

    
#     with driver.session() as session:
#         result = session.run(
#             "MATCH (start)-[r]->(end) " 
#             f"WHERE r.{property} = {value} "
#             "RETURN r"
#         )
#         print("result: ", result)
#         # print(result["h"])
#         # Iterate over the result to collect nodes
#         nodes = [record["r"] for record in result]
#         print(nodes)
#         # Convert each Node object to a dictionary
#         nodes_data = []
#         for node in nodes:
#             node_dict = {
#                 'id': node.id,  # or any other identifier you have for the node
#                 # 'labels': list(node.labels),  # Convert frozenset of labels to a list
#                 'properties': dict(node._properties)  # Convert properties to a dictionary
#             }
#             nodes_data.append(node_dict)

#         # Convert the list of dictionaries to a JSON string
#         nodes_json = json.dumps(nodes_data)
#         return JsonResponse({'result': nodes_json})

@csrf_exempt
@api_view(['POST'])
def find_moves_by_property(request):
    data = json.loads(request.body)
    property = data.get('property')
    value = data.get('value')
    driver = connect_db()

    try:
        with driver.session() as session:
            # First try: assuming value is not a string
            result = session.run(
                "MATCH (start)-[r]->(end) " 
                f"WHERE r.{property} = {value} "
                "RETURN r"
            )
            nodes = [record.get("r") for record in result]
    except Exception as e:
        # If there's an exception, try the query assuming value is a string
        with driver.session() as session:
            result = session.run(
                "MATCH (start)-[r]->(end) " 
                f"WHERE r.{property} = '{value}' "
                "RETURN r"
            )
            nodes = [record.get("r") for record in result]

    # Processing nodes (common to both queries)
    nodes_data = []
    for node in nodes:
        node_dict = {
            'id': node.id,
            'properties': dict(node._properties)
        }
        nodes_data.append(node_dict)

    # Convert to JSON and return
    nodes_json = json.dumps(nodes_data)
    return JsonResponse({'result': nodes_json})