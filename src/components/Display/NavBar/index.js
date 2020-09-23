/* Justin Edwards
 * 09/16/2020
 * AppBar Component - Reusable AppBar for application. 
 * Checks for auth and conditionally renders profile
 * icon
 */

import React, { useState } from 'react';
import {
    Button, Typography, AppBar, Toolbar,
    withStyles } from '@material-ui/core';
import { OfflinePin, AccountBox } from '@material-ui/icons';
import { useAuthDataContext } from '../../AuthDataProvider';
import ProfileDropdown from '../ProfileDropdown';

const styles = {
    mainBar: {
        backgroundColor: "white",
        height: 64,
        borderBottom: "2px solid #3e3b3b"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuIcon: {
        color: "black",
        fontSize: 40,
        position: "relative"
    },
    iconText: {
        display: "flex"
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
    },
    profileButton: {

    },
    accountIcon: {
        paddingRight: 5
    },
    profileDropdown: {
        position: "absolute"
    },

}

function NavBar(props) {

    const { classes } = props;
    const { user } = useAuthDataContext();
    const [profileOpen, setProfileOpen] = useState(false);  // profile open/closed
    const [anchorEl, setAnchorEl] = useState(null); // anchor for profile dropdown

    // toggle profile being open/closed
    function toggleProfile(event) {
        setProfileOpen(!profileOpen);
        setAnchorEl(event.currentTarget);
    }

    // // will be used later to close profile when clicking outside of it
    // function closeProfile() {
    //     setProfileOpen(false);
    // }

    return (
        <AppBar className={classes.mainBar} position="static">
            <Toolbar className={classes.toolbar}>
                <div className={classes.iconText}>
                    {/* <Menu className={classes.menuIcon} /> */}
                    <OfflinePin className={classes.icon}/>
                    <Typography className={classes.headTitle} color="inherit" variant="h4">To-Do</Typography>
                </div>
                {user ? <div className={classes.iconText}>
                    <Button className={classes.profileButton} onClick={toggleProfile}>
                        <AccountBox className={classes.accountIcon} /> Profile
                    </Button>
                    { profileOpen ? <ProfileDropdown className={classes.profileDropdown} anchorEl={anchorEl} /> : null}
                </div> : null }
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(NavBar);