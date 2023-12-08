# Climbology: AI-Assisted Climbing App for Kilter Board Beta ideas

### Contributors: Ricky Sun, Yuning Wu

## Introduction
BetaShare is a community-driven platform designed to enhance the rock climbing experience on Kilter Boards. It leverages a combination of GPT-4, GPT-3.5 AI technology and SQL (Postgresql) & NoSQL databases (Neo4j) to assist climbers, especially newcomers and those of shorter stature, in finding and sharing effective climbing betas (sequences of moves & moving strategies).

## Project Overview
Our project aims to collect and curate climbing routes and betas using Kilter-Board app data, social media posts, and other sources. The core of Climbology is a Neo4j graph database that intuitively maps the spatial and logical relationships between climbing holds and moves, and AI technologies (LLMs) fine-tuned on manually annotated betas.

## Why Nosql & Neo4j
- **Flexibility:** Schema-less: Easily adapts to the variety of beta data—perfect for the evolving complexity of climbing routes and holds.
- **Scalability:** Horizontal scaling - can distribute data across more machines as load increases, which is essential for a growing global climbing community.
- **Variety of Data:** NoSQL databases can handle diverse data types—text for route descriptions, images for hold shapes, videos for beta sequences.
- **Rapid Development:** Agile-friendly - Changes and iterations can be made quickly without overhauling database schema, facilitating faster app updates and feature rollouts.
- **Data Representation:** Holds are nodes with properties like type and difficulty. Moves are edges with properties defining movement type and sequence order.
- **Complex Relationships:** Model intricate sequences and alternative paths, reflecting real-life climbing strategies.
- **Pathfinding Algorithms:** Leverage algorithms like Dijkstra's or A* to calculate the most efficient climbs.
- **Flexible Schema:** Adapt to new climbing holds and techniques with minimal database changes.
- **Rich Visualizations:** Use graph visualizations to help climbers intuitively understand and follow betas.

### Key Features:
- **Data Collection:** Utilizing manual annotation on Kilter-Board routes and GPT-4 aid to get a comprehensive dataset of climbing routes and betas.
- **Database Design:** Employing Postgresql to store user information and Kilter-Board holds information and Neo4j for its natural representation of climbing routes and moves.
- **Interactive UI:** Developing a user-friendly interface (React as front-end & Django as back-end) to allow climbers to create routes and search for beta ideas.
- **Performance Analysis:** Analyzing climbing patterns for insights into performance and potential improvements [under-development].

### Technical Details

#### Database Structure
- **Neo4j Graph Database:** Nodes representing holds with properties: type (crimp, jug, sloper, pocket, pinch, foot), depth, coordinates (X & Y), position in route (start, middle, finish), texture, hold_id, size). Edges represent movements in a beta with properties: start_hold_id, end_hold_id, movement type (dead-point, static, dyno, heel hock, toe hock, knee bar), step.
- **PostgreSQL Database:** Storing Kilter Board holds specific data (refer to kilter_board.csv or Postgresql: create_boardholds table) and user information (Postgresql: acount_profile table).

#### Queries
- Please referring to climbology_queries.ipynb and backend django folder -> create folder -> views.py for more details

### Challenges
- Learning curve for front-end (React) & back-end (Django)
- Manual Annotations
  - different grades of routes that may exceed our capability (could be difficult to annotate V8 routes when our skill is V4)
  - time consuming (30 min per route on average)
  - require attempt the routes in-person to get better quality annotation
 - fine-tuned GPT model could overfit when training data is not large and representative enough for all categories (grade, style, angle, etc.)

### Future Directions
- **Fine-tuning GPT-4:** currently, we are using GPT 3.5 - turbo 1106 for fine-tuning, but in the future we can try GPT 4 or Bard Gemini.
- **GPT-4 vision API:** In the future we could use GPT-4 to annotate pictures, but the current prompts or the model may not be able to do it accurately
- **Better UX & UI Design**
- **Consider user skills (height, weight, etc.) when generating beta using AI**
- **Greater training data with different difficulties, inclines, styles, etc.**

### Presentation Slides
https://docs.google.com/presentation/d/1UeBWSRY9gacBYYbxYnEFauSTNqBl0895XU_5K7ythog/edit?usp=sharing

### Getting Started & Demo

To get started with Climbology:

1. **Clone the Repository**
   
2. **Set up Docker Container for Neo4j**

3. **Install Dependencies**
- For the front-end (React.js):
  ```
  cd Climbology-frontend
  npm install
  ```
- For the back-end (Django):
  ```
  pip install -r requirements.txt
  cd Climbology-backend/climbology
  ```
4. **Running the Application**
- Start the React front-end:
  ```
  npm start
  ```
- Run the Django back-end:
  ```
  python3 manage.py runserver
  ```
  
## Resource Links

For further information, see the following resources:
 
- Webscraping
  - https://medium.com/@jonathanmondaut/scraping-tweets-using-tweepy-and-python-7f368c03fea1
  - https://developer.twitter.com/en/portal/products/basic
  - https://towardsdatascience.com/your-guide-to-web-scrape-quora-q-as-92b802f6dd9

- Front-end (React.js)
  - https://medium.com/@JeffyJeff/a-step-by-step-guide-to-creating-your-own-assistant-chatbot-using-openais-assistant-api-and-react-655391215c3a
  - https://github.com/OvidijusParsiunas/deep-chat
  - https://www.w3schools.com/REACT/DEFAULT.ASP
 
- Back-end (Django, OpenAI API)
  - https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken
  - https://platform.openai.com/docs/api-reference
  - https://platform.openai.com/docs/overview
  - https://www.w3schools.com/django/



