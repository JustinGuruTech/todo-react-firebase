// Justin Edwards
// 9/21/20
// TodoPage Component - Contains NavBar, SideBar, and Todo 
// components

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogActions, 
    Button, Snackbar, withStyles, IconButton } from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';

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
    // const [todoLists, setTodoLists] = useState({})
    const isFirstRun = useRef(true);
    const [todoListList, setTodoListList] = useState([]);
    const [todoListTitle, setTodoListTitle] = useState("");  // stores title of todo list
    const [addListOpen, setAddListOpen] = useState(false);
    const [addedSnackbarOpen, setAddedSnackbarOpen] = useState(false);
    const [addListError, setAddListError] = useState("");
    const [listToAddLocally, setListToAddLocally] = useState({id: -1});
    const [selectedTodoListId, setSelectedTodoListId] = useState(-1)
    // will be used for loading symbol
    // const [addingList, setAddingList] = useState(false);

    // run once on startup
    useEffect(() => {
        Firestore.getAllTodoLists().then((allLists) => {
            let todoLists = [];
            allLists.forEach(doc => {
                let list = doc.data();
                list.id = doc.id;
                todoLists.push(list);
            })
            setTodoListList(todoLists);
            // console.log(response);
        })
  
    }, [])

    useEffect(() => {
        if (todoListList.length > 0) {
            setTodoListTitle(todoListList[0].name);
        }
        
    }, [todoListList]);

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
          setListToAddLocally({id: -1});  // reset list to add to dummy
          setTodoListList(tempList);  // set new list of lists
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [listToAddLocally]);

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
            <div className={classes.navBar}>
                <NavBar />
            </div>
            <div className={classes.sideBar}>
                <SideBar todoListList={todoListList} handleAddListOpen={handleAddListOpen} 
                listToAddLocally={listToAddLocally} setListToAddLocally={setListToAddLocally}/>
            </div>
            <Todo className={classes.todoMain} todoListTitle={todoListTitle}/>
            <Dialog border={2} open={addListOpen} aria-labelledby="form-dialog-title"
                PaperProps={{className: classes.dialogPaper}}>
                <div className={classes.overflow}>
                    <DialogContent className={classes.overflow}>
                        <AddListForm handleAddListClose={handleAddListClose} handleSnackbarOpen={handleSnackbarOpen} 
                        handleAddListError={handleAddListError} setListToAddLocally={setListToAddLocally} /*handleAddingList={handleAddingList}*//>
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