import { createTodo } from "./factories/todoFactory.js";
import { addTodo } from "./Todo.js";
import { render } from "./DOM.js";

function handleAddTodoBtnClick() {
	const modal = document.getElementById("todo-modal");
	console.log(modal);
	modal.style.display = "block";
}

function closeTodoModal() {
	// it seems i do not need to auto close the modal, ill just add a cancel button
	const modal = document.getElementById("todo-modal");
	modal.style.display = "none";
}

export function initListeners() {
	document
		.querySelector(".add-todo-btn")
		.addEventListener("click", handleAddTodoBtnClick);

	// close modal
	document
		.querySelector("#cancelBtn")
		.addEventListener("click", closeTodoModal);
}

function handleAddTodoClick() {
	const newTodo = createTodo(userInput);
	addTodo(newTodo);
	render();
}
