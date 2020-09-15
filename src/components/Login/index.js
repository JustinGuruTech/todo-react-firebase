/* Justin Edwards
 * 09/15/2020
 * Sign Up component - Used in a modal to allow the
 * user to sign up for an account. Uses Firestore/index.js
 * functions for database connectivity
 */

import React, { useState } from 'react';
import {Button, Link, Typography, TextField, Grid, Container, 
    CssBaseline, Avatar, withStyles } from '@material-ui/core';
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
    }
}

function Login(props) {

    const { classes } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange({target}) {
        setEmail(target.value);
    }

    function handlePasswordChange({target}) {
        setPassword(target.value);
    }

    function handleSubmit() {
        Firestore.signInUser(email, password).then(() => {
            console.log("success");
        });
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
                            Sign In
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Don't have an account? Sign Up!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>

    );
};

export default withStyles(styles)(Login);