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
  Grid,
  withStyles,
} from "@material-ui/core";

import fullScreenShot from "../../../images/full_screen_shot_small.png";
import addTodoScreenShot from "../../../images/add_todo_date_small.png";
import addListScreenShot from "../../../images/add_list_small.png";
import firebaseScreenShot from "../../../images/firebase_small.png";

import SignUp from "../SignUp";
import Login from "../Login";
import NavBar from "../NavBar";
import Footer from "../../Sitewide/Footer";
/* #endregion */

/* #region STYLES */
const styles = (theme) => ({
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
    // background:
    // "linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px), linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px",
    backgroundColor: "#fff",
    backgroundSize: "64px 128px",
    paddingBottom: 50,
  },
  mainBackground: {
    width: "100%",
    position: "relative",
    // margin: "auto"
  },
  singleGridRow: {
    marginBottom: 50,
  },
  singleGridRowReverse: {
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      //only show on mobile or small screen
      flexWrap: "wrap-reverse",
    },
  },
  rowContentContainer: {
    position: "absolute",
    paddingTop: 100,
  },
  backgroundFlex: {
    position: "fixed",
    width: "100%",
    height: "100%",
    margin: "auto",
    top: 0,
    bottom: 0,
    display: "flex",
  },
  halfDivLeft: {
    height: "100%",
    // width: "50%",
    backgroundColor: "#3d3a3a",
  },
  halfDivRight: {
    height: "100%",
    // width: "50%",
    // backgroundColor: "#3d3a3a",
    [theme.breakpoints.down("sm")]: {
      //only show on mobile or small screen
      backgroundColor: "#3d3a3a",
    },
  },
  infoTextDivLeft: {
    padding: 20,
    marginBottom: 50,
    color: "white",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80%",
    [theme.breakpoints.down("sm")]: {
      //only show on mobile or small screen
      textAlign: "center",
    },
  },
  infoTextDivRight: {
    color: "#3d3a3a",
    padding: 20,
    marginBottom: 50,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80%",
    [theme.breakpoints.down("sm")]: {
      //only show on mobile or small screen
      textAlign: "center",
      color: "white",
    },
  },
  infoTitle: {
    fontSize: "60px",
    fontWeight: "bold",
    // textAlign: "center",
  },
  infoTextLeft: {
    paddingTop: 5,
    fontSize: 20,
    paddingLeft: 20,
    [theme.breakpoints.down("md")]: {
      //only show on mobile or small screen
      paddingLeft: 0,
    },
  },
  infoTextRight: {
    paddingTop: 5,
    fontSize: 20,
    paddingRight: 20,
    [theme.breakpoints.down("md")]: {
      //only show on mobile or small screen
      paddingRight: 0,
    },
  },
  infoImage: {
    width: "90%",
    borderRadius: 7,
    boxShadow: "3px 3px 5px 5px rgb(41 41 41 / 75%)",
    // border: "1px solid #e0e0e0",
  },
  tagline: {
    textAlign: "center",
    fontFamily: "Inter",
  },
  dialogBorder: {
    border: "3px solid black",
    minHeight: 300,
  },
  cancelButton: {
    color: "#080808",
  },
  overflow: {
    overflowY: "inherit",
  },
  buttonDiv: {
    margin: "auto",
    marginBottom: 40,
    flexBasis: "auto",
  },
  button: {
    backgroundColor: "white",
    border: "2px solid black",
    width: 200,
    height: 45,
    margin: "auto",
    marginRight: 10,
    color: "#080808",
    borderColor: "#080808",
    "&:hover": {
      backgroundColor: "#080808",
      color: "#ececec",
    },
  },
});
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
      <NavBar
        handleSignInOpen={handleSignInOpen}
        handleSignUpOpen={handleSignUpOpen}
      />
      <div className={classes.mainPageContainer}>
        <Grid container justify="flex-start">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={classes.mainBackground}
          >
            <Grid container elevation={0} className={classes.backgroundFlex}>
              <Grid item xs={12} md={6} className={classes.halfDivLeft}></Grid>
              <Grid item xs={12} md={6} className={classes.halfDivRight}></Grid>
            </Grid>
            <Grid
              container
              alignContent="center"
              alignItems="center"
              elevation={0}
              className={classes.rowContentContainer}
            >
              {/* FIRST ROW */}
              <Grid container className={classes.singleGridRow}>
                <Grid item sm={12} md={5}>
                  <div className={classes.infoTextDivLeft}>
                    <Typography
                      variant="h2"
                      component="h2"
                      className={classes.infoTitle}
                    >
                      Organize Your Tasks
                    </Typography>
                    <div className={classes.infoTextLeft}>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.infoTextLeft}
                      >
                        Take control of your day to day tasks and order them
                        into multiple lists to ensure you're always getting the
                        right work done.
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={7}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={fullScreenShot}
                    alt="test"
                    className={classes.infoImage}
                  />
                </Grid>
              </Grid>
              {/* SECOND ROW */}
              <Grid container className={classes.singleGridRowReverse}>
                <Grid
                  item
                  sm={12}
                  md={7}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={addTodoScreenShot}
                    alt="test"
                    className={classes.infoImage}
                  />
                </Grid>
                <Grid item sm={12} md={5}>
                  <div className={classes.infoTextDivRight}>
                    <Typography
                      variant="h2"
                      component="h2"
                      className={classes.infoTitle}
                    >
                      Add Detailed Tasks
                    </Typography>
                    <div className={classes.infoTextRight}>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.infoTextRight}
                      >
                        Set due dates to never miss a deadline and add longer
                        descriptions for more complex tasks.
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              {/* THIRD ROW */}
              <Grid container className={classes.singleGridRow}>
                <Grid item sm={12} md={5}>
                  <div className={classes.infoTextDivLeft}>
                    <Typography
                      variant="h2"
                      component="h2"
                      className={classes.infoTitle}
                    >
                      Create Multiple Lists
                    </Typography>
                    <div className={classes.infoTextLeft}>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.infoTextLeft}
                      >
                        Create color coded lists to organize and keep track of
                        tasks in different categories.
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={7}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={addListScreenShot}
                    alt="test"
                    className={classes.infoImage}
                  />
                </Grid>
              </Grid>
              {/* FOURTH ROW */}
              <Grid container className={classes.singleGridRowReverse}>
                <Grid
                  item
                  sm={12}
                  md={7}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={firebaseScreenShot}
                    alt="test"
                    className={classes.infoImage}
                  />
                </Grid>
                <Grid item sm={12} md={5}>
                  <div className={classes.infoTextDivRight}>
                    <Typography
                      variant="h2"
                      component="h2"
                      className={classes.infoTitle}
                    >
                      Always In Sync
                    </Typography>
                    <div className={classes.infoTextRight}>
                      <Typography
                        variant="h4"
                        component="h4"
                        className={classes.infoTextRight}
                      >
                        With the sync indicator, you can always be sure your
                        tasks are being saved to the cloud.
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className={classes.buttonDiv}>
                  <Button onClick={handleSignUpOpen} className={classes.button}>
                    Get Started
                  </Button>
                </Grid>
              </Grid>
              {/* FOOTER */}
              <Footer />
            </Grid>
          </Grid>
        </Grid>
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
      <Dialog border={2} open={signInOpen} aria-labelledby="form-dialog-title">
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
  );
  /* #endregion */
}

export default withStyles(styles)(Home);
