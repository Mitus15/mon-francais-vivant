import { useState, useCallback, useRef } from 'react';

const WORKER = 'https://monfr-dictionnaire.maniodubo.workers.dev';
const cache = new Map();

export function useDictionnaire() {
  const [resultat, setResultat] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [browseListe, setBrowseListe] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [stats, setStats] = useState(null);
  const abortRef = useRef(null);

  const chercher = useCallback(async (mot) => {
    if (!mot.trim()) return;
    const motNormalise = mot.trim().toLowerCase();

    if (cache.has(`word:${motNormalise}`)) {
      setResultat(cache.get(`word:${motNormalise}`));
      setErreur(null);
      setSuggestions([]);
      return;
    }

    setChargement(true);
    setErreur(null);
    setResultat(null);
    setSuggestions([]);

    try {
      const res = await fetch(`${WORKER}/word/${encodeURIComponent(motNormalise)}`);
      if (!res.ok) throw new Error('Mot non trouvé');
      const data = await res.json();
      cache.set(`word:${motNormalise}`, data);
      setResultat(data);
    } catch {
      setErreur("Ce mot n'est pas dans le dictionnaire. Essaie un autre mot ou vérifie l'orthographe.");
    } finally {
      setChargement(false);
    }
  }, []);

  const autocompléter = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(
        `${WORKER}/search?q=${encodeURIComponent(query.trim())}&limit=8`,
        { signal: controller.signal }
      );
      if (!res.ok) return;
      const data = await res.json();
      setSuggestions(data.results || []);
    } catch {
      // Aborted or failed — ignore
    }
  }, []);

  const parcourir = useCallback(async (lettre, page = 0) => {
    setChargement(true);
    setErreur(null);
    setResultat(null);
    setSuggestions([]);

    try {
      const res = await fetch(`${WORKER}/browse/${encodeURIComponent(lettre)}?page=${page}`);
      if (!res.ok) throw new Error('Erreur');
      const data = await res.json();
      setBrowseListe(data);
    } catch {
      setErreur('Impossible de charger les mots.');
    } finally {
      setChargement(false);
    }
  }, []);

  const motAuHasard = useCallback(async () => {
    setChargement(true);
    setErreur(null);
    setSuggestions([]);

    try {
      const res = await fetch(`${WORKER}/random`);
      if (!res.ok) throw new Error('Erreur');
      const data = await res.json();
      cache.set(`word:${data.mot}`, data);
      setResultat(data);
    } catch {
      setErreur('Impossible de charger un mot aléatoire.');
    } finally {
      setChargement(false);
    }
  }, []);

  const chargerStats = useCallback(async () => {
    try {
      const res = await fetch(`${WORKER}/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // Silent fail
    }
  }, []);

  function reinitialiser() {
    setResultat(null);
    setErreur(null);
    setSuggestions([]);
    setBrowseListe(null);
  }

  return {
    resultat, suggestions, browseListe, chargement, erreur, stats,
    chercher, autocompléter, parcourir, motAuHasard, chargerStats, reinitialiser,
  };
}
