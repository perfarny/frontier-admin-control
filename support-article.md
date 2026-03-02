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

When using **Specific groups or users**, you can add a maximum of **3 groups or users** to the list.

A counter below the search box shows your current count relative to the limit:

- Within limit: *(Maximum: 3 users)* — displayed in gray
- Limit exceeded: *(Maximum: 3 users - Limit Exceeded)* — displayed in red

### How the limit is counted

The limit applies to the **number of items you add to the list** — each group and each individual user counts as one item, regardless of how many people are in that group or how much those groups overlap.

For example, if you add the **Marketing Team** group and the **Engineering Team** group, that counts as **2 items** toward your limit of 3 — even if the same person is a member of both groups. The system does not deduplicate based on the underlying users who will receive access; it counts the objects (groups and individual users) that you have selected.

| What you add | Count toward limit |
|---|---|
| 1 group | 1 |
| 2 groups | 2 |
| 2 groups + 1 individual user | 3 (at limit) |
| 2 groups that share a member | 2 (overlap is not deducted) |

---

## When the limit is already exceeded

If your organization's previously saved configuration contains more than 3 items, you will see a warning banner when you open the control:

> *You have exceeded the number of allowed users.*

This warning appears automatically to let you know the current state needs to be resolved. As you remove items from the list, the warning **automatically disappears** once the count reaches 3 or fewer — no additional action is needed.

---

## Saving changes that exceed the limit

If you click **Save** while the list contains more than 3 items, the save will be blocked and a warning banner will appear:

> *You have exceeded the number of allowed users.*

The counter text will turn red. To complete the save:

1. Remove items from the list until the count is **3 or fewer**.
2. Click **Save** again.

**Important:** Once this warning is triggered by a failed save attempt, it will remain visible even after you reduce the count below the limit. This is expected behavior — the warning clears only when you successfully save or click **Cancel**.

---

## Save and Cancel

| Button | When it's available | What it does |
|---|---|---|
| **Save** | After any unsaved change is made | Applies your changes. If the list exceeds 3 items, the save is blocked and a warning appears. |
| **Cancel** | After any unsaved change is made | Discards all unsaved changes and reverts to the last saved configuration. Also clears any validation warnings. |

Both buttons become disabled again after a successful save or after canceling, since there are no pending changes.

---

## Processing time

After saving, changes may take **up to 3 hours** to take effect for your users.
