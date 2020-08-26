// Justin Edwards
// 08/26/2020
// Main app for todo list. 

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import './App.css';

import * as Firestore from './components/Firestore'

const styles = {
  
}

function App(props) {

  const { classes } = props;

  // // testing addTodo query and async await
  // Firestore.addtodo("test adding todo").then(() => {
  //   // testing getAllTodos query
  //   Firestore.getAllTodos().then(allTodos => {
  //     allTodos.forEach(doc => {
  //       var todo = doc.data();
  //       console.log(todo.body);
  //     })
  //   })
  // })

  // // testing updateTodoBody and async await
  // Firestore.updateTodoBody("Gql2YEfpeRa8tJ8Orgsw", "testing update new body").then(() => {
  //   Firestore.getAllTodos().then(allTodos => {
  //     allTodos.forEach(doc => {
  //       var todo = doc.data();
  //       console.log(todo.body);
  //     })
  //   })
  // })

  // // testing updateTodoStatus and async await
  // Firestore.updateTodoStatus("Gql2YEfpeRa8tJ8Orgsw", "completed").then(() => {
  //   Firestore.getAllTodos().then(allTodos => {
  //     allTodos.forEach(doc => {
  //       var todo = doc.data();
  //       console.log(todo.status);
  //     })
  //   })
  // })

  // // testing deleteTodo and async await
  // Firestore.deleteTodo("Gql2YEfpeRa8tJ8Orgsw").then(() => {
  //   Firestore.getAllTodos().then(allTodos => {
  //     allTodos.forEach(doc => {
  //       var todo = doc.data();
  //       console.log(todo.status);
  //     })
  //   })
  // })

  return (
    <div className={classes.container}>
      Main app
    </div>
  );
}

export default withStyles(styles)(App);
