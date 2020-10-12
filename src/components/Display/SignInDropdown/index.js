/* Justin Edwards
 * 09/17/2020
 * ProfileDropdown Component - dropdown displayed when user
 * clicks on profile image/icon in right of NavBar. Handles
 * sign out and links to profile page (eventually)
 */

/* #region IMPORTS */
import React from "react";
import {
  Button,
  Paper,
  withStyles,
} from "@material-ui/core";
/* #endregion */

/* #region STYLES */
const styles = {
  buttonsDiv: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    position: "fixed",
    right: 3,
    top: 65,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5
  },
  buttons: {
    width: 150,
    margin: "auto",
    marginBottom: 10,
    color: "#080808",
    borderColor: "#080808",
    "&:hover": {
      backgroundColor: "#080808",
      color: "#ececec",
    },
  },
};
/* #endregion */

function SignInDropdown(props) {
  /* #region PROPS/HOOKS */
  const { handleSignInOpen, handleSignUpOpen } = props;
  const { classes } = props;
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <Paper className={classes.mainCard} position="static" elevation={1}>
      <div className={classes.buttonsDiv}>
        <Button
          className={classes.buttons}
          variant="outlined"
          onClick={handleSignUpOpen}
        >
          Sign Up
        </Button>
        <Button
          className={classes.buttons}
          variant="outlined"
          onClick={handleSignInOpen}
        >
          Sign In
        </Button>
      </div>
    </Paper>
  );
  /* #endregion */
}

export default withStyles(styles)(SignInDropdown);
