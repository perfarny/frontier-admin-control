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
      new Paragraph({ bullet: { level: 0 }, text: 'Support three access tiers: no access, all users, and specific users/groups' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Enforce a configurable user limit (currently 3) when selecting specific users or groups' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Deliver multiple UX variants to evaluate the optimal user experience through A/B testing' }),
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

      // User Stories
      new Paragraph({ text: 'User Stories', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to disable Frontier features for all users so that my organization does not receive experimental features.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to enable Frontier features for all users so that everyone in my organization can access experimental features and agents.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to select specific users or groups to receive Frontier features so that I can pilot experimental features with a controlled set of users.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to see a warning when I exceed the allowed user limit so that I understand my configuration cannot be saved until corrected.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want to cancel my unsaved changes so that I can revert to the last saved configuration without risk.' }),
      new Paragraph({ bullet: { level: 0 }, text: 'As an M365 administrator, I want the system to validate my configuration on save so that I am only blocked when submitting an invalid configuration, not while editing.', spacing: { after: 200 } }),

      // Proposed Solution
      new Paragraph({ text: 'Proposed Solution', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        text: 'A React-based admin control panel embedded in the M365 Admin Center that provides a card-based UI for managing Frontier access. The solution implements three UX variants (tabs) to support A/B testing of different approaches to user/group selection and limit enforcement.',
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
              new TableCell({ children: [new Paragraph('UX variant preference')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('Identify best-performing variant')], borders: tableBorders }),
              new TableCell({ children: [new Paragraph('A/B test comparing task completion rate')], borders: tableBorders }),
            ],
          }),
        ],
      }),

      // Risks and Mitigations
      new Paragraph({ text: 'Risks and Mitigations', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: '3-user limit too restrictive for large organizations — design for configurable limits' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Mock Entra data doesn\'t represent real-world scale — plan for real Entra ID integration' }),
      new Paragraph({ bullet: { level: 0 }, text: '3-hour processing delay causes admin frustration — clear messaging in UI about processing time' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Accessibility gaps in custom-composed components — using Fluent UI with built-in ARIA support', spacing: { after: 200 } }),

      // Open Questions
      new Paragraph({ text: 'Open Questions', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ bullet: { level: 0 }, text: 'Which UX variant will be selected for production deployment?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Will the user limit be configurable per tenant, or remain fixed?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'What is the integration path to replace mock data with real Entra ID lookups?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Should the "Learn more" support article be hosted externally or within the Admin Center?' }),
      new Paragraph({ bullet: { level: 0 }, text: 'Is role-based access control needed for which admins can modify Frontier settings?' }),
    ],
  }],
})

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('FrontierAdminControl-BRD.docx', buffer)
  console.log('Word document created: FrontierAdminControl-BRD.docx')
})
