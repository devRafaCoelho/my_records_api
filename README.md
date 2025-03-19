# My Records API

This is a Node.js backend application built with Express. It provides a RESTful API for managing user accounts and financial records.

## Project Structure

```
my_records_api
├── src
│   ├── index.js               # Entry point of the application
│   ├── controllers            # Contains the controllers for handling requests
│   │   ├── UserController.js  # Handles user-related operations
│   │   └── RecordController.js # Handles record-related operations
│   ├── routes                 # Contains the route definitions
│   │   ├── userRoutes.js      # Routes for user-related endpoints
│   │   └── recordRoutes.js    # Routes for record-related endpoints
│   ├── models                 # Contains the data models
│   │   ├── UserModel.js       # User data model
│   │   └── RecordModel.js     # Record data model
│   ├── middlewares            # Contains middleware functions
│   │   ├── validateUserData.js # Middleware for validating user data
│   │   └── validateRecordData.js # Middleware for validating record data
│   ├── schemas                # Contains validation schemas
│   │   ├── userSchema.js      # Joi schema for user validation
│   │   └── recordSchema.js    # Joi schema for record validation
│   └── config                 # Configuration files
│       └── db.js              # Database connection configuration
├── package.json               # NPM configuration file
├── .env                       # Environment variables
├── .gitignore                 # Files and directories to ignore by Git
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my_records_api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Create a `.env` file in the root directory and add your environment variables. Example:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```
2. Start the application:
   ```
   npm start
   ```
3. The server will run on `http://localhost:3000`.

## API Endpoints

### User Endpoints

- `POST /users` - Create a new user.
- `POST /login` - Authenticate a user and return a JWT token.
- `GET /users` - Retrieve the logged-in user's details.
- `PUT /users` - Update the logged-in user's details.
- `DELETE /users` - Delete the logged-in user's account.

### Record Endpoints

- `POST /records` - Create a new financial record.
- `GET /records` - Retrieve all financial records for the logged-in user.
- `GET /records/:id` - Retrieve a specific financial record by ID.
- `PUT /records/:id` - Update a specific financial record by ID.
- `DELETE /records/:id` - Delete a specific financial record by ID.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
