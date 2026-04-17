# DigiCard - A Digital Business Card

A responsive, accessible, and interactive digital profile card component. 

##  Features
- **Semantic HTML5:** Uses `<article>`, `<figure>`, `<nav>`, and `<section>` for proper document structure.
- **Accessibility First:** Meets WCAG AA contrast standards, utilizes meaningful `alt` text, ARIA attributes (`aria-live="polite"`), and is fully keyboard navigable.
- **Real-Time Updates:** Vanilla JavaScript updates the current time (in milliseconds) every 1000ms without spamming screen readers.
- **Responsive Design:** Modern CSS Grid and Flexbox ensure a fluid, layout across mobile, tablet, and desktop viewports.



## Run Instructions

This project was built using plain HTML, CSS, and Vanilla JavaScript, hence running it locally is extremely straightforward.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
   ```

2. **Run the project:**
   - **Option A:** Double-click the `index.html` file to open it directly in your default web browser.
   - **Option B (Recommended):** Use a local development server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code to view changes in real-time.
   - **Option C (Terminal):** If you have Python installed, spin up a quick server by running:
     ```bash
     python3 -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

## Deployment Notes
This project can be deployed easily using any of the below options:

### Option 1: GitHub Pages
1. Push your code to a public GitHub repository.
2. Go to your repository's **Settings** tab.
3. Select **Pages** from the left sidebar.
4. Under "Build and deployment", set the Source to **Deploy from a branch**.
5. Select the `main` (or `master`) branch and click **Save**.
6. Your site will be live at `https://your-username.github.io/your-repo-name/` within a couple of minutes.

### Option 2: Vercel / Netlify
1. Create an account on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
2. Click **Add New Project** / **Add New Site**.
3. Connect your GitHub account and import this repository.
4. Leave the build command and ensuer the output directory is ".".
5. Click **Deploy**.

