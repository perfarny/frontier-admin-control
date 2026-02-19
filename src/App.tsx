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
} from '@fluentui/react-components'
import { Dismiss12Regular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground3,
    padding: '20px',
  },
  card: {
    maxWidth: '540px',
    width: '100%',
    padding: '32px',
    boxShadow: tokens.shadow16,
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

function App() {
  const styles = useStyles()
  const initialOption: AccessOption = 'no-access'
  const [selectedOption, setSelectedOption] = useState<AccessOption>(initialOption)
  const [selectedUsersGroups, setSelectedUsersGroups] = useState<string[]>([])
  const [initialUsersGroups] = useState<string[]>([])

  // Check if changes have been made
  const hasChanges = useMemo(() => {
    if (selectedOption !== initialOption) return true
    if (selectedOption === 'specific-groups') {
      return JSON.stringify(selectedUsersGroups.sort()) !== JSON.stringify(initialUsersGroups.sort())
    }
    return false
  }, [selectedOption, selectedUsersGroups, initialUsersGroups])

  const handleSave = () => {
    console.log('Saving configuration:', { selectedOption, selectedUsersGroups })
    alert(`Configuration saved!\nOption: ${selectedOption}\nSelected: ${selectedUsersGroups.join(', ')}`)
  }

  const handleCancel = () => {
    console.log('Cancelled')
    setSelectedOption(initialOption)
    setSelectedUsersGroups([])
  }

  const handleSelectUserGroup = (id: string) => {
    if (!selectedUsersGroups.includes(id)) {
      setSelectedUsersGroups([...selectedUsersGroups, id])
    }
  }

  const handleRemoveUserGroup = (id: string) => {
    setSelectedUsersGroups(selectedUsersGroups.filter((item) => item !== id))
  }

  const getSelectedItems = () => {
    return mockUsersAndGroups.filter((item) => selectedUsersGroups.includes(item.id))
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title3 className={styles.header}>Turn on Frontier features</Title3>

        <Text className={styles.description}>
          The Frontier program gives your organization early, hands-on access to experimental features from
          Microsoft. All Frontier features and agents are previews and might not be released to general
          availability.
        </Text>

        <Text className={styles.description}>
          <a href="#" style={{ color: tokens.colorBrandForeground1, textDecoration: 'none' }}>
            Learn more about Copilot Frontier
          </a>
        </Text>

        <Text className={styles.sectionTitle}>
          Select which users automatically get Frontier features and agents in their applications. These users
          must have a M365 Copilot license to experience Frontier. Note, changes may take up to 3 hours to
          process.
        </Text>

        <RadioGroup
          value={selectedOption}
          onChange={(_, data) => setSelectedOption(data.value as AccessOption)}
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
            <Radio value="specific-groups" label="Specific groups or users" />
            <Text className={styles.radioDescription}>
              Only specified groups and users will automatically receive Frontier features and agents.
            </Text>
            {selectedOption === 'specific-groups' && (
              <div className={styles.userGroupSelector}>
                <Combobox
                  placeholder="Search for users or groups"
                  className={styles.combobox}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      handleSelectUserGroup(data.optionValue)
                    }
                  }}
                >
                  {mockUsersAndGroups
                    .filter((item) => !selectedUsersGroups.includes(item.id))
                    .map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name} {item.type === 'group' ? '(Group)' : item.email ? `(${item.email})` : ''}
                      </Option>
                    ))}
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
              </div>
            )}
          </div>
        </RadioGroup>

        <div className={styles.footer}>
          <Button appearance="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSave} disabled={!hasChanges}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default App
