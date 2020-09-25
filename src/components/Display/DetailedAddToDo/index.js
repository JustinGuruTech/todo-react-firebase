// Justin Edwards
// 9/25/20
// AddDetailedToDo Component - Opens when user presses add new
// detailed todo. Allows creation of new todo with name, long 
// description, tags (eventually), and a due date

import React, { useState } from 'react';
import {
    Button, Typography, TextField, Grid, Container,
    CssBaseline, Avatar, withStyles, TextareaAutosize
} from '@material-ui/core';
import { OfflinePin } from '@material-ui/icons'
import { ChromePicker } from 'react-color';

import * as Firestore from '../../Firestore';

const styles = {
    addListFormContainer: {
        overflow: "visible"
    },
    mainContainer: {
        padding: 0,
    },
    formHeader: {
        paddingBottom: 10
    },
    avatar: {
        margin: "auto",
    },
    iconText: {
        paddingTop: 5,
        textAlign: "center"
    },
    inputHeight: {
        padding: "10px 12px"
    },
    submit: {
        backgroundColor: "#080808",
        marginTop: 15,
        color: "white",
        '&:hover': {
            color: "#080808",
            backgroundColor: "#ececec"
        }
    },
    signInError: {
        color: "#de2020",
        height: 25,
        paddingTop: 5,
    },
    horizontalFlex: {
        display: "flex",
        padding: 0,
        marginBottom: 20
    },
    bodyInput: {
        marginBottom: 10
    },
    dateDiv: {
        textAlign: "center"
    },
    tagsDiv: {
        height: 50,
    }
}

function DetailedAddToDo(props) {

    const { handleDetailedAddButton } = props;
    const { classes, color } = props;

    // input hooks
    const [body, setBody] = useState("");
    const [bodyError, setBodyError] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("none");
    const [tags, setTags] = useState([]);

    // INPUT HANDLERS //
    function handleBodyChange({ target }) {
        setBody(target.value);
    }
    function handleDescriptionChange({ target }) {
        setDescription(target.value);
    }
    function handleTagChange({ target }) {
        setDueDate(target.value);
    }
    function handleDateChange({ target }) {
        setDueDate(target.value);
    }

    // BASIC VALIDATION //
    function validateBody() {
        // empty name
        if (body === "") {
            setBodyError("Name Required");
            return false;
        } else {
            setBodyError("");
            return true;
        }
    }

    // handle form submission
    async function handleSubmit(event) {
        // event.preventDefault(); // prevent default post event
        // // check for valid email/password first
        // if (validateBody()) {
        //     // will be used for loading symbol
        //     // props.handleAddingList();

        //     // waits for addList to return new list
        //     await Firestore.addNewTodoList(name, color)
        //     .then((newList) => {
        //         // show snackbar
        //         props.handleSnackbarOpen();
        //         props.handleAddListClose();
        //         // add list of todos with dummy flag
        //         newList.todos = [{id: -1}];
        //         props.setListToAddLocally(newList);
        //     })
        //     .catch(() => {
        //         // setAddListError(true);
        //         props.handleAddListError();
        //         props.handleSnackbarOpen();
        //     })
            
        // }
    }

    return (
        <div className={classes.addListFormContainer}>
            <Container component="main" maxWidth="xs" className={classes.mainContainer}>
                <CssBaseline />
                <div className={classes.paper}>
                    
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <div className={classes.formHeader}>
                                    <Avatar className={classes.avatar} style={{backgroundColor: color}}>
                                        <OfflinePin style={{color: "white"}} />
                                    </Avatar>
                                    <Typography component="h1" variant="h5" className={classes.iconText}>
                                        Add New Todo
                                    </Typography>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="body"
                                        // label="Todo Name"
                                        placeholder="Todo Name"
                                        name="body"
                                        // autoComplete="email"
                                        onChange={handleBodyChange}
                                        // onBlur={validateName}
                                        // error={nameError !== ""}
                                        // helperText={nameError}
                                        className={classes.bodyInput}
                                        inputProps={{
                                            className: classes.inputHeight
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rowsMax={5}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        placeholder="Long Description"
                                        name="description"
                                        // autoComplete="email"
                                        onChange={handleDescriptionChange}
                                        // onBlur={validateName}
                                        // error={nameError !== ""}
                                        // helperText={nameError}
                                        className={classes.bodyInput}
                                        InputProps={{
                                            className: classes.inputHeight
                                        }}
                                    />
                                    <TextField
                                        multiline
                                        rowsMax={5}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="tags"
                                        placeholder="Tags"
                                        name="tags"
                                        // autoComplete="email"
                                        onChange={handleTagChange}
                                        // onBlur={validateName}
                                        // error={nameError !== ""}
                                        // helperText={nameError}
                                        className={classes.bodyInput}
                                        InputProps={{
                                            className: classes.inputHeight
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.tagsDiv}>
                                    No tags yet
                                </Grid>
                                <Grid item xs={12} className={classes.dateDiv}>
                                    <TextField
                                        id="datetime-local"
                                        label="Due Date"
                                        type="datetime-local"
                                        onChange={handleDateChange}
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
                                className={classes.submit}>
                                    <div>Create</div>
                            </Button>
                        </form>
                </div>
            </Container>
        </div>

    );
};

export default withStyles(styles)(DetailedAddToDo);