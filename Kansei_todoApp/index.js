
const task = {
    id: "kansei-stage-0",
    title: "Submit Stage 0 FE Task",
    description: "Finish the Kansei todo card implementation and record the explainer video. Ensuring it meets all accessibility standards and looks pixel-perfect across devices.",
    priority: "High",
    status: "Pending", // "Pending", "In Progress", "Done"
    dueDate: new Date("2026-04-16T12:00:00.000Z"),
    tags: ["Work", "Urgent", "Design"],
    
    //UI States
    isEditing: false,
    isCollapsed: true
};


const dom = {
    card: document.querySelector('[data-testid="test-todo-card"]'),
    title: document.getElementById("todo-title"),
    description: document.getElementById("todo-description"),
    priority: document.getElementById("todo-priority"),
    priorityIndicator: document.getElementById("todo-priority-indicator"),
    statusText: document.getElementById("todo-status"),
    statusSelect: document.getElementById("todo-status-control"),
    dueDate: document.getElementById("todo-due-date"),
    timeRemaining: document.getElementById("todo-time-remaining"),
    timeContainer: document.getElementById("todo-time-container"),
    overdueIndicator: document.getElementById("todo-overdue-indicator"),
    completeToggle: document.getElementById("todo-complete-toggle"),
    
    expandBtn: document.getElementById("todo-expand-toggle"),
    collapseSection: document.getElementById("todo-collapsible-section"),
    
    // Edit Form Elements
    editBtn: document.getElementById("todo-edit-button"),
    form: document.getElementById("todo-edit-form"),
    editTitle: document.getElementById("edit-title"),
    editDesc: document.getElementById("edit-description"),
    editPriority: document.getElementById("edit-priority"),
    editDueDate: document.getElementById("edit-due-date"),
    cancelBtn: document.getElementById("todo-cancel-button"),
};

// Utility Functions
function formatDueDate(date) {
    return `Due ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

function updateTimeDisplay() {
    if (task.status === "Done") {
        dom.timeRemaining.textContent = "Completed";
        dom.timeContainer.classList.remove("is-overdue");
        dom.overdueIndicator.classList.add("hidden");
        return;
    }

    const now = new Date();
    const diffMs = task.dueDate.getTime() - now.getTime();
    const isOverdue = diffMs < 0;
    const absMs = Math.abs(diffMs);

    const minutes = Math.floor(absMs / (1000 * 60));
    const hours = Math.floor(absMs / (1000 * 60 * 60));
    const days = Math.floor(absMs / (1000 * 60 * 60 * 24));

    let timeText = "";
    if (days > 0) timeText = `${days} day${days > 1 ? 's' : ''}`;
    else if (hours > 0) timeText = `${hours} hour${hours > 1 ? 's' : ''}`;
    else timeText = `${minutes} minute${minutes !== 1 ? 's' : ''}`;

    if (isOverdue) {
        dom.timeRemaining.textContent = `Overdue by ${timeText}`;
        dom.timeContainer.classList.add("is-overdue");
        dom.overdueIndicator.classList.remove("hidden");
    } else {
        dom.timeRemaining.textContent = `Due in ${timeText}`;
        dom.timeContainer.classList.remove("is-overdue");
        dom.overdueIndicator.classList.add("hidden");
    }
}

//The Render Loop
function renderTask() {
    
    dom.title.textContent = task.title;
    dom.description.textContent = task.description;
    dom.priority.textContent = task.priority;
    dom.statusText.textContent = task.status;
    dom.dueDate.textContent = formatDueDate(task.dueDate);
    dom.dueDate.setAttribute("datetime", task.dueDate.toISOString());

    dom.priorityIndicator.className = `priority-indicator ${task.priority.toLowerCase()}`;
    
    dom.statusSelect.value = task.status;
    dom.completeToggle.checked = task.status === "Done";
    
    // Visual Status Classes
    dom.card.className = `todo-card status-${task.status.toLowerCase().replace(" ", "-")}`;

    // Expand/Collapse View
    if (task.isCollapsed) {
        dom.collapseSection.classList.add("is-collapsed");
        dom.expandBtn.textContent = "Show more";
        dom.expandBtn.setAttribute("aria-expanded", "false");
    } else {
        dom.collapseSection.classList.remove("is-collapsed");
        dom.expandBtn.textContent = "Show less";
        dom.expandBtn.setAttribute("aria-expanded", "true");
    }

    // Edit Mode View
    if (task.isEditing) {
        dom.card.classList.add("is-editing");
        dom.form.classList.remove("hidden");
        dom.form.setAttribute("aria-hidden", "false");
        
        dom.editTitle.value = task.title;
        dom.editDesc.value = task.description;
        dom.editPriority.value = task.priority;
        dom.editDueDate.value = task.dueDate.toISOString().slice(0, 16);
    } else {
        dom.card.classList.remove("is-editing");
        dom.form.classList.add("hidden");
        dom.form.setAttribute("aria-hidden", "true");
        dom.editBtn.focus(); 
    }

    updateTimeDisplay();
}

function bindEvents() {
    dom.completeToggle.addEventListener("change", (e) => {
        task.status = e.target.checked ? "Done" : "Pending";
        renderTask();
    });

    // Dropdown Status Change
    dom.statusSelect.addEventListener("change", (e) => {
        task.status = e.target.value;
        renderTask();
    });

    // Expand Toggle
    dom.expandBtn.addEventListener("click", () => {
        task.isCollapsed = !task.isCollapsed;
        renderTask();
    });

    // Open Edit Mode
    dom.editBtn.addEventListener("click", () => {
        task.isEditing = true;
        renderTask();
    });

    // Cancel Edit Mode
    dom.cancelBtn.addEventListener("click", () => {
        task.isEditing = false;
        renderTask();
    });

    // Save Edit Form
    dom.form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload
        task.title = dom.editTitle.value;
        task.description = dom.editDesc.value;
        task.priority = dom.editPriority.value;
        task.dueDate = new Date(dom.editDueDate.value);
        task.isEditing = false;
        renderTask();
    });
}

function initTodoCard() {
    renderTask();
    bindEvents();

    setInterval(() => {
        if (task.status !== "Done") {
            updateTimeDisplay();
        }
    }, 30000);
}

initTodoCard();