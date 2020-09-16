/* Justin Edwards
 * 09/15/2020
 * Sign Up component - Used in a modal to allow the
 * user to sign up for an account. Uses Firestore/index.js
 * functions for database connectivity
 */

import React, { useState } from 'react';
import {
    Button, Link, Typography, TextField, Grid, Container,
    CssBaseline, Avatar, withStyles, LinearProgress
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'

import * as Firestore from '../Firestore';

const styles = {
    formHeader: {
        marginTop: 15,
        marginBottom: 15,
    },
    avatar: {
        backgroundColor: "#45bd6a",
        margin: "auto",
    },
    iconText: {
        textAlign: "center"
    },
    submit: {
        backgroundColor: "#45bd6a",
        marginTop: 15
    },
    linearProgress: {
        height: 5,
        width: 200,
        backgroundColor: "#f9f9f9"
    },
    signInError: {
        color: "#de2020",
        height: 25,
        paddingTop: 5
    },
    grid: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    },
    signUpLink: {
        cursor: "pointer",
    }
}

function Login(props) {

    const { classes } = props;

    // input hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // error hooks
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signInError, setSignInError] = useState("");
    const [signingIn, setSigningIn] = useState(false);

    // INPUT HANDLERS //
    function handleEmailChange({ target }) {
        setEmail(target.value);
    }
    function handlePasswordChange({ target }) {
        setPassword(target.value);
    }

    // BASIC VALIDATION //
    function validateEmail() {
        // empty email
        if (email === "") {
            setEmailError("Email Required");
            return false;
            // basic regex test for any@any.any - NOT exhaustive
        } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            setEmailError("Enter a valid email");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }
    function validatePassword() {
        // empty password
        if (password === "") {
            setPasswordError("Password Required");
            return false;
            // short password
        } else if (password.length < 6) {
            setPasswordError("Password Too Short");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }

    // handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // prevent default post event
        // check for valid email/password first
        if (validateEmail() && validatePassword()) {
            setSigningIn(false);
            setSignInError("");
            // use information to sign in
            Firestore.signInUser(email, password)
                .then(() => {
                    console.log("success");
                    setSigningIn(false);
                })
                .catch(error => {
                    setSigningIn(false);
                    setSignInError(error);
                });
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.formHeader}>
                        <Avatar className={classes.avatar} color="primary">
                            <AccountCircle />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.iconText}>
                            Sign In
                        </Typography>
                    </div>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleEmailChange}
                                    onBlur={validateEmail}
                                    error={emailError !== ""}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                    onBlur={validatePassword}
                                    error={passwordError !== ""}
                                    helperText={passwordError}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {signingIn ?
                                <div>
                                    <LinearProgress className={classes.linearProgress} />
                                </div> : <div>Sign In</div>}
                        </Button>
                        <Grid container justify="center" className={classes.grid}>
                            <Grid item>
                                <Link onMouseDown={props.setSignUpModalOpen} variant="body2"
                                    className={classes.signUpLink}>
                                    Don't have an account? Sign Up!
                                </Link>
                            </Grid>
                            <Grid item className={classes.signInError}>
                                {signInError}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>

    );
};

export default withStyles(styles)(Login);