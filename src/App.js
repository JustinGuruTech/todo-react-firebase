/* Justin Edwards
 * 08/26/2020
 * V2 - 09/14/2020 - Todo list moved to it's own component, App.js now to 
 * be used for public/protected route with user accounts
 * Main app for todo list - rendering of main page and todo list container.
 * Maps todo list to SingleToDo items passing in relevant information. Uses
 * Firestore/index.js functions for database connectivity
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import AuthDataProvider from './components/AuthDataProvider';

const App = props => (
  <BrowserRouter>
    <AuthDataProvider>
      <Router />
    </AuthDataProvider>
  </BrowserRouter>
);

export default App;
