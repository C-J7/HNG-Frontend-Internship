const task = {
	id: "kansei-stage-0",
	title: "Submit Stage 0 Task",
	description: "Finish the Kansei todo card implementation and record the explainer video.",
	priority: "High",
	status: "Pending",
	dueDate: new Date("2026-04-16T12:00:00.000Z"),
	tags: ["Work", "Urgent", "Design"],
	completed: false,
};

const dom = {
	title: document.getElementById("todo-title"),
	description: document.getElementById("todo-description"),
	priority: document.getElementById("todo-priority"),
	status: document.getElementById("todo-status"),
	dueDate: document.getElementById("todo-due-date"),
	timeRemaining: document.getElementById("todo-time-remaining"),
	toggle: document.getElementById("todo-complete-toggle"),
	editButton: document.getElementById("todo-edit-button"),
	deleteButton: document.getElementById("todo-delete-button"),
};

function formatDueDate(date) {
	return `Due ${date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	})}`;
}

function pluralize(value, singular, plural) {
	return `${value} ${value === 1 ? singular : plural}`;
}

function formatTimeRemaining(targetDate, now = new Date()) {
	const diffMs = targetDate.getTime() - now.getTime();
	const absMs = Math.abs(diffMs);

	if (absMs < 60 * 1000) {
		return "Due now!";
	}

	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;

	if (diffMs > 0) {
		if (absMs < day) {
			const hours = Math.round(absMs / hour);
			return `Due in ${pluralize(hours, "hour", "hours")}`;
		}

		const days = Math.round(absMs / day);
		if (days === 1) {
			return "Due tomorrow";
		}
		return `Due in ${pluralize(days, "day", "days")}`;
	}

	if (absMs < day) {
		const hours = Math.round(absMs / hour);
		return `Overdue by ${pluralize(hours, "hour", "hours")}`;
	}

	const days = Math.round(absMs / day);
	return `Overdue by ${pluralize(days, "day", "days")}`;
}

function renderTask() {
	dom.title.textContent = task.title;
	dom.description.textContent = task.description;
	dom.priority.textContent = task.priority;
	dom.status.textContent = task.status;
	dom.dueDate.textContent = formatDueDate(task.dueDate);
	dom.dueDate.setAttribute("datetime", task.dueDate.toISOString());
	dom.timeRemaining.textContent = formatTimeRemaining(task.dueDate);
	dom.toggle.checked = task.completed;
	dom.title.classList.toggle("is-completed", task.completed);
}

function setTaskCompleted(completed) {
	task.completed = completed;
	task.status = completed ? "Done" : "Pending";
	renderTask();
}

function handleEdit() {
	console.log("edit clicked", task.id);
}

function handleDelete() {
	alert("Delete clicked");
}

function bindEvents() {
	dom.toggle.addEventListener("change", (event) => {
		setTaskCompleted(event.target.checked);
	});

	dom.editButton.addEventListener("click", handleEdit);
	dom.deleteButton.addEventListener("click", handleDelete);
}

function initTodoCard() {
	renderTask();
	bindEvents();

	setInterval(() => {
		dom.timeRemaining.textContent = formatTimeRemaining(task.dueDate);
	}, 30000);
}

initTodoCard();
