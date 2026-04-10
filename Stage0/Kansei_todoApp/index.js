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
