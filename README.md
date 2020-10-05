# todo-react-firebase
Todo web-app made using react, firebase, and materialUI.

<b>Note:</b>

It is recommended you use [#region folding for VSCode](https://marketplace.visualstudio.com/items?itemName=maptz.regionfolder)
while developing this project. This vastly improves code readability and 
lets you focus on only the parts of the project you need. After installing the 
extension, hit Command-Shift-P for Mac (Ctrl-Shift-P for Windows) to bring up the
command palette and type fold all regions to, well, fold all regions. Use the arrows 
on the line numbers to the left of the region to expand/fold it as you need.

<b>React</b>

The frontend is comprised of React functional components making use 
of hooks for state management. The UI is built using components and 
icons from material-ui.com as well as custom styles added to the page
using withStyles from the material-ui library.

<b>Firebase</b>

Firebase is used for hosting and user authentication while Firestore, a service provided
by Firebase, is used for the database. src/components/Firestore/index.js
contains the connection to Firestore as well as all of the functions 
that allow reading from and writing to the database. Whenever the app
is reading from or writing to the database, the tag at the top 
switches from 'synced' to 'syncing' then back once the promise is 
fulfilled.

<b>Deployment:<b> https://todo-react-d4370.web.app
  
<b>Make It Your Own</b>

First, clone the repository to your computer and navigate to the 
folder using the command line. Make sure node is installed on your computer, 
then run the following in the project directory:

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
    
Once this is set up, run the following from the project directory to 
run your project on localhost:
    
    npm start

