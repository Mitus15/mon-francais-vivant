import { useState, useCallback } from 'react';
import { livresCanon } from '../data/bible_annotations';

// Build name → book number mapping from livresCanon (index+1 = book_nr)
const LIVRE_NUM = {};
livresCanon.forEach((l, i) => { LIVRE_NUM[l.nom] = i + 1; });

const API = 'https://api.getbible.net/v2';

// Translation codes per testament
function traductionsPour(bookNr) {
  if (bookNr <= 39) {
    return { heb: 'codex', gr: 'lxx', lat: 'vulgate' };
  }
  return { gr: 'tischendorf', lat: 'vulgate' };
}

const cache = new Map();

async function fetchAPI(code, bookNr, chapitre) {
  const cle = `${code}:${bookNr}:${chapitre}`;
  if (cache.has(cle)) return cache.get(cle);

  try {
    const res = await fetch(`${API}/${code}/${bookNr}/${chapitre}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    const versets = (data.verses || []).map(v => ({
      numero: v.verse,
      texte: v.text.trim(),
    }));
    cache.set(cle, versets);
    return versets;
  } catch {
    return null;
  }
}

export function useBible() {
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [donnees, setDonnees] = useState(null);
  const [languesOriginales, setLanguesOriginales] = useState(null);
  const [loadingLangues, setLoadingLangues] = useState(false);

  const fetchChapitre = useCallback(async (livreNom, chapitre) => {
    const bookNr = LIVRE_NUM[livreNom];
    if (!bookNr) {
      setErreur(`Livre inconnu : ${livreNom}`);
      return null;
    }

    const cle = `fr:${bookNr}:${chapitre}`;
    if (cache.has(cle)) {
      const cached = cache.get(cle);
      setDonnees({ reference: `${livreNom} ${chapitre}`, livre: livreNom, chapitre, versets: cached });
      setErreur(null);
      setLanguesOriginales(null);
      return cached;
    }

    setLoading(true);
    setErreur(null);
    setLanguesOriginales(null);
    try {
      const versets = await fetchAPI('ls1910', bookNr, chapitre);
      if (!versets) throw new Error('Impossible de charger ce chapitre.');

      cache.set(cle, versets);
      const resultat = { reference: `${livreNom} ${chapitre}`, livre: livreNom, chapitre, versets };
      setDonnees(resultat);
      return resultat;
    } catch (e) {
      setErreur(e.message || 'Impossible de charger ce chapitre.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLangues = useCallback(async (livreNom, chapitre) => {
    const bookNr = LIVRE_NUM[livreNom];
    if (!bookNr) return null;

    setLoadingLangues(true);
    try {
      const trads = traductionsPour(bookNr);
      const entries = Object.entries(trads);
      const results = await Promise.all(
        entries.map(([, code]) => fetchAPI(code, bookNr, chapitre))
      );
      const langues = {};
      entries.forEach(([lang], i) => {
        if (results[i]) langues[lang] = results[i];
      });
      setLanguesOriginales(langues);
      return langues;
    } catch {
      return null;
    } finally {
      setLoadingLangues(false);
    }
  }, []);

  function viderCache() {
    cache.clear();
  }

  return { fetchChapitre, fetchLangues, loading, loadingLangues, erreur, donnees, languesOriginales, viderCache };
}
