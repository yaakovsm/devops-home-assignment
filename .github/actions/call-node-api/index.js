const core = require("@actions/core");
const fs = require("fs");
const path = require("path");

const START = "<!-- API_STATUS_START -->";
const END = "<!-- API_STATUS_END -->";

function buildMarkdown(data) {
  return [
    "## API Status",
    `- Status: ${data.status}`,
    `- Service: ${data.service}`,
    `- Timestamp: ${data.timestamp}`,
    "",
  ].join("\n");
}

function validatePayload(payload) {
  const required = ["status", "service", "timestamp"];
  for (const key of required) {
    if (!(key in payload)) throw new Error(`Missing field "${key}" in API response`);
    if (typeof payload[key] !== "string") throw new Error(`Field "${key}" must be a string`);
  }
}

function updateReadme(markdown) {
  const readmePath = path.join(process.cwd(), "README.md");

  if (!fs.existsSync(readmePath)) {
    throw new Error("README.md not found at repository root");
  }

  const content = fs.readFileSync(readmePath, "utf8");

  if (!content.includes(START) || !content.includes(END)) {
    throw new Error(`README markers not found. Ensure README contains:\n${START}\n${END}`);
  }

  const startIdx = content.indexOf(START) + START.length;
  const endIdx = content.indexOf(END);

  if (startIdx > endIdx) {
    throw new Error("README markers are in the wrong order");
  }

  const newContent =
    content.slice(0, startIdx) +
    "\n\n" +
    markdown +
    "\n" +
    content.slice(endIdx);

  fs.writeFileSync(readmePath, newContent, "utf8");
}

async function run() {
  try {
    const apiUrl = core.getInput("api-url", { required: true });

    core.info(`Calling API: ${apiUrl}`);
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`API request failed: ${res.status} ${res.statusText}\n${body}`);
    }

    const data = await res.json();
    validatePayload(data);

    const markdown = buildMarkdown(data);
    core.info("Generated Markdown:\n" + markdown);

    updateReadme(markdown);
    core.info("README.md updated successfully.");
  } catch (err) {
    core.setFailed(err.message || String(err));
  }
}

run();
