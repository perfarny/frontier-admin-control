# Manage Frontier Access for Your Organization

The **Frontier Program** gives your organization early, hands-on access to experimental Microsoft features and AI agents. As a Microsoft 365 administrator, you can control exactly which users receive these features automatically using the Frontier Admin Control.

---

## Access options

The Frontier Admin Control offers three access levels. Select the one that fits your organization's needs and click **Save** to apply.

### No Access

No users in your organization will receive Frontier features or agents. This is the default state if you have not yet configured access.

### All Users

Every user in your organization will automatically receive Frontier features and agents. No additional configuration is needed.

### Specific groups or users

Only the groups and individual users you specify will receive Frontier features. Use this option to run a targeted rollout or pilot program.

When this option is selected, a search box appears where you can find and add groups or individual users from your organization's directory. Each selected item appears as a removable tag below the search box. To remove an item, click the **X** on its tag.

> **Note:** Users must have a **Microsoft 365 Copilot license** to experience Frontier features, regardless of the access setting configured here.

---

## The selection limit

When using **Specific groups or users**, the total number of users covered by your selection cannot exceed **10,000**.

A counter below the search box shows your current count relative to the limit:

- Within limit: *(Maximum: 10,000 users)* — displayed in gray
- Limit exceeded: *(Maximum: 10,000 users - Limit Exceeded)* — displayed in red

### How the limit is counted

The limit is based on **total group memberships, not unique users**. Each user is counted once for every selected group they belong to.

For example, suppose you add two groups — Group A with 10 members and Group B with 10 members. If 5 of those users are members of both groups, there are 15 unique users who will receive access. However, the system counts this as **20**, because those 5 shared members each appear once in Group A and once in Group B.

---

## When the limit is already exceeded

If your organization's previously saved configuration contains more than 10,000 users, you will see a warning banner when you open the control:

> *You have exceeded the number of allowed users.*

This warning appears automatically to let you know the current state needs to be resolved. As you remove items from the list, the warning **automatically disappears** once the count reaches 10,000 or fewer — no additional action is needed.

---

## Saving changes that exceed the limit

If you click **Save** while the list contains more than 10,000 users, the save will be blocked and a warning banner will appear:

> *You have exceeded the number of allowed users.*

The counter text will turn red. To complete the save:

1. Remove items from the list until the count is **10,000 or fewer**.
2. Click **Save** again.

**Important:** Once this warning is triggered by a failed save attempt, it will remain visible even after you reduce the count below the limit. This is expected behavior — the warning clears only when you successfully save or click **Cancel**.

---

## Save and Cancel

| Button | When it's available | What it does |
|---|---|---|
| **Save** | After any unsaved change is made | Applies your changes. If the list exceeds 10,000 users, the save is blocked and a warning appears. |
| **Cancel** | After any unsaved change is made | Discards all unsaved changes and reverts to the last saved configuration. Also clears any validation warnings. |

Both buttons become disabled again after a successful save or after canceling, since there are no pending changes.

---

## Processing time

After saving, changes may take **up to 3 hours** to take effect for your users.
