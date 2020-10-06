// Justin Edwards
// 08/26/2020
// This file contains the connection to the firestore database
// on firebase and queries used to perform CRUD operations.
// Also contains authentication functions for user accounts
// and fetching user information

/* #region IMPORTS */
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
/* #endregion */

/* #region FIREBASE CONFIG/INITIALIZATION */
// config information saved in .env file for privacy
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// initialize and get ref to firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
/* #endregion */

/* #region TIMESTAMP GETTER */
// gets the current timestamp of the db
export const getCurrentTimestamp = () => {
  return firebase.firestore.Timestamp.fromDate(new Date());
};
/* #endregion */

/* #region USER FUNCTIONS */
// gets id of signed in user
const getUserId = () => {
  // check currentUser exists
  if (auth.currentUser) {
    // return users uid to be used in queries
    return auth.currentUser.uid;
    // if no user, return a meaningful rejected promise to catch
  } else {
    return Promise.reject("User not found");
  }
};
// creates a user account given a username and password
export const createUserAccount = async (
  email,
  password,
  firstName,
  lastName
) => {
  let taskRef = await auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // create a document for the user and store firstName/lastName
      db.collection("users")
        .doc(response.user.uid)
        .set({
          firstName: firstName,
          lastName: lastName,
        })
        // create initial list called primary
        .then(() => {
          addNewTodoList("Primary", "#46c55c");
        });
      return response.user;
    })
    .catch((error) => {
      console.log("Sign Up Error: ", error);
      // return Promise.reject("Error Signing Up");
      return Promise.reject(error.message);
    });
  return taskRef;
};
// sign in a user given a username and password
export const signInUser = async (email, password) => {
  let taskRef = await auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      // AuthDataProvider.onLogin(response.user);
      return response.user;
    })
    .catch((error) => {
      console.log("Sign In Error: ", error);
      // return Promise.reject("Error Signing In");
      return Promise.reject(error.message);
    });
  return taskRef;
};
// sign out the current user
export const signOutUser = async () => {
  let taskRef = await auth
    .signOut()
    .then(() => {
      console.log("Signed out.");
    })
    .catch((error) => {
      console.log("Error Signing Out: ", error);
      // return Promise.reject("Error Signing Out");
      return Promise.reject(error.message);
    });
  return taskRef;
};
// gets the current users name
export const getCurrentUserFirstLastName = async () => {
  if (auth.currentUser) {
    let taskRef = await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .catch((error) => {
        console.log("Unable to get name");
        return Promise.reject(error.message);
      });
    return taskRef;
  }
};
/* #endregion */

/* #region TODOLIST QUERIES */
// get all todolists for user
export const getAllTodoLists = async () => {
  let collection = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .get()
    .catch((error) => {
      console.log("Error getting lists: ", error);
      return Promise.reject("Error getting lists");
    });
  return collection;
};
// adds new todo list to firestore db
export const addNewTodoList = async (name, color) => {
  let timestamp = getCurrentTimestamp();
  const docRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .add({
      name: name,
      color: color,
      created: timestamp,
    })
    .then((response) => {
      const tempList = {
        id: response.id,
        name: name,
        color: color,
        created: timestamp,
      };
      return tempList;
    })
    .catch((error) => {
      console.log("Error adding list: ", error);
      return Promise.reject("Error adding list");
    });
  return docRef;
};
// remove list from list of lists (lol)
export const removeTodoList = async (listId) => {
  console.log("listId: ", listId);
  const docRef = await db
  .collection("users")
  .doc(getUserId())
  .collection("todoLists")
  .doc(listId)
  .delete()
  .then(() => {
    console.log("deleted");
  })
  .catch(error => {
    console.log("delete error: ", error);
  })
}
/* #endregion */

/* #region TODOS QUERIES */
// gets all todos from a list by listId
export const getAllTodosFromListById = async (listId) => {
  let collection = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .get()
    .catch((error) => {
      console.log("Error getting todos: ", error);
      return Promise.reject("Error getting todos");
    });
  return collection;
};
// add new todo to list specified by listId
export const addTodoToListById = async (listId, body, timestamp) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .add({
      body: body,
      created: timestamp,
      status: "pending",
    })
    .catch((error) => {
      console.log("Error adding todo: ", error);
      return Promise.reject("Error adding todo");
    });
  return taskRef;
};
// update body of a todo in list specified by listId
export const updateTodoBodyByListId = async (listId, id, newBody) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .doc(id)
    .update({
      body: newBody,
    })
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error updating body: ", error);
      return Promise.reject("Error updating body");
    });
  return taskRef;
};
// update status of a todo in list specified by listId
export const updateTodoStatusByListId = async (listId, id, newStatus) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .doc(id)
    .update({
      status: newStatus,
    })
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error updating status: ", error);
      return Promise.reject("Error updating status");
    });
  return taskRef;
};
// just sets an array for now, gotta figure out tag system later
export const setTodoDescriptionByListId = async (listId, id, description) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .doc(id)
    .update({
      description: description,
    })
    .catch((error) => {
      console.log("Error adding description: ", error);
      return Promise.reject("Error adding description");
    });
  return taskRef;
};
// add/edit date for existing todo
export const setTodoDateByListId = async (listId, id, date) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .doc(id)
    .update({
      dueDate: date,
    })
    .catch((error) => {
      console.log("Error adding date: ", error);
      return Promise.reject("Error adding date");
    });
  return taskRef;
};
// just sets an array for now, gotta figure out tag system later
export const setTodoTagsByListId = async (listId, id, tags) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .doc(id)
    .update({
      tags: tags,
    })
    .catch((error) => {
      console.log("Error adding tags: ", error);
      return Promise.reject("Error adding tags");
    });
  return taskRef;
};
// delete a todo from list specified by listId
export const deleteTodoByListId = async (listId, id) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todoLists")
    .doc(listId)
    .collection("todos")
    .doc(id)
    .delete()
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error deleting todo: ", error);
      return Promise.reject("Error deleting item");
    });
  return taskRef;
};
/* #endregion */

/* #region OLD FUNCTIONS FOR SINGLE LIST */
// return list of all todos in collection
export const getAllTodos = async () => {
  let collection = await db
    .collection("users")
    .doc(getUserId())
    .collection("todos")
    .get()
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error getting documents: ", error);
      return Promise.reject("Error loading list");
    });
  return collection;
};
// add new todo to db
export const addTodo = async (body, timestamp) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todos")
    .add({
      body: body,
      // store current time in todo doc
      created: timestamp,
      status: "pending", // automatic set to pending
    })
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error adding todo: ", error);
      return Promise.reject("Error adding item");
    });
  return taskRef;
};
// update body of a todo
export const updateTodoBody = async (id, newBody) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todos")
    .doc(id)
    .update({
      body: newBody,
    })
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error updating body: ", error);
      return Promise.reject("Error updating body");
    });
  return taskRef;
};
// update status of a todo
export const updateTodoStatus = async (id, newStatus) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todos")
    .doc(id)
    .update({
      status: newStatus,
    })
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error updating status: ", error);
      return Promise.reject("Error updating status");
    });
  return taskRef;
};
// delete a todo
export const deleteTodo = async (id) => {
  let taskRef = await db
    .collection("users")
    .doc(getUserId())
    .collection("todos")
    .doc(id)
    .delete()
    .catch((error) => {
      // log error and return reason for rejection
      console.log("Error deleting todo: ", error);
      return Promise.reject("Error deleting item");
    });
  return taskRef;
};
/* #endregion */
