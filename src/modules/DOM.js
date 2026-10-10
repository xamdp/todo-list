// maybe DOM.js should hold functions that is required in initial load of page

import DescriptionIcon from "../asset/icons/description.svg";
import DateIcon from "../asset/icons/date.svg";
import PriorityIcon from "../asset/icons/priority.svg";
import CancelIcon from "../asset/icons/cancel.svg";
import ArrowUpIcon from "../asset/icons/arrow-up.svg";
import TodoIcon from "../asset/icons/todo.svg";
import PriorityFlag from "../asset/icons/flag.svg";
import ProjectIcon from "../asset/icons/folder.svg";
import {
	addTodoSelection,
	viewTodosSelection,
	viewProjectsSelection,
	createProjectSelection,
	createProjectForm,
} from "./components/SidebarComponent.js";
import {
	todoButtons,
	todoCheckbox,
	todoDetail,
} from "./components/TodoComponent.js";
import { getProjects } from "./Project.js";
import { addTodo } from "./Todo.js";

export function Sidebar() {
	const sidebar = document.createElement("div");
	sidebar.className = "sidebar";

	const sidebarHeader = document.createElement("div");
	sidebarHeader.className = "sidebar-header";
	const sidebarHeading = document.createElement("h2");
	sidebarHeading.className = "sidebar-heading";
	sidebarHeading.textContent = "My Todo List";
	const sidebarIcon = document.createElement("div");
	sidebarIcon.innerHTML = TodoIcon;
	sidebarIcon.querySelector("svg").classList.add("sidebar-icon");

	sidebarHeader.append(sidebarIcon, sidebarHeading);
	sidebar.append(sidebarHeader);
	const menuSidebar = MenuSidebar();
	sidebar.append(menuSidebar);
	document.querySelector(".container").prepend(sidebar);
}

function MenuSidebar() {
	const menuSidebar = document.createElement("div");
	menuSidebar.className = "menu-sidebar";

	const menuTitle = document.createElement("h3");
	menuTitle.className = "menu-title";
	menuTitle.textContent = "Menu";

	const menu = document.createElement("div");
	menu.className = "menu";

	const addTodoBtn = addTodoSelection();
	const viewTodosBtn = viewTodosSelection();
	const createProjectBtn = createProjectSelection();
	const projectModal = createProjectForm();
	const viewProjectsBtn = viewProjectsSelection();

	menu.append(
		addTodoBtn,
		viewTodosBtn,
		createProjectBtn,
		projectModal,
		viewProjectsBtn,
	);
	menuSidebar.prepend(menuTitle, menu);
	return menuSidebar;
}

export function Header() {
	const header = document.createElement("header");
	header.className = "heading";
	header.textContent = "Todos";
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

	const todosList = document.createElement("div");
	todosList.className = "todos-list";
	todosContainer.prepend(todosList);

	const form = createTodoForm();
	const deleteModal = deleteConfirmationModal();
	const cardDiv = addTodoCard();
	cardDiv.classList.add("hidden");
	todosContainer.append(form, deleteModal, cardDiv);
}

// this should show up, only if there is no todos to display
export function addTodoCard() {
	const cardDiv = document.createElement("div");
	cardDiv.classList.add("hidden");
	cardDiv.className = "card-div";
	const todoIcon = document.createElement("div");
	todoIcon.className = "todo-icon";
	todoIcon.innerHTML = TodoIcon;

	const cardText = document.createElement("p");
	cardText.className = "card-text";
	cardText.textContent = "Create some tasks for your projects here!";

	const addNewTodoBtn = document.createElement("button");
	addNewTodoBtn.id = "addTodoBtn";
	addNewTodoBtn.classList.add("add-todo-btn");
	addNewTodoBtn.textContent = "+  Add Todo";
	cardDiv.append(todoIcon, cardText, addNewTodoBtn);
	return cardDiv;
}

// hides card-div if there is todos present in the .todos-list container
export function hideAddTodoCard() {
	const cardDiv = document.querySelector(".card-div");
	cardDiv.classList.add("hidden");
}

