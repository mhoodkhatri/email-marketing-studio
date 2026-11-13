# Email Marketing Studio

This is where Averon Labs plans and writes its email campaigns, using Claude Code. We plan each campaign, write the emails, tailor them for each customer group, and send test copies safely.

Averon Labs is an AI engineering firm. We build and deploy AI systems inside the daily operations of founder-led businesses in real estate, healthcare and e-commerce. The full business brief is in [Averon-Labs.md](Averon-Labs.md).

## What is inside

| Folder or file | What it holds |
|---|---|
| [brand/voice.md](brand/voice.md) | How we sound: our voice, the words we use and avoid, and the claims we never make. |
| [leads/leads.csv](leads/leads.csv) | A practice list of 24 made-up people in three groups: `real-estate`, `healthcare` and `ecommerce`. Every address ends in `@example.com`, which can never receive mail. |
| [campaigns/](campaigns/) | One folder per campaign, with its plan, its emails and one version of each email per group. |
| [notes/](notes/) | Research, decisions and working notes. |
| [CLAUDE.md](CLAUDE.md) | The rules Claude follows in this studio. |
| `.claude/` | Rules for email files, the `personalize` skill, the send guard and the Resend launcher. |

## The current campaign

**[30-Day AI Deployment launch](campaigns/30-day-deployment-launch/plan.md):** four emails that introduce the 30-Day AI Deployment and invite founders to book a discovery call.

1. `01-introducing.md`: what the 30 days look like
2. `02-a-normal-day.md`: what changes on a normal working day
3. `03-see-it-working.md`: working products and tested demos, not slide decks
4. `04-plan-for-january.md`: one short call to pick the first thing to fix in January

Each group folder in `groups/` has its own version of all four emails.

## How we work

1. **Plan** the campaign with the marketing plugin's `campaign-plan` skill.
2. **Write** the emails in `campaigns/<name>/emails/`. Every email follows the rules in `.claude/rules/emails.md`: a short subject and preview line, a greeting by first name, one link, then our sign-off and footer.
3. **Check** the copy against the brand voice with `brand-review`.
4. **Personalise** it with `/personalize campaigns/<name>`. This writes one version of each email per group.
5. **Send a test** to a Resend test address or to your own address.

## Sending safely

We never send email to real people from this studio.

- **The send guard** in `.claude/hooks/send-guard.mjs` checks every Resend call before it runs.
  - It always blocks broadcasts, automations and inbox sends.
  - It allows single and batch sends only to `@resend.dev` test addresses and to your own address.
- **Your own address** goes in `.claude/settings.local.json`, which is never committed:

  ```json
  { "env": { "MY_EMAIL": "you@example.com" } }
  ```

## Setup

### 1. Install the tools

You need these on your computer:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 20.12 or newer
- [Claude Code](https://claude.com/claude-code)

Check that they are installed:

```bash
git --version
node --version
claude --version
```

### 2. Clone the repository

```bash
git clone https://github.com/mhoodkhatri/email-marketing-studio.git
cd email-marketing-studio
```

### 3. Add your own email address

Create `.claude/settings.local.json` with your address. This is the only address, apart from `@resend.dev` test addresses, that the send guard lets through.

```json
{
  "env": {
    "MY_EMAIL": "you@example.com"
  }
}
```

### 4. Choose a mode for Resend

**Practice mode (default):** do nothing. With no API key, the launcher sends to a local test server at `http://localhost:4000`.

**Live mode:** copy the example settings file:

```bash
cp .env.example .env
```

Then open `.env` and fill it in:

```bash
RESEND_API_KEY=re_your_key_here
RESEND_BASE_URL=https://api.resend.com
SENDER_EMAIL_ADDRESS=onboarding@resend.dev
```

- Create the key at [resend.com](https://resend.com) under **API Keys**. Give it **Sending access** only.
- Sign up to Resend with the same address as your `MY_EMAIL`. Without a verified domain, Resend only sends from `onboarding@resend.dev`, and only to your own account address.

### 5. Start Claude Code

From inside the project folder:

```bash
claude
```

When asked, trust the project's plugin, hooks and MCP server. To check that Resend is connected, type `/mcp` and look for `resend`.

### 6. Send a test email

Ask Claude something like:

> Send email 01 from the 30-day-deployment-launch campaign to my own email, the MY_EMAIL value.

The send guard checks the address before anything is sent.

### Keep your secrets private

`.env` and `.claude/settings.local.json` are ignored by git. Never commit them, and never paste your API key into an email or a campaign file.

## Placeholders

The emails use placeholders that are filled in when an email is sent:

- `{{first_name}}`: the reader's first name
- `{{sender_name}}`: the person signing the email
- `{{company_address}}`: our postal address
- `{{unsubscribe_url}}`: the reader's unsubscribe link
