import { useState } from 'react';
import { programme, themesParJour } from '../data/programme';

export default function LecondeDuJour({ progression, completerLecon, vocabulaire }) {
  const [etape, setEtape] = useState('lecon'); // 'lecon' | 'quiz' | 'termine'
  const [reponseChoisie, setReponseChoisie] = useState(null);
  const [score, setScore] = useState(0);

  const jourActuel = Math.min(progression.jourActuel || 1, 90);
  const leconComplete = programme.find(l => l.jour === jourActuel);
  const themeSimple = themesParJour[jourActuel];

  // Leçon avec contenu complet
  if (leconComplete) {
    return <LeconComplete lecon={leconComplete} jourActuel={jourActuel} progression={progression} completerLecon={completerLecon} vocabulaire={vocabulaire} />;
  }

  // Leçon avec thème simple (jours 11-29, 31-89)
  if (themeSimple) {
    return <LeconSimple theme={themeSimple} jourActuel={jourActuel} progression={progression} completerLecon={completerLecon} />;
  }

  // Jour inconnu — thème générique
  return <LeconGenerique jourActuel={jourActuel} progression={progression} completerLecon={completerLecon} />;
}

function LeconComplete({ lecon, jourActuel, progression, completerLecon, vocabulaire }) {
  const [etape, setEtape] = useState('lecon');
  const [reponseChoisie, setReponseChoisie] = useState(null);
  const dejaFaite = progression.leconsFaites?.includes(jourActuel);

  function choisirReponse(option) {
    if (reponseChoisie) return;
    setReponseChoisie(option);
    const correct = option === lecon.exercice?.reponse;
    setTimeout(() => {
      if (!dejaFaite) completerLecon(jourActuel, correct ? 100 : 60);
      setEtape('termine');
    }, 1500);
  }

  if (etape === 'termine') {
    return (
      <div className="carte" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
        <div style={{ fontFamily: 'Lora, serif', fontSize: '1.4rem', color: 'var(--bleu-nuit)', marginBottom: '8px' }}>
          Leçon terminée !
        </div>
        <div style={{ color: 'var(--texte-clair)', marginBottom: '24px', fontSize: '0.9rem' }}>
          {dejaFaite ? 'Tu avais déjà fait cette leçon.' : `Jour ${jourActuel} complété ! Continue demain.`}
        </div>
        <button className="btn-primaire" onClick={() => setEtape('lecon')}>
          Revoir la leçon
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 90</span>
        {dejaFaite && <span style={{ fontSize: '0.75rem', color: 'var(--vert-succes)', fontWeight: 600 }}>✓ Complété</span>}
      </div>

      <div className="carte">
        <div className="lecon-titre-h">{lecon.titre}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--texte-clair)', marginBottom: '20px' }}>
          {lecon.mois === 1 ? '🌱 A1' : lecon.mois === 2 ? '🌿 A2' : '🌳 B1'} — {lecon.theme}
        </div>

        {/* Règle */}
        <div className="section-regle">
          <h3>{lecon.regle.titre}</h3>
          <p>{lecon.regle.contenu}</p>
        </div>

        {/* Vocabulaire */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '12px' }}>
            📝 Vocabulaire du jour
          </div>
          <div className="vocabulaire-grille">
            {lecon.vocabulaire.map((v, i) => {
              const motSauvegarde = vocabulaire.mots.find(m => m.mot === v.mot);
              return (
                <div key={i} className="mot-carte">
                  <div className="mot-principal">{v.mot}</div>
                  <div className="mot-definition">{v.definition}</div>
                  <div className="mot-exemple">« {v.exemple} »</div>
                  <div style={{ marginTop: '8px' }}>
                    <button
                      className={`btn-ajouter ${motSauvegarde ? 'deja' : ''}`}
                      onClick={() => vocabulaire.ajouterMot({ mot: v.mot, definition: v.definition, exemple: v.exemple })}
                    >
                      {motSauvegarde ? '✓ Sauvé' : '+ Sauvegarder'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expression */}
        {lecon.expression && (
          <div className="section-expression">
            <div className="expression-badge">Expression du jour</div>
            <div className="expression-texte">« {lecon.expression.expression} »</div>
            <div className="expression-sens">{lecon.expression.signification}</div>
            <div className="expression-exemple">{lecon.expression.exemple}</div>
          </div>
        )}

        {/* Exercice */}
        {lecon.exercice && lecon.exercice.type === 'qcm' && etape === 'lecon' && (
          <div>
            <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '12px' }}>
              ✏️ Exercice
            </div>
            <div className="quiz-question">{lecon.exercice.question}</div>
            <div className="quiz-options">
              {lecon.exercice.options?.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-option ${
                    reponseChoisie
                      ? opt === lecon.exercice.reponse
                        ? 'correct'
                        : opt === reponseChoisie
                        ? 'incorrect'
                        : ''
                      : ''
                  }`}
                  onClick={() => choisirReponse(opt)}
                  disabled={!!reponseChoisie}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {!lecon.exercice || lecon.exercice.type !== 'qcm' ? (
          <button className="btn-primaire" style={{ marginTop: '8px' }} onClick={() => {
            if (!progression.leconsFaites?.includes(jourActuel)) completerLecon(jourActuel, 100);
            setEtape('termine');
          }}>
            ✓ J'ai compris — Leçon terminée
          </button>
        ) : null}
      </div>
    </div>
  );
}

function LeconSimple({ theme, jourActuel, progression, completerLecon }) {
  const dejaFaite = progression.leconsFaites?.includes(jourActuel);

  function terminer() {
    if (!dejaFaite) completerLecon(jourActuel, 100);
  }

  return (
    <div>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 90</span>
        {dejaFaite && <span style={{ fontSize: '0.75rem', color: 'var(--vert-succes)', fontWeight: 600 }}>✓ Complété</span>}
      </div>

      <div className="carte">
        <div className="lecon-titre-h">{theme.titre}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--texte-clair)', marginBottom: '20px' }}>
          {theme.mois === 1 ? '🌱 A1' : theme.mois === 2 ? '🌿 A2' : '🌳 B1'} — {theme.theme}
        </div>

        <div className="section-regle">
          <h3>Sujet du jour</h3>
          <p>Aujourd'hui tu étudies : <strong>{theme.titre}</strong>

Utilise le Dictionnaire et la Grammaire pour explorer ce sujet.
Cherche des mots liés à ce thème et sauvegarde-les dans ton Vocabulaire.</p>
        </div>

        <div className="section-expression">
          <div className="expression-badge">Conseil</div>
          <div className="expression-texte">Comment pratiquer ?</div>
          <div className="expression-sens">
            1. Cherche 5 mots liés à "{theme.titre}" dans le Dictionnaire
          </div>
          <div className="expression-exemple">
            2. Lis des exemples et essaie de faire une phrase
          </div>
        </div>

        <button className="btn-primaire" onClick={terminer}>
          {dejaFaite ? 'Déjà complété ✓' : '✓ Marquer comme complété'}
        </button>
      </div>
    </div>
  );
}

function LeconGenerique({ jourActuel, progression, completerLecon }) {
  const dejaFaite = progression.leconsFaites?.includes(jourActuel);
  const mois = jourActuel <= 30 ? 1 : jourActuel <= 60 ? 2 : 3;
  const niveau = mois === 1 ? 'A1' : mois === 2 ? 'A2' : 'B1';

  return (
    <div>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 90</span>
      </div>

      <div className="carte">
        <div className="lecon-titre-h">Leçon du jour — Niveau {niveau}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--texte-clair)', marginBottom: '20px' }}>
          {mois === 1 ? '🌱 Débutant' : mois === 2 ? '🌿 Intermédiaire' : '🌳 Avancé'}
        </div>

        <div className="section-regle">
          <h3>Pratique libre</h3>
          <p>Pour ce jour, explore les sections qui t'intéressent :

• Cherche de nouveaux mots dans le Dictionnaire
• Révise les verbes et leurs conjugaisons
• Lis des expressions idiomatiques
• Révise tes flashcards dans Mon Vocabulaire</p>
        </div>

        <button className="btn-primaire" onClick={() => {
          if (!dejaFaite) completerLecon(jourActuel, 100);
        }}>
          {dejaFaite ? '✓ Déjà complété' : '✓ Marquer comme complété'}
        </button>
      </div>
    </div>
  );
}
