// Justin Edwards
// 08/26/2020
// Main app for todo list. 

import React, { useState, useEffect } from 'react';
import { Paper, Button, TextField, AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import './App.css';
import SingleToDo from './components/SingleToDo';

import * as Firestore from './components/Firestore'

const styles = {
  background: {
    padding: 0,
    margin: 0,
    backgroundColor: "white"
  },
  toolbar: {
    height: 64,
    display: "flex",
    justifyContent: "center"
  },
  addText: {
    width: "72%",
    height: 55
  },
  todoList: {
    marginTop: 20,
    width: 500,
    minHeight: 600
  },
  mainTodoContainer: {
    display: "flex",
    justifyContent: "center"
  },
  verticalFlex: {
    display: "flex",
    flexDirection: "column"
  },
  todoContainer: {
    backgroundColor: "#eaeaea78",
    marginTop: 40,
    padding: 40,
    width: 500,
    minWidth: "40%",
    maxWidth: 500,
  }, 
  searchFlex: {
    backgroundColor: "#ffffff00",
    display: "flex",
    justifyContent: "space-between"
  },
  addButton: {
    width: "25%",
    height: 55,
    backgroundColor: "#9dcef7",
    border: "1px solid #929292",
    color: "252525"
  },
  filterButton: {
    backgroundColor: "#d2d2d2",
    height: 55,
    width: "32%"
  },
  filterButtonSelected: {
    backgroundColor: "#3bce4d",
    height: 55,
    width: "32%"
  },
  filterButtons: {
    display: "flex",
    backgroundColor: "#ffffff00",
    justifyContent: "space-between",
    marginTop: 20
  }
}

function App(props) {

  /* #region firestore query testing */
  // // testing addTodo query and async await
  // Firestore.addTodo("test adding todo").then(() => {
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
  /* #endregion */

  const { classes } = props;
  // state hooks
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filterSelected, setFilterSelected] = useState("all");

  // run once on startup
  useEffect(() => {
    addTodosToState();
  }, []);

  // get all todos from db and store in todoList hook
  function addTodosToState() {
    Firestore.getAllTodos().then(allTodos => {
      var todos = []; // stores parsed todos
      // for each doc, get data and push to todos
      allTodos.forEach(doc => {
        var todo = doc.data();
        todo.id = doc.id;
        todos.push(todo);
      })
      // console.log(todos);
      // todos.sort();
      // console.log(todos);
      setTodoList(todos); // add todos to hook
    })
  }

  // set react hook val on text change
  function handleTextInput(e) {
    setTodoInput(e.target.value);
  }

  function handleAddItem() {
    // make sure input isn't empty
    if (todoInput != "") {
      Firestore.addTodo(todoInput).then(() => {
        setTodoInput("");
        addTodosToState();
      })
    // TODO: Show error on invalid input
    } else {
      console.log("invalid")
    }
  }

  // set filter applied 
  function filterButtonHandler(value) {
    setFilterSelected(value);
  }

  return (
    <Paper elevation={0}
    className={classes.background}>
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Toolbar className={classes.toolbar}>
          <Typography color="inherit" variant="h4">To-Do</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainTodoContainer}>
        <Paper elevation={3} className={classes.todoContainer}>
          <Paper elevation={0} className={classes.searchFlex}>
            <TextField variant="outlined" className={classes.addText} placeholder="Add a todo..."
            onChange={handleTextInput} value={todoInput}>
            </TextField>
            <Button className={classes.addButton}
            onClick={handleAddItem}>Add</Button>
          </Paper>
          <Paper elevation={0} className={classes.filterButtons}>
            <Button className={filterSelected === "all" ? (classes.filterButton, classes.filterButtonSelected) : classes.filterButton}
            onClick={e => filterButtonHandler("all")}
            >Show All</Button>
            <Button className={filterSelected === "pending" ? (classes.filterButton, classes.filterButtonSelected) : classes.filterButton}
            onClick={e => filterButtonHandler("pending")}
            >Pending</Button>
            <Button className={filterSelected === "completed" ? (classes.filterButton, classes.filterButtonSelected) : classes.filterButton}
            onClick={e => filterButtonHandler("completed")}
            >Completed</Button>
          </Paper>
          <Paper elevation={1} className={classes.todoList}>
            {todoList.map(todo => {
              return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id}></SingleToDo>
            })}
          </Paper>
        </Paper>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(App);
