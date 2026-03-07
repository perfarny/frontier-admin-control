import { useState, useMemo, useCallback } from 'react'
import {
  Card,
  Text,
  Radio,
  RadioGroup,
  Button,
  makeStyles,
  tokens,
  Title2,
  Title3,
  Combobox,
  Option,
  Tag,
  TagGroup,
  TabList,
  Tab,
  MessageBar,
  MessageBarBody,
  Link,
} from '@fluentui/react-components'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground3,
    padding: '20px',
    gap: '16px',
  },
  card: {
    maxWidth: '540px',
    width: '100%',
    padding: '32px',
    boxShadow: tokens.shadow16,
  },
  optionSelector: {
    maxWidth: '540px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  warningBanner: {
    marginBottom: '16px',
  },
  header: {
    marginBottom: '16px',
  },
  description: {
    marginBottom: '12px',
    color: tokens.colorNeutralForeground2,
    lineHeight: '20px',
  },
  sectionTitle: {
    marginTop: '24px',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 400,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  radioItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  radioDescription: {
    marginLeft: '28px',
    color: tokens.colorNeutralForeground2,
    fontSize: '12px',
  },
  userGroupSelector: {
    marginLeft: '28px',
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  combobox: {
    width: '100%',
  },
  selectedItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  counterText: {
    fontSize: '12px',
    marginTop: '8px',
  },
  innerTabList: {
    marginTop: '16px',
    marginBottom: '0px',
  },
  innerTabDivider: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: '16px',
  },
  innerTabContent: {
    marginTop: '0px',
  },
  innerSectionTitle: {
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '8px',
    display: 'block',
  },
  innerSectionDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: '14px',
    lineHeight: '20px',
    marginBottom: '16px',
    display: 'block',
  },
  innerLink: {
    display: 'block',
    marginTop: '8px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  mcIframe: {
    width: '100%',
    minHeight: '600px',
    border: 'none',
  },
})

type AccessOption = 'no-access' | 'all-users' | 'specific-groups'

interface UserOrGroup {
  id: string
  name: string
  type: 'user' | 'group'
  email?: string
}

// Mock data for Entra users and groups
const mockUsersAndGroups: UserOrGroup[] = [
  { id: '1', name: 'Marketing Team', type: 'group' },
  { id: '2', name: 'Engineering Team', type: 'group' },
  { id: '3', name: 'Sales Team', type: 'group' },
  { id: '4', name: 'John Doe', type: 'user', email: 'john.doe@contoso.com' },
  { id: '5', name: 'Jane Smith', type: 'user', email: 'jane.smith@contoso.com' },
  { id: '6', name: 'Bob Johnson', type: 'user', email: 'bob.johnson@contoso.com' },
  { id: '7', name: 'Alice Williams', type: 'user', email: 'alice.williams@contoso.com' },
  { id: '8', name: 'Executive Team', type: 'group' },
  { id: '9', name: 'IT Admins', type: 'group' },
]

type VariantType = 'option1' | 'option2' | 'mcpost' | 'brd'

interface OptionState {
  selectedOption: AccessOption
  selectedUsersGroups: string[]
  initialSelectedOption: AccessOption
  initialUsersGroups: string[]
}

