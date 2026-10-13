import {
	hideAddTodoCard,
	clearDisplay,
	displayTodos,
	displayProject,
	displayTodoHeading,
} from "./DOM.js";
import { getProjects } from "./Project.js";
import { createTodo } from "./factories/todoFactory.js";
import { addTodo, getTodos, editTodo, getTodo } from "./Todo.js";

export function checkDateInput() {
	// will add more checks here
	const dateText = document.querySelector(".date-text");
	if (dateText.textContent === "") {
		dateText.style.backgroundColor = "#FFFFFF";
	} else {
		dateText.style.backgroundColor = "pink";
	}
}

export function isTodosExist() {
	const cardDiv = document.querySelector(".card-div");
	if (cardDiv.hasChildNodes()) hideAddTodoCard();
}

// only for editing
export function getProjectId() {
	const selectedProjectId =
		document.querySelector(".project").dataset.projectId;

	const selectedProjectName =
		document.querySelector(".project").dataset.projectName;

	const projectDetail = {
		projectId: selectedProjectId,
		projectName: selectedProjectName,
	};
	return projectDetail;
}

// only for submitting a new todo
export function getProjectDetail() {
	const selectedProjectId =
		document.querySelector(".project-selection").dataset.projectId;

	const selectedProjectName =
		document.querySelector(".project-selection").dataset.projectName;

	const projectDetail = {
		projectId: selectedProjectId,
		projectName: selectedProjectName,
	};
	return projectDetail;
}

export function resetForm() {
	const todoForm = document.querySelector(".todo-form");
	const dateText = document.querySelector(".date-text");
	const priorityText = document.querySelector(".priority-text");
	todoForm.reset();
	dateText.textContent = "";
	dateText.classList.toggle("hidden");
	priorityText.textContent = "";
	priorityText.classList.toggle("hidden");
}

// still need to fix this, when a click the popover selection instead of the cancel button, the btn is hidden.
export function toggleProjectCancelBtn() {
	const cancelBtn = document.querySelector(".cancel-project-btn");
	cancelBtn.classList.toggle("hidden");
}

export function unselectProject() {
	const project = document.querySelector(".project-selection");
	const projectText = project.querySelector("p");
	const cancelBtn = document.querySelector(".cancel-project-btn");
	if (project.dataset.projectId) {
		// delete project.dataset.projectId;
		project.dataset.projectId = "default";
		project.dataset.projectName = "default";
		projectText.textContent = "Project";
		cancelBtn.classList.toggle("hidden");
	}
}

export function submitTodoLogic() {
	const project = getProjectDetail();
	const userInput = {
		title: document.querySelector("#title-input").value,
		description: document.querySelector("#desc-input").value,
		dueDate: document.querySelector(".date-text").textContent,
		priority: document.querySelector(".priority-text").textContent,
		project: project,
		status: "wip",
	};
	const newTodo = createTodo(userInput);
	addTodo(newTodo, project.projectId); // this works for now, because I am using the default project, here to, i need to pass the project.id
	resetForm();
	const dataToDisplay = getTodos(project.projectId); // need to pass here the project.id
	clearDisplay();
	displayProject(project); // the parsed project has different prop naming
	displayTodos(dataToDisplay);
}

export function editTodoLogic() {
	// so when, editing a todo, I need to still show the project field, but make it not clickable, and only display the current project that todo belongs to
	// and with that information, I can use that to pass the project id to edit the todo.

	const projectDetail = getProjectId(); // returns a projectObj
	// console.log(projectDetail.projectId);
	const id = document.querySelector("#todo-modal").dataset.editingTodoId;
	const todo = {
		title: document.querySelector("#title-input").value,
		description: document.querySelector("#desc-input").value,
		dueDate: document.querySelector(".datepicker-input").value,
		priority: document.querySelector(".priority-text").textContent,
	};
	editTodo(todo, id, projectDetail.projectId);
	resetForm();
	const dataToDisplay = getTodos(projectDetail.projectId); // need to pass here the project.id
	clearDisplay();
	displayProject(projectDetail);
	displayTodos(dataToDisplay);
}
