// Justin Edwards
// 9/21/20
// TodoPage Component - Contains NavBar, SideBar, and Todo 
// components

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, 
    Button, withStyles } from '@material-ui/core';


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
    }
})

function TodoPage(props) {

    const { classes } = props;
    // const [todoLists, setTodoLists] = useState({})
    const [addListOpen, setAddListOpen] = useState(false);

    function handleAddListOpen() {
        setAddListOpen(true);
    }

    function handleAddListClose() {
        setAddListOpen(false);
    }

    return (
        <div className={classes.todoPageContainer}>
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
                        <AddListForm closeAddList={handleAddListClose}/>
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