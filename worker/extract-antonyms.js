// Stream-process French Wiktionary JSONL to extract antonym relationships
// Usage: curl -sL URL | gunzip | node extract-antonyms.js > /tmp/fr-antonyms.tsv
// Output: TSV of "word\tantonym1,antonym2,..."

import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });

let count = 0;
let frCount = 0;

for await (const line of rl) {
  count++;
  if (count % 100000 === 0) process.stderr.write(`Processed ${count} lines, ${frCount} French antonyms found\n`);

  if (!line.includes('"antonyms"')) continue;
  if (!line.includes('"fr"')) continue;

  try {
    const entry = JSON.parse(line);
    if (entry.lang_code !== 'fr') continue;
    if (!entry.antonyms || entry.antonyms.length === 0) continue;

    // Extract unique French antonym words (filter out non-word entries)
    const antonyms = [...new Set(
      entry.antonyms
        .map(a => a.word?.toLowerCase().trim())
        .filter(w => w && w.length >= 2 && !w.includes(' '))
    )].slice(0, 10);

    if (antonyms.length > 0) {
      console.log(`${entry.word.toLowerCase().trim()}\t${antonyms.join(',')}`);
      frCount++;
    }
  } catch {
    // Skip malformed lines
  }
}

process.stderr.write(`Done. Processed ${count} lines, ${frCount} French words with antonyms.\n`);
