# Kansei Todo Card - HNG Frontend Stage

Kansei (完成) means "complete or done" in Japanese. This project extends the Stage 0 single todo card into a fully interactive, stateful component with modal editing, real-time status synchronization, dynamic time management, and comprehensive accessibility support.

**Built with vanilla HTML, CSS, and JavaScript – no frameworks or build tools required.**

---

## What Changed From Stage 0

### New Features
- **Modal Edit Form** - Click Edit to open a centered modal dialog (not inline form) with all task fields
- **Status Control** - Interactive dropdown to switch between Pending, In Progress, and Done
- **Priority Indicator** - Dynamic colored dot (Low=green, Medium=orange, High=red) + colored badge
- **Collapsible Description** - Descriptions >130 chars are collapsed by default with a "Show more" toggle
- **Overdue Badge** - Red badge and visual accent appear when due date has passed
- **Granular Time Display** - Shows "Due in 2 days", "Overdue by 3 hours", "Due in 45 minutes"
- **Status Sync** - Checkbox, status control, and status text all stay perfectly synchronized

### Preserved From Stage 0
- All Stage 0 test IDs remain present and functional
- Semantic HTML structure
- Clean, accessible form inputs
- Responsive layout

---

## Stage 1a Feature Coverage

### 1. Editing Mode 
- Edit button opens centered modal dialog with backdrop
- Form includes title, description, priority dropdown, and due date picker
- Save button persists changes and closes modal
- Cancel button closes modal without updating
- Focus returns to Edit button on close
- Escape key and backdrop click also close modal
- All form fields have proper label associations

### 2. Status Transitions & Synchronization 
| Action | Result |
|--------|--------|
| Check checkbox | Status becomes "Done"  |
| Status dropdown → "Done" | Checkbox auto-checked |
| Uncheck after "Done" | Status reverts to "Pending" |
| Dropdown changed | Checkbox, status text, and state classes all update instantly |

Visual effects tied to status:
- **Pending** - Default styling
- **In Progress** - Blue left border accent on card
- **Done** - Strike-through title + muted colors + opacity reduced

### 3. Priority Indicator Enhancements 
- Color-coded dot indicator updates based on priority level
- Badge styling changes with priority
- Supports Low (green), Medium (orange), High (red)

### 4. Expand/Collapse Behavior 
- Long descriptions (>130 chars) start collapsed
- "Show more" / "Show less" toggle with proper wiring
- `aria-expanded` updates to true/false
- `aria-controls` links toggle to collapsible section
- Keyboard accessible (Tab + Space/Enter)

### 5. Time Management Enhancements 
- Displays time in granular units: days, hours, minutes
- Updates every 30 seconds
- Overdue state shows explicit red badge and updates color
- When status becomes "Done":
  - Time text changes to "Completed"
  - Overdue badge hidden
  - Timer stops updating and clears interval
- Uses `aria-live="polite"` for accessibility screen readers

---

## Design Decisions

### Architecture
- **Single-card scope** - Maintains Stage 1a requirement (not a multi-task app)
- **State-driven rendering** - Single `renderAll()` function ensures all UI stays in sync
- **Explicit state management** - `task` object and `uiState` object keep data and UI state separate

### UI/UX
- **Modal over inline form** - Provides clear focus area and prevents accidental scrolling on mobile
- **CSS state classes** - Classes like `status-done`, `priority-high` enable CSS to handle visual changes
- **Centered layout** - Main content centered with responsive max-width for comfortable reading
- **Floating action button** - Positioned fixed at bottom-left (ready for Stage 2 multi-task feature)

### Code Quality
- **Clean separation** - DOM references, state, rendering, and event binding are clearly organized
- **Defensive programming** - Null checks, validation of status values, proper date handling
- **Accessibility first** - All interactive elements have ARIA labels, keyboard support, and focus management

---

## Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1 for page, h2 for card title, h2 for modal)
- `<article>` for card content
- `<form>` element for edit modal
- `<section>` with `aria-labelledby` for content area

### ARIA Attributes
- **`aria-label`** - All buttons: Edit, Delete, Add Task, Close Modal, Status Control, Checkbox
- **`aria-expanded`** - Expand toggle updates to true/false
- **`aria-controls`** - Expand toggle linked to collapsible section ID
- **`aria-live="polite"`** - Time container announces changes to screen readers
- **`role="dialog"`** - Edit modal identified as dialog
- **`aria-labelledby`** - Modal linked to header title
- **`aria-hidden="true"`** - Decorative elements (priority dot, modal X) hidden from screen readers

### Keyboard Navigation
Enforced tab order (tabindex):
1. Checkbox (complete toggle)
2. Status control dropdown
3. Expand toggle
4. Edit button
5. Delete button
- Modal form fields tab in natural order
- Escape key closes modal

### Form Accessibility
- All form inputs have visible `<label>` with `for` attribute matching input `id`
- Inputs have `required` attribute where needed
- Select dropdown has descriptive label

---

## Known Limitations

1. **Add Task Button** - Currently shows placeholder alert. Full multi-task flow is Stage 2+
2. **Delete Action** - Currently shows placeholder alert (not implemented in Stage 1a scope)
3. **Focus Trap** - Modal does not trap focus inside form (listed as optional bonus in brief)
4. **Edit Validation** - Form validates required fields but doesn't show user-facing error messages
5. **Time Precision** - Times are rounded to nearest minute/hour/day (not granular below 1 minute)

---

## Getting Started

1. **Clone/open** the repository
2. **Open** `index.html` in your browser (or use Live Server)
3. **No setup required** - vanilla HTML/CSS/JS only
---