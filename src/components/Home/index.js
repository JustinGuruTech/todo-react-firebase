/* Justin Edwards
 * 09/15/2020
 * Home Component - Public landing page when user isn't
 * authenticated. Controls pop ups for sign up and sign 
 * in pages
 */

import React, { useState } from 'react';
import {
    Button, Typography,
    AppBar, Toolbar, Paper, Dialog, DialogContent, DialogActions,
    withStyles
} from '@material-ui/core';

import SignUp from '../SignUp';
import Login from '../Login';

const styles = {
    mainContainer: {
        width: "80%",
        height: 300,
        margin: "auto",
        marginTop: 20,
    },
    tagline: {
        textAlign: "center",

    },
    dialogDiv: {
        textAlign: "center"
    },
    buttons: {
        width: 150,
        margin: "auto",
        marginTop: 15
    }
}

function Home(props) {

    const { classes } = props;

    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);

    // closing/opening sign in form
    function handleSignInOpen() {
        setSignUpOpen(false);
        setSignInOpen(true);
    }
    function handleSignInClose() { 
        setSignInOpen(false);
    }
    // closing/opening sign up form
    function handleSignUpOpen() {
        setSignInOpen(false);
        setSignUpOpen(true);
    }
    function handleSignUpClose() {
        setSignUpOpen(false);
    }

    return (
        <Paper elevation={0}
            className={classes.background}>
            {/* AppBar - Main Header */}
            <AppBar color="primary" position="static" style={{ height: 64 }}>
                <Toolbar className={classes.toolbar}>
                    <Typography color="inherit" variant="h4">To-Do</Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={1} className={classes.mainContainer}>
                <Typography variant="h4" component="h4" className={classes.tagline}>
                    To-Do or not To-Do? That is the question.
                </Typography>
                <div className={classes.dialogDiv}>
                    <Button className={classes.buttons} variant="outlined" color="primary" onClick={handleSignUpOpen}>
                        Sign Up
                    </Button>
                    <Dialog open={signUpOpen} onClose={handleSignUpClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <SignUp setSignInModalOpen={handleSignInOpen}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSignUpClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className={classes.dialogDiv}>
                    <Button className={classes.buttons} variant="outlined" color="primary" onClick={handleSignInOpen}>
                        Sign In
                    </Button>
                    <Dialog open={signInOpen} onClose={handleSignInClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <Login setSignUpModalOpen={handleSignUpOpen}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSignInClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Paper>
        </Paper>
    );
}

export default withStyles(styles)(Home);