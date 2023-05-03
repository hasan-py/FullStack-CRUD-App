# CRUD Application

This is a project built with MERN stack (MongoDB, Expressjs, Reactjs, Nodejs) including public docker images.

## Features

- CRUD operations for data management
- User authentication with login and signup functionality

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or [Yarn](https://yarnpkg.com/)

You'll also need to have a MongoDB instance set up and running. You have to use a local MongoDB installation for this project. For installing MongoDB instance in local download MongoDB instance for you os and install it. Then you are ready to go.

## Installation

1. Clone the repository: git clone https://github.com/hasan-py/FullStack-CRUD-App

2. Install dependencies for the client and the backend by terminal:

```
cd FullStack-CRUD-App/frontend
yarn install or npm i

cd ../backend
yarn install or npm i
```

3. For start the development server this command will work for both. Just shift to the folder frontend or backend with `
cd` in terminal then run the command:

```
yarn run dev or npm run dev
```

🎉 Now visit: http://localhost:5173/

## Run the project with docker

Frontend Docker Image URL: https://hub.docker.com/r/hasanpy/crudapp-frontend
Backend Docker Image URL: https://hub.docker.com/r/hasanpy/crudapp-backend

1. Install docker in your local machine
2. Create a folder and create a file named `docker-compose.yaml`
3. Paste this code into this file

Your `docker-compose.yaml` file code:

```
version: "3"
services:
  frontend:
    image: hasanpy/crudapp-frontend:latest
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - 5173:5173
    depends_on:
      - backend

  backend:
    image: hasanpy/crudapp-backend:latest
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - 8000:8000
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - 27017:27017
    volumes:
      - ./mongo-data:/data/db
```

4. Open the terminal with that folder and run the command:

```
docker compose up -d
```

🎉 Now visit: http://localhost:5173/

Check the docker logs:
`docker ps` for running images list with id

Check specific logs: `docker logs your_id` give your iamge id

## Technologies Used

- Vite
- TypeScript
- Node.js
- Express js
- React js
- MongoDB

## Ui Framework Used

- Chakra Ui
- Tailwind Css

```
Build with 💚 by Hasan
```
