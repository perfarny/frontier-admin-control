# Frontier Admin Control - Requirements Document

**Document Version:** 1.0
**Date:** February 24, 2026
**Purpose:** Backward-engineered requirements specification

---

## 1. Application Overview

### 1.1 Purpose
The Frontier Admin Control application allows administrators to manage user access to Microsoft Frontier features and agents. The application provides a configuration interface for controlling which users in an organization automatically receive Frontier features in their applications.

### 1.2 Key Concepts
- **Frontier Program**: Provides early, hands-on access to experimental features from Microsoft
- **Access Control**: Three-tier system for managing user access (no access, all users, specific users/groups)
- **User Limit**: Maximum of 3 users allowed when selecting specific users/groups (enforced in Options 2 and 3)
- **Processing Time**: Changes may take up to 3 hours to process after saving

---

## 2. Application Variants

The application demonstrates three different UX variants for handling the same underlying functionality. Each variant maintains separate state and can be switched between using tabs.

### 2.1 Option 1: No Group Support
**Behavior:**
- Users can only select individual users, not groups
- No user limit enforced
- No validation errors or warnings
- Simplest variant with minimal constraints

**UI Differences:**
- Third radio option labeled: "Specific users"
- Description: "Only specified users will automatically receive Frontier features and agents."
- Combobox placeholder: "Add users"
- No counter text showing user limits

### 2.2 Option 2: With Group Support
**Behavior:**
- Users can select both individual users and groups
- 3-user limit enforced with validation on Save
- Validation errors persist until Save or Cancel is clicked
- Error appears only after attempted Save with too many users

**UI Differences:**
- Third radio option labeled: "Specific groups or users"
- Description: "Only specified groups and users will automatically receive Frontier features and agents."
- Combobox placeholder: "Search for users or groups"
- Counter text displays: "(Maximum: 3 users)" or "(Maximum: 3 users - Limit Exceeded)" in red

**Validation Behavior:**
- User can add unlimited users/groups without immediate feedback
- When Save is clicked with >3 users selected:
  - Validation error flag is set
  - Warning banner appears: "You have exceeded the number of allowed users. Learn more"
  - Counter text turns red and shows "Limit Exceeded"
  - Save operation is blocked
- Error persists even if user reduces count below 3
- Error only clears when:
  - User reduces to ≤3 users AND clicks Save (successful save)
  - User clicks Cancel (reverts all changes)

### 2.3 Option 3: Pre-exceeded Limit
**Behavior:**
- Users can select both individual users and groups
- 3-user limit enforced with validation on Save
- Pre-populated with 5 users to demonstrate exceeded state
- Shows pre-existing warning banner on load
- Pre-existing warning can auto-dismiss when count reduced below limit
- Validation errors (post-Save) persist until Save or Cancel

**Initial State:**
- Pre-selected users: John Doe, Jane Smith, Bob Johnson, Alice Williams, Executive Team (5 total)
- Access option: "Specific groups or users"
- Shows pre-existing warning banner immediately

**Warning Banner Behavior:**
There are TWO types of warnings in Option 3:

1. **Pre-existing Warning** (shows on initial load):
   - Condition: `initialUsersGroups.length > 3` AND `!option3WarningDismissed` AND `!option3ValidationError`
   - Auto-dismisses when: User reduces count to ≤3 users (immediate)
   - Purpose: Inform user of existing over-limit state

2. **Validation Error** (shows after Save attempt):
   - Condition: User clicked Save with >3 users
   - Does NOT auto-dismiss when count reduced
   - Only clears on successful Save or Cancel
   - Takes precedence over pre-existing warning

---

## 3. Access Control Options

### 3.1 Radio Button Options

#### No Access
- **Value:** `no-access`
- **Behavior:** Users will not have access to Frontier features and agents
- **UI Impact:** No additional controls shown

#### All Users
- **Value:** `all-users`
- **Behavior:** All users will automatically receive Frontier features and agents
- **UI Impact:** No additional controls shown

#### Specific Users/Groups
- **Value:** `specific-groups`
- **Label:** Varies by variant
  - Option 1: "Specific users"
  - Options 2 & 3: "Specific groups or users"
- **UI Impact:** Shows user/group selector controls

### 3.2 User/Group Selection (when "Specific" is selected)

