// Convert extracted antonym TSV into SQL batch files for D1
// Input: /tmp/fr-antonyms.tsv (word\tantonym1,antonym2,...)
// Output: ant-batches/*.sql
// Run: node populate-antonymes.js

import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const data = readFileSync('/tmp/fr-antonyms.tsv', 'utf8');
const lines = data.trim().split('\n');

// Merge duplicate entries (same word may appear multiple times with different antonyms)
const antMap = new Map();
for (const line of lines) {
  const [word, ants] = line.split('\t');
  if (!word || !ants) continue;
  const antList = ants.split(',').map(a => a.trim()).filter(a => a.length >= 2);
  if (antList.length === 0) continue;

  if (antMap.has(word)) {
    const existing = antMap.get(word);
    for (const a of antList) existing.add(a);
  } else {
    antMap.set(word, new Set(antList));
  }
}

console.log(`Merged to ${antMap.size} unique words with antonyms`);

const esc = (s) => s.replace(/'/g, "''").replace(/\\/g, '');
const updates = [];

for (const [word, ants] of antMap) {
  const antArray = JSON.stringify([...ants].slice(0, 10));
  updates.push(`UPDATE mots SET antonymes = '${esc(antArray)}' WHERE mot = '${esc(word)}';`);
}

console.log(`Generated ${updates.length} UPDATE statements`);

mkdirSync('ant-batches', { recursive: true });
const batchSize = 500;
let fileCount = 0;

for (let i = 0; i < updates.length; i += batchSize) {
  const batch = updates.slice(i, i + batchSize);
  writeFileSync(`ant-batches/ant-${String(fileCount).padStart(3, '0')}.sql`, batch.join('\n'));
  fileCount++;
}

console.log(`Generated ${fileCount} SQL batch files in ant-batches/`);
