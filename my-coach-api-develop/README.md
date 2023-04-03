# MyCoach Backend

**MyCoach Backend** is a server-side application that provides the necessary API for the MyCoach mobile application. The API allows users to track their progress in training, keep track of their training calendar, connect with a coach, communicate, and share information in the community.

## Project Description
The backend application serves as the backbone of the MyCoach mobile application, providing all the necessary functionalities such as:

- Recording training results.
- Maintaining a training calendar.
- Connecting with a coach.
- Communicating with the coach.
- Sharing information in the community.

## Technologies
The backend application is built with the following technologies:

- [NestJS](https://nestjs.com/): A Node.js framework for building efficient, scalable, and reliable server-side applications.
- [Prisma](https://www.prisma.io/): A modern data layer that provides a type-safe and auto-generated GraphQL API for your database.
- [Apollo Server & Express](https://www.apollographql.com/docs/apollo-server/): A flexible and powerful GraphQL server that integrates with Express.js.
- [GraphQL](https://graphql.org/): A query language for APIs that provides a more efficient, powerful, and flexible way of retrieving data from a server.
- [PostgreSQL](https://www.postgresql.org/): An open-source relational database management system.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

#### Before you begin, make sure you have the following software installed on your computer:
- Node.js: ``V > v18.14.0`` A JavaScript runtime built on Chrome's V8 JavaScript engine.
- npm: The package manager for Node.js.
- Docker: A platform for developing, shipping, and running applications.

### Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies:

```bash
$ npm install
```

4. To run the project, you need to create a .env file in the root directory of the project and provide the required variables. You can copy the .env.example file in the root directory by using the following command:

```bash
$ cp .env.example .env
```

5. Start the development environment with Docker:

```bash
$ docker-compose up -d
```

6. To run migrations, simply run the following command in the terminal:

```bash
$ npm run migrate
```

This will apply all pending migrations to the database and update the schema accordingly.

**Note**: Before running migrations, make sure that the database is running and that the connection information in the .env file is correct.

7. Start the application by running the following command:

```bash
$ npm run start
```
   
8. The application should now be running at ``http://localhost:3000/``. You can use a tool like ``Postman`` or ``Insomnia`` to test the endpoints.

#### Note: The steps provided are a general outline, and the actual process may vary based on your setup and environment.

If you run into any issues or have questions about running MyCoach, feel free to reach out to the development team for support.

### Usage

#### GraphQL API Endpoint
The GraphQL API endpoint is available at ``http://localhost:3000/graphql``.

#### PostgreSQL Database
The PostgreSQL database is available at ``http://localhost:54321``

## Documentation
The application is built using GraphQL, and the documentation for the API can be found at ``http://localhost:3000/graphql``.

## Contributing

#### Contributions are welcome and appreciated. To contribute, please follow these steps:
- Fork the repository.
- Create a new branch for your changes ``git checkout -b my-changes``.
- Commit your changes ``git commit -am 'Add some changes'``.
- Push to the branch ``git push origin my-changes``.
- Create a new Pull Request.
