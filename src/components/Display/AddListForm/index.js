// Justin Edwards
// 9/23/20
// AddListForm Component - Opens when user presses add new
// list. Allows creation of new list with name and color to 
// be used for styling

import React, { useState } from 'react';
import ColorPicker from 'material-ui-color-picker';
import {
    Button, Link, Typography, TextField, Grid, Container,
    CssBaseline, Avatar, withStyles, LinearProgress
} from '@material-ui/core';
import { OfflinePin } from '@material-ui/icons'
import { useAuthDataContext } from '../../AuthDataProvider';
import { ChromePicker } from 'react-color';

import * as Firestore from '../../Firestore';

const styles = {
    addListFormContainer: {
        overflow: "visible"
    },
    mainContainer: {
        padding: 0,
        // height: 300
    },
    formHeader: {
        paddingTop: 30,
        paddingRight: 15
    },
    avatar: {
        backgroundColor: "#080808",
        margin: "auto",
    },
    iconText: {
        textAlign: "center"
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
    linearProgress: {
        height: 5,
        width: 200,
        backgroundColor: "#f9f9f9"
    },
    signInError: {
        color: "#de2020",
        height: 25,
        paddingTop: 5,
    },
    grid: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    },
    signUpLink: {
        cursor: "pointer",
        color: "#504949",
        minHeight: 25,
    },
    horizontalFlex: {
        display: "flex",
        padding: 0,
        marginBottom: 20
    },
    colorPicker: {
        marginBottom: 10
    },
    nameInput: {
        marginBottom: 10
    },
    colorPickerInput: {
        '&::after': {
            cursor: "default"
        },
        cursor: "default !important"
    }
}

function Login(props) {

    const { classes } = props;

    // input hooks
    const [name, setName] = useState("");
    const [color, setColor] = useState("#4fc33f");
    // error hooks
    const [nameError, setNameError] = useState("");
    const [colorError, setColorError] = useState("");

    // INPUT HANDLERS //
    function handleNameChange({ target }) {
        setName(target.value);
    }
    function handleColorChange(color) {
        console.log(color);
        setColor(color);
    }

    // BASIC VALIDATION //
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
    function validateColor() {
        // empty color
        if (color === "") {
            setColorError("Color Required");
            return false;
        } else {
            setColorError("");
            return true;
        }
    }

    // handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // prevent default post event
        // check for valid email/password first
        if (validateName() && validateColor()) {
            // setSigningIn(false);
            // setSignInError("");

            // function to add list to db and locally

            // use information to sign in
            // Firestore.signInUser(email, password)
            //     .then((user) => {
            //         setSigningIn(false);
            //         // set user in auth provider
            //         onLogin(user);
            //     })
            //     .catch(error => {
            //         setSigningIn(false);
            //         setSignInError(error);
            //     });
        }
    }

    return (
        <div className={classes.addListFormContainer}>
            <Container component="main" maxWidth="xs" className={classes.mainContainer}>
                <CssBaseline />
                <div className={classes.paper}>
                    
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <div className={classes.horizontalFlex}>
                            <div className={classes.formHeader}>
                                <Avatar className={classes.avatar} color="primary">
                                    <OfflinePin />
                                </Avatar>
                                <Typography component="h1" variant="h5" className={classes.iconText}>
                                    Add List
                                </Typography>
                            </div>
                                <Grid item xs={12}>
                                    <ChromePicker
                                        // variant="outlined"
                                        // required
                                        // fullWidth
                                        // defaultValue={color}

                                        color={color}
                                        // value={color}
                                        name="color"
                                        // label="Color"
                                        id="color"
                                        // autoComplete="current-password"
                                        onChange={handleColorChange}
                                        // onBlur={validateColor}
                                        // error={colorError !== ""}
                                        // helperText={colorError}
                                        // className={classes.colorPicker}
                                    />
                                </Grid>
                            </div>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
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
                                className={classes.submit}>
                                    <div>Create</div>
                            </Button>
                        </form>
                </div>
            </Container>
        </div>

    );
};

export default withStyles(styles)(Login);