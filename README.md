## Blog app built with Ionic React, Nodejs and Firebase ##

Live app - https://blog-a-zing.herokuapp.com


#### Client ####

Move in to the client directory and run the following commands:

npm install && ionic serve


The app will run at http://localhost:8100


#### Server ####

Move into the root directory and run the following commands:

npm install && npm start


The server will run at http://localhost:3000


#### Note ####

Firebase credentials should be added for CRUD actions to work


#### Adding Firebase Credentials ####

In the root directory, create config folder and within 'config' folder, create 'credentials' sub-folder'

Download the .json credentials file from firebase and rename it to serviceAccountKey.json

Move the serviceAccountKey.json file to 'config/credentials' folder

Move into the 'utils' directory in the root folder and open 'firebase.js' file

Change the 'databaseURL' value to your firebase database URL

#### END ####
