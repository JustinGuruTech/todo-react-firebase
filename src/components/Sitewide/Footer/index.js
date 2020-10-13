/* Justin Edwards
 * 09/16/2020
 * AppBar Component - Reusable AppBar for application.
 * Checks for auth and conditionally renders profile
 * icon
 */

/* #region IMPORTS */
import React from "react";
import { Typography, Grid, Icon, withStyles } from "@material-ui/core";

import {
  GitHub as GitHubIcon,
  ImportContacts as ImportContactsIcon,
} from "@material-ui/icons";
/* #endregion */

/* #region STYLES */
const styles = (theme) => ({
  footer: {
    height: 100,
    // backgroundColor: "#3d3a3a",
    // color: "white",
  },
  footerLeft: {
    paddingRight: 10,
    borderTop: "5px solid",
    display: "flex",
    justifyContent: "center",
  },
  footerRight: {
    paddingLeft: 10,
    borderTop: "5px solid",
    display: "flex",
    justifyContent: "center",
  },
  socialLink: {
    color: "white",
    textAlign: "center",
    margin: "auto 0",
  },
});
/* #endregion */

function Footer(props) {
  /* #region PROPS/HOOKS */
  // prop functions
  const { classes, dark } = props;
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <Grid
      container
      className={classes.footer}
      style={{
        backgroundColor:
          dark !== undefined ? (dark ? "#3d3a3a" : "white") : "#3d3a3a",
        color: dark !== undefined ? (dark ? "white" : "#3d3a3a") : "white",
        borderColor: dark !== undefined ? (dark ? "white" : "#3d3a3a") : "white"
      }}
    >
      <Grid className={classes.footerLeft} item xs={6}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/TheDizruptor/todo-react-firebase"
          style={{
            backgroundColor:
              dark !== undefined ? (dark ? "#3d3a3a" : "white") : "#3d3a3a",
            color: dark !== undefined ? (dark ? "white" : "#3d3a3a") : "white",
            borderColor: dark !== undefined ? (dark ? "white" : "#3d3a3a") : "white"
          }}
          className={classes.socialLink}
        >
          <Icon component={GitHubIcon} />
          <Typography>View Source Code </Typography>
        </a>
      </Grid>
      <Grid className={classes.footerRight} item xs={6}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://TheDizruptor.com"
          className={classes.socialLink}
          style={{
            backgroundColor:
              dark !== undefined ? (dark ? "#3d3a3a" : "white") : "#3d3a3a",
            color: dark !== undefined ? (dark ? "white" : "#3d3a3a") : "white",
            borderColor: dark !== undefined ? (dark ? "white" : "#3d3a3a") : "white"
          }}
        >
          <Icon component={ImportContactsIcon} />
          <Typography>See My Portfolio</Typography>
        </a>
      </Grid>
    </Grid>
  );
  /* #endregion */
}

export default withStyles(styles)(Footer);
