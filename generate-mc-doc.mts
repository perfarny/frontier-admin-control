import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { writeFileSync } from 'fs'

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({
        text: 'Message Center Post',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),

      // Feature Name
      new Paragraph({ text: 'Feature Name', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ text: 'Frontier Admin Control', spacing: { after: 200 } }),

      // Feature Description
      new Paragraph({ text: 'Feature Description', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        text: 'The Frontier Admin Control is a setting in the Microsoft 365 Admin Center that allows IT administrators to manage which users in their organization receive access to experimental Frontier features and agents.',
        spacing: { after: 200 },
      }),

      // Target Audience
      new Paragraph({ text: 'Target Audience', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ text: 'IT Admins', spacing: { after: 200 } }),

      // Production Release Date
      new Paragraph({ text: 'Production Release Date', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({ text: 'April 16, 2026', spacing: { after: 200 } }),

      // Proposed Title
      new Paragraph({ text: 'Proposed Title', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        children: [new TextRun({ text: 'Frontier Admin Control: unified enrollment and Entra group support', bold: true })],
        spacing: { after: 200 },
      }),

      // Proposed Description
      new Paragraph({ text: 'Proposed Description', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        text: 'We are making two changes to the Frontier Admin Control. Frontier enrollment is now unified into a single control across all apps and platforms, including agents. Administrators can now assign access to Entra groups in addition to individual users.',
        spacing: { after: 200 },
      }),

      // Customer Impact
      new Paragraph({ text: 'Customer Impact', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Largely transparent to end users — no action required',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Frontier agents will only be accessible to users assigned access through the admin control (previously these were disconnected from the control)',
        spacing: { after: 200 },
      }),

      // Admin Impact
      new Paragraph({ text: 'Admin Impact', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Single control now governs Frontier access across web apps, desktop and mobile apps, and agents — no separate enrollment needed',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Access can now be assigned to Entra groups, not just individual users, reducing management overhead. Note, total user assignment (via users and/or within groups) may not exceed 10,000.',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Frontier agents are now governed by this control — previously agents were available to all users (pending standard admin agent controls)',
      }),
    ],
  }],
})

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('FrontierAdminControl-MC.docx', buffer)
  console.log('Word document created: FrontierAdminControl-MC.docx')
})
