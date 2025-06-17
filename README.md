# Conroo Time Slot App

A Vue 3 + TypeScript frontend app that displays and dynamically updates reservation slot capacities via REST and Server-Sent Events (SSE).

---

## 🧰 Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vuetify 3](https://vuetifyjs.com/) for UI
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vitest](https://vitest.dev/) for unit testing

---

## ▶️ How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test:unit
```

## 🧠 Design Choices

* Feature-sliced folder structure: Organizes by domain (features/timeSlots) for long-term maintainability.
* Composition API + Pinia: Chosen for fine-grained reactivity and clear state management.
* Separation of concerns: API, store, and UI layers are decoupled to improve testability and reuse.
* Reusable card component (TimeSlotCard.vue): Keeps view logic clean and composable.
* Theme toggle support: Improves UX and reflects real-world polish.
* Skeleton loading UI and error handling: Provides good perceived performance and smooth feedback.
* Filters: For quicker lookup leading to better UX.
* Accessibility: Using semantic html and aria labels for better SEO and screen reading.
* Unit testing: for making sure the logic is robust.

## 🐳 DevOps Add-ons

* Included `Dockerfile` and `nginx.conf` to containerize the frontend with Nginx
* Local development supported via `docker-compose.yml`
* Includes GitHub Actions workflow to install, test, and build the app on every push to `main`. Could be extended to have deployment support.

## 📦 Real-World Project Improvements

* Better Filters + Sorting feature to improve UX
* Use test coverage tools
* Add linting
* Include E2E testing (e.g. Playwright or Cypress)
* Properly add Containerization and CI/CD (e.g. Gitlab CI + Docker + ArgoCD)
* Integrate feature flags or environment configs
* Add analytics + error monitoring (e.g. Sentry)
* Use a design system and/or Storybook for UI scalability
* Keep a check on Core Web Vitals (Lighthouse)
* Deploy via Netlify, Vercel, or Docker-based CI

