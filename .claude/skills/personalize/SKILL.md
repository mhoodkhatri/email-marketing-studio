---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder: $ARGUMENTS

## Step 1: Check the campaign folder

- If no campaign folder was given above, do not write anything. Use Glob on `campaigns/*/plan.md` and `campaigns/*/emails/*.md` to find the campaign folders. Reply with a short list of them and ask which one to use. Then stop.
- Accept either a full path (`campaigns/30-day-deployment-launch`) or just the folder name (`30-day-deployment-launch`).
- If the folder does not exist, or it has no `emails/*.md` files, say so, list the campaign folders that do exist, and stop.

## Step 2: Read what you need

Read all of these before writing:

1. `brand/voice.md`: the voice, words we avoid, and claims we must never make.
2. `.claude/rules/emails.md`: the rules every email file must follow.
3. `leads/leads.csv`: find every distinct value in the `group` column. These are the groups. Do not use any other group names, and do not invent groups.
4. `<campaign folder>/plan.md`, if it exists, for the audience notes on each group.
5. Every `<campaign folder>/emails/*.md` file. These are the source emails. Do not change them.

Only use leads.csv to learn the group names. Do not copy any names or email addresses from it into the emails.

## Step 3: Write one version per email, per group

For each source email and each group, write a new version.

**Keep exactly the same:**

- The `Subject:` line and the `Preview:` line.
- The greeting with `{{first_name}}`.
- The structure: the same sections, in the same order, at about the same length.
- The one link, with the same URL and the same button text.
- The sign-off and the footer, word for word.
- Every other placeholder, such as `{{sender_name}}`, `{{company_address}}` and `{{unsubscribe_url}}`.

**Change only two things:**

1. **The opening line**: the first sentence after the greeting. Make it speak to that group's daily work.
2. **One example**: pick one example in the body and swap it for one that fits the group. For instance, a lead follow-up for real estate, a booking or patient-enquiry reminder for healthcare, or an order or customer-support question for e-commerce.

Everything else stays as it is in the source email.

**Brand checks for every version:**

- Follow `brand/voice.md`: UK English spelling, no contractions in the body, write as "we", and no words from the avoid list.
- Never add client results, case studies, prices, guaranteed gains or compliance certifications.
- For healthcare: never give medical advice, and never suggest the AI makes clinical decisions. Anything clinical goes to clinic staff.
- Follow every rule in `.claude/rules/emails.md`. Write only the email, with no notes or comments in the file.

## Step 4: Save the files

Save each version to:

`<campaign folder>/groups/<group>/emails/<same file name as the source>`

For example: `campaigns/30-day-deployment-launch/groups/healthcare/emails/01-introducing.md`.

Only write inside `<campaign folder>/groups/`. If a file already exists there, overwrite it with the new version.

## Step 5: Reply with a short summary only

Do not paste the emails. Reply with only:

- How many files you wrote (for example, "Wrote 12 files: 4 emails × 3 groups.").
- One example opening line per group, taken from the first email.
