# CISC327 Software Quality Assurance Fall 2024

**Group 15: Aidan Sibley, Youssef Elmanawy, Will Wu**

## Assignment 3

# Flight Booking Application - Backend Connectivity



## Testing Instructions

1. clone repo 
2. "cd src" in terminal to get to src files
3. "pnpm install" in terminal to install dependencies
4. "pnpm run dev" in terminal to run app..... "ctrl + C" in terminal to terminate app
5. "pnpm test" in termal to run tests

## Dummy Data

src/public/dummy_data/destinations.json for airport locations
src/public/dummy_data/flights.json for flight informations

## Overview

This project is an extension of the **Flight Booking Application** initially developed in Assignment 2. In Assignment 3, we introduced backend functionality using **Express** and **MongoDB**, with the entire application containerized through **Docker**. The main goal was to enable dynamic data handling from a MongoDB database, allowing the application to retrieve and store flight data from the backend. This approach moves away from static JSON data to a more robust and scalable solution.

The backend infrastructure is built with **Express** as the server framework and **MongoDB** as the database. Docker is used to ensure consistent deployment across different environments.

## Features

### 1. Landing Page with Backend Integration
- The landing page maintains the structure from Assignment 2, with two main components:
  - **Hero Section**: Displays the application’s branding and a tagline encouraging users to search for flights.
  - **CTA Section**: Contains the search form where users select origin, destination, travel dates, and the number of passengers. The form submits a search request to the backend, which queries MongoDB to retrieve relevant flights.

### 2. Backend Server with Express
- The Express server provides several key endpoints:
  - **Flight Search Endpoint**: This endpoint processes user queries by filtering flights based on parameters such as origin, destination, and departure date. It connects to MongoDB to fetch real-time results based on these filters.
  - **Pagination**: The backend supports pagination for search results, allowing the user to navigate through flight options in a structured manner. Pagination improves performance and enhances the user experience.

### 3. MongoDB Database Integration
- All flight data is stored in MongoDB collections, making it possible to retrieve and update data dynamically.
- **Data Models**: Mongoose schemas are used to define the structure of the flight and destination data stored in MongoDB. This includes fields for origin, destination, departure date, and other relevant flight information.
- **Data Population**: The backend populates each flight with additional details, such as origin and destination information, by cross-referencing related data in MongoDB.

### 4. Docker Containerization
- The entire application, including the backend server and MongoDB, is containerized with Docker. This setup simplifies deployment and ensures consistency across development, testing, and production environments.
- Docker Compose is used to manage the multi-container setup, making it easy to start, stop, and configure the various components as a unified application.

## Key Files and Structure

- **Express Server**: The main server file is located in `server.js`, where the Express application is initialized, middleware is configured, and routes are set up.
- **Routes**: Backend endpoints are defined in the `routes` directory. For instance, `flight.js` handles all flight-related requests, such as searching for available flights.
- **Controllers**: Logic for processing requests is organized in the `controllers` directory. The `flightController.js` file defines how the backend handles flight search queries, including the logic to retrieve matching results from MongoDB.
- **Database Models**: Mongoose schemas are defined in the `schemas` directory, specifically in `Flight.js` and `Destination.js`, which define the data structure for flight and destination data, respectively.
- **Docker Configuration**: The Docker setup is defined in `docker-compose.dev.yml` for development. This configuration file includes both the Express server and MongoDB services.

## Getting Started

### Prerequisites
To run this project, ensure you have Docker, Docker Compose, Node.js, and PNPM (or an alternative package manager like npm or yarn) installed on your system.

### Installation

1. Clone the repository to your local system.

2. Navigate to the project directory.

3. Install the necessary dependencies for both the frontend and backend using PNPM.

4. Start the Docker containers by running the appropriate Docker Compose command, which will build and run the containers for both the backend server and the MongoDB database.

5. Once the application is running, open your browser and navigate to the local server address to view the frontend. The backend server and database will also be accessible at the defined ports.

## Usage

1. **Flight Search**:
   - On the landing page, users can fill out the search form with information like origin, destination, travel dates, and passenger details. When the form is submitted, it triggers a request to the backend server to fetch available flights that match the specified criteria.

2. **Viewing Search Results**:
   - After submitting the search form, the user is directed to the search results page, which displays matching flights retrieved from MongoDB. The results are paginated to allow easier navigation.

3. **Confirming Flight Details**:
   - After selecting a flight from the search results, users are taken to a page where they can confirm the details of their chosen flight. This page pulls additional data from MongoDB to provide up-to-date flight information.

4. **Proceeding to Payment**:
   - Once the flight details are confirmed, users can continue to the payment section. At this point, relevant flight data and user choices are saved, preparing the information for final processing.

## Running Tests

### Babel Configuration
This project uses Babel to support ES6+ syntax in Jest tests. Ensure Babel is properly set up in the `.babelrc` file, which allows Jest to understand modern JavaScript syntax.

### Testing with PNPM
To execute the tests, navigate to the `server` directory and use the following command:

Run `pnpm test` in the `server` directory. This command sets the `NODE_ENV` to `test` and runs Jest, which will execute all the test cases located in the `__tests__` folder.

Make sure your environment variables for testing, such as `MONGODB_URI`, are correctly set up to ensure a successful database connection during tests. If you encounter any errors, refer to the `.env.test` file (if used) to define environment-specific variables for the testing environment.

These additional steps are necessary for setting up and executing tests in a consistent and isolated environment, ensuring your application behaves as expected in different scenarios.

## Technologies Used

- **Next.js**: A React framework for building the frontend.
- **Express**: A web server framework for Node.js, used to build the backend server.
- **MongoDB**: A NoSQL database for storing flight data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.
- **Docker**: A containerization tool that simplifies deployment and setup.
- **Docker Compose**: A tool for defining and managing multi-container Docker applications, used here to manage both the backend server and MongoDB as services.

## Key Benefits

The integration of backend functionality with MongoDB and Express significantly enhances the application by allowing dynamic data handling, data persistence, and more complex query capabilities. Docker ensures that the application can be easily deployed and run consistently across different environments, which is essential for reliability in development, testing, and production stages.

This setup improves the scalability of the application and prepares it for future expansions where additional backend functionalities or microservices could be added seamlessly.
