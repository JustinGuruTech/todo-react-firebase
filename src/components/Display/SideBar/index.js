// Justin Edwards
// 9/21/20
// SideBar Component - Maps list of todo lists into 
// Sidebar. Shrinks/expands when hamburger clicked.

import React, { useState } from 'react';
import clsx from 'clsx';
import { Drawer, List, ListItem, ListItemIcon, Typography,
    ListItemText, Divider, withStyles, Button } from '@material-ui/core';
import { Menu as MenuIcon,
        MenuOpen as MenuOpenIcon,
        FiberManualRecord as FiberManualRecordIcon} from '@material-ui/icons';

const drawerWidth = 300;

const styles = theme => ({
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,

      },
      sideBarIcon: {
          paddingTop: 20,
          paddingBottom: 15,
          backgroundColor: "#3e3b3b",
          color: "white",
          marginTop: '48px',
          '&:hover': {
              backgroundColor: "#3e3b3bc4"
          }
      },
      menuIcons: {
          fontSize: "26px"
      },
      openMenuHead: {
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          fontFamily: "Inter",
      },
      menuHeadText: {
          fontWeight: "bold",
          fontFamily: "Inter"
      }
})

function SideBar(props) {

    const { classes } = props;
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />
        <List>
            <ListItem button onClick={toggleDrawer} className={classes.sideBarIcon}>
                {open ? <div className={classes.openMenuHead}>
                            <Typography className={classes.menuHeadText}>Lists</Typography>
                            <MenuOpenIcon className={classes.menuIcons} />
                        </div> : 
                <MenuIcon className={classes.menuIcons} /> } 
            </ListItem>
          {props.todoListList.map((list, index) => (
            <ListItem button key={index} onClick={() => {props.updateTodoListIndex(index)}}>
              <ListItemIcon><FiberManualRecordIcon style={{color: list.color}} /></ListItemIcon>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {open ? <Button className={classes.addListButton}
        onClick={props.handleAddListOpen}>
          + Add List
        </Button> : null }
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    )
}

export default withStyles(styles)(SideBar);