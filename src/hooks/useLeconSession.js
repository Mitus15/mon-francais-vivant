import { useState, useEffect, useMemo } from 'react';
import { genererPhases } from '../utils/exerciceGenerateur';

const CLE_SESSION = 'monFrancaisVivant_session';

// Types d'activités qui ne comptent pas dans le score
const TYPES_LECTURE = new Set(['lecture_regle', 'lecture_expression', 'lecture_dialogue']);

function chargerSession(jourActuel) {
  try {
    const raw = localStorage.getItem(CLE_SESSION);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (saved.jourActuel === jourActuel) return saved;
    return null;
  } catch {
    return null;
  }
}

function sauvegarderSession(data) {
  try {
    localStorage.setItem(CLE_SESSION, JSON.stringify(data));
  } catch { /* silencieux */ }
}

function effacerSession() {
  try {
    localStorage.removeItem(CLE_SESSION);
  } catch { /* silencieux */ }
}

export function useLeconSession(lecon, jourActuel, dejaFaite = false) {
  // Générer les phases une seule fois par leçon
  const phases = useMemo(() => {
    if (!lecon) return [];
    return genererPhases(lecon);
  }, [lecon]);

  // Restaurer la session si elle existe
  const sessionSauvee = useMemo(() => {
    if (dejaFaite) return null; // pas de restauration en mode replay
    return chargerSession(jourActuel);
  }, [jourActuel, dejaFaite]);

  const [phaseIndex, setPhaseIndex] = useState(sessionSauvee?.phaseIndex || 0);
  const [activiteIndex, setActiviteIndex] = useState(sessionSauvee?.activiteIndex || 0);
  const [scores, setScores] = useState(sessionSauvee?.scores || []);
  const [termine, setTermine] = useState(false);

  // Phase et activité courantes
  const phaseActuelle = phases[phaseIndex] || null;
  const activiteActuelle = phaseActuelle?.activites?.[activiteIndex] || null;

  // Compteurs de progression
  const totalActivites = phases.reduce((sum, p) => sum + p.activites.length, 0);
  const activitesDone = phases.slice(0, phaseIndex).reduce(
    (sum, p) => sum + p.activites.length, 0
  ) + activiteIndex;

  // Sauvegarder la session à chaque changement (sauf replay)
  useEffect(() => {
    if (dejaFaite || termine) return;
    sauvegarderSession({
      jourActuel,
      phaseIndex,
      activiteIndex,
      scores,
    });
  }, [jourActuel, phaseIndex, activiteIndex, scores, dejaFaite, termine]);

  // Calculer le score final (excluant les lectures)
  const scoreFinal = useMemo(() => {
    const scoresInteractifs = scores.filter(s => s.type !== 'lecture');
    if (scoresInteractifs.length === 0) return 100;
    const somme = scoresInteractifs.reduce((a, b) => a + b.score, 0);
    return Math.round(somme / scoresInteractifs.length);
  }, [scores]);

  function completerActivite(score) {
    const typeActivite = activiteActuelle?.type || '';
    const estLecture = TYPES_LECTURE.has(typeActivite);

    setScores(prev => [...prev, {
      score: score ?? 100,
      type: estLecture ? 'lecture' : 'interactif',
    }]);

    const nextActivite = activiteIndex + 1;
    if (phaseActuelle && nextActivite < phaseActuelle.activites.length) {
      setActiviteIndex(nextActivite);
    } else {
      const nextPhase = phaseIndex + 1;
      if (nextPhase < phases.length) {
        setPhaseIndex(nextPhase);
        setActiviteIndex(0);
      } else {
        setTermine(true);
        effacerSession();
      }
    }
  }

  return {
    phases,
    phaseActuelle,
    activiteActuelle,
    phaseIndex,
    activiteIndex,
    totalActivites,
    activitesDone,
    completerActivite,
    termine,
    scoreFinal,
  };
}
