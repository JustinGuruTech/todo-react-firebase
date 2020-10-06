// Justin Edwards
// 9/25/20
// DetailedAddToDo Component - Opens when user presses add new
// detailed todo. Allows creation of new todo with name, long
// description, tags (eventually), and a due date

/* #region IMPORTS */
import React from "react";
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
import { DateRange, OfflinePin } from "@material-ui/icons";
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
    paddingBottom: 10,
  },
  avatar: {
    margin: "auto",
  },
  iconText: {
    paddingTop: 5,
    textAlign: "center",
  },
  inputHeight: {
    // padding: "10px 12px"
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
  bodyInput: {
    marginBottom: 10,
  },
  dateDiv: {
    textAlign: "center",
  },
  tagsDiv: {
    height: 50,
  },
};
/* #endregion */

function DetailedAddToDo(props) {
  /* #region PROPS/HOOKS */
  // functions from props
  const {
    handleBodyInput,
    handleDescriptionInput,
    handleDateInput,
    handleSaveItem,
  } = props;
  // attributes from props
  const {
    classes,
    formTitle,
    buttonLabel,
    color,
    body,
    description,
    todoDueDate,
    tags,
  } = props;
  /* #endregion */

  /* #region FORM SUBMIT */
  // handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // prevent default post event
    handleSaveItem(); // call handleAddItem in AddToDo/SingleToDo component
  }
  /* #endregion */

  /* #region DATE FORMAT */
  function dateToString(date) {
    // convert to 12 hour AM/PM time
    let suffix = "AM";
    let hours = date.getHours();
    if (hours > 12) {
      hours -= 12;
      suffix = "PM";
    }
    // if (hours < 10) {
    //   hours = "0" + hours;
    // }
    // set minutes appropriately
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let month = date.getMonth() + 1;
    // if (month < 10) {
    //   month = "0" + month;
    // }
    let day = date.getDate();
    // if (day < 10) {
    //   day = "0" + day;
    // }
    let year = date.getYear().toString().slice(1, date.getYear().toString().length);
    console.log(date.getYear());
    

    // if (isToday(date)) {
    //   let strDate = "Today " + hours + ":" + minutes + suffix;
    //   return strDate;
    // }

    // put together string
    let strDate =
      month + 
      "/" +
      day +  /* + "/" + date.getFullYear()*/ 
      "/" + year + " " + 
      hours +
      ":" +
      minutes +
      suffix;
    return strDate;
  }

  // checks if browser supports default date picker
  var isDateSupported = function () {
    var input = document.createElement('input');
    var value = 'a';
    input.setAttribute('type', 'date');
    input.setAttribute('value', value);
    return (input.value !== value);
  };
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
            <div className={classes.formHeader}>
              <Avatar
                className={classes.avatar}
                style={{ backgroundColor: color }}
              >
                <OfflinePin style={{ color: "white" }} />
              </Avatar>
              <Typography className={classes.iconText}>{formTitle}</Typography>
            </div>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="body"
                autoFocus
                // label="Todo Name"
                // placeholder="Todo Name"
                label="Add a todo..."
                name="body"
                value={body}
                // autoComplete="email"
                onChange={handleBodyInput}
                // onBlur={validateName}
                // error={nameError !== ""}
                // helperText={nameError}
                className={classes.bodyInput}
                inputProps={{
                  className: classes.inputHeight,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rowsMax={7}
                variant="outlined"
                fullWidth
                id="description"
                label="Long Description"
                // placeholder="Long Description"
                name="description"
                value={description}
                // autoComplete="email"
                onChange={handleDescriptionInput}
                // onBlur={validateName}
                // error={nameError !== ""}
                // helperText={nameError}
                className={classes.bodyInput}
                InputProps={{
                  className: classes.inputHeight,
                }}
              />
              {/* <TextField
                multiline
                rowsMax={5}
                variant="outlined"
                fullWidth
                id="tags"
                label="Tags"
                // placeholder="Tags"
                name="tags"
                // autoComplete="email"
                // onChange={handleTagChange}
                // onBlur={validateName}
                // error={nameError !== ""}
                // helperText={nameError}
                className={classes.bodyInput}
                InputProps={{
                  className: classes.inputHeight,
                }}
              /> */}
            </Grid>
            {/* <Grid item xs={12} className={classes.tagsDiv}>
              No tags yet
            </Grid> */}
            <Grid item xs={12} className={classes.dateDiv}>
              <TextField
                id="datetime-local"
                label="Due Date (optional)"
                type="datetime-local"
                format="MM-dd-yyyy HH:mm:ss"
                defaultValue={
                  todoDueDate !== undefined && todoDueDate !== "none" ?
                  !isDateSupported() ? dateToString(todoDueDate) : 
                  todoDueDate.toISOString().slice(0, -1) : ""
                }
                placeholder={dateToString(new Date())}
                onChange={handleDateInput}
                className={classes.dateInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              <div>{buttonLabel}</div>
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
  /* #endregion */
}

export default withStyles(styles)(DetailedAddToDo);
