# Kansei Todo Card - HNG Frontend Stage 1a

Kansei means complete or done in Japanese. This project extends the Stage 0 single todo card into a richer interactive card with state synchronization, edit mode, dynamic time logic, and improved accessibility.

Built with vanilla HTML, CSS, and JavaScript.

## What Changed From Stage 0

- Added full edit mode with save and cancel actions
- Added status control dropdown with allowed states:
  - Pending
  - In Progress
  - Done
- Added priority indicator with dynamic visual styles:
  - Low
  - Medium
  - High
- Added collapsible description behavior for long content
- Added overdue indicator with explicit visual badge
- Upgraded time display to granular units (days, hours, minutes)
- Time updates run every 30 seconds and stop when status is Done
- Kept Stage 0 test IDs and added all new Stage 1a test IDs

## Stage 1a Feature Coverage

- Editable content:
  - Edit button opens form
  - Save writes updates to card
  - Cancel closes form without changing current task values
  - Focus returns to edit button when form closes

- Status transitions and synchronization:
  - Checkbox checked -> status becomes Done
  - Status set to Done -> checkbox becomes checked
  - Unchecking after Done -> status reverts to Pending
  - Status text, status control, and checkbox remain synchronized

- Expand/collapse:
  - Long description starts collapsed
  - Toggle button updates `aria-expanded`
  - Toggle uses `aria-controls` linked to collapsible section

- Time management:
  - Shows `Due in X days/hours/minutes` or `Overdue by X days/hours/minutes`
  - Overdue badge appears when overdue
  - For Done state, time text becomes `Completed`

## Accessibility Notes

- Form inputs and selects use proper `<label for="...">` wiring
- Status control has accessible name
- Live time updates use `aria-live="polite"`
- Expand toggle uses `aria-expanded` and `aria-controls`
- Keyboard flow supports:
  - Checkbox
  - Status control
  - Expand toggle
  - Edit
  - Delete
  - Save/Cancel (in edit mode)
- Focus-visible styles are present for interactive elements

## Design Decisions

- Kept one-card architecture to match Stage 1a scope (not a full task app)
- Used CSS state classes (`status-*`, `priority-*`) for clear visual synchronization
- Used a shared render strategy with explicit state updates to keep behavior predictable
- Added a floating add button to match design direction while preserving Stage 1a single-card scope

## Responsiveness

Layout adapts for:

- 320px mobile
- 768px tablet
- 1024px+ desktop

Responsive behavior includes:

- Edit form stacks vertically on small screens
- Status and action controls reflow without overlap
- Long title, wrapped tags, and long descriptions do not overflow card bounds

## Known Limitations

- Add-task button currently shows a placeholder message (full multi-task flow is beyond Stage 1a single-card requirement)
- Focus trap inside edit form is not implemented (optional bonus in the brief)
- Delete action is still a placeholder alert

## Getting Started

1. Clone the repository.
2. Open the project folder.
3. Launch `index.html` in your browser (or with Live Server).

No build tools or dependencies are required.
