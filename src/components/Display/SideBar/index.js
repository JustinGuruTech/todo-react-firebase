import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Drawer, List, ListItem, ListItemIcon, Typography,
    ListItemText, Divider, withStyles, useTheme } from '@material-ui/core';
import { Inbox as InboxIcon, Mail as MailIcon,
        Menu as MenuIcon,
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
    // drawer: {
    //     width: drawerWidth
    // },
    // drawerPaper: {
    //     width: drawerWidth
    // }
})

function SideBar(props) {

    const { classes } = props;
    const [open, setOpen] = useState(false);
    const [todoListList, setTodoListList] = useState([]);

    useEffect(() => {
      const tempList = [{name: "Primary", color: "#4fc33f", todos: {}}, {name: "Movies", color: "#bb2b2b", todos: {}}]
      setTodoListList(tempList);
    }, []);

    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    }

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
          {todoListList.map((list) => (
            <ListItem button key={list.name}>
              <ListItemIcon><FiberManualRecordIcon style={{color: list.color}} /></ListItemIcon>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
}

export default withStyles(styles)(SideBar);