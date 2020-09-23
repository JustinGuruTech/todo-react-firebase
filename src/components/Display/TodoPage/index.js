// Justin Edwards
// 9/21/20
// TodoPage Component - Contains NavBar, SideBar, and Todo 
// components

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, 
    Button, Snackbar, withStyles, IconButton } from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';

import * as Firestore from '../../Firestore';


import Todo from '../Todo';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import AddListForm from '../AddListForm';

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
    // const [todoLists, setTodoLists] = useState({})
    const [addListOpen, setAddListOpen] = useState(false);
    const [addedSnackbarOpen, setAddedSnackbarOpen] = useState(false);
    const [addListError, setAddListError] = useState("");
    // will be used for loading symbol
    // const [addingList, setAddingList] = useState(false);

    

    function handleAddListOpen() {
        setAddListOpen(true);
    }

    function handleAddListClose() {
        setAddListOpen(false);
    }

    function handleSnackbarOpen() {
        setAddedSnackbarOpen(true)
    }
    function handleSnackbarClose() {
        setAddedSnackbarOpen(false);
    }

    function handleAddListError() { 
        setAddListError("Error Adding List");
    }

    // function handleAddingList() {
    //     setAddingList(true);
    // }

    return (
        <div className={classes.todoPageContainer}>
            <div>
                {/* List Added Confirmation/Error Snackbar */}
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={addedSnackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                    message={addListError != "" ? addListError : "List Added!"}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>
            <div className={classes.navBar}>
                <NavBar />
            </div>
            <div className={classes.sideBar}>
                <SideBar handleAddListOpen={handleAddListOpen}/>
            </div>
            <Todo className={classes.todoMain}/>
            <Dialog border={2} open={addListOpen} aria-labelledby="form-dialog-title"
                PaperProps={{className: classes.dialogPaper}}>
                <div className={classes.overflow}>
                    <DialogContent className={classes.overflow}>
                        <AddListForm handleAddListClose={handleAddListClose} handleSnackbarOpen={handleSnackbarOpen} 
                        handleAddListError={handleAddListError} /*handleAddingList={handleAddingList}*//>
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