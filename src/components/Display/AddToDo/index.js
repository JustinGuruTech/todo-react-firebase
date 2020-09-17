/* Justin Edwards
 * 09/10/2020
 * Add todo component - Moved to it's own component so it
 * can re-render on it's own during input without re-rendering
 * the entire todo list. Contains text input and add button, 
 * synced, setSynced, and todoList passed in from App.js
 */

import React, { useState } from 'react';

import { Button, Paper, TextField, withStyles } from '@material-ui/core';

import * as Firestore from '../../Firestore'

const styles = {
    searchFlex: {
        backgroundColor: "#ffffff00",
        display: "flex",
        justifyContent: "space-between"
    },
    addText: {
        width: "72%",
        height: 55,
        color: "white"
    },
    addTextBG: {
        backgroundColor: "white"
    },
    addButton: {
        width: "25%",
        height: 55,
        backgroundColor: "#9dcef7",
        border: "1px solid #929292",
        color: "252525"
    },

}

function AddToDo(props) {

    const { setSynced, todoList, synced, classes } = props
    const [todoInput, setTodoInput] = useState(""); // stores new todo input

    // set react hook val on text change
    function handleTextInput(e) {
        setTodoInput(e.target.value);
    }

    function handleAddItem() {
        // make sure input isn't empty
        if (todoInput !== "") {
            setSynced(false);  // show syncing symbol
            // add todo locally while syncing with db
            let todo = {
                body: todoInput,
                status: "pending",
                created: Firestore.getCurrentTimestamp(), // get firestore db timestamp
                id: -1  // temporarily set id to -1
            }
            todoList.push(todo);
            // add todo to db then update todo list from db
            Firestore.addTodo(todoInput, todo.created).then(docRef => {
                todo.id = docRef.id;  // set correct id of todo
                setTodoInput(""); // reset todo input
                setSynced(true);  // now synced
            })
                // catch error from Firestore function and set syncError
                .catch((error) => {
                    props.setSyncError(error);
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
        <Paper elevation={0} className={classes.searchFlex}>
            {/* Text input */}
            <TextField variant="outlined" className={classes.addText} placeholder="Add a todo..."
                onChange={handleTextInput} value={todoInput} aria-label="Type Todo" disabled={!synced}
                onKeyDown={handleEnterAdd} data-testid="todo-input"
                InputProps={{
                    className: classes.addTextBG
                }}>
            </TextField>
            {/* Add button */}
            <Button className={classes.addButton} data-testid="add-button"
                onClick={handleAddItem} aria-label="Add Typed Todo">Add</Button>
        </Paper>
    );
}

export default withStyles(styles)(AddToDo);