import { useState } from 'react';
import { lecons } from '../data/grammaire';
import TexteInteractif from './TexteInteractif';

export default function Grammaire({ niveauActuel }) {
  const [leconChoisie, setLeconChoisie] = useState(null);
  const [filtre, setFiltre] = useState('tous');

  const leconsFiltrees = filtre === 'tous' ? lecons : lecons.filter(l => l.niveau === filtre);

  if (leconChoisie) {
    return <DetailLecon lecon={leconChoisie} retour={() => setLeconChoisie(null)} />;
  }

  return (
    <div>
      <h2 className="section-titre">Grammaire</h2>
      <p className="section-intro">
        La grammaire est le squelette du français. Chaque leçon explique une règle avec des exemples clairs et un exercice pratique.
      </p>

      <div className="filtres">
        {[['tous', 'Tous les niveaux'], ['A1', 'A1 Débutant'], ['A2', 'A2 Intermédiaire'], ['B1', 'B1 Avancé']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtre === f ? 'actif' : ''}`} onClick={() => setFiltre(f)}>{l}</button>
        ))}
      </div>

      <div className="stack">
        {leconsFiltrees.map((lecon) => (
          <div key={lecon.id} className="expression-carte carte-clickable" onClick={() => setLeconChoisie(lecon)}>
            <div className="expression-en-tete">
              <div>
                <div className="heading-card">{lecon.titre}</div>
                <div className="text-secondary" style={{ marginTop: 'var(--sp-1)' }}>
                  {lecon.categorie} — {lecon.sections?.length || 0} section{(lecon.sections?.length || 0) > 1 ? 's' : ''} + exercice{lecon.exercices?.length > 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
                <span className={`chip-niveau chip-${lecon.niveau}`}>{lecon.niveau}</span>
                <span style={{ color: 'var(--primary)', fontSize: 'var(--text-base)' }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailLecon({ lecon, retour }) {
  const [reponsesChoisies, setReponsesChoisies] = useState({});

  function choisirReponse(qIndex, option) {
    if (reponsesChoisies[qIndex]) return;
    setReponsesChoisies(prev => ({ ...prev, [qIndex]: option }));
  }

  return (
    <div>
      <button onClick={retour} className="btn-retour">← Retour aux leçons</button>

      <div className="carte">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <span className={`chip-niveau chip-${lecon.niveau}`}>{lecon.niveau}</span>
          <div className="heading-section" style={{ marginBottom: 0 }}>{lecon.titre}</div>
        </div>

        <div className="section-regle">
          <h3>Introduction</h3>
          <p><TexteInteractif texte={lecon.introduction} /></p>
        </div>

        {lecon.sections?.map((section, si) => (
          <div key={si} style={{ marginBottom: 'var(--sp-6)' }}>
            <div className="heading-card" style={{ marginBottom: 'var(--sp-3)', borderBottom: '2px solid var(--accent-light)', paddingBottom: 'var(--sp-2)' }}>
              {section.sous_titre}
            </div>
            <div className="stack">
              {section.regles.map((r, ri) => (
                <div key={ri} style={{ background: 'var(--surface-alt)', borderRadius: 'var(--radius)', padding: 'var(--sp-4)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius)', padding: 'var(--sp-1) var(--sp-3)', fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, flexShrink: 0 }}>
                      {r.regle}
                    </div>
                    <div>
                      <div className="text-secondary" style={{ marginBottom: 'var(--sp-1)' }}><TexteInteractif texte={r.usage} /></div>
                      <div style={{ fontStyle: 'italic', color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>Ex : <TexteInteractif texte={r.exemple} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {lecon.exercices && lecon.exercices.length > 0 && (
          <div>
            <div className="heading-card" style={{ marginBottom: 'var(--sp-3)', borderBottom: '2px solid var(--accent-light)', paddingBottom: 'var(--sp-2)' }}>
              Exercices
            </div>
            {lecon.exercices.map((ex, qi) => (
              <div key={qi} style={{ marginBottom: 'var(--sp-5)' }}>
                <div className="quiz-question">{ex.question}</div>
                {ex.options ? (
                  <div className="quiz-options">
                    {ex.options.map((opt, oi) => (
                      <button
                        key={oi}
                        className={`quiz-option ${reponsesChoisies[qi] ? opt === ex.reponse ? 'correct' : opt === reponsesChoisies[qi] ? 'incorrect' : '' : ''}`}
                        onClick={() => choisirReponse(qi, opt)}
                        disabled={!!reponsesChoisies[qi]}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="tip-box">
                    <div className="text-meta" style={{ marginBottom: 'var(--sp-1)' }}>Réponse :</div>
                    <div className="heading-card">{ex.reponse}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