#### Combobox
- **Type:** Multi-select combobox
- **Data Source:** Mock Entra users and groups
  - Groups: Marketing Team, Engineering Team, Sales Team, Executive Team, IT Admins
  - Users: John Doe, Jane Smith, Bob Johnson, Alice Williams
- **Display Format:**
  - Groups: `{Name} (Group)`
  - Users: `{Name} ({Email})`

#### Selected Items Display
- **Component:** TagGroup with dismissible tags
- **Behavior:**
  - Each selected item shown as a tag
  - Click X icon to remove item
  - Tags show only the name (not email or group designation)

#### Counter Text (Options 2 & 3 only)
- **Normal State:** Gray text showing "(Maximum: 3 users)"
- **Error State:** Red text showing "(Maximum: 3 users - Limit Exceeded)"
- **Conditions for Red:**
  - Option 2: `option2ValidationError === true`
  - Option 3: `option3ValidationError === true` OR (initial load with >3 users and warning not dismissed)

---

## 4. State Management

### 4.1 State Structure
Each variant maintains independent state with the following structure:
```typescript
{
  selectedOption: 'no-access' | 'all-users' | 'specific-groups',
  selectedUsersGroups: string[],  // IDs of selected users/groups
  initialSelectedOption: 'no-access' | 'all-users' | 'specific-groups',
  initialUsersGroups: string[]  // IDs representing last saved state
}
```

### 4.2 Current vs Initial State
- **Current State:** Reflects all user changes (not yet saved)
- **Initial State:** Represents the last successfully saved configuration
- **Purpose of Separation:** Enables change detection and Cancel functionality

### 4.3 Change Detection
**Criteria for `hasChanges = true`:**
1. `selectedOption !== initialSelectedOption`, OR
2. `selectedOption === 'specific-groups'` AND selected users/groups differ from initial (order-independent comparison)

**Impact:**
- Save button: Enabled when `hasChanges === true`
- Cancel button: Enabled when `hasChanges === true`

---

## 5. Button Behavior

### 5.1 Save Button

#### Enabled State
- **Condition:** `hasChanges === true`
- **Note:** Button is enabled even if user count exceeds limit (validation happens on click)

#### Click Behavior (Option 1)
1. Log configuration to console
2. Update initial state to match current state
3. No validation performed

#### Click Behavior (Options 2 & 3)
1. Log configuration to console
2. **Validation Check:**
   - IF `selectedOption === 'specific-groups'` AND `selectedUsersGroups.length > 3`:
     - Set validation error flag (option2ValidationError or option3ValidationError)
     - Display warning banner
     - **Abort save** - do not update initial state
     - Button remains enabled for retry
   - ELSE:
     - Clear validation error flag
     - Update initial state to match current state
     - Save successful

### 5.2 Cancel Button

#### Enabled State
- **Condition:** `hasChanges === true`

#### Click Behavior
1. Clear validation error flags (option2ValidationError, option3ValidationError)
2. Reset current state to match initial state:
   - `selectedOption = initialSelectedOption`
   - `selectedUsersGroups = [...initialUsersGroups]`
3. Discard all unsaved changes

---

## 6. Validation Rules & Error Persistence

### 6.1 User Limit Validation (Options 2 & 3 Only)
- **Rule:** Maximum 3 users when "Specific groups or users" is selected
- **Enforcement Point:** On Save button click
- **Not Enforced At:** On user selection/deselection

### 6.2 Validation Error Lifecycle

#### When Validation Error is Set
- User clicks Save with >3 users selected
- `option2ValidationError` or `option3ValidationError` set to `true`

#### When Validation Error is Cleared
**Only cleared in these scenarios:**
1. **Successful Save:** User reduces count to ≤3 AND clicks Save
2. **Cancel:** User clicks Cancel button

**NOT cleared when:**
- User reduces count below limit (error persists until Save/Cancel)
- User switches to different access option (error persists)
- User adds more users after seeing error
- User switches tabs to different variant

#### Impact of Validation Error
- Warning banner displays: "You have exceeded the number of allowed users. Learn more"
- Counter text turns red and shows "Limit Exceeded"
- Save operation blocked until count reduced to ≤3

### 6.3 Critical Behavior: Error Persistence
**Key Requirement:** Once a validation error is triggered by clicking Save, the error message and red text remain visible regardless of subsequent user actions, until the user explicitly clicks Save (with valid count) or Cancel.

