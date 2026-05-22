# SaaS Tools Dashboard

Angular frontend application for internal SaaS tools monitoring, management and analytics.

Built as part of a progressive 3-day frontend technical challenge.

---

# Table of Contents

# Table of Contents

- [Features](#features)
- [🚀 Quick Start](#-quick-start)
- [Tech Stack](#tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🔗 Navigation & User Journey](#-navigation--user-journey)
- [📊 Data Integration Strategy](#-data-integration-strategy)
- [📱 Progressive Responsive Design](#-progressive-responsive-design)
- [Testing Strategy](#testing-strategy)
- [Design Choices](#design-choices)
  - [Angular Standalone Components](#angular-standalone-components)
  - [Tailwind + SCSS Strategy](#tailwind--scss-strategy)
  - [Modular Layout Strategy](#modular-layout-strategy)
  - [Theme Token Strategy](#theme-token-strategy)
  - [🎨 Design System Evolution](#-design-system-evolution)
  - [Reusable Modal Strategy](#reusable-modal-strategy)
  - [Catalogue Query Strategy](#catalogue-query-strategy)
  - [Form Validation Strategy](#form-validation-strategy)
  - [📈 Data Visualization Philosophy](#-data-visualization-philosophy)
  - [⚡ Performance Optimizations](#-performance-optimizations)
  - [🎯 Design Consistency Approach](#-design-consistency-approach)
  - [Progressive Delivery Strategy](#progressive-delivery-strategy)
  - [Mock Backend Timestamp Strategy](#mock-backend-timestamp-strategy)
- [🔮 Next Steps / Complete App Vision](#-next-steps--complete-app-vision)
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
- Backend-driven tools pagination
- Unified search / sort / pagination workflow
- Tools table responsive scrolling
- Shared scrollbar UI system
- Tool status management
- Icon URL management with commit-based preview
- Extended tool details modal
- Analytics page
- Monthly spend evolution
- Department cost breakdown
- Budget progress analytics
- Top expensive tools
- User adoption analytics
- Most / least used tools
- Department activity
- Growth trends
- Insights dashboard
- Cost optimization alerts
- Unused tools warnings
- ROI calculations
- Usage patterns

Challenge progression:

- Day 6 — Dashboard foundation
- Day 7 — Tools management (core workflow implemented)
  Day 8 — Analytics page and insights dashboard
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

# 🏗️ Architecture

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

The project intentionally separates three routed business areas:

- Dashboard  
  Operational overview and monitoring

- Tools  
  Catalogue and management workflows

- Analytics  
  Data visualization and business insights

---

# 🚀 Quick Start

Install and launch in one command:

```bash
npm install && npm start
```

Application available at:

```text
http://localhost:4200
```

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

# 🔗 Navigation & User Journey

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

The application intentionally follows a complete user journey:

```text
Dashboard → Tools → Analytics
```

Typical flow:

- Dashboard  
  Monitor KPIs and recent activity

- Tools  
  Search, manage and edit catalogue items

- Analytics  
  Explore costs, adoption and optimization opportunities

This routing strategy validates navigation consistency and business flow across all three challenge pages.

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
- Backend pagination integration
- Pagination UI and navigation controls
- First / previous / next / last navigation
- Unified catalogue query pipeline
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

# 🧪 Testing Strategy

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

# 📊 Data Integration Strategy

The application relies on JSON Server and Angular HttpClient.

Data ownership remains backend-oriented whenever possible.

Dashboard, Tools and Analytics pages consume dedicated services and progressively compose API responses into UI-oriented data.

The tools catalogue intentionally combines:

- global search (`q`)
- server sorting (`_sort`, `_order`)
- pagination (`_page`, `_limit`)
- total count (`X-Total-Count`)

Analytics combines multiple datasets simultaneously in order to derive business insights while avoiding duplicated logic.

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

## 📱 Progressive Responsive Design

Responsive behavior was progressively introduced during development rather than postponed.

Each page adapts differently:

- Dashboard  
  KPI wrapping and responsive tables

- Tools  
  Scrollable catalogue and responsive modals

- Analytics  
  Adaptive charts and compressed insight cards

The project follows a progressive responsive strategy focused on usability across screen sizes.

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

## 🎨 Design System Evolution

The challenge progressively removes visual guidance after Dashboard implementation.

The project therefore intentionally builds its design system throughout the progressive challenge phases.

This strategy aims to:

- preserve visual consistency
- reuse UI primitives
- avoid duplicated styles
- maintain coherent UX across pages

Shared UI components will progressively become the primary styling layer.

The design system progressively evolved during the 3-day challenge.

Day 6 focused on layout and dashboard primitives.

Day 7 expanded reusable CRUD and table systems.

Day 8 extended these foundations into analytics and data visualization.

This approach maintained UI consistency despite progressively reduced mockup guidance.

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

## Catalogue Query Strategy

The tools catalogue intentionally combines global search, server-driven sorting and pagination through a single backend query pipeline.

Rather than splitting catalogue interactions between frontend filtering and backend ordering, all major catalogue controls rely on a unified API-driven strategy.

This approach was chosen to:

- preserve predictable data ordering
- avoid duplicated client-side filtering logic
- reduce state divergence between search, sorting and pagination
- simplify catalogue state management
- keep catalogue interactions scalable for future filtering features

The backend natively supports:

- global search (`q`)
- server sorting (`_sort`, `_order`)
- pagination (`_page`, `_limit`)
- total count exposure (`X-Total-Count`)

The frontend therefore acts primarily as an interaction layer while catalogue state and result ordering remain backend-owned.

Sorting UX intentionally exposes neutral indicators on sortable columns while highlighting active ordering in order to improve discoverability without introducing excessive visual noise.

Pagination follows the same interaction philosophy and intentionally resets after search or sorting changes in order to preserve predictable navigation behavior.

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

## 📈 Data Visualization Philosophy

Chart.js and ng2-charts were selected for analytics integration.

This choice was made to:

- preserve Angular compatibility
- reduce integration complexity
- support dashboard-oriented visualizations
- avoid unnecessary overhead introduced by lower-level libraries such as D3

The analytics layer prioritizes coherent visualization over experimental chart rendering.

Charts intentionally follow the design system through shared spacing, theme-aware colors and reusable card patterns.

Visualization prioritizes readability and business meaning over experimental rendering.

---

## ⚡ Performance Optimizations

Several optimizations were intentionally introduced:

- Angular standalone components
- Signal-driven rendering
- Backend-owned catalogue queries
- Reduced duplicated state
- Controlled modal rendering
- Commit-based preview interactions
- Lightweight chart integration

The project prioritizes predictable responsiveness and maintainable rendering behavior.

---

## 🎯 Design Consistency Approach

The challenge progressively removed mockups after early phases.

Consistency was therefore maintained through:

- shared cards
- reusable badges
- centralized theme tokens
- typography hierarchy
- repeated spacing patterns
- reusable visualization styles

New pages evolved from validated UI primitives rather than independent redesigns.

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

## Scope & Prioritization Strategy

The challenge intentionally exceeds what can reasonably be completed within the available timeframe.

The project therefore follows a deliberate prioritization strategy.

Priority was intentionally given to:

- architectural coherence
- reusable UI foundations
- navigation consistency
- shared design system evolution
- stable CRUD and catalogue workflows
- demonstrable end-to-end user interactions

As a result, some lower-priority or differentiator features were intentionally deferred.

Deferred or partially implemented areas currently include:

- analytics page completion
- bulk operations
- advanced loading / skeleton states
- extended automated testing
- advanced catalogue presets
- CI/CD and infrastructure refinements

This prioritization was intentional and aimed to maximize delivery quality, maintainability and demonstrable feature completeness within the challenge timeframe rather than introducing partially implemented functionality.

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

# 🔮 Next Steps / Complete App Vision
Planned areas include:

- Advanced catalogue filtering and presets
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

The current application represents the foundation of a larger SaaS tools governance platform.

Future evolution may include:

- approval workflows
- license lifecycle monitoring
- spend governance
- automation workflows
- multi-user collaboration
- advanced analytics
---

# Author

Frédérick Beaurienne
