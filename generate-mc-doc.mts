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
        children: [new TextRun({ text: 'Frontier Admin Control: unified enrollment, agent governance, and group support', bold: true })],
        spacing: { after: 200 },
      }),

      // Proposed Description
      new Paragraph({ text: 'Proposed Description', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        text: 'We are making three changes to the Frontier Admin Control. Frontier enrollment is now unified into a single control across web apps, desktop and mobile apps, and agents. Frontier agents now adhere to the admin control instead of being available to all users by default. Administrators can now assign access to groups in addition to individual users (max 10,000 users).',
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
        text: 'Users no longer need to separately enroll in the Insider program for desktop/mobile Frontier features',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Frontier agents will only be available to users granted access through the admin control (previously available to all users)',
        spacing: { after: 200 },
      }),

      // Admin Impact
      new Paragraph({ text: 'Admin Impact', heading: HeadingLevel.HEADING_2, spacing: { before: 300 } }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Review existing Frontier Admin Control configuration — it now governs all apps, platforms, and agents',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Frontier agents no longer roll out to all users by default — only users granted access through this control will receive them',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Groups can now be assigned in addition to individual users, reducing management overhead',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'No action required if current configuration is already set as desired',
      }),
      new Paragraph({
        bullet: { level: 0 },
        text: 'Changes may take up to 3 hours to take effect',
      }),
    ],
  }],
})

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('FrontierAdminControl-MC.docx', buffer)
  console.log('Word document created: FrontierAdminControl-MC.docx')
})
