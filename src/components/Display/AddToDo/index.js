/* Justin Edwards
 * 09/10/2020
 * Add todo component - Moved to it's own component so it
 * can re-render on it's own during input without re-rendering
 * the entire todo list. Contains text input and add button, 
 * synced, setSynced, and todoList passed in from App.js
 */

import React, { useState } from 'react';

import {
    Dialog, DialogContent, DialogActions,
    Button, Paper, TextField, IconButton,
    Tooltip, Snackbar, withStyles
} from '@material-ui/core';
import {
    PlaylistAdd as PlaylistAddIcon,
    Close as CloseIcon
} from '@material-ui/icons';

import DetailedAddToDo from '../DetailedAddToDo';

import * as Firestore from '../../Firestore'

const styles = {
    inputDateFlex: {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter"
    },
    textInput: {
        fontFamily: "Inter",
        width: "73%"
    },
    searchFlex: {
        backgroundColor: "#ffffff00",
        display: "flex",
        justifyContent: "space-between"
    },
    addText: {
        width: "72%",
        height: 55,
        color: "white",
        fontFamily: "Inter"
    },
    addTextBG: {
        backgroundColor: "white",
    },
    addTextInput: {
        padding: "12px 10px"
    },
    addIconButton: {
        padding: 5,
        color: "#303030"
    },
    addIcon: {
        fontSize: 30
    },
    endAdornment: {
        paddingRight: 0
    },
    addButton: {
        width: "25%",
        backgroundColor: "#303030",
        border: "1px solid #929292",
        color: "white",
        '&:hover': {
            backgroundColor: "#606060"
        }
    },

}

function AddToDo(props) {

    // prop functions
    const { setSynced, setSyncError } = props;
    // prop attributes
    const { todoList, synced, classes } = props
    const [todoInput, setTodoInput] = useState(""); // stores new todo input

    // DetailedAddTodo hooks
    const [detailedAddOpen, setDetailedAddOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [todoDueDate, setTodoDueDate] = useState("none");
    const [tags, setTags] = useState([]);

    const [addedSnackbarOpen, setAddedSnackbarOpen] = useState(false);

    function handleSnackbarClose() {
        setAddedSnackbarOpen(false);
    }

    function handleDetailedAddButton() {
        // console.log("test");
        setDetailedAddOpen(true);
    }

    function handleDetailedAddClose() {
        setDetailedAddOpen(false);
    }

    // set react hook val on text change
    function handleTodoInput(e) {
        setTodoInput(e.target.value);
    }
    // DETAILED ADD TODO INPUT HANDLERS
    // for long description of todo
    function handleDescriptionInput(e) {
        setDescription(e.target.value);
    }
    // for date of todo
    function handleDateInput({ target }) {
        // take date string and turn it into date object
        setTodoDueDate(new Date(target.value));
    }
    // for adding a tag (when tags are implemented)
    function handleTagsAdded() {
        console.log("tag totally added");
    }

    function clearInputs() {
        setTodoInput("");
        setDescription("");
        setTodoDueDate("none");
        setTags([]);
    }

    async function handleAddItem() {
        // make sure input isn't empty
        if (todoInput !== "") {
            setSynced(false);  // show syncing symbol
            // add todo locally while syncing with db
            let todo = {
                body: todoInput,
                status: "pending",
                description: description,
                dueDate: todoDueDate,
                tags: tags,
                created: Firestore.getCurrentTimestamp(), // get firestore db timestamp
                id: -1  // temporarily set id to -1
            }
            todoList.todos.push(todo);

            // clear inputs
            // clearInputs();
            // open snackbar
            // TODO
            // close detailed todo form
            setDetailedAddOpen(false);
            setAddedSnackbarOpen(true);

            // add basic todo to db with required fields
            Firestore.addTodoToListById(todoList.id, todo.body, todo.created).then(docRef => {
                todo.id = docRef.id;  // set correct id of todo
                clearInputs();
                // setTodoInput(""); // reset todo input
                // setSynced(true);  // now synced
            })
                // after adding basic fields, check if need to add extra fields
                .then(() => {
                    // wait for all 3 to resolve 
                    Promise.all(
                        [todo.description !== "" ? Firestore.setTodoDescriptionByListId(todoList.id, todo.id, todo.description) : '',
                        todo.tags.length > 0 ? Firestore.setTodoTagsByListId(todoList.id, todo.id, todo.tags) : ''],
                        todo.dueDate !== "none" ? Firestore.setTodoDateByListId(todoList.id, todo.id, todo.dueDate) : '')
                        .then(() => {
                            setSynced(true);
                        })
                        .catch(error => {
                            console.log("error: ", error);
                        })
                    // // if description, write to db
                    // if (todo.description !== "") {
                    //     Firestore.setTodoDescriptionByListId(todoList.id, todo.id, todo.description)
                    //     .catch(error => {
                    //         console.log(error);
                    //     })
                    // }
                    // // if tags, write to db
                    // if (todo.tags.length > 0) {
                    //     Firestore.setTodoTagsByListId(todoList.id, todo.id, todo.tags)
                    //     .catch(error => {
                    //         console.log(error);
                    //     })
                    // }
                    // // if dueDate, write to db
                    // if (todo.dueDate !== "none") {
                    //     Firestore.setTodoDateByListId(todoList.id, todo.id, todo.dueDate)
                    //     .catch(error => {
                    //         console.log(error);
                    //     })
                    // }
                })
                // catch error from Firestore function and set syncError
                .catch((error) => {
                    setSyncError(error);
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
        <div>
            <div>
                {/* LIST ADDED NOTIFICATION/SNACKBAR */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={addedSnackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                    message={"Todo Added!"}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
            <Paper elevation={0} className={classes.searchFlex}>
                {/* <div className={classes.inputDateFlex}> */}
                {/* TEXT INPUT */}
                <TextField variant="outlined" placeholder="Add a todo..."
                    onChange={handleTodoInput} value={todoInput} aria-label="Type Todo" disabled={!synced}
                    onKeyDown={handleEnterAdd} data-testid="todo-input" className={classes.textInput}
                    InputProps={{
                        className: classes.addTextBG,
                        endAdornment: (<Tooltip title="More Options">
                            <IconButton className={classes.addIconButton}
                                onClick={handleDetailedAddButton}>
                                <PlaylistAddIcon className={classes.addIcon} />
                            </IconButton>
                        </Tooltip>),
                        classes: {
                            adornedEnd: classes.endAdornment
                        }
                    }}
                    inputProps={{
                        className: classes.addTextInput
                    }}>
                </TextField>
                {/* DATE INPUT */}

                {/* </div> */}
                {/* ADD BUTTON */}
                <Button className={classes.addButton} data-testid="add-button"
                    onClick={handleAddItem} aria-label="Add Typed Todo">Add</Button>
            </Paper>
            {/* ADD DETAILED TODO FORM POPUP */}
            <Dialog border={2} open={detailedAddOpen} aria-labelledby="form-dialog-title"
                PaperProps={{ className: classes.todoDialogPaper }}>
                <div className={classes.overflow}>
                    <DialogContent className={classes.overflow}>
                        <DetailedAddToDo handleDetailedAddButton={handleDetailedAddButton}
                            color={props.activeTodoList.color} handleBodyInput={handleTodoInput}
                            todoInput={todoInput} handleDescriptionInput={handleDescriptionInput}
                            handleDateInput={handleDateInput} handleSaveItem={handleAddItem} />
                    </DialogContent>
                    <DialogActions>
                        <Button onMouseDown={handleDetailedAddClose} className={classes.cancelButton}>
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(AddToDo);