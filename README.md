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
- [Design Choices](#design-choices)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

# Features

Current and planned application scope:

- Dashboard overview
- Internal tools catalog
- KPI visualization
- Analytics and reporting
- Responsive SaaS dashboard UI
- Shared design system
- Cross-page navigation
- Progressive feature delivery
- Reusable component architecture
- Chart-based analytics integration

The project follows the progressive structure defined by the challenge:

- Dashboard foundation
- Tools management
- Analytics integration

---

# Tech Stack

| Technology | Usage |
|---|---|
| Angular 21 | Frontend framework |
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
├── app/
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
```

### Core Areas

- `core`
  Application-wide infrastructure and layout.

- `pages`
  Main routed business views.

- `shared`
  Reusable UI components, utilities and helpers.

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
git clone https://github.com/Frederick-Beaurienne/saas-tools-dashboard

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

```text
/
 /tools
 /analytics
```

Navigation consistency is considered a core requirement of the challenge.

The routing structure is intentionally page-oriented in order to:

- preserve navigation clarity
- support progressive feature delivery
- simplify layout composition

---

# Current Progress

## Completed

- Angular project initialization
- Tailwind integration
- SCSS integration
- Development environment setup
- Dependency installation
- Project architecture definition
- Build and tooling validation

## In Progress

- Layout shell
- Shared navigation
- Dashboard foundation
- Design system construction

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

## Shared Design System Strategy

The challenge progressively removes visual guidance after Dashboard implementation.

The project therefore intentionally builds its design system from Day 6 onward.

This strategy aims to:

- preserve visual consistency
- reuse UI primitives
- avoid duplicated styles
- maintain coherent UX across pages

Shared UI components will progressively become the primary styling layer.

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

# Future Improvements

Planned areas include:

- Advanced filtering
- Search interactions
- User settings area
- Data services integration
- State management evaluation
- Unit testing strategy
- Accessibility refinements
- Micro-interactions and animations
- Performance optimization
- CI/CD integration

---

# Author

Frédérick Beaurienne
