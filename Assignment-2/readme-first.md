CISC327 Software Quality Assurance Fall 2024
Group 15: Aidan Sibley, Youssef Elmanawy, Will Wu
Assignment 2

# Flight Booking Application

## Overview

This project is a **Flight Booking Application** built using **Next.js** and **React** with CSS styling provided by **Emotion**. The app features a simple landing page, a search functionality for filtering flights based on origin, destination, and other parameters, and a search results page that displays available flights based on the user's query. It also provides pagination controls for viewing results and fetches flight data from a JSON file.

## Features

### 1. **Landing Page**
- The landing page contains two primary components:
  - **Hero Section**: Displays the airline’s name and a tagline for users to find their next dream destination.
  - **CTA Section**: Contains a flight search form where users can select their origin, destination, departure date, return date, and the number of passengers. It dynamically updates available flights based on the form inputs.
  
### 2. **Search Functionality**
- The search functionality allows users to filter flights by:
  - **Origin and Destination**: Dropdowns that filter live as the user types.
  - **Departure and Return Dates**: Date inputs for selecting flight dates.
  - **Passengers**: Select the number of adults, children, and seniors.
  - **One-Way Trip**: Checkbox to indicate a one-way trip.

### 3. **Search Results Page**
- Displays flight results based on the parameters passed from the landing page.
- Data is loaded dynamically from a JSON file and only flights that match the user's query are shown.
- **Pagination Controls**: Used to navigate between pages of flight results.
  
### 4. **Flight Data**
- Sample flight data is stored in `flights.json`, a file located in the `public` folder. The search results page fetches flight data from this file.
  
## Key Files

- **Landing Page**: The main entry point of the application is in `src/pages/index.tsx`. It consists of a `Hero` section and a `CTA` section.
- **Search Results Page**: The search results are displayed in `src/pages/search-results/index.tsx`. The flight data is fetched and filtered from `public/flights.json`.
- **Flight Data**: Flight data is stored in `public/flights.json`. It is fetched in the search results page and filtered based on the user’s query.

## Getting Started

### Prerequisites
- Node.js
- PNPM (or npm/yarn)

### Installation

1. Clone the repository:
```bash
    git clone <repository-url>
```
2. Navigate to the project directory:
```bash
   cd <project-directory>
```
3. Start the development server:
```bash
    pnpm run dev
```
4. Open your browser and go to: 
```arduino
    http://localhost:3000
```

## Usage
On the landing page, fill in the search form with your origin, destination, and other details.
Press Search Available Flights. You will be redirected to the Search Results Page.
The Search Results Page will display the available flights based on the entered query. You can use pagination to view more results.