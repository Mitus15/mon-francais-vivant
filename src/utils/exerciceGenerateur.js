// Génère les phases d'activités à partir des données d'une leçon
// Aucune modification de programme.js nécessaire — tout est dérivé au runtime

const MOTS_VIDES = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'à', 'au', 'aux',
  'en', 'et', 'ou', 'mais', 'donc', 'car', 'ni', 'que', 'qui', 'dont',
  'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles',
  'me', 'te', 'se', 'ne', 'pas', 'plus', 'ce', 'ces', 'mon', 'ma',
  'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'est', 'sont', 'suis',
  'ai', 'as', 'a', 'ont', 'avec', 'pour', 'dans', 'sur', 'par', 'très',
  'bien', 'tout', 'tous', 'toute', 'toutes', 'c\'est', 'y', 'l\'',
  "l'", "d'", "j'", "n'", "s'", "qu'",
]);

function melanger(arr) {
  const copie = [...arr];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// ==================== QCM Définitions ====================
// "Quelle est la définition de « X » ?" — distracteurs tirés des autres mots
export function genererQcmDefinitions(vocabulaire) {
  if (vocabulaire.length < 4) return [];
  return vocabulaire.map(v => {
    const distracteurs = melanger(
      vocabulaire.filter(a => a.mot !== v.mot)
    ).slice(0, 3).map(a => a.definition);
    const options = melanger([v.definition, ...distracteurs]);
    return {
      question: `Quelle est la définition de « ${v.mot} » ?`,
      options,
      reponse: v.definition,
    };
  });
}

// ==================== QCM Inverse ====================
// Montre la définition, demande le mot
export function genererQcmInverse(vocabulaire) {
  if (vocabulaire.length < 4) return [];
  return vocabulaire.map(v => {
    const distracteurs = melanger(
      vocabulaire.filter(a => a.mot !== v.mot)
    ).slice(0, 3).map(a => a.mot);
    const options = melanger([v.mot, ...distracteurs]);
    return {
      question: `Quel mot correspond à : « ${v.definition} » ?`,
      options,
      reponse: v.mot,
    };
  });
}

// ==================== Paires ====================
// Matching: mots ↔ définitions, les deux mélangés indépendamment
export function genererPaires(vocabulaire) {
  const items = vocabulaire.slice(0, 6); // max 6 pour garder le jeu jouable
  return {
    paires: items.map(v => ({ mot: v.mot, definition: v.definition })),
    mots: melanger(items.map(v => v.mot)),
    definitions: melanger(items.map(v => v.definition)),
  };
}

// ==================== Lacunes (fill-in-blank) ====================
// Remplace un mot-clé dans v.exemple par ___
export function genererLacunes(vocabulaire) {
  const resultats = [];
  for (const v of vocabulaire) {
    if (!v.exemple || v.exemple.length < 10) continue;

    const phrase = v.exemple;
    // Essai 1 : match exact du mot (insensible à la casse)
    const regex = new RegExp(`\\b${escapeRegex(v.mot)}\\b`, 'i');
    const match = phrase.match(regex);

    if (match) {
      resultats.push({
        phrase: phrase.replace(match[0], '___'),
        reponse: match[0],
        indice: `${match[0][0]}... (${match[0].length} lettres)`,
      });
      continue;
    }

    // Essai 2 : fallback — le mot le plus long qui n'est pas un mot vide
    const mots = phrase.replace(/[.,!?;:«»""''—–]/g, '').split(/\s+/);
    const motsCandidats = mots.filter(m =>
      m.length > 2 && !MOTS_VIDES.has(m.toLowerCase())
    );
    if (motsCandidats.length === 0) continue;

    const motLePlusLong = motsCandidats.reduce((a, b) =>
      a.length >= b.length ? a : b
    );
    resultats.push({
      phrase: phrase.replace(motLePlusLong, '___'),
      reponse: motLePlusLong,
      indice: `${motLePlusLong[0]}... (${motLePlusLong.length} lettres)`,
    });
  }
  return resultats;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==================== Compréhension du dialogue ====================
// Génère 2-3 questions à partir du dialogue
export function genererQcmComprehension(dialogue, vocabulaire) {
  if (!dialogue || !dialogue.repliques || dialogue.repliques.length < 2) return [];

  const questions = [];
  const repliques = dialogue.repliques;

  // Q1 : "Qui dit « ... » ?"
  const repliqueCible = repliques[Math.floor(Math.random() * repliques.length)];
  const personnages = [...new Set(repliques.map(r => r.personnage))];
  if (personnages.length >= 2) {
    const distracteurs = personnages.filter(p => p !== repliqueCible.personnage);
    const texteCoupe = repliqueCible.texte.length > 50
      ? repliqueCible.texte.slice(0, 50) + '...'
      : repliqueCible.texte;
    questions.push({
      question: `Qui dit « ${texteCoupe} » ?`,
      options: melanger([repliqueCible.personnage, ...distracteurs.slice(0, 3)]),
      reponse: repliqueCible.personnage,
    });
  }

  // Q2 : "Où se passe la conversation ?"
  if (dialogue.contexte) {
    const lieuMatch = dialogue.contexte.match(/(?:au |à la |à l'|dans |chez )([^,]+)/i);
    if (lieuMatch) {
      const lieu = lieuMatch[0].trim();
      const faux = ['à la bibliothèque', 'au supermarché', 'dans la rue', 'au bureau', 'chez le médecin', 'à la gare'];
      const distracteurs = melanger(faux.filter(f => f !== lieu)).slice(0, 3);
      questions.push({
        question: 'Où se passe la conversation ?',
        options: melanger([lieu, ...distracteurs]),
        reponse: lieu,
      });
    }
  }

  // Q3 : "Que répond X quand Y dit ... ?" (si assez de répliques)
  if (repliques.length >= 3) {
    const idx = Math.floor(Math.random() * (repliques.length - 1));
    const questionReplique = repliques[idx];
    const reponseReplique = repliques[idx + 1];
    const texteQ = questionReplique.texte.length > 40
      ? questionReplique.texte.slice(0, 40) + '...'
      : questionReplique.texte;

    // Distracteurs : autres répliques du dialogue
    const autresTextes = repliques
      .filter((_, i) => i !== idx + 1)
      .map(r => r.texte);
    if (autresTextes.length >= 1) {
      const distracteurs = melanger(autresTextes).slice(0, 3);
      // S'assurer d'avoir au moins 2 options
      if (distracteurs.length >= 1) {
        questions.push({
          question: `Que répond ${reponseReplique.personnage} quand ${questionReplique.personnage} dit « ${texteQ} » ?`,
          options: melanger([reponseReplique.texte, ...distracteurs]),
          reponse: reponseReplique.texte,
        });
      }
    }
  }

  return questions;
}

// ==================== Normaliser exercices ====================
// Gère la compatibilité : exercices[] (nouveau) ou exercice (ancien)
export function normaliserExercices(lecon) {
  const exercices = lecon.exercices || (lecon.exercice ? [lecon.exercice] : []);
  const resultats = [];

  for (const ex of exercices) {
    if (ex.type === 'quiz_semaine' && ex.questions) {
      // Éclater les questions individuelles en SaisieLibre
      for (const q of ex.questions) {
        resultats.push({
          type: 'production',
          consigne: q.q,
          reponse: q.r,
        });
      }
    } else {
      resultats.push(ex);
    }
  }

  return resultats;
}

// ==================== Générateur principal ====================
export function genererPhases(lecon) {
  const phases = [];
  const vocab = lecon.vocabulaire || [];

  // Phase 1 : Découverte
  const activitesDecouverte = [];
  if (lecon.regle) {
    activitesDecouverte.push({ type: 'lecture_regle', data: lecon.regle });
  }
  if (lecon.expression) {
    activitesDecouverte.push({ type: 'lecture_expression', data: lecon.expression });
  }
  if (activitesDecouverte.length > 0) {
    phases.push({
      id: 'decouverte',
      label: 'Découverte',
      activites: activitesDecouverte,
    });
  }

  // Phase 2 : Vocabulaire
  if (vocab.length >= 4) {
    phases.push({
      id: 'vocabulaire',
      label: 'Vocabulaire',
      activites: [
        { type: 'flashcards_lecon', data: vocab },
        { type: 'qcm_definition', data: genererQcmDefinitions(vocab) },
        { type: 'paires', data: genererPaires(vocab) },
      ],
    });
  }

  // Phase 3 : Dialogue (si présent)
  if (lecon.dialogue && lecon.dialogue.repliques?.length >= 2) {
    const activitesDialogue = [
      { type: 'lecture_dialogue', data: lecon.dialogue },
    ];
    const qcmComp = genererQcmComprehension(lecon.dialogue, vocab);
    if (qcmComp.length > 0) {
      activitesDialogue.push({ type: 'qcm_comprehension', data: qcmComp });
    }
    phases.push({
      id: 'dialogue',
      label: 'Dialogue',
      activites: activitesDialogue,
    });
  }

  // Phase 4 : Pratique (lacunes)
  const lacunes = genererLacunes(vocab);
  if (lacunes.length > 0) {
    phases.push({
      id: 'pratique',
      label: 'Pratique',
      activites: [
        { type: 'lacunes', data: lacunes },
      ],
    });
  }

  // Phase 5 : Exercices (de programme.js)
  const exercicesNorm = normaliserExercices(lecon);
  if (exercicesNorm.length > 0) {
    phases.push({
      id: 'exercices',
      label: 'Exercices',
      activites: exercicesNorm.map(ex => ({ type: ex.type, data: ex })),
    });
  }

  // Phase 6 : Révision
  if (vocab.length >= 4) {
    phases.push({
      id: 'revision',
      label: 'Révision',
      activites: [
        { type: 'qcm_inverse', data: genererQcmInverse(vocab) },
      ],
    });
  }

  return phases;
}
