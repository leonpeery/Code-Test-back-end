How to use
----------

Run "npm install" inside this project folder to install all dependencies.

run npm start to start the server

import user-profiles-5000.js into your local MongoDB database using the following command:

mongoimport --db codetestusers --collection users --type json --file user-profiles-5000 --jsonArray

I use db-name codetestusers and collection-name users on the server.

API endpoints include:
GET /users (get first 20 users) 
GET /search/:usersearch (returns a document with first name or last name matching the :usersearch)
POST /users (create a new user)
DELETE /users/_id (delete a user by id)
PATCH /users/_id (change the authorization of a user.)

accepts data in the following schema
{_id:string,{name: {first:string, last:string, middle:string}}, {picture:{small:string, medium:string, thumbnail:string}}, authorized:boolean}

to-do
GET /users/authusers (get all the authorized users only)
