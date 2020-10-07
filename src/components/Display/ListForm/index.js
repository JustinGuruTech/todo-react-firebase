/* Justin Edwards
 * 10/06/20
 * ListForm Component - Form for adding a new list
 * or editing an existing list.
 * 
 * REQUIRED PROPS
 * name, setName - hook used to get value set 
 *    on form for name into the parent hook
 * color, setColor - hook used to get value set
 *    on form for color into the parent hook
 * handleSubmitOut - parent function that is called 
 *    from the child when the form is submitted
 * 
 * OPTIONAL PROPS
 * submitLabel - label for submit, defaults to 
 *    "Submit"
 * editing - if true, uses values from list to 
 *    edit, otherwise initializes with empty values

/* #region IMPORTS */
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Grid,
  Container,
  CssBaseline,
  Avatar,
  withStyles,
} from "@material-ui/core";
import { OfflinePin } from "@material-ui/icons";
import { ChromePicker } from "react-color";
/* #endregion */

/* #region STYLES */
const styles = {
  addListFormContainer: {
    overflow: "visible",
  },
  mainContainer: {
    padding: 0,
  },
  formHeader: {
    paddingTop: 30,
    paddingRight: 15,
  },
  avatar: {
    margin: "auto",
  },
  iconText: {
    paddingTop: 5,
    textAlign: "center",
  },
  submit: {
    backgroundColor: "#080808",
    marginTop: 15,
    color: "white",
    "&:hover": {
      color: "#080808",
      backgroundColor: "#ececec",
    },
  },
  signInError: {
    color: "#de2020",
    height: 25,
    paddingTop: 5,
  },
  horizontalFlex: {
    display: "flex",
    padding: 0,
    marginBottom: 20,
  },
  nameInput: {
    marginBottom: 10,
  },
};
/* #endregion */

function AddListForm(props) {
  /* #region PROPS/HOOKS */
  const {
    classes,
    name,
    setName,
    color,
    setColor,
    handleSubmitOut,
    submitLabel,
    editing,
  } = props;
  const [nameError, setNameError] = useState("");
  /* #endregion */

  /* #region STARTUP */
  // on startup, check if it's in edit mode. If so, return
  // if not, set values to ""
  useEffect(() => {
    if (editing) {
      return;
    }
    setName("");
    setColor("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  /* #region INPUT HANDLERS */
  function handleNameChange({ target }) {
    setName(target.value);
  }
  function handleColorChange(color) {
    setColor(color.hex);
  }
  /* #endregion */

  /* #region BASIC VALIDATION */
  function validateName() {
    // empty name
    if (name === "") {
      setNameError("Name Required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  }
  /* #endregion */

  /* #region FORM SUBMISSION */
  // handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // prevent default post event
    // check for valid email/password first
    if (validateName()) {
      handleSubmitOut();
    }
  }
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <div className={classes.addListFormContainer}>
      <Container
        component="main"
        maxWidth="xs"
        className={classes.mainContainer}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <div className={classes.horizontalFlex}>
              <div className={classes.formHeader}>
                <Avatar
                  className={classes.avatar}
                  style={{ backgroundColor: color }}
                >
                  <OfflinePin style={{ color: "white" }} />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.iconText}
                >
                  Add List
                </Typography>
              </div>
              <Grid item xs={12}>
                <ChromePicker
                  color={color}
                  name="color"
                  id="color"
                  onChange={handleColorChange}
                />
              </Grid>
            </div>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="List Name"
                name="name"
                value={name}
                // autoComplete="email"
                onChange={handleNameChange}
                onBlur={validateName}
                error={nameError !== ""}
                helperText={nameError}
                className={classes.nameInput}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              <div>{submitLabel !== undefined ? submitLabel : "Submit"}</div>
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
  /* #endregion */
}

export default withStyles(styles)(AddListForm);
