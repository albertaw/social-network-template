# Dev Social

A web app for developers to post news about their projects, events, 
or anything tech related. Users can sign up for accounts and create 
a profile with their skills and bio for others to see.

See the live demo [here](https://alberta-social-ae526b5c0c2e.herokuapp.com/)


## Getting Started

### Pre conditions

Node.js is installed  
Download: https://nodejs.org/en

MongoDB is installed  
Download: https://www.mongodb.com/try/download/community

### Clone the repo

```bash
git clone git@github.com:albertaw/social-network-template.git
```

### Navigate into project root

```bash
cd social-network-template
```

### Install dependencies

```bash
npm install
```

### Start MongoDB server

```bash
mongod
```

### Start app

In a separate terminal window, execute the following command:

```bash
npm start
```

### Open app

In your browser, go to localhost:5000

Swagger documentation: localhost:500/api-docs


### Run tests

Execute tests for API endpoints:

```bash
npm test
```

## API 

### Create a user account

POST /api/users

### Login a user

POST /api/users/login

### Get the authenticated user's info

GET /api/user

### Delete the authenticated user

DELETE /api/user

### Get a user's posts

GET /api/users/{id}/posts

### Delete the authenticated user's posts

DELETE /api/user/posts

### Create a user profile

POST /api/profiles

### Get a profile by Id

GET /api/profiles/{id}

### Get a profile by username

GET /api/profiles/username/{username}

### List all profiles

GET /api/profiles

### Get the authenticated user's profile

GET /api/profile

### Remove the authenticated user's profile 

DELETE /api/profile

### List all posts

GET /api/posts

### Create a post

POST /api/posts

### List post by Id

GET /api/posts/{id}

### Remove post by Id

DELETE /api/posts/{id}

