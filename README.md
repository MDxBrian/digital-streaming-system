![image](https://user-images.githubusercontent.com/56390226/200587161-89376e63-564f-42c0-9a9a-d227e224b058.png)
![image](https://user-images.githubusercontent.com/56390226/200587349-8ba666ee-ef25-4a39-9517-48a40d44f7ae.png)


# DIGITAL STREAMING SYSTEM 

You are required to write a software solution for a Digital Streaming System which allows  administrators to manage the movie catalogue information about the movies,  actors, movie reviews (like Netflix or Amazon Prime) and users management, While normal user can access movies, actors and able to give movie reviews, This application stores details of movies, actors, movie reviews and users in Mongodb nosql database.

# REQUIREMENTS 
This software needs to address the following requirements:

The admin module should allow administrators perform: 
A. Login and authentication, Use Encrypted Password
B. Saving details of movies, viewing, updating and deleting them. 
C. Saving details of actors, viewing, updating and deleting them. 
D. Searching for movies and displaying their details
E. Search for actors and displaying movies for specific actor
F. View and approve movie reviews given by film critics. 
G. New administrators to register, approve new users

The non admin module should allow perform: 
A. Login 
B. Viewing details of movies
C. Viewing details of actors. 
D. Searching for movies and displaying their details. 
E. Search for actors and displaying movies for specific actor
F. View and add reviews given by film critics. 
G. New users to register. 

User Stories: 
US01: Login 
As an Administrator permissions, I should be able to login to view and manage the movies, actors, users, reviews, while as a normal user permission I should only view movies, actors, users, reviews and add reviews (login require)
Acceptance criteria 
Verify that the combination of email and password being entered by the admin is  correct
Login is not require to see list of movies, actors, reviews but it is mandatory for add review
Display proper messages in case of errors or exceptions 
US02: View Movies 
As an Administrator/user, I should be able to view the available movies. 
Acceptance criteria 
The details of movies should be fetched from the backend and displayed.
Display proper messages in case of errors or exceptions 
US03: Add Movies to Catalogue 
As an Administrator, I should be able to add new movies released to be displayed on the movie  dashboard. 
Acceptance criteria 
Movie details include image, movie title, actor, cost and year of release.
Use autocomplete for actor, in case actor exist else add new actor
The movie id should be auto generated. 
Display proper messages in case of errors or exceptions 
US04: Modify and Delete Movies 
As an Administrator, I should be able to modify movie details and delete old movies to keep  the movie dashboard updated. 
Acceptance criteria 
Only the image and cost can be modified. 
Movies older than a year can be deleted. 
Display proper messages in case of errors or exceptions 
US05: View Actors 
As an Administrator/user, I should be able to view the actor details. 
Acceptance criteria 
The details of actors should be fetched from the backend and displayed.
Display proper messages in case of errors or exceptions
US06: Add Actors 
As an Administrator, I should be able to add new actor details. 
Acceptance criteria 
Actor details include first name, last name, gender and age. 
Add multiple actor for specific movies 
The actor id should be auto generated.
Display proper messages in case of errors or exceptions 
US07: Modify and Delete Actors 
As an Administrator, I should be able to modify and delete actor details. 
Acceptance criteria 
• Actors should be deleted only if there are no movie details for the actor. • Display proper messages in case of errors or exceptions 

US08: View Movie Reviews 
As an Administrator/user, I should be able to view the available movies. 
Acceptance criteria 
The movie review should be displayed in a tabular format 
Display star using font-awesome library for rating
The details of movie reviews should be fetched from the backend and displayed.
Display proper messages in case of errors or exceptions 
US09: Add Movie Reviews 
As an Administrator, I should be able to approve movie reviews that are collected from movie  critics, while as a  movie  critics we can add movie reviews
Acceptance criteria 
Review details should include description, posted date and rating out of 5. 
The review id should be auto generated. 
Login is mandatory for adding reviews.
Display proper messages in case of errors or exceptions
US10: New Admin Registration 
As a New Administrator, I should be able to register myself to keep track and work on the  movie catalogue. 
Acceptance criteria 
Check in users collection if length is 0, first user will be treated as admin root user and we cannot edit/delete this user.
Verify that an error message is displayed if all the details are not filled 
Verify that an error message is displayed if the email id is already in use by some  other user 
Verify that an error message is displayed if the username and password field is empty.
Passwords should be encrypted before insertion. 
Verify that a new account is created if all the fields that have been entered by the  user are proper.  
The user should be able to login with his/her emailId and password 
Database Design: 
• Create the actual MongoDB schema design that mirror implementation of your own solution. 

Functional Requirements: 
A. The Application should be implemented using HTML, SCSS, Javascript, React Typescript, Redux, Loopback, Mongodb Nosql Database, Sonarqube, React Testing Library along with Jest 
B. The services should be created using loopback. 
C. You should provide access to all services using a loopback explorer
D. Perform client side operation with React typescript and Redux 
E. The REST API’s should be tested with the Postman tool. 
F. The backend to be used is Mongodb nosql database. 
H. Appropriate validations and exception handling should be performed in the  relevant layers of the application. 
I. Minimum 60% code coverage for unit testing using React Testing Library along with Jest.

Best Practices  
A. Follow proper naming conventions and ensure code quality 
B. Write comments to explain the purpose of the code and behaviours. 
C. For multiple words, use only camel case, for example loyaltyPrograms
D. Use External SCSS, Typescript 
E. Use class only for SCSS, id for Javascript 
F. Create Reusable components and code reusability 
G. Clear and concise comments  

Submission Requirements: 
A. Submit a single archive containing all the artefacts 
B. The artefacts are Project Source Code, Presentation and Database JSON Scripts, Schema
C. Along with the code you are also required to submit a documentation that  mentions 
a. Project Name 
b. Application Name of your services 
c. Port number assigned to that service 

Project Presentation Requirements: 
A. The Project should be presented individually with execution and presentation. 
B. Explain the details of API used, processes involved, workflows and frameworks utilized.

Note
User can only add 1 review for each movies
For UI you can use any library
Actor can also have multiple Movies
No console.log, alert incase any error display proper error message
Create reusable components
For any confirm use Modal
Use image url for actor
For admin - Add User management for add, edit and delete user, also admin can change user roles, all fields will remains same, admin can activate/ deactivate user
Admin is having users, movies, actors and reviews management features.
Normal user can do registration by default roles is user, once admin approve user will gets activated.
One movies can have multiple actors
admin cannot add, edit and delete reviews


# Getting Started Client

This project was designed by AntD.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test` or `npm run coverage`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



# Getting Started Service

This project was NO SQL `loopback 4`.

## Available Scripts

In the project directory, you can run:
### `cd server & cd digital-streaming-streaming service.`

FYI: If you are first timer we have an admin default credentials to see the features.
email: admin@root.com
password: root

### `npm start`


Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
