// Justin Edwards
// 9/21/20
// SideBar Component - Maps list of todo lists into
// Sidebar. Shrinks/expands when hamburger clicked.

/* #region IMPORTS */
import React, { useState } from "react";
import clsx from "clsx";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
  withStyles,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  FiberManualRecord as FiberManualRecordIcon,
  DeleteOutlineOutlined as DeleteIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
/* #endregion */

/* #region STYLES */
const drawerWidth = 300;
const styles = (theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
  },
  sideBarIcon: {
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#3e3b3b",
    color: "white",
    marginTop: "48px",
    "&:hover": {
      backgroundColor: "#3e3b3bc4",
    },
  },
  menuIcons: {
    fontSize: "26px",
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
    fontFamily: "Inter",
  },
});
/* #endregion */

function SideBar(props) {
  /* #region PROPS/HOOKS */
  // prop functions
  const { updateTodoListIndex, handleAddListOpen } = props;
  // prop attributes
  const { classes, todoListList } = props;
  const [open, setOpen] = useState(false);
  const [confirmTrashOpen, setConfirmTrashOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(-1);
  /* #endregion */

  /* #region OPEN/CLOSE DRAWER */
  const toggleDrawer = () => {
    setOpen(!open);
  };
  /* #endregion */

  /* #region REMOVE LIST */
  // open trash confirmation for list deletion
  function openTrashConfirm(id) {
    setListToDelete(id);
    // only allow deletion if more than 1 list
    if (todoListList.length > 1) {
      setConfirmTrashOpen(true);
    } else {
      props.triggerSnackbar("Must Have At Least One List");
    }
  }
  // when the user confirms list deletion
  function handleTrashConfirm() {
    // send list to delete up to TodoPage
    props.deleteListById(listToDelete);
    setConfirmTrashOpen(false); // close popup
  }
  // cancel list deletion
  function handleTrashClose() {
    setConfirmTrashOpen(false);
  }
  /* #endregion */

  /* #region COMPONENT DISPLAY */
  return (
    <div>
      {/* Deletion confirmation */}
      <Dialog
        open={confirmTrashOpen}
        keepMounted
        onClose={handleTrashClose}
        aria-label="Delete confirmation"
        data-testid="confirm-dialog"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo? It will no longer show up
            as a completed item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrashClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleTrashConfirm}
            color="primary"
            data-testid="confirm-delete-btn"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
        {/* SIDEBAR DRAWER */}
        <Divider />
        <List>
          <ListItem
            button
            onClick={toggleDrawer}
            className={classes.sideBarIcon}
          >
            {open ? (
              <div className={classes.openMenuHead}>
                <Typography className={classes.menuHeadText}>Lists</Typography>
                <MenuOpenIcon className={classes.menuIcons} />
              </div>
            ) : (
              <MenuIcon className={classes.menuIcons} />
            )}
          </ListItem>
          {todoListList.map((list, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                updateTodoListIndex(index);
              }}
            >
              <ListItemIcon>
                <FiberManualRecordIcon style={{ color: list.color }} />
              </ListItemIcon>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={list.name} />
              <IconButton
                onClick={() => {
                  openTrashConfirm(list.id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  openTrashConfirm(list.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* NEW LIST BUTTON */}
        {open ? (
          <Button className={classes.addListButton} onClick={handleAddListOpen}>
            + Add List
          </Button>
        ) : null}
        {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
      </Drawer>
    </div>
  );
  /* #endregion */
}

export default withStyles(styles)(SideBar);
