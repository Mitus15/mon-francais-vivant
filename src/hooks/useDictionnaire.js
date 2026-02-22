import { useState, useCallback } from 'react';

const cache = {};

export function useDictionnaire() {
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  const chercher = useCallback(async (mot) => {
    if (!mot.trim()) return;
    const motNormalise = mot.trim().toLowerCase();

    if (cache[motNormalise]) {
      setResultat(cache[motNormalise]);
      setErreur(null);
      return;
    }

    setChargement(true);
    setErreur(null);
    setResultat(null);

    try {
      const reponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/fr/${encodeURIComponent(motNormalise)}`
      );

      if (!reponse.ok) {
        throw new Error('Mot non trouvé');
      }

      const donnees = await reponse.json();
      const entree = donnees[0];

      const resultatFormate = {
        mot: entree.word,
        phonetique: entree.phonetic || entree.phonetics?.[0]?.text || '',
        definitions: [],
      };

      for (const signification of (entree.meanings || [])) {
        for (const def of (signification.definitions || []).slice(0, 3)) {
          resultatFormate.definitions.push({
            typeGrammatical: signification.partOfSpeech,
            definition: def.definition,
            exemple: def.example || null,
            synonymes: def.synonyms?.slice(0, 4) || [],
          });
        }
      }

      cache[motNormalise] = resultatFormate;
      setResultat(resultatFormate);
    } catch (e) {
      setErreur('Ce mot n\'est pas dans le dictionnaire. Essaie un autre mot ou vérifie l\'orthographe.');
    } finally {
      setChargement(false);
    }
  }, []);

  function reinitialiser() {
    setResultat(null);
    setErreur(null);
  }

  return { resultat, chargement, erreur, chercher, reinitialiser };
}