**Example Flow:**
1. User selects 5 users
2. User clicks Save → Validation error appears, counter turns red
3. User removes 2 users (now 3 selected)
4. Counter stays red, error message remains visible
5. User clicks Save → Validation passes, error clears, save successful

---

## 7. Warning Banner Behavior

### 7.1 Option 3 Pre-existing Warning
**Display Conditions (ALL must be true):**
- `currentVariant === 'option3'`
- `selectedOption === 'specific-groups'`
- `initialUsersGroups.length > 3` (saved state has too many users)
- `!option3WarningDismissed` (warning not yet dismissed)
- `!option3ValidationError` (validation error not showing)

**Auto-dismiss Behavior:**
- When user reduces count to ≤3 users, immediately sets `option3WarningDismissed = true`
- Warning disappears as soon as count drops to 3 or fewer
- This is the ONLY warning that auto-dismisses

**Message:** "You have exceeded the number of allowed users. Learn more"

### 7.2 Validation Error Warning (Options 2 & 3)
**Display Conditions:**
- (`currentVariant === 'option2'` AND `option2ValidationError === true`) OR
- (`currentVariant === 'option3'` AND `option3ValidationError === true`)
- AND `selectedOption === 'specific-groups'`

**Persistence:**
- Does NOT auto-dismiss
- Only clears when validation error flag is cleared (Save or Cancel)

**Message:** "You have exceeded the number of allowed users. Learn more"

**Priority:** Takes precedence over pre-existing warning in Option 3

---

## 8. User Interaction Flows

### 8.1 Happy Path (Option 2/3 - Within Limit)
1. User selects "Specific groups or users" radio option
2. User adds 2 users from combobox
3. Counter shows "(Maximum: 3 users)" in gray
4. Save button becomes enabled
5. User clicks Save
6. Configuration saved successfully
7. Save/Cancel buttons become disabled

### 8.2 Validation Error Flow (Option 2/3)
1. User selects "Specific groups or users" radio option
2. User adds 5 users from combobox
3. Counter shows "(Maximum: 3 users)" in gray
4. Save button enabled
5. User clicks Save
6. System validates: 5 > 3, validation fails
7. Warning banner appears: "You have exceeded..."
8. Counter turns red: "(Maximum: 3 users - Limit Exceeded)"
9. Save button stays enabled
10. User removes 2 users (now 3 selected)
11. **Error message and red text persist** (key behavior)
12. User clicks Save
13. System validates: 3 ≤ 3, validation passes
14. Error clears, save successful

### 8.3 Cancel Flow
1. User makes changes (changes radio option or modifies user list)
2. Save and Cancel buttons become enabled
3. User clicks Cancel
4. All changes reverted to last saved state
5. Validation errors cleared
6. Save/Cancel buttons become disabled

### 8.4 Option 3 Initial Load Flow
1. User switches to Option 3 tab
2. System displays:
   - "Specific groups or users" selected
   - 5 users pre-selected (John Doe, Jane Smith, Bob Johnson, Alice Williams, Executive Team)
   - Pre-existing warning banner
   - Counter in red: "(Maximum: 3 users - Limit Exceeded)"
3. User removes 2 users
4. Pre-existing warning auto-dismisses
5. Counter remains red (because initial state still has >3 users)
6. User clicks Save
7. Validation passes, save successful
8. Counter turns gray, "Limit Exceeded" text removed

### 8.5 Tab Switching Behavior
- Switching tabs preserves state of each variant independently
- Current changes in one variant do not affect other variants
- Validation errors remain set when returning to a variant
- Example: Error triggered in Option 2 remains visible when returning to Option 2 from Option 3

---

## 9. Technical Implementation Notes

### 9.1 State Variables
```typescript
// Variant selection
currentVariant: 'option1' | 'option2' | 'option3'

// Separate state for each variant
option1State: OptionState
option2State: OptionState
option3State: OptionState

// Validation tracking
option2ValidationError: boolean
option3ValidationError: boolean
option3WarningDismissed: boolean
```

### 9.2 Key Computed Values
- `hasChanges`: Detects if unsaved modifications exist
- `canSave`: Determines if Save button should be enabled (always equals `hasChanges`)

### 9.3 Mock Data
**Users:**
- John Doe (john.doe@contoso.com)
- Jane Smith (jane.smith@contoso.com)
- Bob Johnson (bob.johnson@contoso.com)
- Alice Williams (alice.williams@contoso.com)

