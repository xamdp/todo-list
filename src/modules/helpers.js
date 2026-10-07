import { hideAddTodoCard } from "./DOM.js";

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
	const projectFieldBtn = document.querySelector(".project-selection");
	const projectId = projectFieldBtn.dataset.id;
	return projectId;
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
		projectText.textContent = "Project";
		cancelBtn.classList.toggle("hidden");
	}
}
