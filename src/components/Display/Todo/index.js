/* Justin Edwards
 * 08/26/2020
 * V2 - 09/14/2020 - Moved to it's own component separate from App.js
 * Main Component for todo list - Entire todo list with children.
 * AddToDo component used for adding a new todo (surprise).
 * Maps todo list to SingleToDo items passing in relevant information. Uses
 * Firestore/index.js functions for database connectivity
 */

import React, { useState, useEffect } from 'react';
import {
    Paper, Button, Link, CircularProgress, Typography, 
    withStyles } from '@material-ui/core';
import { Check, SyncProblem } from '@material-ui/icons';

import AddToDo from '../AddToDo';
import SingleToDo from '../SingleToDo';
import NavBar from '../NavBar';
import * as Firestore from '../../Firestore';
// import { useAuthDataContext } from '../../AuthDataProvider';

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
    syncSpanError: {
        display: "flex",
        color: "#e63939",
        justifyContent: "center",
        paddingBottom: 10
    },
    syncText: {
        marginRight: 5,
        lineHeight: "27px"
    },
    tryAgainText: {
        marginLeft: 5,
        marginRight: 5,
        lineHeight: "27px"
    },
    syncLoadSymbol: {
        marginTop: 3
    },
    todoList: {
        marginTop: 20,
        minHeight: 600
    },
    mainTodoContainer: {
        minHeight: "100%",
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

function Todo(props) {

    /* #region firestore query testing */
    // // testing addTodo query and async await
    // Firestore.addTodo("test adding todo").then(() => {
    //   // testing getAllTodos query
    //   Firestore.getAllTodos().then(allTodos => {
    //     allTodos.forEach(doc => {
    //       let todo = doc.data();
    //       console.log(todo.body);
    //     })
    //   })
    // })

    // // testing updateTodoBody and async await
    // Firestore.updateTodoBody("Gql2YEfpeRa8tJ8Orgsw", "testing update new body").then(() => {
    //   Firestore.getAllTodos().then(allTodos => {
    //     allTodos.forEach(doc => {
    //       let todo = doc.data();
    //       console.log(todo.body);
    //     })
    //   })
    // })

    // // testing updateTodoStatus and async await
    // Firestore.updateTodoStatus("Gql2YEfpeRa8tJ8Orgsw", "completed").then(() => {
    //   Firestore.getAllTodos().then(allTodos => {
    //     allTodos.forEach(doc => {
    //       let todo = doc.data();
    //       console.log(todo.status);
    //     })
    //   })
    // })

    // // testing deleteTodo and async await
    // Firestore.deleteTodo("Gql2YEfpeRa8tJ8Orgsw").then(() => {
    //   Firestore.getAllTodos().then(allTodos => {
    //     allTodos.forEach(doc => {
    //       let todo = doc.data();
    //       console.log(todo.status);
    //     })
    //   })
    // })
    /* #endregion */

    const { classes } = props;
    // state hooks
    const [todoList, setTodoList] = useState([]); // stores todo list synced with db
    const [filterSelected, setFilterSelected] = useState("all");  // reflects which filter button is active
    const [editing, setEditing] = useState(false);  // reflects whether one of SingleToDo is being edited
    const [loaded, setLoaded] = useState(false);  // set to true after initial load from db
    const [synced, setSynced] = useState(false); // set to false in between pressing add and updating db
    const [syncError, setSyncError] = useState("");  // for when sync fails

    // run once on startup
    useEffect(() => {
        // load todo list from db then setLoaded to hide loading circle
        addTodosToState().then(() => {
            setLoaded(true);  // initial load complete
            setSynced(true);  // done syncing
        })
            // set sync error if loading todos from db fails
            .catch((error) => {
                setSyncError(error);
            });
    }, []);

    // reset syncError when synced changes to true
    useEffect(() => {
        if (synced === true) {
            setSyncError("");
        }
    }, [synced])

    // get all todos from db and store in todoList hook
    async function addTodosToState() {
        let setRef = await Firestore.getAllTodos().then(allTodos => {
            let todos = []; // stores parsed todos
            // for each doc, get data and push to todos
            allTodos.forEach(doc => {
                let todo = doc.data();
                todo.id = doc.id;
                todos.push(todo);
            })
            // sort list by timestamp
            todos.sort((a, b) => (a.created > b.created) ? 1 : -1)
            setTodoList(todos); // add todos to hook
        })
        return setRef;
    }

    // function for when user tries to resync after sync error
    function handleResync() {
        // refetch todo items
        addTodosToState().then(() => {
            setSynced(true);
        })
            // set sync error if loading todos from db fails
            .catch((error) => {
                setSyncError(error);
            });
    }

    // function to remove a todo item based on it's id
    function removeTodoById(id) {
        // TODO: do some neat animation
        setTodoList(todoList.filter(todo => {
            return todo.id !== id;
        }))
    }

    // finds the todo in the todoList hook and updates it's values
    function updateLocalTodo(newTodo) {
        setTodoList(todoList.filter(todo => {
            if (todo.id === newTodo.id) {
                todo.body = newTodo.body;
                todo.status = newTodo.status;
                return newTodo;
            }
            return todo;
        }));
    }

    return (
        <Paper elevation={0}
            className={classes.background}>
            {/* AppBar - Main Header */}
            <NavBar />
            <div className={classes.mainTodoContainer}>
                <Paper elevation={3} className={classes.todoContainer}>
                    {/* Sync Information Display */}
                    {syncError === "" ? (synced ?
                        <span className={classes.syncSpan} data-testid="synced-icon">
                            <Typography className={classes.syncText}>Synced</Typography>
                            <Check size={10} />
                        </span> :
                        <span className={classes.syncSpanLoading} data-testid="syncing-icon">
                            <Typography className={classes.syncText}>Syncing</Typography>
                            <CircularProgress className={classes.syncLoadSymbol} size={17} />
                        </span>) :
                        <span className={classes.syncSpanError}>
                            <Typography className={classes.syncText}>{syncError}</Typography>
                            <SyncProblem size={10} />
                            <Link onClick={handleResync} className={classes.tryAgainText}>Resync</Link>
                        </span>}
                    {/* Add Todos */}
                    <AddToDo todoList={todoList} setSynced={setSynced} synced={synced} setSyncError={setSyncError} />
                    {/* Filter Buttons */}
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
                    {/* Actual todo list */}
                    <Paper elevation={1} className={classes.todoList} aria-label="Task Container">
                        <div data-testid="todo-list">
                            {loaded ? (todoList.length === 0 ? <Typography className={classes.noTasks}>No tasks yet</Typography> : todoList.map(todo => {
                                // map all if filter set to all
                                if (filterSelected === "all") {
                                    return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id}
                                        refresh={addTodosToState} removeTodoById={removeTodoById} setEditing={setEditing}
                                        todoEditing={editing} setSynced={setSynced} setSyncError={setSyncError}
                                        updateLocalTodo={updateLocalTodo}></SingleToDo>
                                    // map only those with status pending
                                } else if (filterSelected === "pending") {
                                    if (todo.status === "pending") {
                                        return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id}
                                            refresh={addTodosToState} removeTodoById={removeTodoById} setEditing={setEditing}
                                            todoEditing={editing} setSynced={setSynced} setSyncError={setSyncError}
                                            updateLocalTodo={updateLocalTodo}></SingleToDo>
                                    }
                                    // map only those with status completed
                                } else if (filterSelected === "completed") {
                                    if (todo.status === "completed") {
                                        return <SingleToDo key={todo.id} body={todo.body} status={todo.status} id={todo.id}
                                            refresh={addTodosToState} removeTodoById={removeTodoById} setEditing={setEditing}
                                            todoEditing={editing} setSynced={setSynced} setSyncError={setSyncError}
                                            updateLocalTodo={updateLocalTodo}></SingleToDo>
                                    }
                                }
                                return null;
                                /* Loading circle for list */
                            })) : <div><CircularProgress data-testid="load-symbol" className={classes.todoLoading} size={80} /></div>}
                        </div>
                    </Paper>
                </Paper>
            </div>
        </Paper>
    );
};

export default withStyles(styles)(Todo);
