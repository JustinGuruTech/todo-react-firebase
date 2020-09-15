/* Justin Edwards
 * 08/26/2020
 * V2 - 09/14/2020 - Todo list moved to it's own component, App.js now to 
 * be used for public/protected route with user accounts
 * Main app for todo list - rendering of main page and todo list container.
 * Maps todo list to SingleToDo items passing in relevant information. Uses
 * Firestore/index.js functions for database connectivity
 */ 

import React from 'react';
// import Todo from './components/Todo';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
import Home from './components/Home';

function App(props) {

  return (
    // <Todo />
    // <SignUp />
    // <div>
    // <Login />
    // </div>
    <Home />
  );
};

export default App;
