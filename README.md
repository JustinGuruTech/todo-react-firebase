# todo-react-firebase
Todo web-app made using react, firebase, and materialUI.

<b>React</b>

The frontend is comprised of React functional components making use 
of hooks for state management. The UI is built using components and 
icons from material-ui.com as well as custom styles added to the page
using withStyles from the material-ui library.

<b>Firebase</b>

Firebase is used for hosting and Firestore, a service provided
by Firebase, is used for the database. src/components/Firestore/index.js
contains the connection to Firestore as well as all of the functions 
that allow reading from and writing to the database. Whenever the app
is reading from or writing to the database, the tag at the top 
switches from 'synced' to 'syncing' then back once the promise is 
fulfilled.

<b>Deployment:<b> https://todo-react-d4370.web.app
  
<b>How To Use</b>

To install node dependencies, install node on your computer and
run the following command in the project directory:
 
    npm install

To get this application running using your own firebase credentials, 
create a .env file and add your information in the following format:

    REACT_APP_API_KEY="<your_api_key>"
    REACT_APP_AUTH_DOMAIN="<your_auth_domain>"
    REACT_APP_DATABASE_URL="<your_database_url"
    REACT_APP_PROJECT_ID="<your_project_id>"
    REACT_APP_STORAGE_BUCKET="<your_storage_bucket>"
    REACT_APP_MESSAGING_SENDER_ID="<your_messaging_sender_id>"
    REACT_APP_APP_ID="<your_app_id>"
    REACT_APP_MEASUREMENT_ID="<your_app_measurement_id>"

