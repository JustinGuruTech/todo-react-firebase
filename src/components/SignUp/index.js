/* Justin Edwards
 * 09/15/2020
 * Sign Up component - Used in a modal to allow the
 * user to sign up for an account. Uses Firestore/index.js
 * functions for database connectivity
 */

import React, { useState, useEffect } from 'react';
import {
    Paper, Button, Link, CircularProgress, Typography,
    TextField, Grid, FormControlLabel, Checkbox, Box,
    Container, CssBaseline, Avatar,
    withStyles
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons'

import * as Firestore from '../Firestore';

const styles = {
    formHeader: {
        marginTop: 15,
        marginBottom: 15,
    },
    icon: {
        backgroundColor: "#3f51b5",
        margin: "auto",
    },
    iconText: {
        textAlign: "center"
    },
    submit: {
        backgroundColor: "#3f51b5",
        marginTop: 15
    }
}

function SignUp(props) {

    const { classes } = props;

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
                    <form className={classes.form} noValidate>
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
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in!
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>

    );
};

export default withStyles(styles)(SignUp);