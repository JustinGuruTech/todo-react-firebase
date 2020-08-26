// Justin Edwards
// 08/26/2020
// Main app for todo list. 

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import './App.css';

const styles = {
  
}

function App(props) {

  const { classes } = props;

  return (
    <div className={classes.container}>
      Main app
    </div>
  );
}

export default withStyles(styles)(App);
