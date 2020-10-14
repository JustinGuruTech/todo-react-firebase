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
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import { OfflinePin, AccountBox, Menu } from "@material-ui/icons";
import { useAuthDataContext } from "../../AuthDataProvider";
import ProfileDropdown from "../ProfileDropdown";
import SignInDropdown from "../SignInDropdown";
/* #endregion */

/* #region STYLES */
const styles = (theme) => ({
  mainBar: {
    position: "fixed",
    backgroundColor: "white",
    height: 64,
    borderBottom: "2px solid white",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      //only show on mobile or small screen
      paddingTop: 4,
    },
    // [theme.breakpoints.down(700)]: {
    //   //only show on mobile or small screen
    //   paddingLeft: 0
    // },
  },
  hamburgerDiv: {
    display: "none",
    [theme.breakpoints.down(700)]: {
      //only show on mobile or small screen
      display: "inline-block"
    },
  },
  hamburgerIcon: {
    fontSize: 40,
    color: "#3e3b3b"
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
    color: "#3e3b3b",
  },
  headTitle: {
    color: "#3e3b3b",
    fontFamily: "Inter",
    fontWeight: 800,
    marginLeft: 10,
    [theme.breakpoints.down(315)]: {
      //only show on mobile or small screen
      display: "none"
    },
  },
  profileButton: {
    color: "#3e3b3b"
  },
  profileText: {
    [theme.breakpoints.down(400)]: {
      //only show on mobile or small screen
      display: "none"
    },
  },
  accountIcon: {
    paddingRight: 5,
    fontSize: 30,
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
  const {toggleMobileDrawer} = props;
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
  /* #endregion */

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
        {user ? (
          <div className={classes.hamburgerDiv}>
            <IconButton onClick={toggleMobileDrawer}>
              <Menu className={classes.hamburgerIcon}/>
            </IconButton>
          </div> ) : null }
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
            <Button
              className={classes.profileButton}
              onClick={toggleProfile}
              aria-label="Show profile dropdown"
            >
              <AccountBox className={classes.accountIcon} /> 
              <p className={classes.profileText}>Profile</p>
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
            <Button
              className={classes.profileButton}
              onClick={toggleButtons}
              aria-label="Show sign up & sign in buttons"
            >
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
        )}
      </Toolbar>
    </AppBar>
  );
  /* #endregion */
}

export default withStyles(styles)(NavBar);
