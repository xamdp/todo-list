import {
	hideAddTodoCard,
	clearDisplay,
	displayTodos,
	displayProject,
} from "./DOM.js";
import { getProjects } from "./Project.js";
import { createTodo } from "./factories/todoFactory.js";
import { addTodo, getTodos } from "./Todo.js";

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

export function getProjectId() {
	let selectedProjectId =
		document.querySelector(".project-selection").dataset.id;
	selectedProjectId = selectedProjectId ? selectedProjectId : "default";

	let selectedProjectName = document
		.querySelector(".project-selection")
		.querySelector("p").textContent;
	selectedProjectName =
		selectedProjectName === "Project" ? "default" : selectedProjectName;

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
	if (project.dataset.id) {
		delete project.dataset.id;
		project.dataset.id = "default";
		projectText.textContent = "Project";
		cancelBtn.classList.toggle("hidden");
	}
}

export function submitTodoLogic() {
	// this is buggy
	let selectedProjectId =
		document.querySelector(".project-selection").dataset.id;
	selectedProjectId = selectedProjectId ? selectedProjectId : "default";

	let selectedProjectName = document
		.querySelector(".project-selection")
		.querySelector("p").textContent;
	selectedProjectName =
		selectedProjectName === "Project" ? "default" : selectedProjectName;

	// this obj, have a different prop naming against the parsed project from getProjects() below
	const projectDetail = {
		projectId: selectedProjectId,
		projectName: selectedProjectName,
	};
	console.log(projectDetail);

	const userInput = {
		title: document.querySelector("#title-input").value,
		description: document.querySelector("#desc-input").value,
		dueDate: document.querySelector(".date-text").textContent,
		priority: document.querySelector(".priority-text").textContent,
		project: projectDetail,
	};
	// console.log(userInput);
	const newTodo = createTodo(userInput);
	// const projectObj = getProjectId();
	const projects = getProjects();
	const project = projects.find(
		(project) => project.id === projectDetail.projectId,
	);
	if (project) {
		console.log(project);
		addTodo(newTodo, projectDetail.projectId); // this works for now, because I am using the default project, here to, i need to pass the project.id
		resetForm();
		const dataToDisplay = getTodos(projectDetail.projectId); // need to pass here the project.id
		clearDisplay();
		displayProject(project); // the parsed project has different prop naming
		displayTodos(dataToDisplay);
	} else {
		addTodo(newTodo);
		resetForm();
		const dataToDisplay = getTodos();
		clearDisplay();
		displayTodos(dataToDisplay);
	}
}
