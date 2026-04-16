const TASK_STATUSES = ["Pending", "In Progress", "Done"];
const PRIORITIES = ["Low", "Medium", "High"];
const COLLAPSE_THRESHOLD = 130;
const UPDATE_INTERVAL_MS = 30000;

const task = {
    id: "kansei-stage-1a",
    title: "Submit Stage 1a Task",
    description:
        "Finish the Kansei todo card implementation and polish Stage 1a interactions so status logic, editing, time updates, and accessibility behavior all remain in sync across desktop and mobile.",
    priority: "High",
    status: "Pending",
    dueDate: new Date("2026-04-18T12:00:00.000Z"),
    tags: ["Work", "Urgent", "Design"],
};

const uiState = {
    isEditing: false,
    isExpanded: false,
};

let timerId = null;

const dom = {
    card: document.getElementById("todo-card"),
    title: document.getElementById("todo-title"),
    description: document.getElementById("todo-description"),
    priority: document.getElementById("todo-priority"),
    priorityIndicator: document.getElementById("todo-priority-indicator"),
    statusText: document.getElementById("todo-status"),
    statusControl: document.getElementById("todo-status-control"),
    dueDate: document.getElementById("todo-due-date"),
    timeRemaining: document.getElementById("todo-time-remaining"),
    timeContainer: document.getElementById("todo-time-container"),
    overdueIndicator: document.getElementById("todo-overdue-indicator"),
    completeToggle: document.getElementById("todo-complete-toggle"),
    expandToggle: document.getElementById("todo-expand-toggle"),
    collapsible: document.getElementById("todo-collapsible-section"),
    editButton: document.getElementById("todo-edit-button"),
    deleteButton: document.getElementById("todo-delete-button"),
    modal: document.getElementById("edit-modal"),
    modalBackdrop: document.querySelector(".edit-modal-backdrop"),
    modalCloseButton: document.getElementById("modal-close-button"),
    form: document.getElementById("todo-edit-form"),
    formTitle: document.getElementById("todo-edit-title-input"),
    formDescription: document.getElementById("todo-edit-description-input"),
    formPriority: document.getElementById("todo-edit-priority-select"),
    formDueDate: document.getElementById("todo-edit-due-date-input"),
    cancelButton: document.getElementById("todo-cancel-button"),
    addButton: document.getElementById("todo-add-tasks"),
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

function getTimeDifferenceText(targetDate, now = new Date()) {
    const diffMs = targetDate.getTime() - now.getTime();
    const absMs = Math.abs(diffMs);
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (absMs < minute) {
        return {
            isOverdue: diffMs < 0,
            text: diffMs < 0 ? "Overdue by 1 minute" : "Due in 1 minute",
        };
    }

    if (absMs < hour) {
        const minutes = Math.round(absMs / minute);
        return {
            isOverdue: diffMs < 0,
            text: `${diffMs < 0 ? "Overdue by" : "Due in"} ${pluralize(minutes, "minute", "minutes")}`,
        };
    }

    if (absMs < day) {
        const hours = Math.round(absMs / hour);
        return {
            isOverdue: diffMs < 0,
            text: `${diffMs < 0 ? "Overdue by" : "Due in"} ${pluralize(hours, "hour", "hours")}`,
        };
    }

    const days = Math.round(absMs / day);
    return {
        isOverdue: diffMs < 0,
        text: `${diffMs < 0 ? "Overdue by" : "Due in"} ${pluralize(days, "day", "days")}`,
    };
}

function shouldCollapseDescription() {
    return task.description.trim().length > COLLAPSE_THRESHOLD;
}

function getCardStatusClass() {
    return `status-${task.status.toLowerCase().replace(/\s+/g, "-")}`;
}

function getPriorityClass() {
    return `priority-${task.priority.toLowerCase()}`;
}

function renderPriority() {
    dom.priority.textContent = task.priority;
    dom.priority.classList.remove("priority-low", "priority-medium", "priority-high");
    dom.priority.classList.add(getPriorityClass());

    dom.priorityIndicator.className = `priority-indicator ${task.priority.toLowerCase()}`;
}

function renderStatus() {
    dom.statusText.textContent = task.status;
    dom.statusControl.value = task.status;
    dom.completeToggle.checked = task.status === "Done";

    dom.card.classList.remove("status-pending", "status-in-progress", "status-done", "status-overdue");
    dom.card.classList.add(getCardStatusClass());

    dom.title.classList.toggle("is-completed", task.status === "Done");
}

function renderDescription() {
    dom.description.textContent = task.description;

    const collapsibleNeeded = shouldCollapseDescription();
    dom.expandToggle.classList.toggle("hidden", !collapsibleNeeded);

    if (!collapsibleNeeded) {
        uiState.isExpanded = true;
    }

    const shouldBeCollapsed = collapsibleNeeded && !uiState.isExpanded;
    dom.collapsible.classList.toggle("is-collapsed", shouldBeCollapsed);
    dom.expandToggle.setAttribute("aria-expanded", String(!shouldBeCollapsed));
    dom.expandToggle.textContent = shouldBeCollapsed ? "Show more" : "Show less";
}

function renderDueDate() {
    dom.dueDate.textContent = formatDueDate(task.dueDate);
    dom.dueDate.setAttribute("datetime", task.dueDate.toISOString());
}

function renderTimeState() {
    if (task.status === "Done") {
        dom.timeRemaining.textContent = "Completed";
        dom.overdueIndicator.classList.add("hidden");
        dom.timeContainer.classList.remove("is-overdue");
        dom.card.classList.remove("status-overdue");
        return;
    }

    const timeState = getTimeDifferenceText(task.dueDate);
    dom.timeRemaining.textContent = timeState.text;
    dom.overdueIndicator.classList.toggle("hidden", !timeState.isOverdue);
    dom.timeContainer.classList.toggle("is-overdue", timeState.isOverdue);

    if (timeState.isOverdue) {
        dom.card.classList.add("status-overdue");
    } else if (dom.card.classList.contains("status-overdue")) {
        dom.card.classList.remove("status-overdue");
    }
}

function renderEditMode() {
    dom.modal.classList.toggle("hidden", !uiState.isEditing);
    dom.modal.setAttribute("aria-hidden", String(!uiState.isEditing));

    if (uiState.isEditing) {
        dom.formTitle.value = task.title;
        dom.formDescription.value = task.description;
        dom.formPriority.value = task.priority;
        dom.formDueDate.value = new Date(task.dueDate.getTime() - task.dueDate.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);

        setTimeout(() => {
            dom.formTitle.focus();
        }, 100);
    }
}

function startTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }

    if (task.status === "Done") {
        return;
    }

    timerId = setInterval(() => {
        renderTimeState();
    }, UPDATE_INTERVAL_MS);
}

