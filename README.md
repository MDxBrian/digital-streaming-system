![image](https://user-images.githubusercontent.com/56390226/201990578-cdb1a38d-e60a-4e46-8cad-5ca08a509d5d.png)
![image](https://user-images.githubusercontent.com/56390226/201990927-b0e10a10-8372-4884-acd5-fad1a7b42d17.png)


# Digital Streaming System
Digital Streaming System is a system which allows the admministrator to manage the movies and more information along the actors and reviews (like Netflix or Amazon Prime) and users management. While normal user can only access the movies and actors informations and provide a critique. 

# Technologies Used
* HTML/CSS/Javascript
* Ant Design
* Loopback 4
* MongoDB
* Sonarqube
* React Js
* Redux Redux
* React-Typescript
* React Testing Library + Jest

# Scope 
* user - register user, search, fetch user info, update user info, delete users.
* movies - create, fetch, search, update, delete movies.
* actors - create, fetch, search, update, delete actors.
* reviews - create, fetch, search, update, delete reviews.
* Admin Users - Manage all of this above.
* Normal Users - Basically fetch and read the detail and giving a critique or a review/comment. 

# Limitation 
* Admin - cannot add reviews and comment. (cannot delete root admin)
* Normal User - cannot manage all functionality of an admin the movies and actors. 
* Need to login first, before adding reviews/comments. 


# Schema and Process Model
![POC-SCHEMA](https://user-images.githubusercontent.com/56390226/202005017-0d3ddb24-56e9-4173-89f6-bf4aa6387cda.png)
![Process of Public Users](https://user-images.githubusercontent.com/56390226/202009916-6039aa88-24ea-4f8e-99e9-a0b69d4066a8.png)

# Getting Started Client
FRONTEND & BACKEND
* cd frontend && cd backend
* Use npm i or npm install to install dependencies.
* Use npm start to see run the application.
* npm test --coverage

* FYI: If you are first timer we have an admin default credentials to see the features.\
email: admin@root.com\
password: root\

* run frontend from port: 3001
* run for backend from port: 3000

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

# Sonarqube Result

![POC-CLIENT](https://user-images.githubusercontent.com/56390226/201997123-d2a2b485-c952-49f3-a851-e4696cf3ec54.png)
![POC-SERVER](https://user-images.githubusercontent.com/56390226/201997126-4d1118b8-5bf1-425e-860b-03acad1ae2e8.PNG)



## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
