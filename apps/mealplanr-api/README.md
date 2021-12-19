# Mealplanr-API
[![CircleCI](https://circleci.com/gh/BHelpful/Mealplanr-api/tree/master.svg?style=svg)](https://circleci.com/gh/BHelpful/Mealplanr-api/tree/master) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BHelpful_Mealplanr-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BHelpful_Mealplanr-api)
[![CodeScene Code Health](https://codescene.io/projects/19881/status-badges/code-health)](https://codescene.io/projects/19881)
[![CodeScene System Mastery](https://codescene.io/projects/19881/status-badges/system-mastery)](https://codescene.io/projects/19881)


---

# Description of the different parts of the API
This readme will explain the different parts of the API.

## Diagram
Below here is a diagram that shows the different types of parts of the API and how they connect.
<p align="center">
  <img width="1200" src="https://i.imgur.com/lwI0lsj.png">
</p>
Now if you look in the files, you will find, that for each collections subfolder there are a *.model.ts and a *.schema.ts, which is not depicted in the diagram above. This is because it is not a part of the central logic, but they will be explained in the next section.

### HTTP endpoint (/routes)
This is where the endpoint descriptions for the API is located. It is here the different routes for the API is assigned to a function.

From here the each route will have access to use middleware and a controller. It is also here in the routes that the schema is used. The schemas are used to pass into the middleware called validateRequest, which will check if the request is valid basedn on the schema.

### Middleware
Middleware is a function that is called before a route is called. This means that middleware is a sort of basic validation check that is done before any sort of access to the database is given. An example of a middleware is the requiresUser middleware, which checks if the user is authenticated (logged in) before giving access to API calls that have something to do with a user, that should be logged in.

### Controller
The controller is where the logic for the API is located. It is in here more complex logic in constructing the right data based on the request is located. The controller takes a request (req), processes the request using some logic and calls to the service, which handles access to the database. At last the controller returns the right data to the response (res).

### Service
The services are used to access the database. It is in here the functions defining the different types of querries to the database are defined. It is in here, that the different models (*model.ts) are used to access the database, as these define what parts of the database will be accessed and what kind of parameters will be accessable for each model.

---
At last there is the utils folder, which is used to define some utility functions. An example is JWT, which is used to handle a JWT tokens for the user's sessions.