function setStatus(nextStatus) {
    if (!TASK_STATUSES.includes(nextStatus)) {
        return;
    }

    task.status = nextStatus;
    renderStatus();
    renderTimeState();
    startTimer();
}

function setCompleted(isCompleted) {
    if (isCompleted) {
        setStatus("Done");
        return;
    }

    if (task.status === "Done") {
        setStatus("Pending");
    }
}

function openEditMode() {
    uiState.isEditing = true;
    renderEditMode();
}

function closeEditMode() {
    uiState.isEditing = false;
    renderEditMode();
    dom.editButton.focus();
}

function saveEdits() {
    const nextTitle = dom.formTitle.value.trim();
    const nextDescription = dom.formDescription.value.trim();
    const nextPriority = dom.formPriority.value;
    const nextDueDateRaw = dom.formDueDate.value;

    if (!nextTitle || !nextDescription || !PRIORITIES.includes(nextPriority) || !nextDueDateRaw) {
        return;
    }

    const nextDueDate = new Date(nextDueDateRaw);
    if (Number.isNaN(nextDueDate.getTime())) {
        return;
    }

    task.title = nextTitle;
    task.description = nextDescription;
    task.priority = nextPriority;
    task.dueDate = nextDueDate;

    if (!shouldCollapseDescription()) {
        uiState.isExpanded = true;
    }

    renderAll();
    closeEditMode();
}

function handleDelete() {
    window.alert("Delete clicked");
}

function bindEvents() {
    dom.completeToggle.addEventListener("change", (event) => {
        setCompleted(event.target.checked);
    });

    dom.statusControl.addEventListener("change", (event) => {
        setStatus(event.target.value);
    });

    dom.expandToggle.addEventListener("click", () => {
        uiState.isExpanded = !uiState.isExpanded;
        renderDescription();
    });

    dom.editButton.addEventListener("click", openEditMode);

    dom.cancelButton.addEventListener("click", () => {
        closeEditMode();
    });

    dom.modalCloseButton.addEventListener("click", () => {
        closeEditMode();
    });

    dom.modalBackdrop.addEventListener("click", () => {
        closeEditMode();
    });

    dom.form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveEdits();
    });

    dom.deleteButton.addEventListener("click", handleDelete);

    // Close Form on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && uiState.isEditing) {
            closeEditMode();
        }
    });

    if (dom.addButton) {
        dom.addButton.addEventListener("click", () => {
            window.alert("Add task flow is not part of Stage 1 scope.");
        });
    }
}

function renderAll() {
    dom.title.textContent = task.title;
    renderPriority();
    renderStatus();
    renderDescription();
    renderDueDate();
    renderTimeState();
    renderEditMode();
}

function initTodoCard() {
    uiState.isExpanded = !shouldCollapseDescription();
    bindEvents();
    renderAll();
    startTimer();
}

initTodoCard();
