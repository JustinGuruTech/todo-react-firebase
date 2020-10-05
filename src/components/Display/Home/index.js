/* Justin Edwards
 * 09/15/2020
 * Home Component - Public landing page when user isn't
 * authenticated. Controls pop ups for sign up and sign
 * in pages
 */

/* #region IMPORTS */
import React, { useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  withStyles,
} from "@material-ui/core";

import SignUp from "../SignUp";
import Login from "../Login";
import NavBar from "../NavBar";
/* #endregion */

/* #region STYLES */
const styles = {
  background: {
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "white",
  },
  mainPageContainer: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px), linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px",
    backgroundColor: "#708090",
    backgroundSize: "64px 128px",
    paddingBottom: 50,
  },
  mainContainer: {
    width: "80%",
    height: 300,
    margin: "auto",
    marginTop: 120,
    paddingTop: 20,
  },
  tagline: {
    textAlign: "center",
    fontFamily: "Inter",
  },
  buttonsDiv: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  dialogBorder: {
    border: "3px solid black",
    minHeight: 300,
  },
  buttons: {
    width: 150,
    margin: "auto",
    marginTop: 15,
    color: "#080808",
    borderColor: "#080808",
    "&:hover": {
      backgroundColor: "#080808",
      color: "#ececec",
    },
  },
  cancelButton: {
    color: "#080808",
  },
  overflow: {
    overflowY: "inherit",
  },
};
/* #endregion */

function Home(props) {
  /* #region PROPS/HOOKS */
  const { classes } = props;

  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  /* #endregion */

  /* #region FORM OPENING/CLOSING */
  // closing/opening sign in form
  function handleSignInOpen() {
    setSignUpOpen(false);
    setSignInOpen(true);
  }
  function handleSignInClose() {
    setSignInOpen(false);
  }
  // closing/opening sign up form
  function handleSignUpOpen() {
    setSignInOpen(false);
    setSignUpOpen(true);
  }
  function handleSignUpClose() {
    setSignUpOpen(false);
  }
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <Paper elevation={0} className={classes.background}>
      {/* AppBar - Main Header */}
      <NavBar />
      <div className={classes.mainPageContainer}>
        <Paper elevation={1} className={classes.mainContainer}>
          <Typography variant="h4" component="h4" className={classes.tagline}>
            To-Do or not To-Do?
          </Typography>
          <Typography variant="h4" component="h4" className={classes.tagline}>
            That is the question.
          </Typography>
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
          <Dialog open={signUpOpen} aria-labelledby="form-dialog-title">
            <div className={classes.dialogBorder}>
              <DialogContent className={classes.overflow}>
                <SignUp setSignInModalOpen={handleSignInOpen} />
              </DialogContent>
              <DialogActions>
                <Button
                  onMouseDown={handleSignUpClose}
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <Dialog
            border={2}
            open={signInOpen}
            aria-labelledby="form-dialog-title"
          >
            <div className={classes.dialogBorder}>
              <DialogContent className={classes.overflow}>
                <Login setSignUpModalOpen={handleSignUpOpen} />
              </DialogContent>
              <DialogActions>
                <Button
                  onMouseDown={handleSignInClose}
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </Paper>
      </div>
    </Paper>
  );
  /* #endregion */
}

export default withStyles(styles)(Home);
