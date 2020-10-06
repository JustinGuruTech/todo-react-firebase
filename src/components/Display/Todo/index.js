/* Justin Edwards
 * 08/26/2020
 * V2 - 09/14/2020 - Moved to it's own component separate from App.js
 * Main Component for todo list - Entire todo list with children.
 * AddToDo component used for adding a new todo (surprise).
 * Maps todo list to SingleToDo items passing in relevant information. Uses
 * Firestore/index.js functions for database connectivity
 */

/* #region IMPORTS */
import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Link,
  CircularProgress,
  Typography,
  Divider,
  withStyles,
} from "@material-ui/core";
import { Check, SyncProblem } from "@material-ui/icons";

import AddToDo from "../AddToDo";
import SingleToDo from "../SingleToDo";
import * as Firestore from "../../Firestore";
// import { useAuthDataContext } from '../../AuthDataProvider';
/* #endregion */

/* #region STYLES */
const styles = (theme) => ({
  background: {
    marginTop: 50,
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "white",
  },
  toolbar: {
    height: 64,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#4e8fef",
    borderBottom: "2px solid #d9ecff",
  },
  todoTitleContainer: {
    marginBottom: 15,
  },
  todoTitle: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Inter",
  },
  syncSpan: {
    display: "flex",
    color: "#048004",
    justifyContent: "center",
    paddingBottom: 10,
  },
  syncSpanLoading: {
    display: "flex",
    color: "#4949c3",
    justifyContent: "center",
    paddingBottom: 10,
  },
  syncSpanError: {
    display: "flex",
    color: "#bb2b2b",
    justifyContent: "center",
    paddingBottom: 10,
  },
  syncText: {
    marginRight: 5,
    lineHeight: "27px",
  },
  tryAgainText: {
    marginLeft: 5,
    marginRight: 5,
    lineHeight: "27px",
  },
  syncLoadSymbol: {
    marginTop: 3,
  },
  todoList: {
    marginTop: 12,
    minHeight: 600,
  },
  mainTodoContainer: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px), linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px",
    backgroundColor: "#708090",
    backgroundSize: "64px 128px",
    paddingBottom: 50,
  },
  verticalFlex: {
    display: "flex",
    flexDirection: "column",
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
    boxSizing: "initial",
  },
  filterButton: {
    backgroundColor: "#d2d2d2",
    height: 42,
    width: "32%",
    "&:hover": {
      backgroundColor: "#b2b2b2",
    },
  },
  filterButtonSelected: {
    backgroundColor: "#303030",
    color: "white",
    height: 42,
    width: "32%",
    "&:hover": {
      backgroundColor: "#606060",
    },
  },
  filterButtons: {
    display: "flex",
    backgroundColor: "#ffffff00",
    justifyContent: "space-between",
    marginTop: 10,
  },
  noTasks: {
    fontSize: 24,
    textAlign: "center",
    color: "#66b9e2",
  },
  todoLoading: {
    display: "inherit",
    margin: "auto",
    position: "relative",
    top: "20px",
  },
});
/* #endregion */

