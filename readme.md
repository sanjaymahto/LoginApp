# Login App - office administration application.


## Description
A generic office administration application using MEAN stack.


## Features

```
In this there will be two actors:
Employee
Admin

1) Employee
Logs into the application using login credentials (email and password) and with JWT authentication
After authenticating employee redirect to the dashboard screen showing employee details (name, id, phone no given to office for contacting and last five days login time)
Design a button under these details, if the employee clicks on the button, his login time for the day will be saved into database
Design another tab showing inbox, for reading any messages that has come from admin

2)Admin:
Logs into the system with credentials and role based authentication and using JWT authentication.
After authenticating admin, redirect to the dashboard page, where all the list of employees displayed here.
By clicking on any employee, redirect to  another page with that particular employee details.
Here the admin also get the last 5 days login time of that particular employee.
Create a textarea and button under these details where the admin can send a message to that particular employee. It can be anything like informing about timing or any message to inform.

 
 ```

## Prerequisites

Git

NodeJs

NPM

MongoDB

## Running

  running mongodb:
```
    1). Open Command Prompt and change directory to where mongodb is installed in bin folder.
    2). Type 'mongod' in the command prompt.
    3). press enter database server will start.
```
  installing dependencies:
```
    (Make sure the command prompt is running for mongoDB and open a new Command Prompt.)
    1). Unzip the downloaded file.
    2). Open the extracted folder.
    3). open the server folder 
    4). Type Command : npm install and press enter. This will install all dependencies shown in package.json file.
```
  running project:
```
    Install all dependencies by : npm install and run the application Using: node app.js

    1.)Update Email and Password in ticket Controller for nodemailer event.
```
 Open As Admin:
```
    To Run the Application as an admin please signup into Application Using user Type as "Admin".
    1.)As this is demo Application, all the users having name as Admin will be admin of this application.
    2.)you Will be able to open and close the status of the queries.
```    
     Open As User:
```
    To Run the Application as an employee please signup into Application Using user Type as "Employee".
```
    
## Built With

OS : Windows 10

API Tool : Postman

Editor : Sublim Text

Frontend Technologies allowed - HTML 5, CSS3, Javascript, Jquery and AngularJS.

Backend Technologies allowed - NodeJs, ExpressJS, MongoDB.
