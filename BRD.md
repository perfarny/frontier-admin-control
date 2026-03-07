# PRD: Frontier Admin Control

## Overview

**Author:** Frontier Program Team
**Date:** 2026-03-06

## Problem Statement

Microsoft 365 administrators need a way to control which users in their organization receive access to experimental Frontier features and agents. Without a centralized admin control, organizations cannot manage the rollout of preview features, enforce user limits, or selectively assign Frontier access based on organizational needs. This impacts IT governance, compliance posture, and the ability to pilot experimental features with a controlled user group before broader deployment.

## Goals

- Provide administrators a self-service UI to manage Frontier feature access for their organization
- Unify Frontier enrollment into a single control across all apps, platforms, and agents
- Support three access tiers: no access, all users, and specific users/groups
- Support assignment via individual users and Entra groups (max 10,000 total users)
- Integrate with Microsoft Entra ID for user and group selection
- Align with M365 Admin Center design patterns using Fluent UI

## Non-Goals

- Real-time feature provisioning (changes may take up to 3 hours)
- License management or assignment (users must already have M365 Copilot licenses)
- Group nesting or recursive membership resolution
- Audit logging of configuration changes (future consideration)
- Role-based access control for administrators (future consideration)
- Bulk import of users/groups (future consideration)

## Functional Requirements

1. The admin control provides three access tiers via radio buttons: **No access** (users will not have access to Frontier features and agents), **All users** (all users will automatically receive Frontier features and agents), and **Specific groups or users** (only specified groups and users will receive access).
2. The default state for new tenants is **No access**.
3. When "Specific groups or users" is selected, a combobox appears allowing the admin to search and select Entra users and groups.
4. Total user assignment (via individual users and/or members within groups) may not exceed **10,000**.
5. Selected users and groups are displayed as dismissible tags; clicking the dismiss icon removes them.
6. Validation is performed **on save only**, not in real-time. The admin may freely add users beyond the limit while editing; they are only blocked when attempting to save.
7. When save is attempted with an over-limit configuration, a warning banner appears: "You have exceeded the number of allowed users" with a "Learn more" link. The save does not persist.
8. Validation errors persist until the admin clicks Save (successfully) or Cancel. They do not auto-clear.
9. When saved successfully, the baseline state is updated. If the access tier is "No access" or "All users", any previously selected users/groups are discarded.
10. Cancel reverts all unsaved changes back to the last saved state and clears any validation errors.
11. Save and Cancel buttons are disabled when there are no unsaved changes.
12. Changes may take up to 3 hours to process after saving.
13. Users must have a M365 Copilot license to experience Frontier features.
14. The control governs Frontier access across web apps, desktop and mobile apps, and agents — all unified under a single enrollment.
15. Frontier agents are governed by this control. Previously, agents were available to all users independent of the admin control.

## User Stories

- As an M365 administrator, I want to disable Frontier features for all users so that my organization does not receive experimental features.
- As an M365 administrator, I want to enable Frontier features for all users so that everyone in my organization can access experimental features and agents.
- As an M365 administrator, I want to select specific users or Entra groups to receive Frontier features so that I can pilot with a controlled set of users.
- As an M365 administrator, I want to see a warning when I exceed the allowed user limit so that I understand my configuration cannot be saved until corrected.
- As an M365 administrator, I want to cancel my unsaved changes so that I can revert to the last saved configuration without risk.
- As an M365 administrator, I want the system to validate my configuration on save so that I am only blocked when submitting an invalid configuration, not while editing.

## Proposed Solution

A React-based admin control panel embedded in the M365 Admin Center that provides a card-based UI for managing Frontier access. The prototype implements two UX variants to compare approaches:

1. **Current** — Reflects the existing production UX with inner tabs for Web apps, Desktop and mobile apps, and Agents. Web apps supports individual user selection only (no groups). Desktop/mobile and Agents tabs are informational only, directing admins to separate controls.
2. **vNext** — Unified control that governs all apps, platforms, and agents in a single view. Supports both Entra user and group selection with a configurable user limit validated on save.

Each variant maintains independent state and can be switched between using tabs. The admin selects an access level via radio buttons, optionally configures specific users/groups, and saves the configuration.

## Technical Approach

### Architecture

Single-page React application built with:
- **React 19** with TypeScript 5 for the UI layer
- **Fluent UI React Components v9** for M365-consistent design
- **Vite 7** for fast development and production builds
- **GitHub Pages** for demo deployment (`gh-pages`)

### Key Components

| Component | Purpose |
|-----------|---------|
| `App.tsx` | Main component containing all state management, UI rendering, and business logic |
| `TabList` | Variant selector for switching between Current/vNext/MC Post/BRD tabs |
| `RadioGroup` | Access level selection (no access, all users, specific users/groups) |
| `Combobox` (multiselect) | User/group search and selection from Entra data |
| `TagGroup` | Display of selected users/groups with dismissible tags |
| `MessageBar` | Warning banners for validation errors |

### State Management

Each variant maintains an independent `OptionState`:
```typescript
interface OptionState {
  selectedOption: 'no-access' | 'all-users' | 'specific-groups'
  selectedUsersGroups: string[]
  initialSelectedOption: 'no-access' | 'all-users' | 'specific-groups'
  initialUsersGroups: string[]
}
```

Additional state flags track validation (`option2ValidationError`).

Change detection compares current state against initial (last-saved) state to enable/disable Save and Cancel buttons.

### Affected Areas

- [src/App.tsx](src/App.tsx) — Main application component (all UI and logic)
- [src/main.tsx](src/main.tsx) — Application entry point
- [index.html](index.html) — HTML shell
- [public/support-article.html](public/support-article.html) — "Learn more" link target

### Dependencies

- `@fluentui/react-components` ^9.73.0 — Fluent UI component library
- `@fluentui/react-icons` ^2.0.319 — Fluent UI icons
- `react` ^19.2.4 / `react-dom` ^19.2.4 — UI framework
- `vite` ^7.3.1 — Build tooling
- `typescript` ^5.9.3 — Type system
- `gh-pages` ^6.3.0 — Deployment

## Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Admin task completion rate | ≥95% of admins successfully save a valid configuration | Analytics on save success vs. validation failure ratio |
| Time to configure | <60 seconds for a new configuration | Session timing from first interaction to successful save |
| Validation comprehension | ≤1 repeated validation error per session | Count of consecutive failed save attempts per session |
| Change processing SLA | 100% of changes processed within 3 hours | Backend processing pipeline monitoring |

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| 10,000-user limit too restrictive for large organizations | Medium | High | Design for configurable limits; monitor usage patterns |
| 3-hour processing delay causes admin frustration | Medium | Low | Clear messaging in UI about processing time; no false confirmation of instant effect |
| Entra group membership resolution at scale | Medium | Medium | Plan for server-side resolution with caching and pagination |
| Accessibility gaps in custom-composed components | Low | High | Using Fluent UI components which have built-in ARIA support; keyboard navigation verified |

## Open Questions

- [ ] Will the 10,000-user limit be configurable per tenant, or remain fixed?
- [ ] What is the integration path to replace mock data with real Microsoft Entra ID lookups?
- [ ] Should the "Learn more" support article be hosted externally or within the Admin Center?
- [ ] Is role-based access control needed for which admins can modify Frontier settings?
- [ ] Should configuration changes trigger notifications to affected users?
- [ ] What telemetry/audit logging is required for compliance purposes?
