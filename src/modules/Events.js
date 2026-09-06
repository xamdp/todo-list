
import { createTodo } from './factories/todoFactory.js'
import { addTodo, getTodos } from "./Todo.js";
import { createTodoForm, render } from "./DOM.js";

function handleAddTodoBtnClick() {
	const form = createTodoForm();
	render(document.querySelector('.todos-container'), form)
	handleOpenFormClick();
}

function handleOpenFormClick() {
	const modal = document.getElementById("todo-modal")
	modal.showModal();
}

function handleCloseFormClick() {
	const modal = document.querySelector("#todo-modal")
	modal.close();
}

export function initListeners() {
	document.querySelector(".add-todo-btn").addEventListener('click', handleAddTodoBtnClick)

	//open modal,
	// document.querySelector(".add-todo-btn").addEventListener('click', handleOpenFormClick)

	// close modal
	// document.querySelector(".close-btn").addEventListener('click', handleCloseFormClick)

}


function handleAddTodoClick() {
	const newTodo = createTodo(userInput)
	addTodo(newTodo);
	render();
}



