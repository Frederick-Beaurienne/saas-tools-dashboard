# SaaS Tools Dashboard

Angular frontend application for internal SaaS tools monitoring, management and analytics.

Built as part of a progressive 3-day frontend technical challenge.

---

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Clone Repository](#clone-repository)
- [Install Dependencies](#install-dependencies)
- [Run the Application](#run-the-application)
- [Routing Strategy](#routing-strategy)
- [Current Progress](#current-progress)
- [Testing](#testing)
- [Design Choices](#design-choices)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

# Features

Implemented features:

- Dashboard page
- KPI analytics cards
- Recent tools dashboard table
- Tool details / edit modal
- Tool creation workflow
- Safe delete workflow
- Form validation and UX feedback
- Theme-aware form system
- Reusable modal architecture
- Responsive SaaS dashboard UI
- Dark / light theme switching
- Shared design system
- Cross-page navigation
- Lucide icon integration
- Theme-aware reusable components
- API-driven dashboard data
- Progressive component architecture
- Tools catalog page
- Global cross-page search
- Multi-field search workflow
- Table sorting workflow for Tools page
- Tools table responsive scrolling
- Shared scrollbar UI system
- Tool status management
- Icon URL management with commit-based preview
- Extended tool details modal

Challenge progression:

- Day 6 — Dashboard foundation
- Day 7 — Tools management (core workflow implemented)
- Day 8 — Analytics integration (planned)

---

# Tech Stack

| Technology | Usage |
|---|---|
| Angular 21 | Frontend framework |
| Angular HttpClient | API communication |
| ng-select | Angular select component |
| TypeScript | Application language |
| Angular Router | Navigation |
| Tailwind CSS v4 | Utility-first styling |
| SCSS | Structured component styling |
| Angular CDK | UI and accessibility utilities |
| Lucide Angular | Icons |
| date-fns | Date utilities |
| Chart.js | Data visualization |
| ng2-charts | Angular charts integration |

---

# Project Architecture

The project follows a modular frontend architecture.

```text
src/
└── app/
    ├── core/
    │   ├── layout/
    │   ├── models/
    │   └── services/
    ├── pages/
    │   ├── dashboard/
    │   ├── tools/
    │   └── analytics/
    ├── shared/
    │   ├── components/
    │   ├── models/
    │   ├── pipes/
    │   ├── ui/
    │   └── utils/
    └── styles/
        └── themes/
```

### Core Areas

- `core`
  Application-wide infrastructure and layout.

- `pages`
  Main routed business views.

- `shared`
  Reusable UI components, utilities and helpers.

- `styles/themes`
  Global theme token architecture for dark/light mode management.

The architecture intentionally separates:

- layout concerns
- page logic
- reusable UI logic

in order to preserve maintainability and progressive feature growth.

---

# Prerequisites

- Node.js 22+
- npm 10+
- Git

---

# Clone Repository

```bash
git clone https://github.com/Frederick-Beaurienne/saas-tools-dashboard.git

cd saas-tools-dashboard
```

---

# Install Dependencies

Install project dependencies:

```bash
npm install
```

---

# Run the Application

Start Angular development server:

```bash
npm start
```

Application available at:

```text
http://localhost:4200
```

Production build:

```bash
npm run build
```

---

# Routing Strategy

The application is designed around three primary routes:

The routing layer is intentionally introduced early in the project lifecycle.

Current navigation includes:

- Dashboard
- Tools
- Analytics (foundation route)

This approach validates navigation behavior and layout composition before full feature implementation while preserving navigation consistency across progressive challenge phases.

This routing approach was chosen to:

- preserve navigation clarity
- support progressive feature delivery
- simplify layout composition
- prepare reusable shell-based layouts

---

# Current Progress

## Completed

- Angular project initialization
- Tailwind + SCSS integration
- Modular project architecture
- Router and shell layout
- Navbar implementation
- Dark/light theme system
- Theme switching
- Shared design token architecture
- Lucide icon system
- Dashboard page implementation
- KPI card component system
- Analytics API integration
- Recent tools API integration
- Responsive dashboard layout
- Recent tools table
- Status badge system
- Theme-aware reusable UI components
- Mockup-aligned dashboard implementation
- Responsive implementation and validation
- Build validation and smoke testing
- Reusable tool modal system
- View / edit / create modal states
- Reactive form validation
- ng-select integration
- Dashboard modal integration
- Safe delete workflow
- Modal UX and responsive refinement
- Tools catalog implementation
- Global navbar search integration
- Query-param driven search routing
- Multi-field search service
- Responsive tools data table
- Multi-column tools sorting
- Search + sort API integration
- Table sorting UX indicators
- Shared scrollbar system
- Cross-page search navigation
- Tools page implementation
- Extended tools data presentation
- Status management workflow
- Tool icon management
- Modal detail expansion
- Commit-based icon preview UX

## In Progress

- Shared UI system expansion
- API persistence hardening
- Analytics page implementation
- Testing expansion

---

# Testing

Run test suite:

```bash
npm test
```

Current validation includes:

- Build verification
- Navigation validation
- Theme switching validation
- Component rendering validation
- Responsive verification
- Manual dashboard integration testing
- API integration smoke testing

Given the challenge timeframe, testing currently prioritizes integration confidence and UI validation.

Expanded automated testing coverage remains planned as the application stabilizes.

The testing strategy follows a progressive validation approach.

Tests are intentionally introduced alongside stabilized components rather than postponed to the end of development.

This approach aims to:

- validate component contracts
- preserve navigation integrity
- reduce regression risk
- support iterative delivery
- align testing with project progression

---

# Design Choices

## Angular Standalone Components

The project uses Angular standalone components.

This approach was chosen to:

- reduce boilerplate
- simplify configuration
- improve modularity
- align with modern Angular practices

rather than relying on traditional NgModule-heavy structures.

---

## Tailwind + SCSS Strategy

Tailwind CSS is required by the challenge.

SCSS was intentionally preserved alongside Tailwind.

This combination was chosen to:

- leverage Tailwind rapid UI composition
- retain structured component styling
- avoid large utility-only templates
- prepare long-term component maintainability

The project therefore follows a hybrid styling strategy rather than a Tailwind-only approach.

---

## Modular Layout Strategy

The UI architecture follows a shell-based layout.

Main layout components:

- Shell
- Navbar
- Footer
- Routed content area

This structure was chosen to:

- centralize navigation
- simplify page composition
- support Angular routed layouts
- prepare future layout evolution

The footer component is intentionally present from project initialization, even before final content exists, in order to preserve layout consistency.

---

## Theme Token Strategy

The application intentionally separates structural styling from theme values through centralized SCSS design tokens.

Dark and light themes are fully implemented through body-level theme classes and centralized SCSS token overrides.

Theme switching is intentionally integrated early in the project lifecycle in order to:

- validate theme scalability
- avoid late-stage refactoring
- preserve component reusability
- centralize visual configuration
- prepare future user preferences

Component styles intentionally avoid hardcoded business colors whenever possible.

This approach preserves simplicity while remaining scalable for future evolution.

---

## Shared Design System Strategy

The challenge progressively removes visual guidance after Dashboard implementation.

The project therefore intentionally builds its design system throughout the progressive challenge phases.

This strategy aims to:

- preserve visual consistency
- reuse UI primitives
- avoid duplicated styles
- maintain coherent UX across pages

Shared UI components will progressively become the primary styling layer.

---

## Reusable Modal Strategy

The tools workflow introduced a reusable modal architecture.

Rather than implementing isolated page-specific dialogs, the project introduces a configurable modal component supporting:

- detail mode
- edit mode
- create mode
- safe delete confirmation
- status management
- extended tool metadata display
- icon management and preview


The parent component controls available modes and opening behavior while tool integrity rules, preview behavior and API interactions remain encapsulated inside the modal.

This approach was chosen to:

- reduce duplicated CRUD logic
- centralize interaction workflows
- preserve component reusability
- support future tool-management features
- maintain UX consistency

---

## Search and Sorting Strategy

The tools catalogue intentionally combines multi-field search and server-driven sorting through a unified service pipeline.

Rather than splitting search and sorting between frontend and backend logic, both interactions share the same API-driven workflow.

This approach was chosen to:

- preserve predictable data ordering
- avoid duplicated client-side filtering logic
- reduce state divergence between search and sorting
- keep tools catalogue interactions scalable for future pagination and filtering

Sorting UX intentionally exposes neutral indicators on sortable columns while highlighting active ordering in order to improve discoverability without introducing excessive visual noise.

---

## Form Validation Strategy

The tools workflow introduces progressive form integrity validation.

Reactive form validation is combined with explicit user feedback in order to preserve both data integrity and user experience.

Validation rules are enforced at the application layer while remaining visible to the user through contextual validation messages.

URL integrity validation is applied to both website and icon resources.

Preview interactions intentionally follow a commit-based strategy (blur or submit) rather than live keystroke rendering in order to reduce UI noise and avoid unnecessary asset loading.

This approach was chosen to:

- preserve input integrity
- prevent invalid submissions
- provide explicit user guidance
- reduce interaction ambiguity
- support predictable CRUD workflows

Validation logic is intentionally enforced both at UI level and at TypeScript submission level to preserve defensive application behavior.

---

## Chart Library Choice

Chart.js and ng2-charts were selected for analytics integration.

This choice was made to:

- preserve Angular compatibility
- reduce integration complexity
- support dashboard-oriented visualizations
- avoid unnecessary overhead introduced by lower-level libraries such as D3

The analytics layer prioritizes coherent visualization over experimental chart rendering.

---

## Progressive Delivery Strategy

Given the exercise timeframe and progressive challenge structure, the project follows an incremental delivery strategy.

Priority is intentionally given to:

- architectural coherence
- reusable UI foundations
- stable navigation
- demonstrable feature completion

rather than partially implemented features or premature complexity.

---

## Mock Backend Timestamp Strategy

The dashboard currently exposes a "Last 30 days" recent-tools filter as a planned interaction.

A dedicated service strategy (`getRecentTools30d`) was prepared but intentionally remains disabled.

The provided mock JSON backend does not automatically maintain `created_at` and `updated_at` timestamps during persistence operations.

Rather than injecting timestamps from the frontend, timestamp ownership was intentionally preserved as a backend responsibility.

This decision was made to:

- preserve data integrity
- avoid client-side timestamp injection
- maintain clear ownership of persistence metadata
- keep frontend behavior aligned with production-oriented architecture principles

Until backend timestamp persistence becomes reliable, the dashboard currently relies on sorted recent items rather than true time-window filtering.

---

# Future Improvements

Planned areas include:

- Advanced tools filtering
- Pagination
- Bulk tool operations
- Loading and skeleton states
- Error-state UX refinement
- User settings area
- State management evaluation
- Advanced testing coverage
- Accessibility refinements
- Micro-interactions and animations
- Performance optimization
- CI/CD integration

---

# Author

Frédérick Beaurienne
