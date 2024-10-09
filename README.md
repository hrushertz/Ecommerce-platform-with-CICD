# Getting Started with Create React App and Flask Backend

This project contains a React frontend and a Python Flask backend.

## Available Scripts

In the project directory, you can run:

### `npm start` (Frontend)

Runs the React app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `python eComAPIApp.py` (Backend)

Runs the Flask backend locally in development mode.  
Open [http://127.0.0.1:5000](http://127.0.0.1:5000) to access the backend.

### Building and Running with Docker

This project is set up for Docker, allowing you to run the frontend and backend in containers. Here's how to build and run both services using Docker.

### Prerequisites

- Docker installed on your system.
- Docker Compose installed on your system.

### Building Docker Images

To build Docker images for both the frontend and backend, follow these steps:

1. **Backend:**

   Navigate to the `backend` directory and build the Docker image:

   ```bash
   docker build -t backend-image .
