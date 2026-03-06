# PRD: Frontier Admin Control

## Overview

**Author:** Frontier Program Team
**Date:** 2026-03-06

## Problem Statement

Microsoft 365 administrators need a way to control which users in their organization receive access to experimental Frontier features and agents. Without a centralized admin control, organizations cannot manage the rollout of preview features, enforce user limits, or selectively assign Frontier access based on organizational needs. This impacts IT governance, compliance posture, and the ability to pilot experimental features with a controlled user group before broader deployment.

## Goals

- Provide administrators a self-service UI to manage Frontier feature access for their organization
- Support three access tiers: no access, all users, and specific users/groups
- Enforce a configurable user limit (currently 3) when selecting specific users or groups
- Deliver multiple UX variants to evaluate the optimal user experience through A/B testing
- Integrate with Microsoft Entra ID for user and group selection
- Align with M365 Admin Center design patterns using Fluent UI

## Non-Goals

- Real-time feature provisioning (changes may take up to 3 hours)
- License management or assignment (users must already have M365 Copilot licenses)
- Group nesting or recursive membership resolution
- Audit logging of configuration changes (future consideration)
- Role-based access control for administrators (future consideration)
- Bulk import of users/groups (future consideration)

## User Stories

- As an M365 administrator, I want to disable Frontier features for all users so that my organization does not receive experimental features.
- As an M365 administrator, I want to enable Frontier features for all users so that everyone in my organization can access experimental features and agents.
- As an M365 administrator, I want to select specific users or groups to receive Frontier features so that I can pilot experimental features with a controlled set of users.
- As an M365 administrator, I want to see a warning when I exceed the allowed user limit so that I understand my configuration cannot be saved until corrected.
- As an M365 administrator, I want to cancel my unsaved changes so that I can revert to the last saved configuration without risk.
- As an M365 administrator, I want the system to validate my configuration on save so that I am only blocked when submitting an invalid configuration, not while editing.

## Proposed Solution

A React-based admin control panel embedded in the M365 Admin Center that provides a card-based UI for managing Frontier access. The solution implements three UX variants (tabs) to support A/B testing of different approaches to user/group selection and limit enforcement:

1. **Option 1 — No Group Support:** Individual user selection only, no user limit, simplest experience.
2. **Option 2 — With Group Support:** User and group selection with a 3-user limit validated on save.
3. **Option 3 — Pre-exceeded Limit:** Same as Option 2, but pre-populated with 5 users to demonstrate the exceeded-limit state and warning banner behavior.

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
| `TabList` | Variant selector for switching between Option 1/2/3 |
| `RadioGroup` | Access level selection (no access, all users, specific users/groups) |
| `Combobox` (multiselect) | User/group search and selection from mock Entra data |
| `TagGroup` | Display of selected users/groups with dismissible tags |
| `MessageBar` | Warning banners for validation errors and pre-existing limit exceeded states |

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

Additional state flags track validation (`option2ValidationError`, `option3ValidationError`) and Option 3's pre-existing warning dismissal (`option3WarningDismissed`).

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
| UX variant preference | Identify best-performing variant | A/B test comparing task completion rate across Options 1/2/3 |
| Change processing SLA | 100% of changes processed within 3 hours | Backend processing pipeline monitoring |

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users confused by persistent validation errors (errors don't auto-clear) | Medium | Medium | Clear messaging in warning banner with "Learn more" link; error only clears on explicit Save or Cancel action |
| 3-user limit too restrictive for large organizations | Medium | High | Design for configurable limits; current hardcoded limit is for demo/pilot phase |
| Mock Entra data doesn't represent real-world scale | Low | Medium | Plan for real Entra ID integration with server-side search and pagination |
| 3-hour processing delay causes admin frustration | Medium | Low | Clear messaging in UI about processing time; no false confirmation of instant effect |
| Multiple UX variants create maintenance burden | Low | Low | Variants share common state structure; production deployment will select a single variant |
| Accessibility gaps in custom-composed components | Low | High | Using Fluent UI components which have built-in ARIA support; keyboard navigation verified |

## Open Questions

- [ ] Which UX variant (Option 1, 2, or 3) will be selected for production deployment?
- [ ] Will the 3-user limit be configurable per tenant, or remain fixed?
- [ ] What is the integration path to replace mock data with real Microsoft Entra ID lookups?
- [ ] Should the "Learn more" support article be hosted externally or within the Admin Center?
- [ ] Is role-based access control needed for which admins can modify Frontier settings?
- [ ] Should configuration changes trigger notifications to affected users?
- [ ] What telemetry/audit logging is required for compliance purposes?
