# Gossip 

## Description
Gossip is a bloging platform that allows users to write about what interests them and also allows other users to interact with their post 

## Installation
- Clone the repository.
- Install dependencies using npm install.
- Set up environment variables:
- Create a .env file based on the .env.example template.
- Add necessary environment variables, such as database connection URL, port, etc.

## File Structure

``` bash
Copy code
project-root/
│
├── config/               # Configuration files
│   └── mongodb.js        # MongoDB connection setup
│
├── controller/           # Controllers for handling business logic
│   ├── user.controller.js    # Controller for user-related operations
│   ├── post.controller.js    # Controller for post-related operations
│   └── comment.controller.js # Controller for comment-related operations
│
├── middleware/           # Express middleware
│   └── multer.js         # Middleware for handling file uploads
│
├── model/                # Mongoose models
│   ├── user.js           # User model definition
│   ├── post.js           # Post model definition
│   └── comment.js        # Comment model definition
│
├── routes/               # Express routes
│   ├── routes.js         # Main router combining all route modules
│
├── service/              # Service layer for handling business logic
│   ├── userService.js    # Service for user-related operations
│   ├── postService.js    # Service for post-related operations
│   └── commentService.js # Service for comment-related operations
│
├── utils/                # Utility functions and helpers
│   └── appError.js       # Custom error handler
│
├── app.js                # Express application setup
├── server.js             # Entry point to start the server
└── README.md             # Project README 
 ```

 ### Usage
1. Start the server:

``` bash

npm start
```