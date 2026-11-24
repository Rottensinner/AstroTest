# RetroUI

A showcase of LCD-inspired interface components built with Astro, TypeScript, and Tailwind CSS.

## Getting started

Use Node.js 22.23.4 or later. Run these commands from the project directory.

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the dependencies from `package-lock.json`. |
| `npm run dev` | Start the development server in the background at `http://localhost:4321`. |
| `npm run astro -- dev status` | Check the background server status. |
| `npm run astro -- dev logs` | Read the background server logs. |
| `npm run astro -- dev stop` | Stop the background server. |
| `npm run check` | Check Astro and TypeScript files. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Project structure

- `src/pages/index.astro` assembles the component showcase and handles display mode selection.
- `src/layouts/Base.astro` defines the page shell and loads the local fonts and global styles.
- `src/components/` contains the reusable Astro components.
- `src/styles/global.css` defines the display themes and component styles.
