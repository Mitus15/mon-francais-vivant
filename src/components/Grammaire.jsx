import { useState } from 'react';
import { lecons } from '../data/grammaire';

export default function Grammaire({ niveauActuel }) {
  const [leconChoisie, setLeconChoisie] = useState(null);
  const [filtre, setFiltre] = useState('tous');
  const [reponseQuiz, setReponseQuiz] = useState({});

  const leconsFiltrees = filtre === 'tous' ? lecons : lecons.filter(l => l.niveau === filtre);

  if (leconChoisie) {
    return <DetailLecon lecon={leconChoisie} retour={() => { setLeconChoisie(null); setReponseQuiz({}); }} />;
  }

  return (
    <div>
      <h2 className="section-titre">📚 Grammaire</h2>
      <p className="section-intro">
        La grammaire est le squelette du français. Chaque leçon explique une règle avec des exemples clairs et un exercice pratique.
      </p>

      <div className="filtres">
        {[['tous', 'Tous les niveaux'], ['A1', '🌱 A1 Débutant'], ['A2', '🌿 A2 Intermédiaire'], ['B1', '🌳 B1 Avancé']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtre === f ? 'actif' : ''}`} onClick={() => setFiltre(f)}>{l}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {leconsFiltrees.map((lecon) => (
          <div
            key={lecon.id}
            className="expression-carte"
            onClick={() => setLeconChoisie(lecon)}
            style={{ cursor: 'pointer' }}
          >
            <div className="expression-en-tete">
              <div>
                <div style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--bleu-nuit)' }}>
                  {lecon.titre}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--texte-clair)', marginTop: '4px' }}>
                  {lecon.categorie} — {lecon.sections?.length || 0} section{(lecon.sections?.length || 0) > 1 ? 's' : ''} + exercice{lecon.exercices?.length > 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span className={`chip-niveau chip-${lecon.niveau}`}>{lecon.niveau}</span>
                <span style={{ color: 'var(--or)', fontSize: '1rem' }}>→</span>
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
      <button
        onClick={retour}
        style={{ background: 'none', border: 'none', color: 'var(--or)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        ← Retour aux leçons
      </button>

      <div className="carte">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span className={`chip-niveau chip-${lecon.niveau}`}>{lecon.niveau}</span>
          <div style={{ fontFamily: 'Lora, serif', fontSize: '1.3rem', fontWeight: 600, color: 'var(--bleu-nuit)' }}>
            {lecon.titre}
          </div>
        </div>

        <div className="section-regle">
          <h3>Introduction</h3>
          <p>{lecon.introduction}</p>
        </div>

        {lecon.sections?.map((section, si) => (
          <div key={si} style={{ marginBottom: '24px' }}>
            <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '1rem', marginBottom: '12px', borderBottom: '2px solid var(--or-pale)', paddingBottom: '8px' }}>
              {section.sous_titre}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {section.regles.map((r, ri) => (
                <div key={ri} style={{ background: 'var(--blanc-casse)', borderRadius: 'var(--radius)', padding: '14px', border: '1px solid var(--gris-clair)' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--or)', color: 'var(--bleu-nuit)', borderRadius: '8px', padding: '4px 10px', fontFamily: 'Lora, serif', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                      {r.regle}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--texte-clair)', marginBottom: '4px' }}>{r.usage}</div>
                      <div style={{ fontStyle: 'italic', color: 'var(--bleu-moyen)', fontSize: '0.88rem' }}>Ex : {r.exemple}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Exercices */}
        {lecon.exercices && lecon.exercices.length > 0 && (
          <div>
            <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '1rem', marginBottom: '12px', borderBottom: '2px solid var(--or-pale)', paddingBottom: '8px' }}>
              ✏️ Exercices
            </div>
            {lecon.exercices.map((ex, qi) => (
              <div key={qi} style={{ marginBottom: '20px' }}>
                <div className="quiz-question" style={{ fontSize: '1rem' }}>{ex.question}</div>
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
                  <div style={{ background: 'var(--or-pale)', borderRadius: 'var(--radius)', padding: '12px 16px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gris)', marginBottom: '4px' }}>Réponse :</div>
                    <div style={{ fontFamily: 'Lora, serif', color: 'var(--bleu-nuit)', fontWeight: 600 }}>{ex.reponse}</div>
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
