import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx'
import { writeFileSync } from 'fs'

const tableBorders = {
  top: { style: BorderStyle.SINGLE, size: 1 },
  bottom: { style: BorderStyle.SINGLE, size: 1 },
  left: { style: BorderStyle.SINGLE, size: 1 },
  right: { style: BorderStyle.SINGLE, size: 1 },
}

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({
        text: 'PRD: Frontier Admin Control',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),

      // Overview
      new Paragraph({ text: 'Overview', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Author: ', bold: true }),
          new TextRun('Frontier Program Team'),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Date: ', bold: true }),
          new TextRun('2026-03-06'),
        ],
        spacing: { after: 200 },
      }),

      // Problem Statement
      new Paragraph({ text: 'Problem Statement', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        text: 'Microsoft 365 administrators need a way to control which users in their organization receive access to experimental Frontier features and agents. Without a centralized admin control, organizations cannot manage the rollout of preview features, enforce user limits, or selectively assign Frontier access based on organizational needs. This impacts IT governance, compliance posture, and the ability to pilot experimental features with a controlled user group before broader deployment.',
        spacing: { after: 200 },
      }),

      // Goals
      new Paragraph({ text: 'Goals', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'Provide administrators a self-service UI to manage Frontier feature access for their organization' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Unify Frontier enrollment into a single control across all apps, platforms, and agents' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Support three access tiers: no access, all users, and specific users/groups' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Support assignment via individual users and Entra groups (max 10,000 total users)' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Integrate with Microsoft Entra ID for user and group selection' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Align with M365 Admin Center design patterns using Fluent UI', spacing: { after: 200 } }),

      // Non-Goals
      new Paragraph({ text: 'Non-Goals', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'Real-time feature provisioning (changes may take up to 3 hours)' }),
      new Paragraph({ bullet: { level: 0 }, text: 'License management or assignment (users must already have M365 Copilot licenses)' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Group nesting or recursive membership resolution' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Audit logging of configuration changes (future consideration)' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Role-based access control for administrators (future consideration)' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Bulk import of users/groups (future consideration)', spacing: { after: 200 } }),

      // Functional Requirements
      new Paragraph({ text: 'Functional Requirements', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'The admin control provides three access tiers via radio buttons: No access, All users, and Specific groups or users.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'The default state for new tenants is No access.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'When "Specific groups or users" is selected, a combobox appears allowing the admin to search and select Entra users and groups.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Total user assignment (via individual users and/or members within groups) may not exceed 10,000.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Selected users and groups are displayed as dismissible tags; clicking the dismiss icon removes them.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Validation is performed on save only, not in real-time. The admin may freely add users beyond the limit while editing.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'When save is attempted with an over-limit configuration, a warning banner appears and the save does not persist.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Validation errors persist until the admin clicks Save (successfully) or Cancel. They do not auto-clear.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'When saved successfully, the baseline state is updated. If the access tier is No access or All users, any selected users/groups are discarded.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Cancel reverts all unsaved changes back to the last saved state and clears any validation errors.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Save and Cancel buttons are disabled when there are no unsaved changes.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Changes may take up to 3 hours to process after saving.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Users must have a M365 Copilot license to experience Frontier features.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'The control governs Frontier access across web apps, desktop and mobile apps, and agents — all unified under a single enrollment.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Frontier agents are governed by this control. Previously, agents were available to all users independent of the admin control.', spacing: { after: 200 } }),

      // User Stories
      new Paragraph({ text: 'User Stories', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to disable Frontier features for all users so that my organization does not receive experimental features.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to enable Frontier features for all users so that everyone in my organization can access experimental features and agents.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to select specific users or Entra groups to receive Frontier features so that I can pilot with a controlled set of users.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to see a warning when I exceed the allowed user limit so that I understand my configuration cannot be saved until corrected.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to cancel my unsaved changes so that I can revert to the last saved configuration without risk.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want the system to validate my configuration on save so that I am only blocked when submitting an invalid configuration, not while editing.', spacing: { after: 200 } }),

      // Proposed Solution
      new Paragraph({ text: 'Proposed Solution', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        text: 'A React-based admin control panel embedded in the M365 Admin Center that provides a card-based UI for managing Frontier access. The prototype implements two UX variants: Current (reflecting the existing production UX with inner tabs) and vNext (unified control governing all apps, platforms, and agents with Entra group support).',
        spacing: { after: 200 },
      }),

      // Technical Approach
      new Paragraph({ text: 'Technical Approach', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'React 19 with TypeScript 5 for the UI layer' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Fluent UI React Components v9 for M365-consistent design' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Vite 7 for fast development and production builds' }),
      new Paragraph({ bullet: { level: 0 }, text: 'GitHub Pages for demo deployment (gh-pages)', spacing: { after: 200 } }),

      // Success Metrics
      new Paragraph({ text: 'Success Metrics', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Metric', bold: true })] })], borders: tableBorders }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Target', bold: true })] })], borders: tableBorders }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'How Measured', bold: true })] })], borders: tableBorders }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph('Admin task completion rate')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('≥95%')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('Analytics on save success vs. validation failure ratio')], borders: tableBorders }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph('Time to configure')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('<60 seconds')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('Session timing from first interaction to successful save')], borders: tableBorders }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph('Change processing SLA')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('100% within 3 hours')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('Backend processing pipeline monitoring')], borders: tableBorders }),
            ],
          }),
        ],
      }),

      // Risks and Mitigations
      new Paragraph({ text: 'Risks and Mitigations', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: '10,000-user limit too restrictive for large organizations — design for configurable limits; monitor usage patterns' }),
      new Paragraph({ bullet: { level: 0 }, text: '3-hour processing delay causes admin frustration — clear messaging in UI about processing time' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Entra group membership resolution at scale — plan for server-side resolution with caching and pagination' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Accessibility gaps in custom-composed components — using Fluent UI with built-in ARIA support', spacing: { after: 200 } }),

      // Open Questions
      new Paragraph({ text: 'Open Questions', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'Will the 10,000-user limit be configurable per tenant, or remain fixed?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'What is the integration path to replace mock data with real Entra ID lookups?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Should the "Learn more" support article be hosted externally or within the Admin Center?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Is role-based access control needed for which admins can modify Frontier settings?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Should configuration changes trigger notifications to affected users?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'What telemetry/audit logging is required for compliance purposes?' }),
    ],
  }],
})

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('FrontierAdminControl-BRD.docx', buffer)
  console.log('Word document created: FrontierAdminControl-BRD.docx')
})
