import { createTodo } from "./factories/todoFactory.js";
import { addTodo } from "./Todo.js";
import { render } from "./DOM.js";

function handleAddTodoBtnClick() {
	const modal = document.getElementById("todo-modal");
	modal.style.display = "block";

	const addBtn = document.querySelector("#addTodoBtn");
	addBtn.classList.remove("active");
	addBtn.classList.toggle("hidden");
}

function closeTodoModal() {
	// it seems i do not need to auto close the modal, ill just add a cancel button
	const modal = document.getElementById("todo-modal");
	modal.style.display = "none";

	const addBtn = document.querySelector("#addTodoBtn");
	addBtn.classList.remove("hidden");
	addBtn.classList.toggle("active");
}

// this should handle the submitted todo from
function handleAddTodo() {
	const newTodo = createTodo(userInput);
	addTodo(newTodo);
	render();
}

export function initListeners() {
	document
		.querySelector(".add-todo-btn")
		.addEventListener("click", handleAddTodoBtnClick);

	// close modal
	document
		.querySelector("#cancelBtn")
		.addEventListener("click", closeTodoModal);

	document.querySelector("#addBtn");
}
