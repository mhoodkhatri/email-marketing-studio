---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for every email file

Every email file in any campaign must follow these rules. Write only the email itself: no subject options, no notes and no commentary in the file.

## 1. Subject and preview come first

The file starts with exactly these two lines:

- Line 1: `Subject: ...`, which is 50 characters or fewer, counting the whole line including "Subject: ".
- Line 2: `Preview: ...`, which is 90 characters or fewer, counting the whole line including "Preview: ".

## 2. Greet the reader by first name

The email greets the reader with {{first_name}}, for example "Hi {{first_name}},". Use the placeholder exactly as written, with double curly braces.

## 3. Exactly one main link

The email has exactly one link, written in this form, with your own button text:

[Button text](https://averonlabs.example/30-day-deployment)

Don't add any other links or bare URLs. The footer placeholders don't count as links.

## 4. Sign-off, then footer

The email ends with our sign-off from brand/voice.md, followed by this two-line footer. Both are plain text. Never put either one inside a code block, and never use three backticks anywhere in an email.

Kind regards,
{{sender_name}}
Founder, Averon Labs

You're getting this because you joined the Averon Labs waitlist.
Averon Labs, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Nothing comes after the footer.
