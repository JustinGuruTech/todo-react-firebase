/* Justin Edwards
 * 09/16/2020
 * AppBar Component - Reusable AppBar for application. 
 * Checks for auth and conditionally renders profile
 * icon
 */

import React from 'react';
import {
    Button, Typography, AppBar, Toolbar,
    withStyles } from '@material-ui/core';
import { OfflinePin } from '@material-ui/icons';
import * as Firestore from '../../Firestore';
import { useAuthDataContext } from '../../AuthDataProvider';

const styles = {
    mainBar: {
        backgroundColor: "white",
        height: 64,
        borderBottom: "2px solid #3e3b3b"
    },
    icon: {
        fontSize: 40,
        marginRight: 10,
        color: "#3e3b3b"
    },
    headTitle: {
        color: "#3e3b3b",
        fontFamily: "Inter",
        fontWeight: 800
    }
}

function NavBar(props) {

    const { classes } = props;
    const { user, onLogout } = useAuthDataContext();
    // handles signing out both in firestore and auth provider
    function handleSignOut() {
        Firestore.signOutUser();
        onLogout();
    }

    return (
        <AppBar className={classes.mainBar} position="static">
            <Toolbar className={classes.toolbar}>
                <OfflinePin className={classes.icon}/>
                <Typography className={classes.headTitle} color="inherit" variant="h4">To-Do</Typography>
                {user ? <Button onClick={handleSignOut}>Sign Out</Button> : null}
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(NavBar);