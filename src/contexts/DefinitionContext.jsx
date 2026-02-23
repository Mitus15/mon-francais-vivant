import { createContext, useContext, useState, useCallback } from 'react';
import { useWiktionnaire } from '../hooks/useWiktionnaire';

const DefinitionContext = createContext(null);

export function DefinitionProvider({ children, vocabulaire }) {
  const [motActif, setMotActif] = useState(null);   // { mot, rect }
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const wikt = useWiktionnaire();

  const ouvrir = useCallback(async (mot, rect) => {
    // Strip all punctuation including curly apostrophes
    let motNettoye = mot.replace(/[.,;:!?''\u2019\u2018"«»()[\]{}—–\-…]/g, '').trim().toLowerCase();
    // Safety: remove leading elided article/pronoun if still joined (l'homme → homme)
    motNettoye = motNettoye.replace(/^[ldsnjcqm](?=[aeéèêëiîïoôuûùüyàâæœh])/, '');
    if (!motNettoye || motNettoye.length < 2) return;

    setMotActif({ mot: motNettoye, rect });
    setDefinition(null);
    setLoading(true);

    const def = await wikt.fetchMot(motNettoye);
    setDefinition(def);
    setLoading(false);
  }, [wikt]);

  const fermer = useCallback(() => {
    setMotActif(null);
    setDefinition(null);
    setLoading(false);
  }, []);

  const sauvegarder = useCallback(() => {
    if (!motActif || !definition || !vocabulaire) return;
    const premiereDefinition = definition.definitions?.[0]?.texte || '';
    vocabulaire.ajouterMot({
      mot: motActif.mot,
      definition: premiereDefinition,
      exemple: definition.definitions?.[0]?.exemples?.[0] || '',
    });
  }, [motActif, definition, vocabulaire]);

  return (
    <DefinitionContext.Provider value={{ motActif, definition, loading, ouvrir, fermer, sauvegarder }}>
      {children}
    </DefinitionContext.Provider>
  );
}

export function useDefinition() {
  const ctx = useContext(DefinitionContext);
  if (!ctx) throw new Error('useDefinition must be inside DefinitionProvider');
  return ctx;
}