**Groups:**
- Marketing Team
- Engineering Team
- Sales Team
- Executive Team
- IT Admins

---

## 10. Business Rules Summary

### 10.1 Global Rules
1. Changes require explicit Save to persist
2. Cancel always reverts to last saved state
3. Processing time: Up to 3 hours after save
4. Users must have M365 Copilot license to experience Frontier

### 10.2 Variant-Specific Rules

| Rule | Option 1 | Option 2 | Option 3 |
|------|----------|----------|----------|
| Groups supported | No | Yes | Yes |
| User limit enforced | No | Yes (3) | Yes (3) |
| Validation on Save | No | Yes | Yes |
| Pre-existing warning | No | No | Yes |
| Error auto-clear | N/A | No | No (validation errors) |
| Counter text shown | No | Yes | Yes |

### 10.3 Error Persistence Rules
1. Validation errors set on Save attempt with >3 users
2. Errors persist regardless of subsequent user actions
3. Errors only clear on successful Save or Cancel
4. Pre-existing warning (Option 3 only) auto-dismisses when count reduced

---

## 11. UI Components & Styling

### 11.1 Layout
- Centered card layout with max-width of 540px
- Tab selector above main card
- Warning banners at top of card (when applicable)
- Radio group in main content area
- Action buttons (Save/Cancel) in footer with divider line

### 11.2 Visual States
**Save/Cancel Buttons:**
- Enabled: Full color, clickable
- Disabled: Grayed out, no hover effect

**Counter Text:**
- Normal: Gray color (tokens.colorNeutralForeground2)
- Error: Red color (tokens.colorPaletteRedForeground1)

**Warning Banner:**
- Intent: warning (yellow/amber styling)
- Includes "Learn more" link
- Positioned above main content

---

## 12. Edge Cases & Special Conditions

### 12.1 Empty Selection
- If "Specific groups or users" selected with 0 users/groups selected
- Save button enabled (change from initial state)
- No validation error (0 ≤ 3)
- Save succeeds

### 12.2 Changing Radio Options
- Switching from "Specific groups or users" to "All users" clears selected users/groups from current state
- Initial state preserves previously saved user list
- Validation errors persist even when different radio option selected

### 12.3 Validation Error with Radio Change
1. User triggers validation error with 5 users selected
2. User switches to "All users" radio option
3. Error message remains visible
4. User switches back to "Specific groups or users"
5. 5 users still selected, error still visible
6. User must Cancel to clear error

### 12.4 Option 3 Warning Interactions
- Pre-existing warning and validation error never show simultaneously
- Validation error takes precedence
- Once validation error triggered, pre-existing warning won't reappear

---

## 13. Accessibility Considerations

### 13.1 Keyboard Navigation
- All controls accessible via keyboard
- Tab order: Tab selector → Radio buttons → Combobox → Tags → Save → Cancel

### 13.2 Screen Reader Support
- Radio buttons have labels and descriptions
- Warning banners use MessageBar component with appropriate ARIA roles
- Selected tags are dismissible with keyboard

### 13.3 Visual Indicators
- Disabled state clearly indicated
- Error states use both color and text
- Focus indicators on all interactive elements

---

## 14. Future Considerations

### 14.1 Potential Enhancements
- Real Entra ID integration (replacing mock data)
- Configurable user limit (not hardcoded to 3)
- Audit log of configuration changes
- Role-based access for administrators
- Bulk user/group import

### 14.2 Variant Selection
- Current implementation shows all three variants for comparison
- Production deployment would select single variant based on UX research
- Consider A/B testing to determine optimal user experience

---

## Appendix A: State Transition Diagrams

### Save Button State Machine
```
Initial: Disabled (no changes)
  ↓ (user makes change)
Enabled
  ↓ (user clicks Save)
  ├→ (validation fails) → Stay Enabled + Show Error
  └→ (validation passes) → Disabled + Clear Error

Cancel always → Disabled + Clear Error
```

### Validation Error State Machine (Options 2 & 3)
```
Initial: false (no error)
  ↓ (Save clicked with >3 users)
true (error shown)
  ↓ (user modifies selection)
true (error persists)
  ↓ (user clicks Save)
  ├→ (still >3 users) → true (stays in error)
  └→ (≤3 users) → false (error clears)

Cancel → false (error clears)
```

---

**End of Document**
