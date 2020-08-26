// Justin Edwards
// 08/26/2020
// This file contains the connection to the firestore database
// on firebase and queries used to perform CRUD operations

import * as firebase from "firebase/app";
import "firebase/firestore";

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

// return list of all todos in collection
export const getAllTodos = async() => {
    let collection = await db.collection("todos")
    .get()
    .catch(error => {
        console.log("Error getting documents: ", error);
    });
    return collection;
}

// add new todo to db
export const addtodo = async (body) => {
    let taskRef = await db.collection("todos").add({
        body: body,
        // store current time in todo doc
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        status: "pending"   // automatic set to pending
    })
    .catch(error => {
        console.log("Error adding todo: ", error);
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
        console.log("Error updating body: ", error)
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
        console.log("Error updating status: ", error);
    })
    return taskRef;
}

// delete a todo
export const deleteTodo = async (id) => {
    let taskRef = await db.collection("todos")
    .doc(id)
    .delete()
    .catch(error => {
        console.log("Error deleting todo: ", error);
    })
    return taskRef;
}
