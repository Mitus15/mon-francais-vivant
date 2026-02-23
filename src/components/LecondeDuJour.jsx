import { useState } from 'react';
import { programme } from '../data/programme';
import TexteInteractif from './TexteInteractif';

export default function LecondeDuJour({ progression, completerLecon, vocabulaire }) {
  const jourActuel = Math.min(progression.jourActuel || 1, 90);
  const leconComplete = programme.find(l => l.jour === jourActuel);

  if (leconComplete) {
    return <LeconComplete lecon={leconComplete} jourActuel={jourActuel} progression={progression} completerLecon={completerLecon} vocabulaire={vocabulaire} />;
  }
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
      <div className="carte" style={{ textAlign: 'center', padding: 'var(--sp-10) var(--sp-6)' }}>
        <div className="heading-section" style={{ marginBottom: 'var(--sp-2)' }}>Leçon terminée !</div>
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-6)' }}>
          {dejaFaite ? 'Tu avais déjà fait cette leçon.' : `Jour ${jourActuel} complété ! Continue demain.`}
        </div>
        <button className="btn-primaire" style={{ width: 'auto' }} onClick={() => setEtape('lecon')}>Revoir la leçon</button>
      </div>
    );
  }

  return (
    <div>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 90</span>
        {dejaFaite && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 600 }}>Complété</span>}
      </div>

      <div className="carte">
        <div className="lecon-titre-h">{lecon.titre}</div>
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-5)' }}>
          <span className={`chip-niveau chip-${lecon.mois === 1 ? 'A1' : lecon.mois === 2 ? 'A2' : 'B1'}`}>
            {lecon.mois === 1 ? 'A1' : lecon.mois === 2 ? 'A2' : 'B1'}
          </span>
          <span style={{ marginLeft: 'var(--sp-2)' }}>{lecon.theme}</span>
        </div>

        <div className="section-regle">
          <h3>{lecon.regle.titre}</h3>
          <p><TexteInteractif texte={lecon.regle.contenu} /></p>
        </div>

        <div style={{ marginBottom: 'var(--sp-5)' }}>
          <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Vocabulaire du jour</div>
          <div className="vocabulaire-grille">
            {lecon.vocabulaire.map((v, i) => {
              const motSauvegarde = vocabulaire.mots.find(m => m.mot === v.mot);
              return (
                <div key={i} className="mot-carte">
                  <div className="mot-principal">{v.mot}</div>
                  <div className="mot-definition">{v.definition}</div>
                  <div className="mot-exemple"><TexteInteractif texte={`« ${v.exemple} »`} /></div>
                  <div style={{ marginTop: 'var(--sp-2)' }}>
                    <button
                      className={`btn-ajouter ${motSauvegarde ? 'deja' : ''}`}
                      onClick={() => vocabulaire.ajouterMot({ mot: v.mot, definition: v.definition, exemple: v.exemple })}
                    >
                      {motSauvegarde ? 'Sauvé' : '+ Sauvegarder'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {lecon.expression && (
          <div className="section-expression">
            <div className="expression-badge">Expression du jour</div>
            <div className="expression-texte"><TexteInteractif texte={`« ${lecon.expression.expression} »`} /></div>
            <div className="expression-sens"><TexteInteractif texte={lecon.expression.signification} /></div>
            <div className="expression-exemple"><TexteInteractif texte={lecon.expression.exemple} /></div>
          </div>
        )}

        {lecon.exercice && lecon.exercice.type === 'qcm' && etape === 'lecon' && (
          <div>
            <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Exercice</div>
            <div className="quiz-question">{lecon.exercice.question}</div>
            <div className="quiz-options">
              {lecon.exercice.options?.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-option ${reponseChoisie ? opt === lecon.exercice.reponse ? 'correct' : opt === reponseChoisie ? 'incorrect' : '' : ''}`}
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
          <button className="btn-primaire" style={{ marginTop: 'var(--sp-2)' }} onClick={() => {
            if (!progression.leconsFaites?.includes(jourActuel)) completerLecon(jourActuel, 100);
            setEtape('termine');
          }}>
            J'ai compris — Leçon terminée
          </button>
        ) : null}
      </div>
    </div>
  );
}

function LeconSimple({ theme, jourActuel, progression, completerLecon }) {
  const dejaFaite = progression.leconsFaites?.includes(jourActuel);

  return (
    <div>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 90</span>
        {dejaFaite && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 600 }}>Complété</span>}
      </div>

      <div className="carte">
        <div className="lecon-titre-h">{theme.titre}</div>
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-5)' }}>
          <span className={`chip-niveau chip-${theme.mois === 1 ? 'A1' : theme.mois === 2 ? 'A2' : 'B1'}`}>
            {theme.mois === 1 ? 'A1' : theme.mois === 2 ? 'A2' : 'B1'}
          </span>
          <span style={{ marginLeft: 'var(--sp-2)' }}>{theme.theme}</span>
        </div>

        <div className="section-regle">
          <h3>Sujet du jour</h3>
          <p>Aujourd'hui tu étudies : <strong>{theme.titre}</strong>{'\n\n'}Utilise le Dictionnaire et la Grammaire pour explorer ce sujet.{'\n'}Cherche des mots liés à ce thème et sauvegarde-les dans ton Vocabulaire.</p>
        </div>

        <div className="section-expression">
          <div className="expression-badge">Conseil</div>
          <div className="expression-texte">Comment pratiquer ?</div>
          <div className="expression-sens">1. Cherche 5 mots liés à "{theme.titre}" dans le Dictionnaire</div>
          <div className="expression-exemple">2. Lis des exemples et essaie de faire une phrase</div>
        </div>

        <button className="btn-primaire" onClick={() => { if (!dejaFaite) completerLecon(jourActuel, 100); }}>
          {dejaFaite ? 'Déjà complété' : 'Marquer comme complété'}
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
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-5)' }}>
          <span className={`chip-niveau chip-${niveau}`}>{niveau}</span>
        </div>

        <div className="section-regle">
          <h3>Pratique libre</h3>
          <p>Pour ce jour, explore les sections qui t'intéressent :{'\n\n'}• Cherche de nouveaux mots dans le Dictionnaire{'\n'}• Révise les verbes et leurs conjugaisons{'\n'}• Lis des expressions idiomatiques{'\n'}• Révise tes flashcards dans Mon Vocabulaire</p>
        </div>

        <button className="btn-primaire" onClick={() => { if (!dejaFaite) completerLecon(jourActuel, 100); }}>
          {dejaFaite ? 'Déjà complété' : 'Marquer comme complété'}
        </button>
      </div>
    </div>
  );
}
