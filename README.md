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

## 📦 Real-World Project Improvements

* In a production scenario, I would also:
* Add CI/CD (e.g. GitHub Actions) for tests and linting
* Include E2E testing (e.g. Playwright or Cypress)
* Integrate feature flags or environment configs
* Add analytics + error monitoring (e.g. Sentry, PostHog)
* Use a design system or Storybook for UI scalability
* Implement robust accessibility testing (axe-core, Lighthouse)
* Deploy via Netlify, Vercel, or Docker-based CI

