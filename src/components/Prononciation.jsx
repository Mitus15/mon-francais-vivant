import { useState } from 'react';
import { sons, regles } from '../data/prononciation';
import TexteInteractif from './TexteInteractif';

export default function Prononciation() {
  const [vue, setVue] = useState('sons');
  const [filtre, setFiltre] = useState('tous');
  const [sonOuvert, setSonOuvert] = useState(null);
  const [regleOuverte, setRegleOuverte] = useState(null);

  const categories = ['tous', ...new Set(sons.map(s => s.categorie))];
  const sonsFiltres = filtre === 'tous' ? sons : sons.filter(s => s.categorie === filtre);

  return (
    <div>
      <h2 className="section-titre">Prononciation</h2>
      <p className="section-intro">
        Le français a des sons uniques qui n'existent pas dans d'autres langues. Apprendre à les prononcer correctement est essentiel pour être compris.
      </p>

      <div className="filtres" style={{ marginBottom: 'var(--sp-4)' }}>
        <button className={`filtre-btn ${vue === 'sons' ? 'actif' : ''}`} onClick={() => setVue('sons')}>Les Sons</button>
        <button className={`filtre-btn ${vue === 'regles' ? 'actif' : ''}`} onClick={() => setVue('regles')}>Les Règles</button>
      </div>

      {vue === 'sons' && (
        <>
          <div className="filtres">
            {categories.map(c => (
              <button key={c} className={`filtre-btn ${filtre === c ? 'actif' : ''}`} onClick={() => setFiltre(c)}>
                {c === 'tous' ? 'Tous' : c === 'voyelles' ? 'Voyelles' : c === 'voyelles-nasales' ? 'Nasales' : 'Consonnes'}
              </button>
            ))}
          </div>

          {sonsFiltres.map((s, i) => (
            <div key={i} className="son-carte carte-clickable" onClick={() => setSonOuvert(sonOuvert === i ? null : i)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
                <div>
                  <div className="son-badge">{s.son}</div>
                  <div className="son-lettre">Lettres : {s.lettre}</div>
                </div>
                <span className={`chip-niveau chip-${s.niveau}`}>{s.niveau}</span>
              </div>

              <div className="son-description"><TexteInteractif texte={s.description} /></div>

              <div className="son-exemples">
                {s.exemples.map((ex, j) => (
                  <div key={j} className="son-exemple-chip" title={ex.traduction}>{ex.mot}</div>
                ))}
              </div>

              {sonOuvert === i && (
                <div style={{ marginTop: 'var(--sp-3)', borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-3)' }}>
                  {s.exemples.map((ex, j) => (
                    <div key={j} style={{ marginBottom: 'var(--sp-2)', display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: 'var(--text)', minWidth: 80 }}>{ex.mot}</div>
                      <div className="text-meta">{ex.phonetique}</div>
                      <div className="text-secondary" style={{ fontStyle: 'italic' }}>{ex.traduction}</div>
                    </div>
                  ))}
                  {s.astuce && (
                    <div className="tip-box" style={{ marginTop: 'var(--sp-3)' }}>
                      Astuce : <TexteInteractif texte={s.astuce} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {vue === 'regles' && (
        <div>
          {regles.map((r, i) => (
            <div key={i} className="carte carte-clickable" style={{ marginBottom: 'var(--sp-3)' }} onClick={() => setRegleOuverte(regleOuverte === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--sp-3)' }}>
                <div>
                  <div className="heading-card" style={{ marginBottom: 'var(--sp-1)' }}>{r.titre}</div>
                  <div className="text-secondary"><TexteInteractif texte={r.description} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexShrink: 0 }}>
                  <span className={`chip-niveau chip-${r.niveau}`}>{r.niveau}</span>
                  <span style={{ color: 'var(--primary)' }}>{regleOuverte === i ? '▲' : '▼'}</span>
                </div>
              </div>

              {regleOuverte === i && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-4)', marginTop: 'var(--sp-3)' }}>
                  {r.exemples.map((ex, j) => (
                    <div key={j} style={{ marginBottom: 'var(--sp-3)', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', padding: 'var(--sp-3) var(--sp-4)', border: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-1)' }}>{ex.regle}</div>
                      <div style={{ fontStyle: 'italic', color: 'var(--primary)', fontSize: 'var(--text-sm)' }}><TexteInteractif texte={ex.exemple} /></div>
                    </div>
                  ))}
                  {r.astuce && (
                    <div className="tip-box-success">
                      <TexteInteractif texte={r.astuce} />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
