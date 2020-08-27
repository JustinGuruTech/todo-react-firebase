// Justin Edwards
// 08/26/2020
// Main app for todo list. 

import React, { useState, useEffect } from 'react';
import { Paper, Button, TextField, AppBar, Toolbar, 
        CircularProgress, Typography, withStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import SingleToDo from './components/SingleToDo';
import * as Firestore from './components/Firestore'

const styles = {
  background: {
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "white"
  },
  toolbar: {
    height: 64,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#4e8fef",
    borderBottom: "2px solid #d9ecff"
  },
  syncSpan: {
    display: "flex",
    color: "#5ad85a",
    justifyContent: "center",
    paddingBottom: 10
  },
  syncSpanLoading: {
    display: "flex",
    color: "#4949c3",
    justifyContent: "center",
    paddingBottom: 10
  },
  syncText: {
    marginRight: 5,
    lineHeight: "27px"
  },
  syncLoadSymbol: {
    marginTop: 3
  },
  addText: {
    width: "72%",
    height: 55,
    color: "white"
  },
  addTextBG: {
    backgroundColor: "white"
  },
  todoList: {
    marginTop: 20,
    minHeight: 600
  },
  mainTodoContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px), linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px",
    backgroundColor: "#708090",
    backgroundSize: "64px 128px",
    paddingBottom: 50
  },
  verticalFlex: {
    display: "flex",
    flexDirection: "column"
  },
  todoContainer: {
    margin: "auto",
    backgroundColor: "#e2e2e2",
    marginTop: 40,
    padding: 40,
    paddingTop: 15,
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
  },
  noTasks: {
    fontSize: 24,
    textAlign: "center",
    color: "#66b9e2"
  },
  todoLoading: {
    display: "inherit",
    margin: "auto",
    position: "relative",
    top: "20px"
  },
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
  const [todoInput, setTodoInput] = useState(""); // stores new todo input
  const [todoList, setTodoList] = useState([]); // stores todo list synced with db
  const [filterSelected, setFilterSelected] = useState("all");  // reflects which filter button is active
  const [editing, setEditing] = useState(false);  // reflects whether one of SingleToDo is being edited
  const [loaded, setLoaded] = useState(false);  // set to true after initial load from db
  const [synced, setSynced] = useState(false); // set to false in between pressing add and updating db

  // run once on startup
  useEffect(() => {
    // load todo list from db then setLoaded to hide loading circle
    addTodosToState().then(() => {
      setLoaded(true);  // initial load complete
      setSynced(true);  // done syncing
    });
  }, []);

  // get all todos from db and store in todoList hook
  async function addTodosToState() {
    let setRef = await Firestore.getAllTodos().then(allTodos => {
      var todos = []; // stores parsed todos
      // for each doc, get data and push to todos
      allTodos.forEach(doc => {
        var todo = doc.data();
        todo.id = doc.id;
        todos.push(todo);
      })
      // sort list by timestamp
      todos.sort((a, b) => (a.created > b.created) ? 1 : -1)
      setTodoList(todos); // add todos to hook
    })
    return setRef;
  }

  // set react hook val on text change
  function handleTextInput(e) {
    setTodoInput(e.target.value);
  }

  function handleAddItem() {
    // make sure input isn't empty
    if (todoInput !== "") {
      setSynced(false);  // show syncing symbol
      // add todo locally while syncing with db
      var todo = {
        body: todoInput,
        status: "pending",
        created: Number.MAX_SAFE_INTEGER,
        id: -1
      }
      todoList.push(todo);
      // add todo to db then update todo list from db
      Firestore.addTodo(todoInput).then(() => {
        addTodosToState().then(() => {
          setTodoInput(""); // clear input
          setSynced(true); // hide syncing symbol
        });
      })
    }
  }

  // enter key functionality for add item
  function handleEnterAdd(e) {
    if (e.keyCode === 13) {
      handleAddItem();
    }
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
        {synced ? 
        <span className={classes.syncSpan}>
          <Typography className={classes.syncText}>Synced</Typography>
          <Check size={10}/>
        </span> :
        <span className={classes.syncSpanLoading}>
          <Typography className={classes.syncText}>Syncing</Typography>
          <CircularProgress className={classes.syncLoadSymbol} size={17}/>
        </span> }
          <Paper elevation={0} className={classes.searchFlex}>
            <TextField variant="outlined" className={classes.addText} placeholder="Add a todo..."
            onChange={handleTextInput} value={todoInput} aria-label="Type Todo" disabled={!synced}
            onKeyDown={handleEnterAdd}
            InputProps={{
              className: classes.addTextBG
            }}>
            </TextField>
            <Button className={classes.addButton}
            onClick={handleAddItem} aria-label="Add Typed Todo">Add</Button>
          </Paper>
          <Paper elevation={0} className={classes.filterButtons}>
            <Button className={filterSelected === "all" ? (classes.filterButton, classes.filterButtonSelected) : classes.filterButton}
            onClick={e => setFilterSelected("all")} aria-label="Show all tasks"
            >Show All</Button>
            <Button className={filterSelected === "pending" ? (classes.filterButton, classes.filterButtonSelected) : classes.filterButton}
            onClick={e => setFilterSelected("pending")} aria-label="Show pending tasks"
            >Pending</Button>
            <Button className={filterSelected === "completed" ? (classes.filterButton, classes.filterButtonSelected) : classes.filterButton}
            onClick={e => setFilterSelected("completed")} aria-label="Show completed tasks"
            >Completed</Button>
          </Paper>
          <Paper elevation={1} className={classes.todoList} aria-label="Task Container">
            {loaded ? (todoList.length === 0 ? <Typography className={classes.noTasks}>No tasks yet</Typography> : todoList.map(todo => {
              // map all if filter set to all
              if (filterSelected === "all") {
                return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id} 
              refresh={addTodosToState} setEditing={setEditing} todoEditing={editing} setSynced={setSynced}></SingleToDo>
              // map only those with status pending
              } else if (filterSelected === "pending") {
                if (todo.status === "pending") {
                  return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id} 
                  refresh={addTodosToState} setEditing={setEditing} todoEditing={editing} setSynced={setSynced}></SingleToDo>
                }
              // map only those with status completed
              } else if (filterSelected === "completed") {
                if (todo.status === "completed") {
                  return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id} 
                  refresh={addTodosToState} setEditing={setEditing} todoEditing={editing} setSynced={setSynced}></SingleToDo>
                }
              }
              return null;
            })) : <div><CircularProgress className={classes.todoLoading} size={80}/></div>}
          </Paper>
        </Paper>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(App);
