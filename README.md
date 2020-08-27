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
