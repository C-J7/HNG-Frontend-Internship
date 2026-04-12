# Kansei Todo Card - HNG Frontend Stage 0

Kansei means complete or done in Japanese. This project is a clean, testable Todo Task Card focused on usability, accessibility, and responsive behavior.

Built with vanila HTML, CSS, and JavaScript.

## Implemented Features

- Semantic structure using `article`, `time`, `label`, `button`, and list elements
- Exact required test IDs for automated checks
- Task card content:
    - Title
    - Description
    - Priority badge
    - Due date
    - Time remaining
    - Status
    - Completion toggle
    - Tags
    - Edit and Delete actions
- Dynamic time-remaining text with periodic refresh
- Completion toggle updates UI state and status (`Pending` -> `Done`)

## Accessibility Notes

- Real checkbox input for completion
- Visible label for checkbox
- Buttons have accessible names
- Focus styles are visible
- Improved color contrast for readability (WCAG AA oriented)


## Getting Started

1. Clone the repository.
2. Open the project folder.
3. Launch `index.html` in your browser with live server.

No build tools or dependencies are required.

## Comment 
This project was kept simple for the purpose of the task and the given time, Check out the proper design at: "https://www.figma.com/design/B1U7ce5Vr7VbmBzTTwRpC2/Kansei?node-id=1-54&t=zQjhID9TjJBU2w2b-0"