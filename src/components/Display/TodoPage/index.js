// Justin Edwards
// 9/21/20
// TodoPage Component - Contains NavBar, SideBar, and Todo
// components

/* #region IMPORTS */
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  withStyles,
} from "@material-ui/core";

import Todo from "../Todo";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import AddListForm from "../AddListForm";
import Snackbar from "../../Sitewide/Snackbar";

import * as Firestore from "../../Firestore";
/* #endregion */

/* #region STYLES */
const styles = (theme) => ({
  navBar: {
    position: "absolute",
    width: "100%",
    zIndex: theme.zIndex.drawer + 1,
  },
  sideBar: {
    overflow: "auto",
  },
  todoPageContainer: {
    display: "flex",
    overflow: "visible",
    height: "100%",
  },
  overflow: {
    overflow: "visible",
  },
  dialogPaper: {
    overflow: "visible",
  },
  todoDialogPaper: {
    width: 600,
    margin: 10,
  },
});
/* #endregion */

function TodoPage(props) {
  /* #region PROPS/HOOKS */
  const { classes } = props;
  const isFirstRun = useRef(true);
  // data hooks
  const [todoListList, setTodoListList] = useState([]);
  const [activeTodoList, setActiveTodoList] = useState({ id: -1 });
  const [todoListIndex, setTodoListIndex] = useState(0);
  const [listToAddLocally, setListToAddLocally] = useState({ id: -1 });
  // modal/popup open status hooks
  const [addListOpen, setAddListOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // will be used for loading symbol
  // const [addingList, setAddingList] = useState(false);
  /* #endregion */

  /* #region STARTUP */
  // run once on startup
  useEffect(() => {
    // get all todo lists from db
    Firestore.getAllTodoLists().then((allLists) => {
      let todoLists = [];
      // put them all in array
      allLists.forEach((doc) => {
        let list = doc.data();
        list.id = doc.id;
        list.todos = [{ id: -1 }]; // set empty list for todos
        todoLists.push(list);
      });
      setTodoListList(todoLists); // set list of todo lists
    });
  }, []);
  /* #endregion */

  /* #region LIST CHANGE */
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
  // set active todo list
  function setActiveTodoListHandler(newList) {
    setActiveTodoList(newList);
  }
  /* #endregion */

  /* #region ADD NEW LIST */
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
      setListToAddLocally({ id: -1 }); // reset list to add to dummy
      setTodoListList(tempList); // set new list of lists
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
  /* #endregion */

  /* #region DELETE LIST */
  function deleteListById(listId) {
    setTodoListIndex(0); // resets active list
    // filter local list
    let tempTodoListList = todoListList;
    // remove list from hooks
    tempTodoListList = tempTodoListList.filter((list) => {
      return list.id !== listId;
    });
    setTodoListList(tempTodoListList); // set new list
    // remove list from db
    Firestore.removeTodoList(listId)
      .then(() => {
        triggerSnackbar("List Removed");
      })
      .catch((error) => {
        triggerSnackbar("Error Removing List");
        console.log("Error removing list: ", error);
      });
  }
  /* #endregion */

  /* #region SNACKBAR NOTIFICATION */
  // set snackbar message triggering useEffect to open snackbar
  function triggerSnackbar(message) {
    setSnackbarMessage(message);
  }
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <div className={classes.todoPageContainer}>
      <div>
        {/* LIST ADDED NOTIFICATION/SNACKBAR */}
        <Snackbar
          snackbarMessage={snackbarMessage}
          setSnackbarMessage={setSnackbarMessage}
        />
      </div>
      {/* NAVBAR */}
      <div className={classes.navBar}>
        <NavBar />
      </div>
      {/* SIDEBAR */}
      <div className={classes.sideBar}>
        <SideBar
          todoListList={todoListList}
          updateTodoListIndex={updateTodoListIndex}
          handleAddListOpen={handleAddListOpen}
          deleteListById={deleteListById}
          triggerSnackbar={triggerSnackbar}
        />
      </div>
      {/* TODO LIST */}
      <Todo
        className={classes.todoMain}
        activeTodoList={activeTodoList}
        setActiveTodoList={setActiveTodoListHandler}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
      />
      {/* ADD TODO LIST FORM POPUP */}
      <Dialog
        border={2}
        open={addListOpen}
        aria-labelledby="form-dialog-title"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <div className={classes.overflow}>
          <DialogContent className={classes.overflow}>
            <AddListForm
              triggerSnackbar={triggerSnackbar}
              handleAddListClose={handleAddListClose}
              setListToAddLocally={setListToAddLocally}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onMouseDown={handleAddListClose}
              className={classes.cancelButton}
            >
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
  /* #endregion */
}

export default withStyles(styles)(TodoPage);
