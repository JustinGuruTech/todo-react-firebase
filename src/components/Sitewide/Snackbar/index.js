/* Justin Edwards
 * 10/06/2020
 * Snackbar Component - This snackbar component is set up
 * so that whenever the message is changed, the snackbar 
 * displays. This makes it real easy to show a snackbar on 
 * events from other components
 * 
 * Required Props
 * snackbarMessage - hook that component listens for. When it 
 *    changes, the useEffect() is triggered to display snackbar
 * setSnackbarMessage - sets snackbarMessage in the parent which
 *    then triggers snackbar display as described above

/* #region IMPORTS */
import React, { useEffect, useState } from "react";

import { IconButton, Snackbar, withStyles } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
/* #endregion */

/* #region STYLES */
const styles = {};
/* #endregion */

function SingleToDo(props) {
  /* #region PROPS/HOOKS */
  // prop attributes
  const { /*classes,*/ snackbarMessage, setSnackbarMessage } = props;
  // controls snackbar open/close
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  /* #endregion */

  /* #region SNACKBAR FUNCTIONS */
  // close snackbar
  function handleSnackbarClose() {
    setSnackbarMessage("");
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
