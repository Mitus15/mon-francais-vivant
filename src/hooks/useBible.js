import { useState, useCallback } from 'react';

const cache = new Map();

export function useBible() {
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [donnees, setDonnees] = useState(null);

  const fetchChapitre = useCallback(async (livreNom, chapitre) => {
    const cle = `${livreNom} ${chapitre}`;
    if (cache.has(cle)) {
      setDonnees(cache.get(cle));
      setErreur(null);
      return cache.get(cle);
    }

    setLoading(true);
    setErreur(null);
    try {
      const ref = encodeURIComponent(`${livreNom} ${chapitre}`);
      const res = await fetch(`https://bible-api.com/${ref}?translation=lsg`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // Normalize verses array
      const versets = (data.verses || []).map(v => ({
        numero: v.verse,
        texte: v.text.trim(),
      }));

      const resultat = {
        reference: data.reference,
        livre: livreNom,
        chapitre,
        versets,
      };

      cache.set(cle, resultat);
      setDonnees(resultat);
      return resultat;
    } catch (e) {
      setErreur(e.message || 'Impossible de charger ce chapitre.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  function viderCache() {
    cache.clear();
  }

  return { fetchChapitre, loading, erreur, donnees, viderCache };
}
