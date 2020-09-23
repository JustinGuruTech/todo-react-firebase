import React, { useState } from 'react';
import { Button, withStyles } from '@material-ui/core';


import Todo from '../Todo';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

const styles = theme => ({
    navBar: {
        position: "absolute",
        width: "100%",
        zIndex: theme.zIndex.drawer + 1
    },
    sideBar: {
        overflow: "auto",
    },
    todoPageContainer: {
        display: "flex"
    },
})

function TodoPage(props) {

    const { classes } = props;
    // const [todoLists, setTodoLists] = useState({})

    return (
        <div className={classes.todoPageContainer}>
            <div className={classes.navBar}>
                <NavBar />
            </div>
            <div className={classes.sideBar}>
                <SideBar />
            </div>
            <Todo className={classes.todoMain}/>
        </div>
    )
}

export default withStyles(styles)(TodoPage);