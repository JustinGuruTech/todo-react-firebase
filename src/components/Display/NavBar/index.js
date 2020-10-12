/* Justin Edwards
 * 09/16/2020
 * AppBar Component - Reusable AppBar for application.
 * Checks for auth and conditionally renders profile
 * icon
 */

/* #region IMPORTS */
import React, { useState } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import { OfflinePin, AccountBox } from "@material-ui/icons";
import { useAuthDataContext } from "../../AuthDataProvider";
import ProfileDropdown from "../ProfileDropdown";
import SignInDropdown from "../SignInDropdown";
/* #endregion */

/* #region STYLES */
const styles = theme => ({
  mainBar: {
    position: "fixed",
    backgroundColor: "white",
    height: 64,
    borderBottom: "2px solid #3e3b3b",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      //only show on mobile or small screen
      paddingTop: 4
    },
  },
  menuIcon: {
    color: "black",
    fontSize: 40,
    position: "relative",
  },
  iconText: {
    display: "flex",
  },
  icon: {
    fontSize: 40,
    marginRight: 10,
    color: "#3e3b3b",
  },
  headTitle: {
    color: "#3e3b3b",
    fontFamily: "Inter",
    fontWeight: 800,
  },
  profileButton: {},
  accountIcon: {
    paddingRight: 5,
  },
  profileDropdown: {
    position: "absolute",
  },
  buttonsDiv: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  buttons: {
    width: 150,
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

function NavBar(props) {
  /* #region PROPS/HOOKS */
  // prop functions
  const { classes } = props;
  const { user } = useAuthDataContext();
  const [profileOpen, setProfileOpen] = useState(false); // profile open/closed
  const [buttonsOpen, setButtonsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // anchor for profile dropdown
  /* #endregion */

  /* #region PROFILE OPEN/CLOSE */
  // toggle profile being open/closed
  function toggleProfile(event) {
    setProfileOpen(!profileOpen);
    setAnchorEl(event.currentTarget);
  }

  // // will be used later to close profile when clicking outside of it
  // function closeProfile() {
  //     setProfileOpen(false);
  // }
  /* #endregion */

  function toggleButtons(event) {
    setButtonsOpen(!buttonsOpen);
    setAnchorEl(event.currentTarget);
  }

  /* #region COMPONENT DISPLAY */
  return (
    <AppBar className={classes.mainBar} position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.iconText}>
          {/* <Menu className={classes.menuIcon} /> */}
          <OfflinePin className={classes.icon} />
          <Typography
            className={classes.headTitle}
            color="inherit"
            variant="h4"
          >
            To-Do
          </Typography>
        </div>
        {user ? (
          <div className={classes.iconText}>
            <Button className={classes.profileButton} onClick={toggleProfile}>
              <AccountBox className={classes.accountIcon} /> Profile
            </Button>
            {profileOpen ? (
              <ProfileDropdown
                className={classes.profileDropdown}
                anchorEl={anchorEl}
              />
            ) : null}
          </div>
        ) : (
          <div className={classes.iconText}>
            <Button className={classes.profileButton} onClick={toggleButtons}>
              <AccountBox className={classes.accountIcon} />
            </Button>
            {buttonsOpen ? (
              <SignInDropdown
                handleSignInOpen={props.handleSignInOpen}
                handleSignUpOpen={props.handleSignUpOpen}
                className={classes.profileDropdown}
                anchorEl={anchorEl}
              />
            ) : null}
          </div>

          // <div className={classes.buttonsDiv}>
          //   <Button
          //     className={classes.buttons}
          //     variant="outlined"
          //     onClick={handleSignUpOpen}
          //   >
          //     Sign Up
          //   </Button>
          //   <Button
          //     className={classes.buttons}
          //     variant="outlined"
          //     onClick={handleSignInOpen}
          //   >
          //     Sign In
          //   </Button>
          // </div>
        )}
      </Toolbar>
    </AppBar>
  );
  /* #endregion */
}

export default withStyles(styles)(NavBar);
