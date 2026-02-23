import { useState, useCallback } from 'react';

const WORKER = 'https://monfr-dictionnaire.maniodubo.workers.dev';
const cache = new Map();

export function useWiktionnaire() {
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [definition, setDefinition] = useState(null);

  const fetchMot = useCallback(async (mot) => {
    const motNorm = mot.trim().toLowerCase();
    if (!motNorm) return null;

    if (cache.has(motNorm)) {
      const cached = cache.get(motNorm);
      setDefinition(cached);
      setErreur(null);
      return cached;
    }

    setLoading(true);
    setErreur(null);
    setDefinition(null);

    try {
      const res = await fetch(`${WORKER}/word/${encodeURIComponent(motNorm)}`);
      if (!res.ok) throw new Error('Non trouvé');
      const data = await res.json();

      const resultat = {
        mot: data.mot,
        source: 'Dictionnaire',
        etymologie: null,
        definitions: data.definition
          ? data.definition.split(' ; ').map(d => ({
              texte: d,
              exemples: data.exemple ? [data.exemple] : [],
              type: data.type || '',
            }))
          : [],
      };

      cache.set(motNorm, resultat);
      setDefinition(resultat);
      return resultat;
    } catch {
      const msg = `Définition introuvable pour « ${motNorm} ».`;
      setErreur(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchMot, loading, erreur, definition };
}
