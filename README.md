# Node, Typescript service with Docker development environment

## Set up

This project needs live connections to a MongoDB collection and a Redis instance for caching. There is also an Azure Application Insights connection - but this can be ignored.

The ```docker-compose.yml`` file will set up local Mongo and Redis services.

<!-- This project has two docker compose files. In production ```docker-compose.override.yml``` will not be used. This override file adds additional services like Redis and MongoDB locally and allows the developer to work within a Docker container. The idea being is to have deterministic development environments for different dev's on different machines and OS's. -->

## Docker

You will need Docker or Docker Desktop installed and running

### Install

```:bash
git clone <url>
```

Copy and rename ```./app/env.example```

```:bash
cp app/.env.example app/.env
```

Edit any values to match your environment

### First use

First time you run the project or want to refresh. This could take a few minutes but subsequent builds make use of cached downloads.

```:bash
docker-compose up --build
```

Then in another terminal

```:bash
cd app/
npm run dev
```

### Daily use

```:bash
docker-compose up
```

Then in another terminal

```:bash
cd app/
npm run dev
```

## API Documentation

There are two form of API documentation both using Openapi version 3.0

There is the Swagger formatted version

```:bash
http://localhost:3000/api-docs/
```

A JSON representation. This is useful with applications like Postman where you can import an API schema.

```:bash
http://localhost:3000/api-docs/spec.json
```

## NPM Scripts

### Testing

The project has unit tests. The test files ```xxx.spec.ts``` sit alongside the file that is being tested and not in a separate test directory.

You can use grep to just run a single test. E.g. ```npm run test:local -- --grep removeAllObjectIds```

#### test or test:local

This project will fit into a (Azure DevOps) CI/CD pipeline with one of the steps is to run all tests and save a 'report'.

```npm run test:local``` runs all the unit tests with results printed to the terminal.
```npm run test``` runs all the same tests except a report file is generated. See ```app/test-results.xml```
