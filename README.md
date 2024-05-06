<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest




## Description

Melp's Restaurant Locator API is a robust backend system designed using NestJS, tailored for quick and efficient searching of restaurants within specific geographic coordinates.

## System Overview
Built with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications, our API leverages its modular architecture to ensure maintainability and ease of development. The system primarily interacts with a geographic database to fetch and manipulate restaurant data based on user queries.

## Technology Stack
* NestJS: Provides a framework that is not only fully extensible but also lends itself to writing clean, maintainable code.
* TypeORM/Prisma: Facilitates object-relational mapping to interact seamlessly with the database.
* PostgreSQL/PostGIS: Used for storing and querying geospatial data.

## API Endpoints
* Railway [https://melp-back-production.up.railway.app/](https://melp-back-production.up.railway.app)
* Swager [https://melp-back-production.up.railway.app/Document](https://melp-back-production.up.railway.app/Document)
* POST auth/register
* POST auth/login

* GET restaurants/
* GET restaurants/:id
* POST restaurants/
* PATCH restaurants/:id
* DELETE restaurants/:id

* GET seed

## Develop
* Clone the project 
```bash
$ git clone https://github.com/DanMiramontes/melp-back.git
```
* Define env varible
```bash
  DB_PASSWORD=
  DB_NAME=
  DB_HOST=
  DB_PORT=
  DB_USERNAME=
  PORT=
  JWT_SECRET=
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Stay in touch

- Author - Daniel Miramontes
- email - dmiramontesg@gmail.com
- Linkedin - [https://www.linkedin.com/in/daniel-miramontes-3bb941238](https://www.linkedin.com/in/daniel-miramontes-3bb941238/)


