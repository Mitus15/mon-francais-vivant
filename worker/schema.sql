CREATE TABLE IF NOT EXISTS mots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mot TEXT NOT NULL COLLATE NOCASE,
  type TEXT,
  definition TEXT,
  exemple TEXT,
  synonymes TEXT,
  antonymes TEXT
);

CREATE INDEX IF NOT EXISTS idx_mot ON mots(mot);
CREATE INDEX IF NOT EXISTS idx_mot_prefix ON mots(mot COLLATE NOCASE);
