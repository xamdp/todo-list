import DescriptionIcon from "../asset/icons/description.svg";
import DateIcon from "../asset/icons/date.svg";
import PriorityIcon from "../asset/icons/priority.svg";

export function Sidebar() {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	sidebar.textContent = "Todo List";
	document.querySelector(".container").prepend(sidebar);
}

export function Header() {
	const header = document.createElement("header");
	header.className = "heading";

	header.textContent = "My Todo List";

	document.querySelector(".content-wrapper").prepend(header);
}

export function MainContent() {
	const mainContent = document.createElement("div");
	mainContent.className = "main-content";

	document.querySelector(".content-wrapper").append(mainContent);
}

export function TodosContainer() {
	const todosContainer = document.createElement("div");
	todosContainer.className = "todos-container";
	document.querySelector(".main-content").append(todosContainer);

	const form = createTodoForm();
	todosContainer.prepend(form);

	const card = addTodoCard();
	todosContainer.append(card);
}

function addTodoCard() {
	const cardDiv = document.createElement("div");
	cardDiv.className = "card-div";

	const addNewTodoBtn = document.createElement("button");
	addNewTodoBtn.className = "add-todo-btn";
	addNewTodoBtn.textContent = "+  Add Todo";
	cardDiv.append(addNewTodoBtn);
	return cardDiv;
}

// this createTodoForm, must be called when I click the add todo btn
export function createTodoForm() {
	const dialog = document.createElement("dialog");
	dialog.id = "todo-modal";
	const todoForm = document.createElement("form");
	todoForm.className = "todo-form";

	const title = document.createElement("div");
	title.className = "todo-title";
	const titleInput = document.createElement("input");
	titleInput.placeholder = "Finish the Todo User Interface";
	title.append(titleInput);

	// trying to group fields, except the title
	const fieldsContainer = document.createElement("div");
	fieldsContainer.className = "fields-container";

	// need to make fields as button, instead of div
	const description = document.createElement("button");
	description.type = "button";
	description.className = "todo-desc";
	const descriptionText = document.createElement("p");
	descriptionText.textContent = "Description";
	const descriptionIcon = document.createElement("div");
	descriptionIcon.innerHTML = DescriptionIcon;
	descriptionIcon.querySelector("svg").classList.add("desc-icon");
	description.append(descriptionIcon, descriptionText);

	// as for dueDate i need to use a library called date-fns
	// for now ill just leave it to a normal input
	const dueDate = document.createElement("button");
	dueDate.type = "button";
	dueDate.className = "todo-duedate";
	const dueDateText = document.createElement("p");
	dueDateText.textContent = "Date";
	const dueDateIcon = document.createElement("div");
	dueDateIcon.innerHTML = DateIcon;
	dueDateIcon.querySelector("svg").classList.add("duedate-icon");
	dueDate.append(dueDateIcon, dueDateText);

	const priority = document.createElement("button");
	priority.type = "button";
	priority.className = "todo-priority";
	const priorityText = document.createElement("p");
	priorityText.textContent = "Priority";
	const priorityIcon = document.createElement("div");
	priorityIcon.innerHTML = PriorityIcon;
	priorityIcon.querySelector("svg").classList.add("priority-icon");
	priority.append(priorityIcon, priorityText);

	fieldsContainer.append(description, dueDate, priority);

	todoForm.append(title, fieldsContainer);
	dialog.append(todoForm);

	const formBtns = document.createElement("div");
	formBtns.className = "form-btns";

	const cancelBtn = document.createElement("button");
	cancelBtn.id = "cancelBtn";
	cancelBtn.className = "cancel-btn";
	cancelBtn.textContent = "Cancel";

	const addBtn = document.createElement("button");
	addBtn.id = "addBtn";
	addBtn.className = "add-btn";
	addBtn.textContent = "Add Todo";
	formBtns.append(cancelBtn, addBtn);
	dialog.append(formBtns);

	return dialog;
}

// this is to render the created todo from the todo modal
export function createTodoItem(todo) {
	// returns <div> with checkbox, title, etc
}

// maybe I can reuse this when todo objects are created
export function render(container, htmlTag) {
	container.append(htmlTag);
}
