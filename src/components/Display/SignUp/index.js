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
import { LockOutlined } from '@material-ui/icons';

import * as Firestore from '../../Firestore';
import { useAuthDataContext } from '../../AuthDataProvider';

const styles = {
    formHeader: {
        marginTop: 15,
        marginBottom: 15,
    },
    icon: {
        backgroundColor: "#080808",
        margin: "auto",
    },
    iconText: {
        textAlign: "center"
    },
    submit: {
        backgroundColor: "#080808",
        marginTop: 15,
        height: 36,
        color: 'white',
        '&:hover': {
            backgroundColor: "ececec",
            color: "#080808"
        }
    },
    linearProgress: {
        height: 5,
        width: 200,
        backgroundColor: "#f9f9f9"
    },
    signUpError: {
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
    signInLink: {
        cursor: "pointer",
        color: "#504949",
        minHeight: 25,
    }
}

function SignUp(props) {

    const { classes } = props;
    const { onLogin } = useAuthDataContext();

    // input hooks
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // error hooks
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const [signingUp, setSigningUp] = useState(false);

    // INPUT HANDLERS //
    function handleFirstNameChange({ target }) { setFirstName(target.value); }
    function handleLastNameChange({ target }) { setLastName(target.value); }
    function handleEmailChange({ target }) { setEmail(target.value); }
    function handlePasswordChange({ target }) { setPassword(target.value); }
    function handleConfirmPasswordChange({ target }) { setConfirmPassword(target.value); }

    // BASIC VALIDATION //
    function validateFirstName() {
        // empty first name
        if (firstName === "") {
            setFirstNameError("First Name Required");
            return false;
        } else {
            setFirstNameError("");
            return true;
        }
    }
    function validateLastName() {
        // empty last name
        if (lastName === "") {
            setLastNameError("Last Name Required")
            return false;
        } else {
            setLastNameError("");
            return true;
        }
    }
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
            setPasswordError("");
            return true;
        }
    }
    function validateConfirmPassword() {
        // empty confirm password
        if (password === "") {
            setConfirmPasswordError("Password Confirmation Required");
            return false;
            // password confirmation mismatch
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords Must Match");
            return false;
        } else {
            setConfirmPasswordError("");
            return true;
        }
    }

    // handle submit form
    function handleSubmit(event) {
        event.preventDefault(); // prevent default post
        // check for all valid inputs
        if (validateFirstName && validateLastName && validateEmail
            && validatePassword && validateConfirmPassword) {
            // hooks for sign up indication/error
            setSigningUp(true);
            setSignUpError("");
            // attempt to create user in firebase
            Firestore.createUserAccount(email, password, firstName, lastName)
                .then(user => {
                    setSigningUp(false);
                    console.log("signup: ", user);
                    onLogin(user);
                })
                .catch(error => {
                    setSigningUp(false);
                    setSignUpError(error);
                });
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.formHeader}>
                        <Avatar className={classes.icon}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.iconText}>
                            Sign up
                        </Typography>
                    </div>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleFirstNameChange}
                                    onBlur={validateFirstName}
                                    error={firstNameError !== ""}
                                    helperText={firstNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={handleLastNameChange}
                                    onBlur={validateLastName}
                                    error={lastNameError !== ""}
                                    helperText={lastNameError}
                                />
                            </Grid>
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
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={handleConfirmPasswordChange}
                                    onBlur={validateConfirmPassword}
                                    error={confirmPasswordError !== ""}
                                    helperText={confirmPasswordError}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            {signingUp ?
                                <div>
                                    <LinearProgress className={classes.linearProgress} />
                                    {/* <p>Test</p> */}
                                </div> : <div>Sign Up</div>}
                        </Button>
                        <Grid container className={classes.grid}>
                            <Grid item>
                                <Link onMouseDown={props.setSignInModalOpen} variant="body2"
                                className={classes.signInLink}>
                                    Already have an account? Sign in!
                                </Link>
                            </Grid>
                            <Grid item className={classes.signUpError}>
                                {signUpError}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>

    );
};

export default withStyles(styles)(SignUp);