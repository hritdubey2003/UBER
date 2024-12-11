# MERN User Registration and Authentication API

This project is a user registration and authentication system built with the MERN stack (MongoDB, Express, React, and Node.js). The API provides secure user management using hashed passwords and JSON Web Tokens (JWT) for authentication.

## Features

- **User Registration**: Register new users with validation.
- **Password Security**: Passwords are hashed using bcrypt for secure storage.
- **Authentication**: JWT tokens are used for user authentication.
- **Validation**: Input validation using `express-validator`.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js**: v14+  
- **MongoDB**: v4.2+  
- **npm**: v6+  

---

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/<your-database-name>
    JWT_SECRET=<your-jwt-secret>
    ```

4. Start the server:
    ```bash
    npm start
    ```

The server will run on `http://localhost:5000`.

---

## Folder Structure

```plaintext
.
├── controllers
│   └── user.controller.js ### Contains controller logic for user-related operations
├── models
│   └── user.model.js #### Mongoose schema and model for users
├── routes
│   └── user.routes.js ### API routes for user endpoints
├── services
│   └── user.service.js ### Service layer for handling user-related business logic
├── db
│   └── db.js ### MongoDB connection logic
├── app.js ### Entry point of the application
└── .env ### Environment variables (not included in repo)


---

## API Endpoints

| HTTP Method | Endpoint         | Description                         |
|-------------|------------------|-------------------------------------|
| POST        | /users/register | Endpoint for registering a new user. |
| POST        | /users/login    | Endpoint for user login.             |
