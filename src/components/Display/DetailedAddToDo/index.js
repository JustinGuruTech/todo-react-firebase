// Justin Edwards
// 9/25/20
// DetailedAddToDo Component - Opens when user presses add new
// detailed todo. Allows creation of new todo with name, long 
// description, tags (eventually), and a due date

import React from 'react';
import {
    Button, Typography, TextField, Grid, Container,
    CssBaseline, Avatar, withStyles
} from '@material-ui/core';
import { OfflinePin } from '@material-ui/icons'

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
        // padding: "10px 12px"
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

    // functions from props
    const { handleBodyInput, handleDescriptionInput,
        handleDateInput, handleSaveItem } = props;
    // attributes from props
    const { classes, color, todoInput, description,
    todoDueDate, tags } = props;

    // handle form submission
    async function handleSubmit(event) {

        event.preventDefault(); // prevent default post event
        handleSaveItem();    // call handleAddItem in AddToDo component

    }

    return (
        <div className={classes.addListFormContainer}>
            <Container component="main" maxWidth="xs" className={classes.mainContainer}>
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <div className={classes.formHeader}>
                            <Avatar className={classes.avatar} style={{ backgroundColor: color }}>
                                <OfflinePin style={{ color: "white" }} />
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
                                autoFocus
                                // label="Todo Name"
                                // placeholder="Todo Name"
                                label="Add a todo..."
                                name="body"
                                value={todoInput}
                                // autoComplete="email"
                                onChange={handleBodyInput}
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
                                rowsMax={7}
                                variant="outlined"
                                fullWidth
                                id="description"
                                label="Long Description"
                                // placeholder="Long Description"
                                name="description"
                                // autoComplete="email"
                                onChange={handleDescriptionInput}
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
                                label="Due Date (optional)"
                                type="datetime-local"
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