export function showAddTodoCard() {
	const cardDiv = document.querySelector(".card-div");
	cardDiv.classList.remove("hidden");
}

// i might also transfer this to a component
export function displayTodos(todos) {
	if (!todos) return;
	todos.forEach((todo) => {
		const todoContainer = document.createElement("div");
		todoContainer.className = "todo-container";

		const checkbox = todoCheckbox();
		const actionsContainer = todoDetail(todo);
		const todoBtns = todoButtons(todo);
		todoContainer.append(checkbox, actionsContainer, todoBtns);
		document.querySelector(".todos-list").append(todoContainer);
	});
}

export function createTodoForm() {
	const dialog = document.createElement("dialog");
	dialog.id = "todo-modal";
	dialog.dataset.id = "default";
	const todoForm = document.createElement("form");
	todoForm.className = "todo-form";

	const userInput = createUserInput();

	const outerContainer = document.createElement("div");
	outerContainer.className = "outer-container";

	const fieldsContainer = document.createElement("div");
	fieldsContainer.className = "fields-container";

	const description = createDescriptionField();
	const dueDate = datePicker();
	const priority = createPriorityField();
	const priorities = createPriorityDropdown();

	const projectFieldWrapper = document.createElement("div");
	projectFieldWrapper.className = "project-field-wrapper";
	const project = createProjectField();
	const cancelProject = cancelProjectBtn();
	const projectList = createProjectDropdown();

	priority.append(priorities);
	projectFieldWrapper.append(project, cancelProject, projectList);

	fieldsContainer.append(description, dueDate, priority, projectFieldWrapper);
	outerContainer.append(fieldsContainer);
	todoForm.append(userInput, outerContainer);
	dialog.append(todoForm);

	// must append this formBtns to the fields container
	const formBtns = document.createElement("div");
	formBtns.className = "form-btns";

	const cancelBtn = createCancelBtn();
	const addBtn = createAddBtn();

	formBtns.append(cancelBtn, addBtn);
	outerContainer.append(formBtns);

	return dialog;
}

function cancelProjectBtn() {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "cancel-project-btn";
	const icon = document.createElement("div");
	icon.innerHTML = CancelIcon;
	icon.querySelector("svg").classList.add("cancel-project-icon");
	button.append(icon);
	button.classList.toggle("hidden");
	return button;
}

function createAddBtn() {
	const addBtn = document.createElement("button");
	addBtn.id = "addBtn";
	addBtn.className = "add-btn";
	addBtn.type = "submit";
	addBtn.innerHTML = ArrowUpIcon;
	addBtn.querySelector("svg").classList.add("arrow-up-icon");
	return addBtn;
}

function createCancelBtn() {
	const cancelBtn = document.createElement("button");
	cancelBtn.id = "cancelBtn";
	cancelBtn.className = "cancel-btn";
	cancelBtn.type = "button";
	cancelBtn.innerHTML = CancelIcon;
	cancelBtn.querySelector("svg").classList.add("cancel-icon");
	return cancelBtn;
}

function createUserInput() {
	const title = document.createElement("div");
	title.className = "todo-title";

	const titleDateContainer = document.createElement("div");
	titleDateContainer.className = "title-date-container";

	const dateText = document.createElement("p");
	dateText.className = "date-text";
	dateText.classList.toggle("hidden");

	const priorityText = document.createElement("p");
	priorityText.className = "priority-text";
	priorityText.classList.toggle("hidden");

	const titleInput = document.createElement("input");
	titleInput.required = true;
	titleInput.id = "title-input";
	titleInput.placeholder = "Finish the Todo User Interface";

	titleDateContainer.append(dateText, priorityText, titleInput);
	title.append(titleDateContainer);
	return title;
}

function createDescriptionField() {
	const description = document.createElement("button");
	description.type = "button";
	description.className = "todo-desc";
	const descriptionText = document.createElement("p");
	descriptionText.textContent = "Description";
	const descriptionIcon = document.createElement("div");
	descriptionIcon.innerHTML = DescriptionIcon;
	descriptionIcon.querySelector("svg").classList.add("desc-icon");
	description.append(descriptionIcon, descriptionText);
	return description;
}

