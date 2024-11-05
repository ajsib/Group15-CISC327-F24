# CISC327 Software Quality Assurance Fall 2024

**Group 15: Aidan Sibley, Youssef Elmanawy, Will Wu**

Assignment 3

# Flight Booking Application - Backend Connectivity

## Overview

This project extends the **Flight Booking Application** with backend connectivity. In Assignment 3, we integrated a backend infrastructure using **Express** and **MongoDB**, hosted within a **Docker** container environment. The app now allows dynamic data handling and storage, enabling users to retrieve flight information stored in a MongoDB database, instead of relying on static JSON files. We also built out server-side connectivity to handle flight search queries.

The backend server is implemented with **Express** and connects to **MongoDB** for data persistence. Docker is used to streamline the deployment process, ensuring that the development environment is consistent and easily reproducible.

## Features

### 1. **Backend Integration with MongoDB**
- The backend is implemented in **Express** and communicates with a MongoDB database hosted within a Docker container.
- Flight data is stored in MongoDB, allowing for dynamic data retrieval and manipulation based on user queries.

### 2. **Flight Search API Endpoint**
- The backend provides an API endpoint for searching flights, which accepts parameters such as:
  - **Origin ID and Destination ID**: To filter flights by location.
  - **Departure Date**: To select flights for a specific date.
- The API retrieves and returns filtered flights from the MongoDB database, supporting pagination to handle large datasets.

### 3. **Frontend Integration**
- The frontend search functionality has been extended to connect to the backend. When users search for flights, the frontend makes API requests to retrieve live data from MongoDB, enhancing the application's functionality with up-to-date flight information.

### 4. **Dockerized Development Environment**
- The entire application (frontend, backend, and database) runs within Docker containers, providing a seamless and consistent development environment.
- Docker Compose is used to manage multi-container Docker applications, orchestrating both the MongoDB and Express server.

## Key Files and Structure

- **Backend Server**: The Express server is set up in the `server/` directory, with key files including:
  - `server.js`: Main server entry point.
  - `controllers/`: Contains controller logic for handling flight searches and database interaction.
  - `routes/`: Defines API endpoints (e.g., `/search-results` for flight searches).
  - `schemas/`: MongoDB schema definitions for flight data.
  - `utils/dbConnection.js`: Handles connection logic to the MongoDB instance.
- **Docker Configuration**:
  - `Dockerfile.dev`: Sets up the development environment for the backend server.
  - `docker-compose.dev.yml`: Configures and orchestrates multiple services (backend and MongoDB) in Docker.

## Getting Started

### Prerequisites

- **Node.js**
- **PNPM** (or npm/yarn)
- **Docker**

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
