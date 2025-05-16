
# Capstone - Event Management Application

## Description

This is a simple Event Management application built with Node.js, Express, and MongoDB. It allows users to view, create, update, and delete events, manage user accounts, and handle RSVPs.

## Table of Contents

- [Features]
- [Prerequisites]
- [Installation]
- [Configuration]
- [Usage]
- [API Endpoints]
- [Directory Structure]
- [Contributing]

## Features

*   **Event Management:**
    *   Create, read, update, and delete events.
    *   View a list of upcoming events.
*   **User Authentication:**
    *   User registration and login.
*   **RSVP:**
    *   Ability to RSVP to events.
*   **Seeding:**
    *   Seed the database with initial data.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (version 18 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)
*   [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas account)

## Installation

1.  **Clone the repository:**

    ```
    git clone <repository_url>
    cd SBA319
    ```

2.  **Install the dependencies:**

    ```
    npm install Express mongoose ejs node --save-dev
    ```

## Configuration

1.  **Create a `.env` file:**

    *   In the root directory of the project, create a file named `.env`.
    *   Add the following environment variables, replacing the values with your actual credentials:

        ```
        PORT=3000
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
        ```

    *   Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB Atlas credentials.

## Usage

1.  **Start the server:**

    ```
   nodemon index.mjs or nodemon server.mjs
    ```

    This will start the server using `nodemon`, which automatically restarts the server when you make changes to the code.
2.  **Access the application:**

    *   Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

*   **Events:**
    *   `GET /events`: Get all events
    *   `GET /events/:id`: Get a specific event
    *   `POST /events`: Create a new event
    *   `PATCH /events/:id`: Update an event
    *   `DELETE /events/:id`: Delete an event
*   **Users:**
    *   `POST /users/register`: Register a new user
    *   `POST /users/login`: Login an existing user
    *   `GET /users`: Get all users
    *   `GET /users/:id`: Get a specific user
*   **RSVP:**
    *   `POST /rsvp`: Create a new RSVP
    *   `GET /rsvp`: Get all RSVPs
    *   `GET /rsvp/:id`: Get a specific RSVP
    *   `PATCH /rsvp/:id`: Update an RSVP
    *   `DELETE /rsvp/:id`: Delete an RSVP
*   **Seed:**
    *   `GET /seed`: Seed the database with initial data