function createProjectField() {
	const project = document.createElement("button");
	project.type = "button";
	project.className = "project-selection";
	project.setAttribute("popovertarget", "projects-choices");
	project.dataset.id = "default";
	const projectText = document.createElement("p");
	projectText.textContent = "Project";
	const projectIcon = document.createElement("div");
	projectIcon.innerHTML = ProjectIcon;
	projectIcon.querySelector("svg").classList.add("folder-icon");
	project.append(projectIcon, projectText);
	return project;
}

function createPriorityField() {
	// in priority, i need to create a dropdown selection up to 4 priority levels
	const priority = document.createElement("button");
	priority.type = "button";
	priority.setAttribute("popovertarget", "priority-choices");
	priority.className = "todo-priority";
	const priorityText = document.createElement("p");
	priorityText.textContent = "Priority";
	const priorityIcon = document.createElement("div");
	priorityIcon.innerHTML = PriorityIcon;
	priorityIcon.querySelector("svg").classList.add("priority-icon");
	priority.append(priorityIcon, priorityText);
	return priority;
}

// dropdown in todo form of project field
function createProjectDropdown() {
	const projects = getProjects();
	const projectList = document.createElement("div");
	projectList.className = "projects-dropdown";
	projectList.id = "projects-choices";
	projectList.setAttribute("popover", "auto");

	projects.forEach((project) => {
		const selection = document.createElement("div");
		selection.className = "select-project";
		selection.dataset.id = project.id;
		selection.dataset.name = project.name;
		const icon = document.createElement("div");
		icon.innerHTML = ProjectIcon;
		icon.querySelector("svg").classList.add("select-project-icon");
		const text = document.createElement("p");
		text.textContent = project.name;
		selection.append(icon, text);
		projectList.append(selection);
	});
	return projectList;
}

export function renderFieldProjectSelect(project) {
	const selection = document.createElement("div");
	selection.className = "select-project";
	selection.dataset.id = project.id;
	selection.dataset.name = project.name;

	const icon = document.createElement("div");
	icon.innerHTML = ProjectIcon;
	icon.querySelector("svg").classList.add("select-project-icon");
	const text = document.createElement("p");
	text.textContent = project.name;
	selection.append(icon, text);
	return selection;
}

function createPriorityDropdown() {
	const priorities = document.createElement("div");
	priorities.className = "priorities-dropdown";
	priorities.id = "priority-choices";
	priorities.setAttribute("popover", "auto");

	const firstPrio = document.createElement("div");
	firstPrio.className = "priority-select";
	const flag1 = document.createElement("div");
	flag1.innerHTML = PriorityFlag;
	flag1.querySelector("svg").classList.add("priority-flag");
	const text1 = document.createElement("p");
	text1.textContent = "Priority 1";
	firstPrio.append(flag1, text1);

	const secondPrio = document.createElement("div");
	secondPrio.className = "priority-select";
	const flag2 = document.createElement("div");
	flag2.innerHTML = PriorityFlag;
	flag2.querySelector("svg").classList.add("priority-flag");
	const text2 = document.createElement("p");
	text2.textContent = "Priority 2";
	secondPrio.append(flag2, text2);

	const thirdPrio = document.createElement("div");
	thirdPrio.className = "priority-select";
	const flag3 = document.createElement("div");
	flag3.innerHTML = PriorityFlag;
	flag3.querySelector("svg").classList.add("priority-flag");
	const text3 = document.createElement("p");
	text3.textContent = "Priority 3";
	thirdPrio.append(flag3, text3);

	const fourthPrio = document.createElement("div");
	fourthPrio.className = "priority-select";
	const flag4 = document.createElement("div");
	flag4.innerHTML = PriorityFlag;
	flag4.querySelector("svg").classList.add("priority-flag");
	const text4 = document.createElement("p");
	text4.textContent = "Priority 4";
	fourthPrio.append(flag4, text4);
	priorities.append(firstPrio, secondPrio, thirdPrio, fourthPrio);
	return priorities;
}