function Todo(props) {
  /* #region PROPS/HOOKS */
  const { setActiveTodoList } = props;
  const { activeTodoList, classes } = props;
  // state hooks
  const [todoList, setTodoList] = useState({ id: -1 }); // stores todo list synced with db
  const [filterSelected, setFilterSelected] = useState("all"); // reflects which filter button is active
  const [loaded, setLoaded] = useState(false); // set to true after initial load from db
  const [synced, setSynced] = useState(false); // set to false in between pressing add and updating db
  const [syncError, setSyncError] = useState(""); // for when sync fails
  /* #endregion */

  /* #region SYNCING */
  // reset syncError when synced changes to true
  useEffect(() => {
    if (synced === true) {
      setSyncError("");
    }
  }, [synced]);

  // function for when user tries to resync after sync error
  function handleResync() {
    addTodosToState();
  }
  /* #endregion */

  /* #region TODO DISPLAY POPULATION */
  // update when active todo list in TodoPage changes
  useEffect(() => {
    // add todos to state
    addTodosToState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTodoList]);

  // add todos to state from activeTodoList in TodoPage
  function addTodosToState() {
    // check if active todo list is actual list (check id)
    if (activeTodoList.id !== -1) {
      // this checks if the todos have already been fetched from the db. If they haven't,
      // the todos length will be 1 (dummy todo) and that "todo" will have an id of -1
      if (
        activeTodoList.todos.length !== 0 &&
        activeTodoList.todos[0].id === -1
      ) {
        // set todo list to active todo list
        Firestore.getAllTodosFromListById(activeTodoList.id).then(
          (allTodos) => {
            // map todos into array of objects
            let todos = [];
            allTodos.forEach((doc) => {
              let todo = doc.data();
              // add date from db if exists
              if (todo.dueDate !== undefined && todo.dueDate !== "none") {
                try {
                  todo.dueDate = todo.dueDate.toDate();
                } catch (error) {
                  todo.dueDate = "none";
                }
              } else {
                todo.dueDate = "none";
              }
              // add empty description if doesn't exist
              if (todo.description === undefined) {
                todo.description = "";
              }
              // add empty tags if no tags
              if (todo.tags === undefined) {
                todo.tags = [];
              }
              todo.id = doc.id;
              todos.push(todo);
            });
            // sort by timestamp
            todos.sort((a, b) => (a.created > b.created ? 1 : -1));
            let tempList = activeTodoList; // store tempList from state
            tempList.todos = todos; // add todos to tempList
            setTodoList(tempList); // set todos in state
          }
        );
        // if todo list has already been set, use the one in TodoPage
      } else {
        console.log("Local list used.");
        setTodoList(activeTodoList);
      }
    }
  }
  // when todoList updates
  useEffect(() => {
    // check if actual todoList with valid id
    if (todoList.id !== -1) {
      setLoaded(true);
      setSynced(true);
    }
  }, [todoList]);
  /* #endregion */

  /* #region REMOVE TODO */
  // function to remove a todo item based on it's id
  function removeTodoById(id) {
    let tempTodoList = todoList;
    // find todo with id that needs to be deleted and remove it
    tempTodoList.todos = tempTodoList.todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(tempTodoList);
  }
  /* #endregion */

  /* #region UPDATE TODO */
  // finds the todo in the todoList hook and updates it's values
  function updateLocalTodo(newTodo) {
    let tempTodoList = todoList;
    // find todo with id that needs to be updated and update it
    tempTodoList.todos = tempTodoList.todos.filter((todo) => {
      if (todo.id === newTodo.id) {
        todo.body = newTodo.body;
        todo.status = newTodo.status;
        todo.description = newTodo.description;
        todo.dueDate = newTodo.dueDate;
        return newTodo;
      }
      return todo;
    });
    setActiveTodoList(tempTodoList);
  }
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <Paper elevation={0} className={classes.background}>
      <div className={classes.mainTodoContainer}>
        <Paper elevation={3} className={classes.todoContainer}>
          {/* SYNC INFO DISPLAY */}
          {syncError === "" ? (
            synced ? (
              <span className={classes.syncSpan} data-testid="synced-icon">
                <Typography className={classes.syncText}>Synced</Typography>
                <Check size={10} />
              </span>
            ) : (
              <span
                className={classes.syncSpanLoading}
                data-testid="syncing-icon"
              >
                <Typography className={classes.syncText}>Syncing</Typography>
                <CircularProgress
                  className={classes.syncLoadSymbol}
                  size={17}
                />
              </span>
            )
          ) : (
            <span className={classes.syncSpanError}>
              <Typography className={classes.syncText}>{syncError}</Typography>
              <SyncProblem size={10} />
              <Link onClick={handleResync} className={classes.tryAgainText}>
                Resync
              </Link>
            </span>
          )}
          <div className={classes.todoTitleContainer}>
            <Divider />
            <Typography className={classes.todoTitle}>
              {todoList.name}
            </Typography>
            <Divider />
          </div>
          {/* ADD TODO COMPONENT */}
          <AddToDo
            todoList={todoList}
            setSynced={setSynced}
            synced={synced}
            setSyncError={setSyncError}
            activeTodoList={activeTodoList}
            snackbarMessage={props.snackbarMessage}
            setSnackbarMessage={props.setSnackbarMessage}
          />
          {/* FILTER BUTTONS */}
          <Paper elevation={0} className={classes.filterButtons}>
            <Button
              className={
                filterSelected === "all"
                  ? (classes.filterButton, classes.filterButtonSelected)
                  : classes.filterButton
              }
              onClick={(e) => setFilterSelected("all")}
              aria-label="Show all tasks"
            >
              Show All
            </Button>
            <Button
              className={
                filterSelected === "pending"
                  ? (classes.filterButton, classes.filterButtonSelected)
                  : classes.filterButton
              }
              onClick={(e) => setFilterSelected("pending")}
              aria-label="Show pending tasks"
            >
              Pending
            </Button>
            <Button
              className={
                filterSelected === "completed"
                  ? (classes.filterButton, classes.filterButtonSelected)
                  : classes.filterButton
              }
              onClick={(e) => setFilterSelected("completed")}
              aria-label="Show completed tasks"
            >
              Completed
            </Button>
          </Paper>
          {/* LIST OF TODOS*/}
          <Paper
            elevation={1}
            className={classes.todoList}
            aria-label="Task Container"
          >
            <div data-testid="todo-list">
              {loaded ? (
                todoList.todos.length === 0 ? (
                  <Typography className={classes.noTasks}>
                    No tasks yet
                  </Typography>
                ) : (
                  todoList.todos.map((todo) => {
                    // map all if filter set to all
                    if (filterSelected === "all") {
                      return (
                        <SingleToDo
                          key={todo.id}
                          listId={todoList.id}
                          body={todo.body}
                          status={todo.status}
                          dueDate={todo.dueDate}
                          id={todo.id}
                          description={todo.description}
                          color={activeTodoList.color}
                          removeTodoById={removeTodoById}
                          setSynced={setSynced}
                          setSyncError={setSyncError}
                          updateLocalTodo={updateLocalTodo}
                          snackbarMessage={props.snackbarMessage}
                          setSnackbarMessage={props.setSnackbarMessage}
                        ></SingleToDo>
                      );
                      // map only those with status pending
                    } else if (filterSelected === "pending") {
                      if (todo.status === "pending") {
                        return (
                          <SingleToDo
                            key={todo.id}
                            listId={todoList.id}
                            body={todo.body}
                            status={todo.status}
                            dueDate={todo.dueDate}
                            id={todo.id}
                            description={todo.description}
                            color={activeTodoList.color}
                            removeTodoById={removeTodoById}
                            setSynced={setSynced}
                            setSyncError={setSyncError}
                            updateLocalTodo={updateLocalTodo}
                            snackbarMessage={props.snackbarMessage}
                            setSnackbarMessage={props.setSnackbarMessage}
                          ></SingleToDo>
                        );
                      }
                      // map only those with status completed
                    } else if (filterSelected === "completed") {
                      if (todo.status === "completed") {
                        return (
                          <SingleToDo
                            key={todo.id}
                            listId={todoList.id}
                            body={todo.body}
                            status={todo.status}
                            dueDate={todo.dueDate}
                            id={todo.id}
                            description={todo.description}
                            color={activeTodoList.color}
                            removeTodoById={removeTodoById}
                            setSynced={setSynced}
                            setSyncError={setSyncError}
                            updateLocalTodo={updateLocalTodo}
                            snackbarMessage={props.snackbarMessage}
                            setSnackbarMessage={props.setSnackbarMessage}
                          ></SingleToDo>
                        );
                      }
                    }
                    return null;
                    /* Loading circle for list */
                  })
                )
              ) : (
                <div>
                  <CircularProgress
                    data-testid="load-symbol"
                    className={classes.todoLoading}
                    size={80}
                  />
                </div>
              )}
            </div>
          </Paper>
        </Paper>
      </div>
    </Paper>
  );
  /* #endregion */
}

export default withStyles(styles)(Todo);
