// Justin Edwards
// 9/21/20
// TodoPage Component - Contains NavBar, SideBar, and Todo
// components

/* #region IMPORTS */
import React, { useState, useEffect } from "react";
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
import ListForm from "../ListForm";
import Snackbar from "../../Sitewide/Snackbar";
import Footer from "../../Sitewide/Footer";

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
  verticalFlex: {
    display: "flex",
    flexDirection: "column",
  },
});
/* #endregion */

function TodoPage(props) {
  /* #region PROPS/HOOKS */
  const { classes } = props;
  // data hooks
  const [todoListList, setTodoListList] = useState([]);
  const [activeTodoList, setActiveTodoList] = useState({ id: -1 });
  const [todoListIndex, setTodoListIndex] = useState(0);
  // modal/popup open status hooks
  const [addListOpen, setAddListOpen] = useState(false);
  const [editListOpen, setEditListOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // add list hooks
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("");
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
      // set name/color to be used in changing name/color
      setNewName(todoListList[todoListIndex].name);
      setNewColor(todoListList[todoListIndex].color);
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
  // runs when Add ListForm Dialog submits
  function handleAddListSubmit() {
    // waits for addList to return new list
    Firestore.addNewTodoList(newName, newColor)
      .then((newList) => {
        // show snackbar
        handleAddListClose();
        // add list of todos with dummy flag
        newList.todos = [{ id: -1 }];
        // add list to todoListList
        let tempTodoListList = todoListList;
        tempTodoListList.push(newList);
        setTodoListList(tempTodoListList);
        // trigger snackbar
        triggerSnackbar("New List Added");
      })
      .catch(() => {
        // show error on snackbar;
        triggerSnackbar("Error Adding list");
      });
  }

  // handlers for add new list form
  // used in Sidebar and AddListForm components
  function handleAddListOpen() {
    setAddListOpen(true);
  }
  function handleAddListClose() {
    setAddListOpen(false);
  }
  /* #endregion */

  /* #region EDIT NEW LIST */
  // runs when Edit ListForm Dialog submits
  function handleEditListSubmit() {
    // resolve all promises (db updates) before triggering snackbar
    Promise.all([
      activeTodoList.name !== newName
        ? Firestore.updateTodoListName(activeTodoList.id, newName)
        : "",

      activeTodoList.color !== newColor
        ? Firestore.updateTodoListColor(activeTodoList.id, newColor)
        : "",
    ])
      .then(() => {
        triggerSnackbar("List Updated"); // success snackbar
      })
      .catch((error) => {
        // error log and snackbar
        console.log("Error Updating List: ", error);
        triggerSnackbar("Error Updating List");
      });
    // copy list and update name/color
    let tempTodoList = activeTodoList;
    tempTodoList.name = newName;
    tempTodoList.color = newColor;
    // set new active todo list
    setActiveTodoList(tempTodoList);
    // update list in list of lists
    let tempTodoListList = todoListList;
    tempTodoListList[todoListIndex] = tempTodoList;
    handleEditListClose(); // close form
    // reset form inputs
    setNewName("");
    setNewColor("");
  }

  // handlers for add new list form
  // used in Sidebar and AddListForm components
  function handleEditListOpen() {
    setEditListOpen(true);
  }
  function handleEditListClose() {
    setEditListOpen(false);
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
    <div className={classes.verticalFlex}>
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
            handleEditListOpen={handleEditListOpen}
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
      </div>
      <Footer dark={false} />

      {/* ADD TODO LIST FORM POPUP */}
      <Dialog
        border={2}
        open={addListOpen}
        aria-labelledby="form-dialog-title"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <div className={classes.overflow}>
          <DialogContent className={classes.overflow}>
            {/* <AddListForm
              triggerSnackbar={triggerSnackbar}
              handleAddListClose={handleAddListClose}
              setListToAddLocally={setListToAddLocally}
            /> */}
            <ListForm
              name={newName}
              setName={setNewName}
              color={newColor}
              setColor={setNewColor}
              handleSubmitOut={handleAddListSubmit}
              submitLabel="Add New List"
              oldName={activeTodoList.name}
              oldColor={activeTodoList.color}
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
      {/* EDIT TODO LIST FORM POPUP */}
      <Dialog
        border={2}
        open={editListOpen}
        aria-labelledby="form-dialog-title"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <div className={classes.overflow}>
          <DialogContent className={classes.overflow}>
            <ListForm
              name={newName}
              setName={setNewName}
              color={newColor}
              setColor={setNewColor}
              handleSubmitOut={handleEditListSubmit}
              submitLabel="Save Changes"
              editing={true}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onMouseDown={handleEditListClose}
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