function datePicker() {
	const dateToggle = document.createElement("span"); // container
	dateToggle.className = "datepicker-toggle";

	const toggleBtn = document.createElement("button"); // this should be button
	toggleBtn.type = "button";
	toggleBtn.className = "datepicker-toggle-btn";

	const calendarIcon = document.createElement("div"); // icon inside div
	calendarIcon.innerHTML = DateIcon;
	calendarIcon.querySelector("svg").classList.add("calendar-icon");

	const dueDateText = document.createElement("p");
	dueDateText.textContent = "Date";

	toggleBtn.append(calendarIcon, dueDateText);

	const dueDateInput = document.createElement("input"); // input, hidden by default
	dueDateInput.required = true;
	dueDateInput.type = "date";
	dueDateInput.className = "datepicker-input";
	dateToggle.append(toggleBtn, dueDateInput);

	return dateToggle;
}

export function createDescriptionInput() {
	const descInput = document.createElement("input");
	descInput.required = true;
	descInput.id = "desc-input";
	descInput.placeholder = "Description of my todo";
	document.querySelector(".todo-title").append(descInput);
}

export function clearDisplay() {
	// document.querySelector(".heading").replaceChildren();
	document.querySelector(".todos-list").replaceChildren();
}

//basically the parsed project from getProjects have different obj prop naming, it's id and name
function projectHeading(project) {
	const heading = document.createElement("header");
	heading.className = "heading";
	if (project.projectName === "default") {
		heading.textContent = "Todos";
	} else {
		heading.textContent = project.name;
	}
	return heading;
}

export function displayProject(project) {
	const header = projectHeading(project);
	document.querySelector(".heading").replaceWith(header);
}

export function displayTodoHeading() {
	const heading = document.querySelector(".heading");
	heading.textContent = "Todos";
}

// when I click the edit button, this should show the todo form back with the inputs filled.
export function displayEditTodoForm(todo) {
	const modal = document.getElementById("todo-modal");
	modal.dataset.id = todo.id;
	modal.showModal();

	createDescriptionInput();
	// in here I may need to query some elements inside the form and set their values and textContent based on the currently edited todo
	const titleInput = document.querySelector("#title-input");
	const descInput = document.querySelector("#desc-input");
	const dateText = document.querySelector(".date-text");
	const dateInput = document.querySelector(".datepicker-input");
	const priorityText = document.querySelector(".priority-text");

	titleInput.value = todo.title;
	descInput.value = todo.description;
	dateText.textContent = todo.dueDate;
	dateInput.value = todo.dueDate;
	dateText.classList.toggle("hidden");
	priorityText.textContent = todo.priority;
	priorityText.classList.toggle("hidden");
}

// when i click the edit button, this should replace the standard submit button in todo form.
//  i think I don't need this anymore
export function submitBtnForEditTodo() {
	const addBtn = document.createElement("button");
	addBtn.id = "editAddBtn";
	addBtn.className = "edit-submit-btn";
	addBtn.type = "submit";
	addBtn.innerHTML = ArrowUpIcon;
	addBtn.querySelector("svg").classList.add("arrow-up-icon");
	return addBtn;
}

export function deleteConfirmationModal() {
	const modal = document.createElement("dialog");
	modal.className = "delete-modal";
	const outerDiv = document.createElement("div");
	outerDiv.className = "delete-container";
	const question = document.createElement("h3");
	question.textContent = "Are you sure you want to delete this todo?";

	const choicesDiv = document.createElement("div");
	choicesDiv.className = "delete-choices";

	const yesBtn = document.createElement("button");
	yesBtn.textContent = "Yes, delete it!";
	yesBtn.id = "yes-del-btn";
	yesBtn.className = "yes-btn";
	const noBtn = document.createElement("button");
	noBtn.textContent = "Please don't :(";
	noBtn.className = "no-btn";
	noBtn.id = "no-del-btn";

	choicesDiv.append(yesBtn, noBtn);

	outerDiv.append(question, choicesDiv);
	modal.append(outerDiv);
	return modal;
}
