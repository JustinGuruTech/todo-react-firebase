// Justin Edwards
// 9/21/20
// TodoPage Component - Contains NavBar, SideBar, and Todo 
// components

import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogContent, DialogActions,
    Button, Snackbar, withStyles, IconButton
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import Todo from '../Todo';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import AddListForm from '../AddListForm';

import * as Firestore from '../../Firestore';

const styles = theme => ({
    navBar: {
        position: "absolute",
        width: "100%",
        zIndex: theme.zIndex.drawer + 1
    },
    sideBar: {
        overflow: "auto",
    },
    todoPageContainer: {
        display: "flex",
        overflow: "visible"
    },
    overflow: {
        overflow: "visible"
    },
    dialogPaper: {
        overflow: "visible"
    },
})

function TodoPage(props) {

    const { classes } = props;
    const isFirstRun = useRef(true);
    const [todoListList, setTodoListList] = useState([]);
    const [activeTodoList, setActiveTodoList] = useState({ id: -1 , todos: []});
    const [todoListIndex, setTodoListIndex] = useState(0);
    const [addListOpen, setAddListOpen] = useState(false);
    const [addedSnackbarOpen, setAddedSnackbarOpen] = useState(false);
    const [addListError, setAddListError] = useState("");
    const [listToAddLocally, setListToAddLocally] = useState({ id: -1 });
    // will be used for loading symbol
    // const [addingList, setAddingList] = useState(false);

    // run once on startup
    useEffect(() => {
        // get all todo lists from db
        Firestore.getAllTodoLists().then((allLists) => {
            let todoLists = [];
            // put them all in array
            allLists.forEach(doc => {
                let list = doc.data();
                list.id = doc.id;
                list.todos = [{id: -1}];    // set empty list for todos
                todoLists.push(list);
            })
            setTodoListList(todoLists); // set list of todo lists
        })

    }, [])

    // runs when todo list list (confusing) is set or selected index changes
    useEffect(() => {
        // check if array contains todo lists
        if (todoListList.length > 0) {
            // set active list by index (default 0)
            setActiveTodoList(todoListList[todoListIndex]);
        }

    }, [todoListList, todoListIndex]);

    // updates index of selected todo list
    // used in Sidebar component
    function updateTodoListIndex(index) {
        setTodoListIndex(index);
    }

    // runs when listToAddLocally is changed by
    // Sidebar component
    useEffect(() => {
        // don't run on initial load
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        // check if list to add is a real one
        if (listToAddLocally.id !== -1) {
            // get list of todo lists
            let tempList = todoListList;
            tempList.push(listToAddLocally); // add new one
            setListToAddLocally({ id: -1 });  // reset list to add to dummy
            setTodoListList(tempList);  // set new list of lists
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listToAddLocally]);

    // handlers for add new list form
    // used in Sidebar and AddListForm components
    function handleAddListOpen() {
        setAddListOpen(true);
    }
    function handleAddListClose() {
        setAddListOpen(false);
    }

    // handlers for snackbar notification
    // used in AddListForm component
    function handleSnackbarOpen() {
        setAddedSnackbarOpen(true)
    }
    function handleSnackbarClose() {
        setAddedSnackbarOpen(false);
    }

    // sets error for adding list
    // used in AddListForm component
    function handleAddListError() {
        setAddListError("Error Adding List");
    }

    return (
        <div className={classes.todoPageContainer}>
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
                    message={addListError !== "" ? addListError : "List Added!"}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
            {/* NAVBAR */}
            <div className={classes.navBar}>
                <NavBar />
            </div>
            {/* SIDEBAR */}
            <div className={classes.sideBar}>
                <SideBar todoListList={todoListList} handleAddListOpen={handleAddListOpen}
                    listToAddLocally={listToAddLocally} setListToAddLocally={setListToAddLocally}
                    updateTodoListIndex={updateTodoListIndex} />
            </div>
            {/* TODO LIST */}
            <Todo className={classes.todoMain} activeTodoList={activeTodoList} />
            {/*ADD TODO LIST FORM POPUP */}
            <Dialog border={2} open={addListOpen} aria-labelledby="form-dialog-title"
                PaperProps={{ className: classes.dialogPaper }}>
                <div className={classes.overflow}>
                    <DialogContent className={classes.overflow}>
                        <AddListForm handleAddListClose={handleAddListClose} handleSnackbarOpen={handleSnackbarOpen}
                            handleAddListError={handleAddListError} setListToAddLocally={setListToAddLocally} /*handleAddingList={handleAddingList}*/ />
                    </DialogContent>
                    <DialogActions>
                        <Button onMouseDown={handleAddListClose} className={classes.cancelButton}>
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default withStyles(styles)(TodoPage);