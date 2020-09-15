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
const auth = firebase.auth();

// return list of all todos in collection
export const getAllTodos = async() => {
    let collection = await db.collection("todos")
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
    let taskRef = await db.collection("todos").add({
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
    let taskRef = await db.collection("todos").doc(id)
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
    let taskRef = await db.collection("todos").doc(id)
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
    let taskRef = await db.collection("todos")
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
export const createUserAccount = async (email, password) => {
    let taskRef = await auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        console.log("created user");
    })
    .catch(error => {
        console.log("error");
    })
    return taskRef;
}

// sign in a user given a username and password
export const signInUser = async (email, password) => {
    let taskRef = await auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log("signed in user");
    })
    .catch(error => {
        console.log("error");
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
        console.log("error");
    })
    return taskRef;
}

export const getCurrentUser = () => {
    if (auth.currentUser !== null) {
        console.log(auth.currentUser.email);
    }
}
