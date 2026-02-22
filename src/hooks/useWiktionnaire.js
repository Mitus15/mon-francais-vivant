import { useState, useCallback } from 'react';

const cache = new Map();

export function useWiktionnaire() {
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [definition, setDefinition] = useState(null);

  const fetchMot = useCallback(async (mot) => {
    const motNorm = mot.trim().toLowerCase();
    if (!motNorm) return null;

    if (cache.has(motNorm)) {
      setDefinition(cache.get(motNorm));
      setErreur(null);
      return cache.get(motNorm);
    }

    setLoading(true);
    setErreur(null);
    setDefinition(null);

    // Try Wiktionnaire first
    try {
      const res = await fetch(
        `https://fr.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(motNorm)}`
      );
      if (res.ok) {
        const data = await res.json();
        const entrees = data?.fr || data?.[Object.keys(data)[0]] || [];

        if (entrees.length > 0) {
          const resultat = normaliserWiktionnaire(motNorm, entrees);
          cache.set(motNorm, resultat);
          setDefinition(resultat);
          return resultat;
        }
      }
    } catch {
      // Fall through to fallback
    }

    // Fallback: Free Dictionary API
    try {
      const res2 = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/fr/${encodeURIComponent(motNorm)}`
      );
      if (res2.ok) {
        const data2 = await res2.json();
        const resultat = normaliserFreeDictionary(motNorm, data2);
        cache.set(motNorm, resultat);
        setDefinition(resultat);
        return resultat;
      }
    } catch {
      // Both failed
    }

    const msg = `Définition introuvable pour « ${motNorm} ».`;
    setErreur(msg);
    return null;
  }, []);

  return { fetchMot, loading, erreur, definition };
}

function normaliserWiktionnaire(mot, entrees) {
  const definitions = [];
  const etymologie = entrees[0]?.etymology || null;

  for (const entree of entrees) {
    for (const def of entree.definitions || []) {
      if (def.definition) {
        definitions.push({
          texte: stripHtml(def.definition),
          exemples: (def.examples || []).map(e => stripHtml(e)).slice(0, 2),
          type: entree.partOfSpeech || '',
        });
      }
    }
  }

  return {
    mot,
    source: 'Wiktionnaire',
    etymologie: etymologie ? stripHtml(etymologie) : null,
    definitions: definitions.slice(0, 5),
  };
}

function normaliserFreeDictionary(mot, data) {
  const definitions = [];
  for (const entree of data) {
    for (const sens of entree.meanings || []) {
      for (const def of sens.definitions || []) {
        definitions.push({
          texte: def.definition,
          exemples: def.example ? [def.example] : [],
          type: sens.partOfSpeech || '',
        });
      }
    }
  }

  return {
    mot,
    source: 'Free Dictionary',
    etymologie: null,
    definitions: definitions.slice(0, 5),
  };
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}
