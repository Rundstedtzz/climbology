# Climbology: AI-Assisted Climbing App for Kilter Board Beta ideas

### Contributors: Ricky Sun, Yuning Wu

## Introduction
BetaShare is a community-driven platform designed to enhance the rock climbing experience on Kilter Boards. It leverages a combination of GPT-4, GPT-3.5 AI technology and SQL (Postgresql) & NoSQL databases (Neo4j) to assist climbers, especially newcomers and those of shorter stature, in finding and sharing effective climbing betas (sequences of moves & moving strategies).

## Project Overview
Our project aims to collect and curate climbing routes and betas using Kilter-Board app data, social media posts, and other sources. The core of Climbology is a Neo4j graph database that intuitively maps the spatial and logical relationships between climbing holds and moves, and AI technologies (LLMs) fine-tuned on manually annotated betas.

### Key Features:
- **Data Collection:** Utilizing manual annotation on Kilter-Board routes and GPT-4 aid to get a comprehensive dataset of climbing routes and betas.
- **Database Design:** Employing Postgresql to store user information and Kilter-Board holds information and Neo4j for its natural representation of climbing routes and moves.
- **Interactive UI:** Developing a user-friendly interface (React as front-end & Django as back-end) to allow climbers to create routes and search for beta ideas.
- **Performance Analysis:** Analyzing climbing patterns for insights into performance and potential improvements [under-development].

### Technical Details

#### Data Source
- **GPT-4 Simulated Data:** Using GPT-4 models to simulate climbing routes and betas.
- **Web-Scraped Data:** Sourcing data from platforms like Reddit, Instagram, and the Kilter Board app.

#### Database Structure
- **Neo4j Graph Database:** Nodes representing holds with properties like type, difficulty, and coordinates. Edges represent movements in a beta.
- **PostgreSQL Database:** Storing Kilter Board specific data and user information.

#### Queries
- Types of queries include creating, updating, finding, and deleting routes and betas.

### Expected Outputs
- **Neo4j Graph Database:** A robust database schema with core CRUD operation queries.
- **Data Collection and Curation Pipeline:** A protocol for gathering and verifying climbing data.
- **User Interface Prototype:** A functioning prototype of the BetaShare app.
- **Final Project Report:** Comprehensive documentation detailing the project workflow and its impact.

### Planning Details
- **Fine-tuning GPT:** Strategies for refining the AI model to generate accurate beta descriptions.
- **UI Development:** Using React and Django for front-end and back-end development.
- **Neo4j Integration:** Implementing Cypher queries for data manipulation and retrieval.

### Getting Started

To get started with Climbology:

1. **Clone the Repository**

2. **Install Dependencies**
- For the front-end (React.js):
  ```
  cd climbology/frontend
  npm install
  ```
- For the back-end (Django):
  ```
  cd climbology/backend
  pip install -r requirements.txt
  ```

