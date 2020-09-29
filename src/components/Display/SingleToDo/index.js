/* Justin Edwards
 * 08/26/2020
 * Single todo list component, handles events when user clicks on
 * anything within a single todo (check/edit/delete). Todo/index.js maps
 * items in todo to these components passing in relevant info.
 * Uses Firestore/index.js functions for database connectivity
 */

import React, { useState, useEffect, useRef } from 'react';

import {
    Button, Typography, Paper, Divider, Checkbox, TextField,
    IconButton, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, withStyles
} from '@material-ui/core';
import {
    RadioButtonUnchecked, RadioButtonChecked,
    DeleteOutlineOutlined, Edit, Done, QueryBuilder
} from '@material-ui/icons';

import * as Firestore from '../../Firestore'

import DetailedAddToDo from '../DetailedAddToDo';

const styles = {
    mainContainer: {
        width: "100%",
        minHeight: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    horizontalFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    leftFlex: {
        display: "flex",
        // justifyContent: "space-between",
        flex: 1
    },
    centeredDiv: {
        margin: "auto"
    },
    todoDateFlex: {
        display: "flex",
        flexDirection: "column",
        marginTop: 4,
        marginBottom: 4
    },
    dueDate: {
        fontSize: ".7rem",
        fontFamily: "Inter"
    },
    timeRemaining: {
        fontSize: 14,
        position: 'relative',
        top: 3,
        left: 2
    },
    bodyLabel: {
        lineHeight: "20px",
        margin: 0,
        fontFamily: "Inter"
    },
    bodyLabelCompleted: {
        lineHeight: "20px",
        margin: 0,
        textDecoration: "line-through",
        fontFamily: "Inter"
    },
    trashIcon: {
        color: "#bb2b2b"
    },
    editIcon: {
        color: "#4949c3"
    },
    todoEdit: {
        margin: "auto",
        width: "100%"
    }
}

function SingleToDo(props) {

    // const { detailedAddOpen, handleDetailedAddButton, handleTodoInput, 
    // handleDescriptionInput, handleDateInput, handleAddItem, handleDetailedAddClose} = props;

    const { classes, id, listId, todoInput } = props;
    // state hooks
    const [body, setBody] = useState(props.body);
    const [status, setStatus] = useState(props.status);
    const [dueDate, setDueDate] = useState(props.dueDate);
    const [description, setDescription] = useState(props.description);
    const [editing, setEditing] = useState(false);
    const [confirmTrashOpen, setConfirmTrashOpen] = useState(false);
    const isFirstRun = useRef(true);

    // sends updated local values to parent to update todoList hook
    function sendUpdatedTodoToParent() {
        let tempTodo = {
            id: id,
            body: body,
            status: status,
        }
        props.updateLocalTodo(tempTodo);

    }

    // cross off/un-cross off todo item
    function handleIconChange() {
        if (status === "pending") {
            setStatus("completed");
        } else {
            setStatus("pending");
        }
    }

    // called after status hook changes to update status in db
    useEffect(() => {
        // don't run on initial load
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        props.setSynced(false); // set to syncing
        // send updated todo to parent to reflect status change
        sendUpdatedTodoToParent();
        // update status in db then refresh todo list on frontend
        Firestore.updateTodoStatusByListId(listId, id, status).then(() => {
            props.setSynced(true);  // set to synced
        })
            // catch error from Firestore function and set syncError
            .catch((error) => {
                props.setSyncError(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, status])


    // // toggle editing on a todo
    // function toggleEditing() {
    //     // this checks the value passed in from App.js (editing hook) to
    //     // see if a todo is already being edited. If so, nothing happens,
    //     // otherwise the todo edit pressed toggles editing
    //     if (props.todoEditing) {
    //         // this checks if the todo pressed is the one already being 
    //         // edited. If so it leaves edit mode, otherwise it returns
    //         if (editing) {
    //             setEditing(false);
    //             props.setSynced(false); // set to syncing;
    //             Firestore.updateTodoBodyByListId(listId, id, body).then(() => {
    //                 props.setSynced(true);  // set to synced
    //             })
    //                 // catch error from Firestore function and set syncError
    //                 .catch((error) => {
    //                     props.setSyncError(error);
    //                 });
    //         }
    //         return;
    //     }
    //     setEditing(true);
    // }

    // // whenever editing is changed in SingleToDo, editing in App.js changes to reflect it
    // useEffect(() => {
    //     props.setEditing(editing);
    //     // send updated todo to parent when edited todo is confirmed
    //     sendUpdatedTodoToParent();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [editing])

    function handleEditButtonPressed() {
        setEditing(true);
    }

    // handles user saving change to todo
    function handleEdit(e) {
        setBody(e.target.value);
    }

    // enter key functionality to finish editing
    function handleEnterEdit(e) {
        if (e.keyCode === 13) {
            handleEditButtonPressed();
            // toggleEditing();
        }
    }

    // opens delete confirm dialogue
    function trashTodo() {
        setConfirmTrashOpen(true);
    }

    // closes delete confirm dialogue
    function handleTrashClose() {
        setConfirmTrashOpen(false);
    }

    function handleSaveChanges() {
        setEditing(false);
    }

    // set react hook val on text change
    function handleBodyInput(e) {
        setBody(e.target.value);
    }
    // DETAILED ADD TODO INPUT HANDLERS
    // for long description of todo
    function handleDescriptionInput(e) {
        setDescription(e.target.value);
    }
    // for date of todo
    function handleDateInput({ target }) {
        // take date string and turn it into date object
        setDueDate(new Date(target.value));
    }
    // for adding a tag (when tags are implemented)
    function handleTagsAdded() {
        console.log("tag totally added");
    }

    function clearInputs() {
        setBody("");
        setDescription("");
        setDueDate("none");
        // setTags([]);
    }

    // deletes from db and closes confirm dialogue
    function handleTrashConfirm() {
        props.setSynced(false); // set to syncing
        props.removeTodoById(id);
        setConfirmTrashOpen(false);
        setEditing(false);
        // delete todo in db then refresh todo list on frontend
        Firestore.deleteTodoByListId(listId, id).then(() => {
            props.setSynced(true);  // set to synced
        })
            // catch error from Firestore function and set syncError
            .catch((error) => {
                props.setSyncError(error);
            })
    }

    // converts a date object to a string to display
    function dateToString(date) {
        // convert to 12 hour AM/PM time
        let suffix = "AM";
        let hours = date.getHours();
        if (hours > 12) {
            hours -= 12;
            suffix = "PM";
        }
        // set minutes appropriately
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (isToday(date)) {
            let strDate = ("Today " + hours + ":" + minutes + suffix);
            return strDate;
        }

        // put together string
        let strDate = (date.getMonth() + 1) + "/" + date.getDate() /* + "/" + date.getFullYear()*/ + " " + hours + ":" + minutes + suffix;
        return strDate;
    }

    // returns string displaying time til todo is due
    function timeRemainingString(date) {
        let diff = new Date() - date;
        if (Math.abs(diff / 86400000) > 1) {
            return (Math.abs(Math.floor(diff / 86400000)) + "d");
        } else if (Math.abs(diff / 3600000) > 1) {
            return (Math.abs(Math.floor(diff / 3600000)) + "h");
        } else if (Math.abs(diff / 60000) > 1) {
            return (Math.abs(Math.floor(diff / 60000)) + "m");
        } 
        return "1m";
    }

    // check if date is today
    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear()
      }

    return (
        <div aria-label="Single Task">
            <Paper elevation={0} className={classes.mainContainer}>
                <Paper elevation={0} className={classes.horizontalFlex}>
                    <div className={classes.leftFlex}>
                        {/* TODO CHECKBOX */}
                        <Checkbox className={classes.checkbox} icon={<RadioButtonUnchecked />} checkedIcon={<RadioButtonChecked />}
                            checked={status === "completed"} name="gilad" onChange={handleIconChange} aria-label="Completion checkbox"
                            disabled={id === -1} />
                        <div className={classes.todoDateFlex}>
                            <div className={classes.centeredDiv}>
                            {editing ?
                            // EDITING TEXTFIELD
                            <TextField autoFocus className={classes.todoEdit} value={body} onChange={handleEdit} onKeyDown={handleEnterEdit}
                                data-testid="edit-input"
                                InputProps={{
                                    className: classes.todoEdit,
                                }} /> :
                            // REGULAR TEXTFIELD
                            <Typography className={status === "completed" ?
                                classes.bodyLabelCompleted : classes.bodyLabel} aria-label="Task name">{body}</Typography>
                            }
                            {dueDate !== "none" ? 
                            <div className={classes.dueDate}>
                                <Typography className={classes.dueDate}>
                                    {description}
                                </Typography>
                                {/* <Typography className={classes.dueDate} 
                                style={dueDate < new Date() ? {"color": "#bb2b2b"} : {}}>
                                    {dueDate < new Date() ? "Overdue: " : "Due: " } {dateToString(dueDate)} <QueryBuilder className={classes.timeRemaining}/> {timeRemainingString(dueDate)}
                                </Typography> */}
                            </div> : null
                            }
                            </div>
                        </div>
                    </div>
                    {/* EDIT/TRASH ICONS */}
                    <div className={classes.horizontalFlex}>
                        <IconButton component="span" className={classes.editIcon} onClick={handleEditButtonPressed}
                            aria-label={editing ? "Save task name" : "Edit task name"} disabled={id === -1}>
                            {// show done button if editing, edit button if not
                                editing ? <Done data-testid="confirm-edit-button" /> : <Edit data-testid="edit-button" />}
                        </IconButton>
                        <IconButton component="span" className={classes.trashIcon} onClick={trashTodo}
                            aria-label="Delete task" data-testid="delete-icon" disabled={id === -1}>
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </div>
                    {/* Deletion confirmation */}
                    <Dialog
                        open={confirmTrashOpen}
                        keepMounted
                        onClose={handleTrashClose}
                        aria-label="Delete confirmation"
                        data-testid="confirm-dialog">
                        <DialogTitle>{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this todo? It will no longer show up
                                as a completed item.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleTrashClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleTrashConfirm} color="primary" data-testid="confirm-delete-btn">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog border={2} open={editing} aria-labelledby="form-dialog-title"
                        PaperProps={{ className: classes.todoDialogPaper }}>
                        <div className={classes.overflow}>
                            <DialogContent className={classes.overflow}>
                            {/* color={props.activeTodoList.color} */}
                                <DetailedAddToDo handleBodyInput={handleBodyInput}
                                    body={body} handleDescriptionInput={handleDescriptionInput}
                                    handleDateInput={handleDateInput} handleSaveItem={handleSaveChanges} />
                            </DialogContent>
                            <DialogActions>
                                <Button onMouseDown={handleEditButtonPressed} className={classes.cancelButton}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>
                </Paper>
            </Paper>
            <Divider />
        </div>
    );
}

export default withStyles(styles)(SingleToDo);