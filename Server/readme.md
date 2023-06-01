# CraftVillageServer
This project is a Web Server manage , with **Express**, **TypeScript**

# Installation
Create file ```/.env``` with contents:
```
PORT=3001
JWT_EXPIRES_IN=30
APP_SECRET=craftvillages
MONGODB_URI=<YOUR_MONGODB_URI>
SESSION_SECRET=craftvillages
MAILER_PASSWORD=<your_app_token>
MAILER_USERNAME=<your_email>
```

Open terminal run this command:
```
npm install
```

Run the server with command:
```
npm start
```
****

# Usage
Available routes, use **Postman** for more info
* POST - **/signup**, **/signin**  with the body look like this:
  ```
  {
    "password":"111111",
    "email":"abc@handicraft.vn",
  }
  ```
nav122333 - 27/05/2023
* POST - **/notification/create**  with the body look like this:
  ```
  {
    "sender":"<sender UID 1>",
    "sendemail":"<true | false>",
    "receivers":[
      "<receiver UID 1>", 
      "<receiver UID 2>",
      ...
    ],
    "header":"This is title",
    "body":"Bodytext"
  }
  ```
* POST - **/notification/fetch**  with the body look like this:
  ```
  {
    "id":"<reveicer uid>",
    "filter":{ //this is optional
      "read": "true",
      ...
    }
  }
  ```
* GET - **/notification/read/\<notificationID>** will get the notification has _id = \<notificationID>
nav122333 - 01/06/2023