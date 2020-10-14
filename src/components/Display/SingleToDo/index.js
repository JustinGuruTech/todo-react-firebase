/* Justin Edwards
 * 08/26/2020
 * Single todo list component, handles events when user clicks on
 * anything within a single todo (check/edit/delete). Todo/index.js maps
 * items in todo to these components passing in relevant info.
 * Uses Firestore/index.js functions for database connectivity
 */

/* #region IMPORTS */
import React, { useState, useEffect, useRef } from "react";

import {
  Button,
  Typography,
  Paper,
  Divider,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from "@material-ui/core";
import {
  RadioButtonUnchecked,
  RadioButtonChecked,
  DeleteOutlineOutlined,
  Edit,
  Done,
  QueryBuilder,
} from "@material-ui/icons";

import * as Firestore from "../../Firestore";

import DetailedAddToDo from "../DetailedAddToDo";
/* #endregion */

/* #region STYLES */
const styles = theme => ({
  mainContainer: {
    width: "100%",
    minHeight: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white"
  },
  horizontalFlex: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  leftFlex: {
    display: "flex",
    // justifyContent: "space-between",
    flex: 1,
  },
  centeredDiv: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  textWrap: {
    display: "flex",
    margin: "auto 0",
  },
  todoDateFlex: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 4,
  },
  dueDate: {
    fontSize: ".7rem",
    textAlign: "right"
    // fontFamily: "Inter",
  },
  longDescription: {
    fontSize: ".7rem",
  },
  timeRemaining: {
    fontSize: 14,
    position: "relative",
    top: 3,
    left: 2,
  },
  bodyLabel: {
    lineHeight: "1rem",
    fontSize: "1rem",
    margin: 0,
    fontFamily: "Inter",
    wordBreak: "break-word"
  },
  bodyLabelCompleted: {
    lineHeight: "1rem",
    fontSize: "1rem",
    margin: 0,
    textDecoration: "line-through",
    fontFamily: "Inter",
  },
  trashIcon: {
    color: "#bb2b2b",
    [theme.breakpoints.down(700)]: {
      //only show on mobile or small screen
      padding: "0 5px 0 5px"
    },
  },
  editIcon: {
    color: "#4949c3",
    [theme.breakpoints.down(700)]: {
      //only show on mobile or small screen
      padding: 0
    },
  },
  todoEdit: {
    margin: "auto",
    width: "100%",
  },
});
/* #endregion */

