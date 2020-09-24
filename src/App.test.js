// import React from 'react';
// import ReactDOM from 'react-dom';
// import { render, fireEvent, getByTestId, getByText, waitFor, queryByTestId, queryByText } from '@testing-library/react';
// import App from './App';
// import AddToDo from './components/AddToDo'
// import SingleToDo from './components/SingleToDo'
// import { act } from 'react-dom/test-utils';

// test('renders main app and syncs with firebase', async() => {

//   const { container, unmount, getByText } = render(<App />, { container: document.getElementById("root") });
//   // wait for Syncing to be done before proceeding
//   await waitFor(() => {
//     expect(container).not.toContainHTML("Syncing");
//   })
//   const linkElement = getByText("To-Do");
//   expect(linkElement).toBeInTheDocument();
//   unmount();
// });

// test('test adding, editing, and deleting todo', async() => {
//   // render app with document.body to get access to dialog
//   const { container, getByText, getByTestId, unmount } = render(<App />, { container: document.getElementById("root") });
//   /*
//     ADDING TODO
//   */
//   // wait for Syncing to be done before proceeding
//   await waitFor(() => {
//     expect(container).not.toContainHTML("Syncing");
//   })
//   // get elements into variables
//   const todoInput = getByTestId("todo-input").querySelector('input');
//   const addButton = getByTestId("add-button");
//   const todoList = getByTestId("todo-list");
//   // change text in todo input to "yeyeye" and add todo
//   fireEvent.change(todoInput, { target: { value: "yeyeye" } } );  // fill in text
//   fireEvent.click(addButton); // add todo
//   // check that added todo shows up in todo list
//   expect(todoList).toContainHTML("yeyeye");

//   /* 
//     EDITING TODO
//   */
//   // wait for Syncing to be done before proceeding
//   await waitFor(() => {
//     expect(container).not.toContainHTML("Syncing");
//   })
//   // get editButton and click it
//   const editButton = getByTestId("edit-button");
//   fireEvent.click(editButton);  // begin edit
//   // set editInput to new value
//   const editInput = getByTestId("edit-input").querySelector('input');
//   fireEvent.change(editInput, { target: { value: "newnew" } } );  // fill in new text
//   // confirm edit to save change
//   const confirmEditButton = getByTestId("confirm-edit-button");
//   fireEvent.click(confirmEditButton);  // confirm edit
//   expect(todoList).toContainHTML("newnew"); // assert change

//   /*
//     DELETING TODO
//   */
//   // wait for Syncing to be done before proceeding
//   await waitFor(() => {
//     expect(container).not.toContainHTML("Syncing");
//   })
//   // get delete icon and click it
//   const deleteIcon = getByTestId("delete-icon");
//   fireEvent.click(deleteIcon);  // click delete icon
//   // wait for modal to pop up
//   await waitFor(() => {
//     expect(container).toContainHTML("Delete");
//   })
//   // get and click confirm delete button
//   const confirmDeleteButton = getByText("Delete");
//   fireEvent.click(confirmDeleteButton);
//   // wait for Syncing to be done before proceeding
//   await waitFor(() => {
//     expect(container).not.toContainHTML("Syncing");
//   })
//   // check todo item was removed
//   expect(todoList).not.toContainHTML("yeyeye");
//   unmount();
// });
