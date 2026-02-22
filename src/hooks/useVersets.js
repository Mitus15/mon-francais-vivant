import { useState, useEffect } from 'react';

const CLE = 'monFrancaisVivant_versets';

export function useVersets() {
  const [versets, setVersets] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem(CLE);
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CLE, JSON.stringify(versets));
  }, [versets]);

  function ajouterVerset(verset) {
    // verset: { id, ref, livre, chapitre, numero, texte, annotation? }
    const id = verset.id || `${verset.livre}-${verset.chapitre}-${verset.numero}`;
    if (versets.find(v => v.id === id)) return;
    const nouveau = {
      ...verset,
      id,
      dateAjout: new Date().toISOString(),
      niveau: 'nouveau',
      repetitions: 0,
      prochaineRevision: new Date().toISOString(),
      intervalle: 1,
    };
    setVersets(prev => [nouveau, ...prev]);
  }

  function supprimerVerset(id) {
    setVersets(prev => prev.filter(v => v.id !== id));
  }

  function mettreAJourNiveau(id, connu) {
    setVersets(prev => prev.map(v => {
      if (v.id !== id) return v;
      let nouvelIntervalle = v.intervalle;
      let nouveauNiveau = v.niveau;
      let nouvellesRepetitions = v.repetitions;

      if (connu) {
        nouvellesRepetitions += 1;
        nouvelIntervalle = Math.min(v.intervalle * 2, 64);
        if (nouvellesRepetitions >= 5) nouveauNiveau = 'maîtrisé';
        else if (nouvellesRepetitions >= 2) nouveauNiveau = 'en_cours';
      } else {
        nouvelIntervalle = 1;
        nouvellesRepetitions = Math.max(0, v.repetitions - 1);
        nouveauNiveau = 'nouveau';
      }

      const prochaine = new Date();
      prochaine.setDate(prochaine.getDate() + nouvelIntervalle);

      return {
        ...v,
        niveau: nouveauNiveau,
        repetitions: nouvellesRepetitions,
        intervalle: nouvelIntervalle,
        prochaineRevision: prochaine.toISOString(),
      };
    }));
  }

  function versetsAReviser() {
    const maintenant = new Date();
    return versets.filter(v =>
      v.niveau !== 'maîtrisé' && new Date(v.prochaineRevision) <= maintenant
    );
  }

  const stats = {
    total: versets.length,
    nouveaux: versets.filter(v => v.niveau === 'nouveau').length,
    enCours: versets.filter(v => v.niveau === 'en_cours').length,
    maîtrisés: versets.filter(v => v.niveau === 'maîtrisé').length,
    aReviser: versetsAReviser().length,
  };

  return { versets, ajouterVerset, supprimerVerset, mettreAJourNiveau, versetsAReviser, stats };
}
