// Populate synonyms from LibreOffice French thesaurus (thes_fr.dat)
// Input: MyThes format — alternating lines of "word|count" and "(POS)|syn1|syn2|..."
// Output: SQL batch files for wrangler d1 execute
//
// Run: node populate-synonymes.js
// Then: for f in syn-batches/*.sql; do npx wrangler d1 execute monfr-dict --remote --file="$f"; done

import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const thesaurus = readFileSync('/tmp/thes_fr.dat', 'utf8');
const lines = thesaurus.split('\n');

const synMap = new Map(); // word -> Set of synonyms

let i = 0;
// Skip encoding line
if (lines[0].trim() === 'UTF-8') i = 1;

while (i < lines.length) {
  const line = lines[i].trim();
  if (!line) { i++; continue; }

  // Word entry line: "word|count"
  const pipeIdx = line.indexOf('|');
  if (pipeIdx === -1) { i++; continue; }

  const mot = line.substring(0, pipeIdx).toLowerCase().trim();
  const count = parseInt(line.substring(pipeIdx + 1));

  if (!mot || isNaN(count)) { i++; continue; }

  const allSyns = new Set();

  // Read the synonym lines for this word
  for (let j = 0; j < count && i + 1 + j < lines.length; j++) {
    const synLine = lines[i + 1 + j].trim();
    if (!synLine) continue;

    // Format: "(POS)|syn1|syn2|syn3|..."
    const parts = synLine.split('|');
    // Skip the POS tag (first element), take synonyms
    for (let k = 1; k < parts.length; k++) {
      const syn = parts[k].trim().toLowerCase();
      if (syn && syn !== mot && syn.length >= 2) {
        allSyns.add(syn);
      }
    }
  }

  if (allSyns.size > 0) {
    // Merge with existing synonyms if the word appears multiple times
    if (synMap.has(mot)) {
      for (const s of allSyns) synMap.get(mot).add(s);
    } else {
      synMap.set(mot, allSyns);
    }
  }

  i += 1 + count; // Skip past word line + synonym lines
}

console.log(`Parsed ${synMap.size} words with synonyms from thesaurus`);

// Generate UPDATE SQL statements
const esc = (s) => s.replace(/'/g, "''").replace(/\\/g, '');
const updates = [];

for (const [word, syns] of synMap) {
  // Cap at 10 synonyms per word
  const synArray = JSON.stringify([...syns].slice(0, 10));
  updates.push(`UPDATE mots SET synonymes = '${esc(synArray)}' WHERE mot = '${esc(word)}';`);
}

console.log(`Generated ${updates.length} UPDATE statements`);

// Batch into files (500 per file for D1 limits)
mkdirSync('syn-batches', { recursive: true });
const batchSize = 500;
let fileCount = 0;

for (let j = 0; j < updates.length; j += batchSize) {
  const batch = updates.slice(j, j + batchSize);
  const filename = `syn-batches/syn-${String(fileCount).padStart(3, '0')}.sql`;
  writeFileSync(filename, batch.join('\n'));
  fileCount++;
}

console.log(`Generated ${fileCount} SQL batch files in syn-batches/`);
console.log(`Run: for f in syn-batches/*.sql; do npx wrangler d1 execute monfr-dict --remote --file="$f"; done`);
