import { useState, useEffect } from 'react';

const CLE = 'monFrancaisVivant';

const etatInitial = {
  dateDebut: new Date().toISOString(),
  jourActuel: 1,
  dernierJourFait: null,
  streak: 0,
  niveauGlobal: 'A1',
  scores: { A1: 0, A2: 0, B1: 0 },
  leconsFaites: [],
  xpTotal: 0,
};

function calculerStreak(dernierJour) {
  if (!dernierJour) return 0;
  const hier = new Date();
  hier.setDate(hier.getDate() - 1);
  const dateHier = hier.toDateString();
  const dateDernierJour = new Date(dernierJour).toDateString();
  const dateAujourdhui = new Date().toDateString();
  if (dateDernierJour === dateAujourdhui || dateDernierJour === dateHier) return null; // maintenu
  return 0; // réinitialisé
}

export function useProgression() {
  const [progression, setProgression] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem(CLE + '_progression');
      return sauvegarde ? JSON.parse(sauvegarde) : etatInitial;
    } catch {
      return etatInitial;
    }
  });

  useEffect(() => {
    localStorage.setItem(CLE + '_progression', JSON.stringify(progression));
  }, [progression]);

  function completerLecon(numeroJour, scoreObtenu = 100) {
    setProgression(prev => {
      const dejaFaite = prev.leconsFaites.includes(numeroJour);
      const aujourd_hui = new Date().toDateString();
      const dernierFait = prev.dernierJourFait ? new Date(prev.dernierJourFait).toDateString() : null;

      let nouveauStreak = prev.streak;
      if (!dejaFaite) {
        if (dernierFait === aujourd_hui) {
          // déjà fait aujourd'hui, pas de changement de streak
        } else {
          const hier = new Date();
          hier.setDate(hier.getDate() - 1);
          if (dernierFait === hier.toDateString()) {
            nouveauStreak = prev.streak + 1;
          } else {
            nouveauStreak = 1;
          }
        }
      }

      const nouveauNiveau = prev.niveauGlobal;
      const xpGagne = dejaFaite ? 0 : Math.round(scoreObtenu * 10);

      return {
        ...prev,
        dernierJourFait: new Date().toISOString(),
        streak: nouveauStreak,
        leconsFaites: dejaFaite ? prev.leconsFaites : [...prev.leconsFaites, numeroJour],
        xpTotal: prev.xpTotal + xpGagne,
        jourActuel: dejaFaite ? prev.jourActuel : Math.max(prev.jourActuel, numeroJour + 1),
      };
    });
  }

  function pourcentageNiveau(niveau) {
    const { leconsFaites } = progression;
    const ranges = { A1: [1, 30], A2: [31, 60], B1: [61, 90] };
    const [debut, fin] = ranges[niveau] || [1, 30];
    const total = fin - debut + 1;
    const faites = leconsFaites.filter(j => j >= debut && j <= fin).length;
    return Math.round((faites / total) * 100);
  }

  function niveauDebloque(niveau) {
    const prerequis = { A1: true, A2: pourcentageNiveau('A1') >= 70, B1: pourcentageNiveau('A2') >= 70 };
    return prerequis[niveau] ?? false;
  }

  function resetProgression() {
    setProgression(etatInitial);
  }

  return {
    progression,
    completerLecon,
    pourcentageNiveau,
    niveauDebloque,
    resetProgression,
  };
}
