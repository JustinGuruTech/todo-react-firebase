/* Justin Edwards
 * 09/15/2020
 * Home Component - Public landing page when user isn't
 * authenticated. Controls pop ups for sign up and sign 
 * in pages
 */

import React, { useState, useEffect } from 'react';
import {
    Button, Link, Typography, Container, CssBaseline,
    AppBar, Toolbar, Paper, Dialog, DialogTitle, DialogContent, DialogActions,
    withStyles
} from '@material-ui/core';

import SignUp from '../SignUp';
import Login from '../Login';

const styles = {

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
            <div>
                <Button variant="outlined" color="primary" onClick={handleSignUpOpen}>
                    Open form dialog
                </Button>
                <Dialog open={signUpOpen} onClose={handleSignUpClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <SignUp />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSignUpClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Button variant="outlined" color="primary" onClick={handleSignInOpen}>
                    Open form dialog
                </Button>
                <Dialog open={signInOpen} onClose={handleSignInClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <Login />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSignInClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Paper>
    );
}

export default withStyles(styles)(Home);