import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const strict = process.argv.includes('--strict');
const summaryOnly = process.argv.includes('--summary');
const register = JSON.parse(fs.readFileSync(path.join(root, '.graph', 'trauma-education', 'evidence', 'source-register.json'), 'utf8'));
const results = [];

async function verify(source) {
  if (!source.url?.startsWith('http')) {
    return {id: source.id, url: source.url, status: 'local_or_unchecked', ok: true};
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(source.url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {'user-agent': 'TraumaMaster-source-verifier/1.0'}
    });
    const accessLimited = [401, 403, 405, 406, 412, 429, 451].includes(response.status);
    return {
      id: source.id,
      url: source.url,
      final_url: response.url,
      http_status: response.status,
      status: response.ok ? 'reachable' : accessLimited ? 'access_limited' : 'http_error',
      ok: response.ok,
      unavailable: !response.ok && !accessLimited
    };
  } catch (error) {
    return {id: source.id, url: source.url, status: 'network_error', error: error.message, ok: false};
  } finally {
    clearTimeout(timer);
  }
}

for (let index = 0; index < register.sources.length; index += 4) {
  const batch = register.sources.slice(index, index + 4);
  results.push(...await Promise.all(batch.map(verify)));
}

const report = {
  checked_at: new Date().toISOString(),
  interpretation: 'Reachability verifies a locator only. It does not verify currency, evidence meaning, licence, or claim support.',
  reachable: results.filter((item) => item.ok).length,
  access_limited: results.filter((item) => item.status === 'access_limited').length,
  unavailable: results.filter((item) => item.unavailable).length,
  results
};

console.log(JSON.stringify(summaryOnly ? {...report, results: undefined} : report, null, 2));
if (strict && report.unavailable) process.exit(1);
