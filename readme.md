How to use
----------

Run "npm install" inside this project folder to install all dependencies.

run npm start to start the server

import user-profiles-5000.js into your local MongoDB database using the following command:

mongoimport --db <db-name> --collection <coll-name> --type json --file seed.json --jsonArray

I use <db-name> codetestusers and <coll-name> users on the server.