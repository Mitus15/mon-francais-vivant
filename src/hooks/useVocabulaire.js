import { useState, useEffect } from 'react';

const CLE = 'monFrancaisVivant_vocabulaire';

export function useVocabulaire() {
  const [mots, setMots] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem(CLE);
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CLE, JSON.stringify(mots));
  }, [mots]);

  function ajouterMot(mot) {
    if (mots.find(m => m.mot === mot.mot)) return;
    const nouveau = {
      ...mot,
      id: Date.now(),
      dateAjout: new Date().toISOString(),
      niveau: 'nouveau', // nouveau → en_cours → maîtrisé
      repetitions: 0,
      prochaineRevision: new Date().toISOString(),
      intervalle: 1, // jours
    };
    setMots(prev => [nouveau, ...prev]);
  }

  function supprimerMot(id) {
    setMots(prev => prev.filter(m => m.id !== id));
  }

  function mettreAJourNiveau(id, connu) {
    setMots(prev => prev.map(m => {
      if (m.id !== id) return m;
      let nouvelIntervalle = m.intervalle;
      let nouveauNiveau = m.niveau;
      let nouvellesRepetitions = m.repetitions;

      if (connu) {
        nouvellesRepetitions += 1;
        nouvelIntervalle = Math.min(m.intervalle * 2, 64); // max 64 jours
        if (nouvellesRepetitions >= 5) nouveauNiveau = 'maîtrisé';
        else if (nouvellesRepetitions >= 2) nouveauNiveau = 'en_cours';
      } else {
        nouvelIntervalle = 1;
        nouvellesRepetitions = Math.max(0, m.repetitions - 1);
        nouveauNiveau = 'nouveau';
      }

      const prochaine = new Date();
      prochaine.setDate(prochaine.getDate() + nouvelIntervalle);

      return {
        ...m,
        niveau: nouveauNiveau,
        repetitions: nouvellesRepetitions,
        intervalle: nouvelIntervalle,
        prochaineRevision: prochaine.toISOString(),
      };
    }));
  }

  function motsAReviser() {
    const maintenant = new Date();
    return mots.filter(m =>
      m.niveau !== 'maîtrisé' && new Date(m.prochaineRevision) <= maintenant
    );
  }

  const stats = {
    total: mots.length,
    nouveaux: mots.filter(m => m.niveau === 'nouveau').length,
    enCours: mots.filter(m => m.niveau === 'en_cours').length,
    maîtrisés: mots.filter(m => m.niveau === 'maîtrisé').length,
    aReviser: motsAReviser().length,
  };

  return { mots, ajouterMot, supprimerMot, mettreAJourNiveau, motsAReviser, stats };
}
