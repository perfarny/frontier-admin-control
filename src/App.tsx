import { useState, useMemo } from 'react'
import {
  Card,
  Text,
  Radio,
  RadioGroup,
  Button,
  makeStyles,
  tokens,
  Title3,
  Combobox,
  Option,
  Tag,
  TagGroup,
  TabList,
  Tab,
} from '@fluentui/react-components'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
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

type VariantType = 'option1' | 'option2' | 'option3'

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

  // Separate state for Option 3 (Group Support with Warnings)
  const [option3State, setOption3State] = useState<OptionState>({
    selectedOption: initialOption,
    selectedUsersGroups: [],
    initialSelectedOption: initialOption,
    initialUsersGroups: [],
  })

  // Get current state based on selected variant
  const currentState =
    currentVariant === 'option1' ? option1State :
    currentVariant === 'option2' ? option2State :
    option3State
  const setCurrentState =
    currentVariant === 'option1' ? setOption1State :
    currentVariant === 'option2' ? setOption2State :
    setOption3State

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

  // Check if save is allowed (for option3, enforce 10 item limit)
  const canSave = useMemo(() => {
    if (!hasChanges) return false
    if (currentVariant === 'option3' && selectedUsersGroups.length > 10) return false
    return true
  }, [hasChanges, currentVariant, selectedUsersGroups])

  const handleSave = () => {
    console.log('Saving configuration:', { variant: currentVariant, selectedOption, selectedUsersGroups })
    // Update the initial state to match current state, which disables the Save button
    setCurrentState({
      ...currentState,
      initialSelectedOption: selectedOption,
      initialUsersGroups: [...selectedUsersGroups],
    })
  }

  const handleCancel = () => {
    console.log('Cancelled')
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
      <div className={styles.optionSelector}>
        <TabList
          selectedValue={currentVariant}
          onTabSelect={(_, data) => setCurrentVariant(data.value as VariantType)}
        >
          <Tab value="option1">Option 1: No Group Support</Tab>
          <Tab value="option2">Option 2: With Group Support</Tab>
          <Tab value="option3">Option 3: Group Support with Warnings</Tab>
        </TabList>
      </div>

      <Card className={styles.card}>
        <Title3 className={styles.header}>Turn on Frontier features</Title3>

        <Text className={styles.description}>
          The Frontier program gives your organization early, hands-on access to experimental features from
          Microsoft. All Frontier features and agents are previews and might not be released to general
          availability.
        </Text>

        <Text className={styles.description}>
          <a
            href="https://adoption.microsoft.com/en-us/copilot/frontier-program/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: tokens.colorBrandForeground1, textDecoration: 'none' }}
          >
            Learn more about Frontier
          </a>
        </Text>

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
              label={currentVariant === 'option1' ? 'Specific users' : 'Specific groups or users'}
            />
            <Text className={styles.radioDescription}>
              {currentVariant === 'option1'
                ? 'Only specified users will automatically receive Frontier features and agents.'
                : 'Only specified groups and users will automatically receive Frontier features and agents.'}
            </Text>
            {selectedOption === 'specific-groups' as AccessOption && (
              <div className={styles.userGroupSelector}>
                <Combobox
                  placeholder={currentVariant === 'option1' ? 'Add users' : 'Search for users or groups'}
                  className={styles.combobox}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      handleSelectUserGroup(data.optionValue)
                    }
                  }}
                >
                  {mockUsersAndGroups
                    .filter((item) => !selectedUsersGroups.includes(item.id))
                    .map((item) => {
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
                {currentVariant === 'option3' && (
                  <Text
                    className={styles.counterText}
                    style={{
                      color: selectedUsersGroups.length > 10 ? tokens.colorPaletteRedForeground1 : tokens.colorNeutralForeground2
                    }}
                  >
                    ({selectedUsersGroups.length} of 10 users selected)
                  </Text>
                )}
              </div>
            )}
          </div>
        </RadioGroup>

        <div className={styles.footer}>
          <Button appearance="secondary" onClick={handleCancel} disabled={!hasChanges}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSave} disabled={!canSave}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default App
