# Task Management System

This project is the backend for a task management application. It provides user authentication, add the task, and change the status ,sort the task based on priority level using Node.js, Express.js, Mongodb.

## Features

- User registration and login using JWT.
- manage and create task.
- Secure password storage using hashing.
- Change the task status. 
- Fetch the task based on the priority. 
- sort the task based on priority level  

## Prerequisites

- Node.js
- mongodb


## Setup Instructions

1. Clone the repository:
    ```sh
    git clone https://github.com/irfan0374/Task-Management-System
    cd BACKEND
    ```

2. Install dependencies:
    ```sh
    npm install

3. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

Authentication
POST user/signup - Register a new user.
POST user/userLogin - Authenticate a user and return a JWT.
POST user/googleUserLogin - Google Login

Task management

GET /task/create- Get current weather for a city.
GET /task/getTask/:id - Get 7-day weather forecast for a city.
GET /task/updateTask/:id- Get historical weather data for the past 7 days for a city.
GET /basedOnStatus - Get the task based on status.

Favorites
PATCH /statusChange/:id - we can change the status.

## Contact

If you have any concerns or feedback, feel free to reach out:

- Email: [irfan188iqbal@gmail.com](mailto:irfan188iqbal@gmail.com)
- LinkedIn: https://www.linkedin.com/in/muhammedirfaniqbal/





