import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteScript = fs.readFileSync(path.join(root, 'assets', 'site.js'), 'utf8');
const statusPattern = /data-review-status="([^"]+)"/g;
const rawPattern = /(?:pending_[a-z_]+|source_required|source_index_pending_review|evidence_review_required|visual_asset_pending_review|GO_WITH_CLINICAL_REVIEW|instructor_authored|teaching_not_protocol)/g;
const files = ['index.html', ...fs.readdirSync(path.join(root, 'courses')).filter((name) => name.endsWith('.html')).map((name) => `courses/${name}`)];
const statuses = new Set();
const rawTokens = new Set();

for (const rel of files) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const match of text.matchAll(statusPattern)) statuses.add(match[1]);
  for (const match of text.matchAll(rawPattern)) rawTokens.add(match[0]);
}

const missingMappings = [...new Set([...statuses, ...rawTokens])]
  .filter((status) => !siteScript.includes(`${status}: [`));
const badgeOnlyRenderer = siteScript.includes('document.querySelectorAll(".tag[data-review-status], .learner-status[data-review-status]")');
const report = {
  page_count: files.length,
  review_statuses: [...statuses].sort(),
  raw_internal_tokens: [...rawTokens].sort(),
  missing_mappings: missingMappings,
  runtime_rewrite_statuses: [...rawTokens].sort(),
  badge_only_renderer: badgeOnlyRenderer,
  pass: missingMappings.length === 0 && badgeOnlyRenderer
};

console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
