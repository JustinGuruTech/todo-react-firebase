// Justin Edwards
// 08/26/2020
// This file contains the connection to the firestore database
// on firebase and queries used to perform CRUD operations

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// config information saved in .env file for privacy
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// initialize and get ref to firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();

const getUserId = () => {
    // check currentUser exists
    if (auth.currentUser) {
        // return users uid to be used in queries 
        return auth.currentUser.uid;
    // if no user, return a meaningful rejected promise to catch
    } else {
        return Promise.reject("User not found");
    }
}

// return list of all todos in collection
export const getAllTodos = async() => {
    let collection = await db.collection("users").doc(getUserId()).collection("todos")
    .get()
    .catch(error => {
        // log error and return reason for rejection
        console.log("Error getting documents: ", error);
        return Promise.reject("Error loading list");
    });
    return collection;
}

// add new todo to db
export const addTodo = async (body, timestamp) => {
    let taskRef = await db.collection("users").doc(getUserId()).collection("todos").add({
        body: body,
        // store current time in todo doc
        created: timestamp,
        status: "pending"   // automatic set to pending
    })
    .catch(error => {
        // log error and return reason for rejection
        console.log("Error adding todo: ", error);
        return Promise.reject("Error adding item");
    })
    return taskRef;
}

// update body of a todo
export const updateTodoBody = async (id, newBody) => {
    let taskRef = await db.collection("users").doc(getUserId()).collection("todos").doc(id)
    .update({
        body: newBody
    })
    .catch(error => {
        // log error and return reason for rejection
        console.log("Error updating body: ", error);
        return Promise.reject("Error updating body");
    })
    return taskRef;
}

// update status of a todo
export const updateTodoStatus = async (id, newStatus) => {
    let taskRef = await db.collection("users").doc(getUserId()).collection("todos").doc(id)
    .update({
        status: newStatus
    })
    .catch(error => {
        // log error and return reason for rejection
        console.log("Error updating status: ", error);
        return Promise.reject("Error updating status");
    })
    return taskRef;
}

// delete a todo
export const deleteTodo = async (id) => {
    let taskRef = await db.collection("users").doc(getUserId()).collection("todos")
    .doc(id)
    .delete()
    .catch(error => {
        // log error and return reason for rejection
        console.log("Error deleting todo: ", error);
        return Promise.reject("Error deleting item");
    })
    return taskRef;
}

// gets the current timestamp of the db
export const getCurrentTimestamp = () => {
    return firebase.firestore.Timestamp.fromDate(new Date());
}

// creates a user account given a username and password
export const createUserAccount = async (email, password, firstName, lastName) => {
    let taskRef = await auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
        // create a document for the user and store firstName/lastName
        db.collection("users").doc(response.user.uid).set({
            firstName: firstName,
            lastName: lastName,
        })
    })
    .catch(error => {
        console.log("Sign Up Error: ", error);
        // return Promise.reject("Error Signing Up");
        return Promise.reject(error.message);
    })
    return taskRef;
}

// sign in a user given a username and password
export const signInUser = async (email, password, firstName, lastName) => {
    let taskRef = await auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
        // AuthDataProvider.onLogin(response.user);
        return response.user;
    })
    .catch(error => {
        console.log("Sign In Error: ", error);
        // return Promise.reject("Error Signing In");
        return Promise.reject(error.message);
    })
    return taskRef;
}

// sign out the current user
export const signOutUser = async () => {
    let taskRef = await auth.signOut()
    .then(() => {
        console.log("signed out");
    })
    .catch(error => {
        console.log("Error Signing Out: ", error);
        // return Promise.reject("Error Signing Out");
        return Promise.reject(error.message);
    })
    return taskRef;
}

export const getCurrentUser = () => {
    console.log("getCurrentUser: ", auth.currentUser)
    if (auth.currentUser) {
        return auth.currentUser;
    } else {
        console.log("nope");
    }
}
