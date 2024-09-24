# Group 15 CISC 327 - Fall 2024

## Team Members:
- **Youssef Elmanawy**
- **Aidan Sibley**
- **Will Wu**

---

## Project Overview

Welcome to the Group 15 project for CISC 327 - Fall 2024. This project is a web application platform for booking flights. The system allows users to search for flights, select seats, make payments, and perform other activities. The goal is to provide users with a smooth and enhanced booking experience.

This README file provides a comprehensive guide for developers to set up the project on their local machine, including navigating the project directory and understanding where everything is located.

---

## Directory Structure Overview

```
.
├── client                  # Next.js front-end application
│   ├── next.config.mjs     # Next.js configuration file
│   ├── next-env.d.ts       # TypeScript environment settings for Next.js
│   ├── package.json        # Front-end dependencies and scripts managed by pnpm
│   ├── pages               # Contains Next.js pages
│   │   ├── _app.tsx        # Custom App component for global setups
│   │   └── index.tsx       # Home page of the application
│   ├── pnpm-lock.yaml      # Lockfile for pnpm dependencies
│   ├── public              # Static assets such as fonts and images
│   │   └── fonts           # Fonts used in the application
│   ├── README.md           # Front-end specific README
│   ├── styles              # Global and base styles for the front-end
│   │   ├── base            # Base styles including colors, fonts, reset, and typography
│   │   │   ├── _colors.css
│   │   │   ├── _fonts.css
│   │   │   ├── _reset.css
│   │   │   └── _typography.css
│   │   ├── globals.css     # Global CSS for the application
│   │   └── GlobalStyles.tsx # Emotion-based global styles for Next.js
│   └── tsconfig.json       # TypeScript configuration for the front-end
├── how-to-run.md           # Instructions on running the project (specific details)
├── project-ideas.md        # Initial project ideas and brainstorming document
├── README.md               # The main README file (you are here)
└── server                  # Flask back-end application
    ├── app.py              # Main Flask application file
    ├── dummy_data          # Directory containing JSON files with dummy data
    │   └── welcome.json    # JSON data used for the welcome page API
    ├── requirements.txt    # Python dependencies for the back-end
    └── templates           # HTML templates rendered by Flask
        └── index.html      # Basic welcome page served by Flask
```

### Directory Structure Explanation:
- **client/**: Contains the Next.js front-end of the application. Here, you will find all the React components, pages, styles, and configuration files needed for the front-end.
- **server/**: Contains the Flask back-end of the application. This directory includes the main application file (`app.py`), templates, and dummy data used for development.
- **how-to-run.md**: Provides specific instructions on how to run the project.
- **project-ideas.md**: A document containing initial ideas and discussions for the project.

---

## Developer Onboarding Guide

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Git**: Version control system for managing your code.
- **Python 3.8+**: Required for the Flask back-end.
- **Node.js 16+**: JavaScript runtime for the front-end (Next.js).
- **pnpm**: Package manager for the front-end. Install via `npm install -g pnpm`.

### Setup Instructions

#### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/your-repo/project.git
cd project
```

#### 2. Setting Up the Back-End (Flask)

**Linux/macOS/Windows:**

1. **Navigate to the `server/` directory:**
   ```bash
   cd server
   ```

2. **Set up a virtual environment:**

   **Linux/macOS:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   **Windows:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install the Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python app.py
   ```
   The Flask server should now be running on `http://127.0.0.1:5000/`.

#### 3. Setting Up the Front-End (Next.js)

**Linux/macOS/Windows:**

1. **Navigate to the `client/` directory:**
   ```bash
   cd client
   ```

2. **Install the Node.js dependencies using pnpm:**
   ```bash
   pnpm install
   ```

3. **Run the Next.js development server:**
   ```bash
   pnpm dev
   ```
   The Next.js server should now be running on `http://localhost:3000/`.

### Running Both Servers Simultaneously
To work effectively, you need to run both the Flask (back-end) and Next.js (front-end) servers simultaneously. 

You can use two terminal windows/tabs or utilize a process manager like `pm2` or `concurrently` (if you prefer).

### Additional Information
- **Testing**: Make sure to write and run tests as you develop. You can add testing libraries to the `client/` and `server/` as needed.
- **Linting/Formatting**: Use appropriate tools like ESLint for JavaScript/TypeScript and `black` for Python to maintain code quality.
- **Environment Variables**: If needed, use `.env` files to store environment-specific variables. Ensure sensitive data is not committed to version control.

### Troubleshooting
- **Common Issues**:
  - If dependencies fail to install, ensure you are using the correct versions of Node.js, Python, and pnpm.
  - If ports are occupied, you may need to free up the default ports or configure the servers to use different ones.
  
- **Windows-specific issues**:
  - Ensure that paths are correctly set, especially when dealing with Python and Node.js. Using Windows Subsystem for Linux (WSL) can help mimic a Unix-like environment.

### Future Improvements
- **CI/CD Integration**: Automate testing and deployment.
- **Dockerization**: Containerize the application to ensure consistent environments across development and production.

### Contact Information
For any issues, feel free to contact any of the group members via email or GitHub.

---

We hope this guide helps you get started smoothly.
