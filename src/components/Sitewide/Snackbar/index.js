/* Justin Edwards
 * 10/06/2020
 * Snackbar Component - This snackbar component is set up
 * so that whenever the message is changed, the snackbar 
 * displays. This makes it real easy to show a snackbar on 
 * events from other components

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
  Snackbar,
  withStyles,
} from "@material-ui/core";
import {
  RadioButtonUnchecked,
  RadioButtonChecked,
  DeleteOutlineOutlined,
  Edit,
  Done,
  QueryBuilder,
  Close as CloseIcon,
} from "@material-ui/icons";

import * as Firestore from "../../Firestore";

import DetailedAddToDo from "../DetailedAddToDo";
/* #endregion */

/* #region STYLES */
const styles = {};
/* #endregion */

function SingleToDo(props) {
  /* #region PROPS/HOOKS */
  // prop attributes
  const { classes, snackbarMessage, snackbarOpen } = props;
  /* #endregion */

  /* #region SNACKBAR FUNCTIONS */
  // close snackbar
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }
  // when snackbarMessage is changed, show snackbar
  useEffect(() => {
    if (snackbarMessage !== "") {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage]);
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
  /* #endregion */
}

export default withStyles(styles)(SingleToDo);
