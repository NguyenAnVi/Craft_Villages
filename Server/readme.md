# CraftVillageServer
This project is a Web Server manage , with **Express**, **TypeScript**

# Installation
Create file ```/.env``` with contents:
```
PORT=3001
JWT_SECRET=craftvillages
MONGODB_URI=<YOUR_MONGODB_URI>
MONGODB_DBNAME=craftvillages
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
* POST - **/signup**  with the body look like this:
  ```
  {
    "phone":"0123456789",
    "password":"111111",
    "email":"abc@handicraft.vn",
    "name":"Village1",
    "address":"152, Ba Thang Hai Str.",
    "group":"",
    "ward": "Xuan Khanh",
    "district":"Ninh Kieu",
    "city":"Can Tho",
    "workers":29
  }
  ```
* POST - **/signin**  with the body look like this:
  ```
  {
    phone: < user's phone number >,
    password: < user's password >
  }
  ```
nav122333 - 27/05/2023