function App() {
  const styles = useStyles()
  const initialOption: AccessOption = 'no-access'

  // State for which variant/option is being viewed
  const [currentVariant, setCurrentVariant] = useState<VariantType>('option1')

  // Copy to clipboard state for MC Post
  const [mcPostCopied, setMcPostCopied] = useState(false)
  const handleCopyMcPost = useCallback(() => {
    const text = `Feature Name
Frontier Admin Control

Feature Description
The Frontier Admin Control is a setting in the Microsoft 365 Admin Center that allows IT administrators to manage which users in their organization receive access to experimental Frontier features and agents.

Target Audience
IT Admins

Production Release Date
April 16, 2026

Proposed Title
Frontier Admin Control: unified enrollment and Entra group support

Proposed Description
We are making two changes to the Frontier Admin Control. Frontier enrollment is now unified into a single control across all apps and platforms, including agents. Administrators can now assign access to Entra groups in addition to individual users.

Customer Impact
• Largely transparent to end users — no action required
• Frontier agents will only be accessible to users assigned access through the admin control (previously these were disconnected from the control)

Admin Impact
• Single control now governs Frontier access across web apps, desktop and mobile apps, and agents — no separate enrollment needed
• Access can now be assigned to Entra groups, not just individual users, reducing management overhead. Note, total user assignment (via users and/or within groups) may not exceed 10,000.
• Frontier agents are now governed by this control — previously agents were available to all users (pending standard admin agent controls)`
    navigator.clipboard.writeText(text)
    setMcPostCopied(true)
    setTimeout(() => setMcPostCopied(false), 2000)
  }, [])

  // Separate state for Option 1 (No Group Support)
  const [option1State, setOption1State] = useState<OptionState>({
    selectedOption: initialOption,
    selectedUsersGroups: [],
    initialSelectedOption: initialOption,
    initialUsersGroups: [],
  })

  // Separate state for Option 2 (With Group Support)
  const [option2State, setOption2State] = useState<OptionState>({
    selectedOption: initialOption,
    selectedUsersGroups: [],
    initialSelectedOption: initialOption,
    initialUsersGroups: [],
  })

  // Track validation error after Save attempt for Option 2 (vNext)
  const [option2ValidationError, setOption2ValidationError] = useState(false)

  // Inner tab state for Current UX (option1)
  type InnerTabType = 'web-apps' | 'desktop-mobile' | 'agents'
  const [option1InnerTab, setOption1InnerTab] = useState<InnerTabType>('web-apps')

  // Get current state based on selected variant
  const currentState =
    currentVariant === 'option1' ? option1State : option2State
  const setCurrentState =
    currentVariant === 'option1' ? setOption1State : setOption2State

  const selectedOption = currentState.selectedOption
  const selectedUsersGroups = currentState.selectedUsersGroups
  const initialSelectedOption = currentState.initialSelectedOption
  const initialUsersGroups = currentState.initialUsersGroups

  // Check if changes have been made
  const hasChanges = useMemo(() => {
    if (selectedOption !== initialSelectedOption) return true
    if (selectedOption === 'specific-groups' as AccessOption) {
      return JSON.stringify([...selectedUsersGroups].sort()) !== JSON.stringify([...initialUsersGroups].sort())
    }
    return false
  }, [selectedOption, selectedUsersGroups, initialSelectedOption, initialUsersGroups])

  // Validation errors are only cleared on Save or Cancel, not automatically

  // Check if save is allowed
  const canSave = useMemo(() => {
    // Save button is enabled whenever there are changes
    // Validation happens in handleSave, not here
    return hasChanges
  }, [hasChanges])

  const handleSave = () => {
    console.log('Saving configuration:', { variant: currentVariant, selectedOption, selectedUsersGroups })

    // For Option 2 (vNext), validate user count on Save
    if (currentVariant === 'option2' &&
        selectedOption === 'specific-groups' &&
        selectedUsersGroups.length > 3) {
      setOption2ValidationError(true)
      return // Don't save
    }

    // Clear validation errors on successful save
    if (currentVariant === 'option2') {
      setOption2ValidationError(false)
    }

    // When saving with no-access or all-users, clear the user/group selections
    const savedUsersGroups = selectedOption === 'specific-groups' ? [...selectedUsersGroups] : []

    // Update the initial state to match current state (successful save)
    setCurrentState({
      ...currentState,
      selectedUsersGroups: savedUsersGroups,
      initialSelectedOption: selectedOption,
      initialUsersGroups: savedUsersGroups,
    })
  }

  const handleCancel = () => {
    console.log('Cancelled')
    // Clear validation errors on cancel
    if (currentVariant === 'option2') {
      setOption2ValidationError(false)
    }
    // Reset to the last saved state
    setCurrentState({
      ...currentState,
      selectedOption: initialSelectedOption,
      selectedUsersGroups: [...initialUsersGroups],
    })
  }

  const handleSelectUserGroup = (id: string) => {
    if (!selectedUsersGroups.includes(id)) {
      setCurrentState({
        ...currentState,
        selectedUsersGroups: [...selectedUsersGroups, id],
      })
    }
  }

  const handleRemoveUserGroup = (id: string) => {
    setCurrentState({
      ...currentState,
      selectedUsersGroups: selectedUsersGroups.filter((item) => item !== id),
    })
  }

  const handleOptionChange = (option: AccessOption) => {
    setCurrentState({
      ...currentState,
      selectedOption: option,
    })
  }

  const getSelectedItems = () => {
    return mockUsersAndGroups.filter((item) => selectedUsersGroups.includes(item.id))
  }

  return (
    <div className={styles.container}>
      <Title2>Frontier Admin Control</Title2>
      <div className={styles.optionSelector}>
        <TabList
          selectedValue={currentVariant}
          onTabSelect={(_, data) => setCurrentVariant(data.value as VariantType)}
        >
          <Tab value="option1">Current</Tab>
          <Tab value="option2">vNext</Tab>
          <Tab value="mcpost">MC Post</Tab>
          <Tab value="brd">BRD</Tab>
        </TabList>
      </div>

      {currentVariant === 'mcpost' || currentVariant === 'brd' ? (
        currentVariant === 'mcpost' ? (
        <Card className={styles.card}>
          <Title3 className={styles.header}>Message Center Post</Title3>
          <Text style={{ marginBottom: '16px', display: 'block' }}>
            For commenting and editing, please open here:{' '}
            <Link href="https://microsoft-my.sharepoint-df.com/:w:/p/perfarny/cQqHRITj0rLhRIMuwFEly6fBEgUC-C7wsSXGzPs9M90j4Cr32w" target="_blank" rel="noopener noreferrer">
              Word Document
            </Link>
            {' | '}
            <Link as="button" onClick={handleCopyMcPost} style={{ cursor: 'pointer' }}>
              {mcPostCopied ? 'Copied!' : 'Copy text to clipboard'}
            </Link>
          </Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Feature Name</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>Frontier Admin Control</Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Feature Description</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>The Frontier Admin Control is a setting in the Microsoft 365 Admin Center that allows IT administrators to manage which users in their organization receive access to experimental Frontier features and agents.</Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Target Audience</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>IT Admins</Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Production Release Date</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>April 16, 2026</Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Proposed Title</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>Frontier Admin Control: unified enrollment and Entra group support</Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Proposed Description</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>We are making two changes to the Frontier Admin Control. Frontier enrollment is now unified into a single control across all apps and platforms, including agents. Administrators can now assign access to Entra groups in addition to individual users.</Text>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Customer Impact</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>Largely transparent to end users — no action required</Text></li>
            <li><Text>Frontier agents will only be accessible to users assigned access through the admin control (previously these were disconnected from the control)</Text></li>
          </ul>

          <Text style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Admin Impact</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>Single control now governs Frontier access across web apps, desktop and mobile apps, and agents — no separate enrollment needed</Text></li>
            <li><Text>Access can now be assigned to Entra groups, not just individual users, reducing management overhead. Note, total user assignment (via users and/or within groups) may not exceed 10,000.</Text></li>
            <li><Text>Frontier agents are now governed by this control — previously agents were available to all users (pending standard admin agent controls)</Text></li>
          </ul>
        </Card>
        ) : (
        <Card className={styles.card}>
          <Title3 className={styles.header}>Business Requirements Document</Title3>
          <Text style={{ marginBottom: '16px', display: 'block' }}>
            For commenting and editing, please open here:{' '}
            <Link href="https://microsoft-my.sharepoint-df.com/:w:/p/perfarny/cQrSAzvtF_B8SagArDgDQxPCEgUCxkWn2hCavEdybOBC_LmD_Q" target="_blank" rel="noopener noreferrer">
              Word Document
            </Link>
          </Text>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Overview</Text>
          <Text style={{ display: 'block', marginBottom: '4px' }}><Text style={{ fontWeight: 600 }}>Author:</Text> Frontier Program Team</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}><Text style={{ fontWeight: 600 }}>Date:</Text> 2026-03-06</Text>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Problem Statement</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>Microsoft 365 administrators need a way to control which users in their organization receive access to experimental Frontier features and agents. Without a centralized admin control, organizations cannot manage the rollout of preview features, enforce user limits, or selectively assign Frontier access based on organizational needs.</Text>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Goals</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>Provide administrators a self-service UI to manage Frontier feature access</Text></li>
            <li><Text>Support three access tiers: no access, all users, and specific users/groups</Text></li>
            <li><Text>Enforce a configurable user limit when selecting specific users or groups</Text></li>
            <li><Text>Deliver multiple UX variants for A/B testing</Text></li>
            <li><Text>Integrate with Microsoft Entra ID for user and group selection</Text></li>
            <li><Text>Align with M365 Admin Center design patterns using Fluent UI</Text></li>
          </ul>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Non-Goals</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>Real-time feature provisioning (changes may take up to 3 hours)</Text></li>
            <li><Text>License management or assignment</Text></li>
            <li><Text>Group nesting or recursive membership resolution</Text></li>
            <li><Text>Audit logging of configuration changes (future consideration)</Text></li>
            <li><Text>Role-based access control for administrators (future consideration)</Text></li>
          </ul>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>User Stories</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>As an M365 administrator, I want to disable Frontier features for all users so that my organization does not receive experimental features.</Text></li>
            <li><Text>As an M365 administrator, I want to enable Frontier features for all users so that everyone can access experimental features and agents.</Text></li>
            <li><Text>As an M365 administrator, I want to select specific users or groups to receive Frontier features so that I can pilot with a controlled set of users.</Text></li>
            <li><Text>As an M365 administrator, I want to see a warning when I exceed the allowed user limit so that I understand my configuration cannot be saved until corrected.</Text></li>
          </ul>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Proposed Solution</Text>
          <Text style={{ display: 'block', marginBottom: '12px' }}>A React-based admin control panel embedded in the M365 Admin Center that provides a card-based UI for managing Frontier access. The solution implements multiple UX variants (tabs) to support A/B testing of different approaches to user/group selection and limit enforcement.</Text>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Technical Approach</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>React 19 with TypeScript 5 for the UI layer</Text></li>
            <li><Text>Fluent UI React Components v9 for M365-consistent design</Text></li>
            <li><Text>Vite 7 for fast development and production builds</Text></li>
            <li><Text>GitHub Pages for demo deployment</Text></li>
          </ul>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Risks and Mitigations</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>3-user limit too restrictive for large organizations — design for configurable limits</Text></li>
            <li><Text>Mock Entra data doesn't represent real-world scale — plan for real Entra ID integration</Text></li>
            <li><Text>3-hour processing delay causes admin frustration — clear messaging in UI about processing time</Text></li>
          </ul>

          <Text style={{ fontWeight: 600, fontSize: '16px', display: 'block', marginBottom: '8px' }}>Open Questions</Text>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li><Text>Which UX variant will be selected for production deployment?</Text></li>
            <li><Text>Will the user limit be configurable per tenant, or remain fixed?</Text></li>
            <li><Text>What is the integration path to replace mock data with real Entra ID lookups?</Text></li>
            <li><Text>Is role-based access control needed for which admins can modify Frontier settings?</Text></li>
          </ul>
        </Card>
        )
      ) : (
      <Card className={styles.card}>
        <Title3 className={styles.header}>Turn on Frontier features</Title3>

        {/* Show validation error after Save attempt for vNext (option2) */}
        {currentVariant === 'option2' && option2ValidationError &&
          selectedOption === 'specific-groups' && (
          <MessageBar
            intent="warning"
            className={styles.warningBanner}
          >
            <MessageBarBody>
              You have exceeded the number of allowed users. <Link href="support-article.html" target="_blank" rel="noopener noreferrer">Learn more</Link>
            </MessageBarBody>
          </MessageBar>
        )}

        <Text className={styles.description}>
          The Frontier program gives your organization early, hands-on access to experimental
          and preview features for Microsoft. All Frontier features and agents are previews and
          might not be released to general availability.
        </Text>

        {currentVariant === 'option1' && (
          <Text className={styles.description}>
            To get the most out of the Frontier program, we recommend turning on preview
            features in web apps, desktop apps, and agents.
          </Text>
        )}

        <Text className={styles.description}>
          <a
            href="https://adoption.microsoft.com/en-us/copilot/frontier-program/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: tokens.colorBrandForeground1, textDecoration: 'none' }}
          >
            {currentVariant === 'option1' ? 'Learn more about Copilot Frontier' : 'Learn more about Frontier'}
          </a>
        </Text>

        {/* Current UX (option1) - inner tabs layout */}
        {currentVariant === 'option1' && (
          <>
            <TabList
              selectedValue={option1InnerTab}
              onTabSelect={(_, data) => setOption1InnerTab(data.value as InnerTabType)}
              className={styles.innerTabList}
            >
              <Tab value="web-apps">Web apps</Tab>
              <Tab value="desktop-mobile">Desktop and mobile apps</Tab>
              <Tab value="agents">Agents</Tab>
            </TabList>
            <div className={styles.innerTabDivider} />

            <div className={styles.innerTabContent}>
              {option1InnerTab === 'web-apps' && (
                <>
                  <Text className={styles.innerSectionTitle}>
                    Allow users to access Frontier features in the web apps
                  </Text>
                  <Text className={styles.innerSectionDescription}>
                    Select which users get access to the Frontier program.
                  </Text>
                  <RadioGroup
                    value={selectedOption}
                    onChange={(_, data) => handleOptionChange(data.value as AccessOption)}
                    className={styles.radioGroup}
                  >
                    <div className={styles.radioItem}>
                      <Radio value="no-access" label="No access" />
                    </div>
                    <div className={styles.radioItem}>
                      <Radio value="all-users" label="All users" />
                    </div>
                    <div className={styles.radioItem}>
                      <Radio value="specific-groups" label="Specific users" />
                      <div className={styles.userGroupSelector}>
                        <Combobox
                          multiselect
                          placeholder="Select users"
                          className={styles.combobox}
                          disabled={selectedOption !== 'specific-groups'}
                          selectedOptions={selectedUsersGroups}
                          onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                              if (data.selectedOptions.includes(data.optionValue)) {
                                handleSelectUserGroup(data.optionValue)
                              } else {
                                handleRemoveUserGroup(data.optionValue)
                              }
                            }
                          }}
                        >
                          {mockUsersAndGroups.filter(item => item.type === 'user').map((item) => {
                            const displayText = `${item.name} ${item.email ? `(${item.email})` : ''}`
                            return (
                              <Option key={item.id} value={item.id} text={displayText}>
                                {displayText}
                              </Option>
                            )
                          })}
                        </Combobox>
                        {selectedOption === 'specific-groups' && selectedUsersGroups.length > 0 && (
                          <TagGroup className={styles.selectedItems}>
                            {getSelectedItems().map((item) => (
                              <Tag
                                key={item.id}
                                dismissible
                                dismissIcon={{ onClick: () => handleRemoveUserGroup(item.id) }}
                                value={item.id}
                              >
                                {item.name}
                              </Tag>
                            ))}
                          </TagGroup>
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </>
              )}

              {option1InnerTab === 'desktop-mobile' && (
                <>
                  <Text className={styles.innerSectionTitle}>
                    Add users to the Insider program to join Frontier
                  </Text>
                  <Text className={styles.innerSectionDescription}>
                    This administrative control does not govern Frontier program access for desktop and
                    mobile apps. Join the Microsoft 365 Insider program and select the Beta Channel to
                    get exclusive access to the latest features in the desktop versions of the Microsoft
                    365 Apps, like Word, PowerPoint, and Excel for Windows, Mac, and Android.
                  </Text>
                  <Link
                    href="https://insider.microsoft365.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.innerLink}
                  >
                    Go to the Microsoft 365 Insider program
                  </Link>
                </>
              )}

              {option1InnerTab === 'agents' && (
                <>
                  <Text className={styles.innerSectionTitle}>
                    Get early access to AI agents built by Microsoft
                  </Text>
                  <Text className={styles.innerSectionDescription}>
                    This administrative control does not govern Frontier program access for Agents.
                    Manage access to Frontier agents with existing agent management tools. The
                    Frontier program gives you early access to Microsoft's pre-built AI agents. Go to the
                    Agent store and look for agents &quot;Built by Microsoft&quot;. Frontier program agents will be
                    tagged with &quot;(Frontier)&quot; at the end of the agent's name.
                  </Text>
                  <Link
                    href="https://admin.microsoft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.innerLink}
                  >
                    Go to the Agent store to view Agents built by Microsoft
                  </Link>
                </>
              )}
            </div>
          </>
        )}

        {/* Options 2 and 3 - original layout */}
        {currentVariant !== 'option1' && (
          <>
            <Text className={styles.sectionTitle}>
              Select which users automatically get Frontier features and agents in their applications. These users
              must have a M365 Copilot license to experience Frontier. Note, changes may take up to 3 hours to
              process.
            </Text>

            <RadioGroup
              value={selectedOption}
              onChange={(_, data) => handleOptionChange(data.value as AccessOption)}
              className={styles.radioGroup}
            >
              <div className={styles.radioItem}>
                <Radio value="no-access" label="No access" />
                <Text className={styles.radioDescription}>
                  Users will not have access to Frontier features and agents.
                </Text>
              </div>

              <div className={styles.radioItem}>
                <Radio value="all-users" label="All users" />
                <Text className={styles.radioDescription}>
                  All users will automatically receive Frontier features and agents.
                </Text>
              </div>

              <div className={styles.radioItem}>
                <Radio
                  value="specific-groups"
                  label="Specific groups or users"
                />
                <Text className={styles.radioDescription}>
                  Only specified groups and users will automatically receive Frontier features and agents.
                </Text>
                {selectedOption === 'specific-groups' as AccessOption && (
                  <div className={styles.userGroupSelector}>
                    <Combobox
                      multiselect
                      placeholder="Search for users or groups"
                      className={styles.combobox}
                      selectedOptions={selectedUsersGroups}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue) {
                          if (data.selectedOptions.includes(data.optionValue)) {
                            handleSelectUserGroup(data.optionValue)
                          } else {
                            handleRemoveUserGroup(data.optionValue)
                          }
                        }
                      }}
                    >
                      {mockUsersAndGroups.map((item) => {
                        const displayText = `${item.name} ${item.type === 'group' ? '(Group)' : item.email ? `(${item.email})` : ''}`
                        return (
                          <Option key={item.id} value={item.id} text={displayText}>
                            {displayText}
                          </Option>
                        )
                      })}
                    </Combobox>
                    {selectedUsersGroups.length > 0 && (
                      <TagGroup className={styles.selectedItems}>
                        {getSelectedItems().map((item) => (
                          <Tag
                            key={item.id}
                            dismissible
                            dismissIcon={{ onClick: () => handleRemoveUserGroup(item.id) }}
                            value={item.id}
                          >
                            {item.name}
                          </Tag>
                        ))}
                      </TagGroup>
                    )}
                    <Text
                      className={styles.counterText}
                      style={{
                        color: option2ValidationError
                          ? tokens.colorPaletteRedForeground1
                          : tokens.colorNeutralForeground2
                      }}
                    >
                      (Maximum: 3 users
                    {option2ValidationError && ' - Limit Exceeded'}
                      )
                    </Text>
                  </div>
                )}
              </div>
            </RadioGroup>
          </>
        )}

        <div className={styles.footer}>
          <Button appearance="secondary" onClick={handleCancel} disabled={!hasChanges}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSave} disabled={!canSave}>
            Save
          </Button>
        </div>
      </Card>
      )}
    </div>
  )
}

export default App
