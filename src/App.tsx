import { useState, useMemo } from 'react'
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

type VariantType = 'option1' | 'option2' | 'mcpost'

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
        </TabList>
      </div>

      {currentVariant === 'mcpost' ? (
        <Card className={styles.card}>
          <Title3 className={styles.header}>Message Center Post</Title3>
          <iframe
            className={styles.mcIframe}
            src="https://microsoft-my.sharepoint-df.com/:w:/p/perfarny/cQqHRITj0rLhRIMuwFEly6fBEgUC-C7wsSXGzPs9M90j4Cr32w?action=embedview"
            title="Frontier Admin Control - MC Post"
            allowFullScreen
          />
        </Card>
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
