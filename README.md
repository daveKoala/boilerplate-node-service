# Node, Typescript service with Docker development environment

## Set up

This project has two docker compose files. In production ```docker-compose.override.yml``` will not be used. This override file adds additional services like Redis and MongoDB locally and allows the developer to work within a Docker container. The idea being is to have deterministic development environments for different dev's on different machines and OS's.

## Docker

You will need Docker or Docker Desktop installed and running

### Install

```:bash
git clone <url>
```

### First use

First time you run the project or want to refresh. This could take a few minutes but subsequent builds make use of cached downloads.

```:bash
docker-compose up --build
```

### Daily use

```:bash
docker-compose up
```

### Run as in production

```:bash
docker-compose -f docker-compose.yml up
```
