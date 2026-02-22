import { useState } from 'react';
import { sons, regles } from '../data/prononciation';

export default function Prononciation() {
  const [vue, setVue] = useState('sons'); // 'sons' | 'regles'
  const [filtre, setFiltre] = useState('tous');
  const [sonOuvert, setSonOuvert] = useState(null);
  const [regleOuverte, setRegleOuverte] = useState(null);

  const categories = ['tous', ...new Set(sons.map(s => s.categorie))];

  const sonsFiltres = filtre === 'tous' ? sons : sons.filter(s => s.categorie === filtre);

  return (
    <div>
      <h2 className="section-titre">👂 Prononciation</h2>
      <p className="section-intro">
        Le français a des sons uniques qui n'existent pas dans d'autres langues. Apprendre à les prononcer correctement est essentiel pour être compris.
      </p>

      <div className="filtres" style={{ marginBottom: '16px' }}>
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
            <div key={i} className="son-carte" onClick={() => setSonOuvert(sonOuvert === i ? null : i)} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div className="son-badge">{s.son}</div>
                  <div className="son-lettre">Lettres : {s.lettre}</div>
                </div>
                <span className={`chip-niveau chip-${s.niveau}`}>{s.niveau}</span>
              </div>

              <div className="son-description">{s.description}</div>

              <div className="son-exemples">
                {s.exemples.map((ex, j) => (
                  <div key={j} className="son-exemple-chip" title={ex.traduction}>
                    {ex.mot}
                  </div>
                ))}
              </div>

              {sonOuvert === i && (
                <div style={{ marginTop: '12px', borderTop: '1px solid var(--gris-clair)', paddingTop: '12px' }}>
                  {s.exemples.map((ex, j) => (
                    <div key={j} style={{ marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: 'Lora, serif', fontWeight: 700, color: 'var(--bleu-nuit)', minWidth: '80px' }}>{ex.mot}</div>
                      <div style={{ color: 'var(--gris)', fontSize: '0.85rem' }}>{ex.phonetique}</div>
                      <div style={{ color: 'var(--texte-clair)', fontSize: '0.82rem', fontStyle: 'italic' }}>{ex.traduction}</div>
                    </div>
                  ))}
                  {s.astuce && (
                    <div style={{ marginTop: '10px', background: '#fff3e0', borderRadius: '8px', padding: '10px 12px', fontSize: '0.85rem', color: '#e65c00' }}>
                      💡 Astuce : {s.astuce}
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
            <div key={i} className="carte" style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => setRegleOuverte(regleOuverte === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '4px' }}>
                    {r.titre}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--texte-clair)' }}>{r.description}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span className={`chip-niveau chip-${r.niveau}`}>{r.niveau}</span>
                  <span style={{ color: 'var(--or)' }}>{regleOuverte === i ? '▲' : '▼'}</span>
                </div>
              </div>

              {regleOuverte === i && (
                <div style={{ borderTop: '1px solid var(--gris-clair)', paddingTop: '14px', marginTop: '12px' }}>
                  {r.exemples.map((ex, j) => (
                    <div key={j} style={{ marginBottom: '10px', background: 'var(--blanc-casse)', borderRadius: '8px', padding: '10px 14px', border: '1px solid var(--gris-clair)' }}>
                      <div style={{ fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '0.85rem', marginBottom: '4px' }}>{ex.regle}</div>
                      <div style={{ fontStyle: 'italic', color: 'var(--bleu-moyen)', fontSize: '0.85rem' }}>{ex.exemple}</div>
                    </div>
                  ))}
                  {r.astuce && (
                    <div style={{ background: 'var(--vert-clair)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: 'var(--vert-succes)' }}>
                      💡 {r.astuce}
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
