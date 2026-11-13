// PreToolUse guard for the Resend MCP server.
// Blocks any email that could reach a real person.
// Exit 0 = allow. Exit 2 = block (the reason on stderr is shown to Claude).

const BLOCK_ALWAYS = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`send-guard: ${reason}\n`);
  process.exit(2);
}

// Pull the bare address out of "Name <addr@x.com>" or "addr@x.com".
function bareAddress(value) {
  const text = String(value).trim();
  const match = text.match(/<([^>]+)>/);
  return (match ? match[1] : text).trim().toLowerCase();
}

function asList(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was blocked to be safe.");
}

const toolName = String(call.tool_name || "");
const action = toolName.replace(/^mcp__resend__/, "");
const input = call.tool_input || {};

if (BLOCK_ALWAYS.has(action)) {
  block(`${action} is blocked because it can reach whole lists of people.`);
}

if (!CHECK_RECIPIENTS.has(action)) {
  process.exit(0);
}

const myEmail = (process.env.MY_EMAIL || process.env.OWNER_EMAIL || "")
  .trim()
  .toLowerCase();

function isAllowed(address) {
  if (address.endsWith("@resend.dev")) return true;
  return myEmail !== "" && address === myEmail;
}

let emails;
if (action === "send-batch-emails") {
  if (!Array.isArray(input.emails)) {
    block("send-batch-emails has no emails list to check, so it was blocked.");
  }
  emails = input.emails;
} else {
  emails = [input];
}

for (const email of emails) {
  for (const field of ["to", "cc", "bcc"]) {
    for (const value of asList(email?.[field])) {
      const address = bareAddress(value);
      if (!isAllowed(address)) {
        block(
          `${address} (in ${field}) is not allowed. Send only to @resend.dev test addresses or to MY_EMAIL.`
        );
      }
    }
  }
}

process.exit(0);
