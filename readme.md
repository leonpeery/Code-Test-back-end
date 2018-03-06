How to use
----------

Run "npm install" inside this project folder to install all dependencies.

run npm start to start the server

import user-profiles-5000.js into your local MongoDB database using the following command:

mongoimport --db <db-name> --collection <coll-name> --type json --file seed.json --jsonArray

I use <db-name> codetestusers and <coll-name> users on the server.

API endpoints include:
GET /users (get first 20 users) 
GET /users/_id (get a user by id)
POST /users (create a new user)
DELETE /users/_id (delete a user by id)
PATCH /users/_id (change the authorization of a user.)

to-do
GET /users/authorized (get all the authorized users only)
Get /users/:name (get users where first or last name match :name)