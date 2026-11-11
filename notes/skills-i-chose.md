# Skills I chose

For the Averon Labs email marketing studio. Searched skills.sh on 2026-11-11 with
`npx skills find` for: email marketing, email sequence, campaign plan, resend.
Star counts come from the GitHub API on the same day. Nothing is installed yet.

## Use these

**1. Anthropic's marketing plugin (`anthropics/knowledge-work-plugins`) for planning and writing campaigns**
- Published by Anthropic, the company that makes Claude. The repository has about 35,400 GitHub stars.
- It includes the exact skills this studio needs: `campaign-plan` (3.4K installs), `email-sequence` (3.1K installs) and a brand review.
- It installs as one plugin at project scope, so anyone who clones this studio gets the same tools.

**2. Resend's own skills (`resend/resend-skills` and `resend/email-best-practices`) for sending email**
- Published by Resend itself, the email service we'll connect to. `resend` has 24.5K installs and `email-best-practices` has 8.3K.
- The star counts are modest (about 210 and 150), but the official publisher matters more here. Nobody knows Resend's API better than Resend.
- Other "resend" results, like `oakoss/agent-skills@resend` or `smithery.ai@resend`, are unofficial copies with few installs. We don't need them.

Worth knowing: `coreyhaines31/marketingskills` (about 59,600 stars; `emails` 86.8K installs, `email-sequence` 55.1K) is a well-known, trusted independent publisher. It's a good second opinion, but one marketing toolkit is enough to start with.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`**: 31K installs, but only **2** GitHub stars.
That gap is a warning sign. Installs can be inflated by bots or repeat installs, but stars come from real people choosing to bookmark a repo. The publisher isn't well known either.

**2. `mbfinotti/sales-skills` (e.g. `cold-email-deliverability`, `sales-outbound-sequence`)**: about 33K installs each, but only **3** GitHub stars.
It's the same pattern again: big numbers that nothing else backs up. It's also built for cold outreach, which doesn't suit an opt-in email list. Averon Labs should only email people who agreed to hear from us.

## How I decided

Before installing any skill, check these three things:

1. **Who publishes it.** Prefer the official maker (Anthropic, Resend) or a publisher with a well-known track record. Be wary of unknown accounts.
2. **Whether installs and GitHub stars agree.** High installs with almost no stars suggests the numbers may be faked. Download counts alone aren't proof.
3. **What it actually does.** Open the SKILL.md and any scripts before installing. Check it fits our use (opt-in marketing, not cold spam) and doesn't run commands or send data anywhere unexpected.
