/* Justin Edwards
 * 09/16/2020
 * AppBar Component - Reusable AppBar for application. 
 * Checks for auth and conditionally renders profile
 * icon
 */

import React, { useState } from 'react';
import {
    Button, Typography,
    AppBar, Toolbar, Paper, Dialog, DialogContent, DialogActions,
    withStyles
} from '@material-ui/core';
import { OfflinePinIcon } from '@material-ui/icons';

const styles = {

}

function Home(props) {

    const { classes } = props;

    return (
        <AppBar color="primary" position="static" style={{ height: 64 }}>
            <Toolbar className={classes.toolbar}>
                <Typography color="inherit" variant="h4">To-Do</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(Home);