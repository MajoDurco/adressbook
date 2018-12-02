# AddressBook

Simple Express application with login and possibility to add create new contact. 
For login, the JWT tokens are used. The users are stored in the Mongo DB and contacts of the users are in the Firestore.

### Project structure

- `src/`
  - `constants/` - contains constants like requests/responses from the application
  - `middlewares/` - express middlewares
  - `models/` - takes care of handling requests between databases and the application
  - `routes/` - handling routes of the application taking care or request -> reponse flow
  - `schemas/` -  making sure that requests are in the right format
  - `services/` - connection layer between routes and models
  - `utils/` - helper functions for the other parts or the application

### Env variables

```sh
# REQUIRED
FIREBASE_APIKEY
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
MONGO_ATLAS_URL
# OPTIONAL
JWT_EXPIRATION
JWT_SECRET
PORT
```
  - Firebase variables can be found in your firebase project
  - Mongo atlas URL is for connection to your Mongo database
  - Jwt expiration says how long the token is valid for the default value is `1 hour`
  - Jwt secret is the secret of the server used to verify the jwt tokens
  - Port of the application default is `8080`

### Development

For the development of the application follow this steps:
  - Clone this repository
  - Create `.env` file in the root folder of the application
  - Set required environment variables stated before in `.env`
  - Run `yarn dev` to start development `nodemon` server

### Deployment

The application is deployed in with Heroku service under the following address:

https://addressbook-mdurco.herokuapp.com/

Automatic deployment is set for the `production` branch so on every new commit the application will be redeployed.

### Postman docs

Postman documentation with examples can be found [here](https://documenter.getpostman.com/view/3066958/RzfdrB9P#1886f560-e73a-e43f-7da0-13d135464163).