function SingleToDo(props) {
  /* #region PROPS/HOOKS */
  // prop attributes
  const { classes, id, listId, todoInput, color } = props;
  // display hooks
  const [body, setBody] = useState(props.body);
  const [status, setStatus] = useState(props.status);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const [description, setDescription] = useState(props.description);
  // editing todo hooks
  const [editing, setEditing] = useState(false);
  const [newBody, setNewBody] = useState(props.body);
  const [newDueDate, setNewDueDate] = useState(props.dueDate);
  const [newDescription, setNewDescription] = useState(props.description);
  // trash open hook
  const [confirmTrashOpen, setConfirmTrashOpen] = useState(false);
  const isFirstRun = useRef(true);
  /* #endregion */

  /* #region STATUS CHANGE */
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
    // updated todo to send to parent
    let tempTodo = {
      id: id,
      body: body,
      status: status,
      description: description,
      dueDate: dueDate,
    };
    sendUpdatedTodoToParent(tempTodo); // send todo to parent
    // update status in db
    Firestore.updateTodoStatusByListId(listId, id, status)
      .then(() => {
        props.setSynced(true); // set to synced
      })
      // catch error from Firestore function and set syncError
      .catch((error) => {
        props.setSyncError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, status]);
  /* #endregion */

  /* #region INPUT HANDLERS */
  // set new body hook val on input
  function handleNewBodyInput(e) {
    setNewBody(e.target.value);
  }
  // set new description hook val on input
  function handleNewDescriptionInput(e) {
    setNewDescription(e.target.value);
  }
  // set new date hook val on input
  function handleNewDateInput({ target }) {
    // take date string and turn it into date object
    if (!isNaN(Date.parse(target.value))) {
      setNewDueDate(new Date(target.value));
    }
  }
  // clear new todo information on cancel or add
  function clearInputs() {
    setNewBody("");
    setNewDescription("");
    setNewDueDate("none");
    // setTags([]);
  }
  /* #endregion */

  /* #region EDITING TODO */
  // sends updated local values to parent to update todoList hook
  function sendUpdatedTodoToParent(tempTodo) {
    props.updateLocalTodo(tempTodo);
  }
  // update local hooks with new ones
  function updateLocalHooks() {
    setBody(newBody);
    setDescription(newDescription);
    setDueDate(newDueDate);
  }
  // starts editing on edit button press
  function handleEditButtonPressed() {
    setEditing(true);
  }
  // save changes and close popup
  function handleSaveChanges() {
    // make sure input isn't empty
    if (todoInput !== "") {
      props.setSynced(false);
      // todo to save changes on
      let tempTodo = {
        id: id,
        body: newBody,
        status: status,
        description: newDescription,
        dueDate: newDueDate,
      };
      sendUpdatedTodoToParent(tempTodo); // send to parent
      updateLocalHooks(); // update local hooks
      setEditing(false); // hide edit popup

      // TODO: show snackbar

      // wait for all 3 promises to resolve
      Promise.all([
        // update body if different
        body !== newBody
          ? Firestore.updateTodoBodyByListId(listId, id, newBody)
          : "",
        // update description if different
        description !== newDescription
          ? Firestore.setTodoDescriptionByListId(listId, id, newDescription)
          : "",
        // update DueDate if different
        dueDate !== newDueDate
          ? Firestore.setTodoDateByListId(listId, id, newDueDate)
          : "",
      ])
        // set synced if resolved
        .then(() => {
          props.setSynced(true);
          triggerSnackbar("Saved Changes");
        })
        // catch any errors
        .catch((error) => {
          console.log("Error updating in DB: ", error);
          triggerSnackbar("Error Saving Changes");
        });
    }
  }
  // discard changes and close popup
  function handleEditingCancel() {
    clearInputs();
    setEditing(false);
  }
  // for adding a tag (when tags are implemented)
  // function handleTagsAdded() {
  //   console.log("tag totally added");
  // }
  /* #endregion */

  /* #region TRASH TODO HANDLERS */
  // opens delete confirm dialogue
  function trashTodo() {
    setConfirmTrashOpen(true);
  }
  // closes delete confirm dialogue
  function handleTrashClose() {
    setConfirmTrashOpen(false);
  }
  // deletes from db and closes confirm dialogue
  function handleTrashConfirm() {
    props.setSynced(false); // set to syncing
    props.removeTodoById(id);
    setConfirmTrashOpen(false);
    setEditing(false);
    // delete todo in db then refresh todo list on frontend
    Firestore.deleteTodoByListId(listId, id)
      .then(() => {
        props.setSynced(true); // set to synced
      })
      // catch error from Firestore function and set syncError
      .catch((error) => {
        props.setSyncError(error);
      });
  }
  /* #endregion */

  /* #region DATE TIME FUNCTIONS */
  // returns string displaying time til todo is due
  function timeRemainingString(date) {
    let diff = date - new Date();
    if (Math.abs(diff / 86400000) > 1) {
      return Math.floor(diff / 86400000) + "d";
    } else if (Math.abs(diff / 3600000) > 1) {
      return Math.floor(diff / 3600000) + "h";
    } else if (Math.abs(diff / 60000) > 1) {
      return Math.floor(diff / 60000) + "m";
    }
    return "1m";
  }

  // // check if date is today
  // const isToday = (someDate) => {
  //   const today = new Date();
  //   return (
  //     someDate.getDate() === today.getDate() &&
  //     someDate.getMonth() === today.getMonth() &&
  //     someDate.getFullYear() === today.getFullYear()
  //   );
  // };
  /* #endregion */

  /* #region SNACKBAR FUNCTION */
  // set snackbar message triggering useEffect to open snackbar
  function triggerSnackbar(message) {
    props.setSnackbarMessage(message);
  }
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <div aria-label="Single Task">
      <Paper elevation={0} className={classes.mainContainer}>
        <Paper elevation={0} className={classes.horizontalFlex}>
          <div className={classes.leftFlex}>
            {/* TODO CHECKBOX */}
            <Checkbox
              className={classes.checkbox}
              icon={<RadioButtonUnchecked />}
              checkedIcon={<RadioButtonChecked />}
              checked={status === "completed"}
              name="gilad"
              onChange={handleIconChange}
              aria-label="Completion checkbox"
              disabled={id === -1}
            />
            <div className={classes.todoDateFlex}>
              <div className={classes.centeredDiv}>
                <div className={classes.textWrap}>
                  <Typography
                    className={
                      status === "completed"
                        ? classes.bodyLabelCompleted
                        : classes.bodyLabel
                    }
                    aria-label="Task name"
                  >
                    {body}
                  </Typography>
                </div>
                {dueDate !== "none" && status !== "completed" ? (
                  <Typography
                    className={classes.dueDate}
                    style={dueDate < new Date() ? { color: "#bb2b2b" } : {}}
                  >
                    {/*{dueDate < new Date() ? "Overdue: " : "Due: "} {dateToString(dueDate)} */}{" "}
                    <QueryBuilder className={classes.timeRemaining} />{" "}
                    {timeRemainingString(dueDate)}
                  </Typography>
                ) : null}
              </div>
              <div>
                <Typography className={classes.longDescription}>
                  {description}
                </Typography>
              </div>
            </div>
          </div>
          {/* EDIT/TRASH ICONS */}
          <div className={classes.horizontalFlex}>
            <IconButton
              component="span"
              className={classes.editIcon}
              onClick={handleEditButtonPressed}
              aria-label={editing ? "Save task name" : "Edit task name"}
              disabled={id === -1}
            >
              {
                // show done button if editing, edit button if not
                editing ? (
                  <Done data-testid="confirm-edit-button" />
                ) : (
                  <Edit data-testid="edit-button" />
                )
              }
            </IconButton>
            <IconButton
              component="span"
              className={classes.trashIcon}
              onClick={trashTodo}
              aria-label="Delete task"
              data-testid="delete-icon"
              disabled={id === -1}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </div>
          {/* Deletion confirmation */}
          <Dialog
            open={confirmTrashOpen}
            keepMounted
            onClose={handleTrashClose}
            aria-label="Delete confirmation"
            data-testid="confirm-dialog"
          >
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this todo? It will no longer
                show up as a completed item.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTrashClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleTrashConfirm}
                color="primary"
                data-testid="confirm-delete-btn"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            border={2}
            open={editing}
            aria-labelledby="form-dialog-title"
            PaperProps={{ className: classes.todoDialogPaper }}
          >
            <div className={classes.overflow}>
              <DialogContent className={classes.overflow}>
                {/* color={props.activeTodoList.color} */}
                <DetailedAddToDo
                  formTitle="Edit Todo"
                  buttonLabel="Save Changes"
                  handleBodyInput={handleNewBodyInput}
                  description={newDescription}
                  body={newBody}
                  todoDueDate={newDueDate}
                  color={color}
                  handleDescriptionInput={handleNewDescriptionInput}
                  handleDateInput={handleNewDateInput}
                  handleSaveItem={handleSaveChanges}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onMouseDown={handleEditingCancel}
                  className={classes.cancelButton}
                >
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
  /* #endregion */
}

export default withStyles(styles)(SingleToDo);
