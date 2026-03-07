# Message Center Post

## Feature Name
Frontier Admin Control

## Feature Description
The Frontier Admin Control is a setting in the Microsoft 365 Admin Center that allows IT administrators to manage which users in their organization receive access to experimental Frontier features and agents.

## Target Audience
IT Admins

## Production Release Date
April 16, 2026

## Proposed Title
Frontier Admin Control: unified enrollment and Entra group support

## Proposed Description
We are making two changes to the Frontier Admin Control. Frontier enrollment is now unified into a single control across all apps and platforms, including agents. Administrators can now assign access to Entra groups in addition to individual users.

## Customer Impact
- Largely transparent to end users — no action required
- Frontier agents will only be accessible to users assigned access through the admin control (previously these were disconnected from the control)

## Admin Impact
- Single control now governs Frontier access across web apps, desktop and mobile apps, and agents — no separate enrollment needed
- Access can now be assigned to Entra groups, not just individual users, reducing management overhead
- Frontier agents are now governed by this control — review your configuration to ensure intended users have access
- No action required if current configuration is already set as desired
