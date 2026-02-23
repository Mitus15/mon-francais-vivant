import { useState, useEffect, useRef } from 'react';
import { tousLesMots } from '../data/vocabulaire_themes';
import { idiomes } from '../data/idiomes';
import { lecons } from '../data/grammaire';
import { vocabulaireTheologique, doctrines } from '../data/theologie';
import { annotations } from '../data/bible_annotations';
import { useWiktionnaire } from '../hooks/useWiktionnaire';

const SECTIONS = {
  vocabulaire: { label: 'Vocabulaire', onglet: 'vocabulaire' },
  themes: { label: 'Thèmes', onglet: 'themes' },
  expressions: { label: 'Expressions', onglet: 'expressions' },
  grammaire: { label: 'Grammaire', onglet: 'grammaire' },
  theologie: { label: 'Théologie', onglet: 'theologie' },
  bible: { label: 'Bible', onglet: 'bible' },
  wiktionnaire: { label: 'Wiktionnaire', onglet: 'dictionnaire' },
};

export default function RechercheGlobale({ ouvert, fermer, naviguerVers, vocabulaire }) {
  const [terme, setTerme] = useState('');
  const [resultats, setResultats] = useState({});
  const [rechercheFaite, setRechercheFaite] = useState(false);
  const wikt = useWiktionnaire();
  const inputRef = useRef(null);

  useEffect(() => {
    if (ouvert) {
      setTerme('');
      setResultats({});
      setRechercheFaite(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e) => { if (e.key === 'Escape') fermer(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ouvert, fermer]);

  if (!ouvert) return null;

  async function chercher() {
    const q = terme.trim().toLowerCase();
    if (q.length < 2) return;

    const res = {};

    const motsThemes = tousLesMots.filter(m =>
      m.mot.toLowerCase().includes(q) || m.definition.toLowerCase().includes(q)
    ).slice(0, 5);
    if (motsThemes.length > 0) res.themes = motsThemes.map(m => ({ titre: m.mot, sous: m.definition.slice(0, 80) }));

    const motsSauves = (vocabulaire?.mots || []).filter(m =>
      m.mot.toLowerCase().includes(q) || (m.definition || '').toLowerCase().includes(q)
    ).slice(0, 3);
    if (motsSauves.length > 0) res.vocabulaire = motsSauves.map(m => ({ titre: m.mot, sous: (m.definition || '').slice(0, 80) }));

    try {
      const exps = (idiomes || []).filter(e =>
        (e.expression || e.idiome || '').toLowerCase().includes(q) ||
        (e.definition || e.sens || e.signification || '').toLowerCase().includes(q)
      ).slice(0, 3);
      if (exps.length > 0) res.expressions = exps.map(e => ({ titre: e.expression || e.idiome, sous: (e.definition || e.sens || e.signification || '').slice(0, 80) }));
    } catch { /* ignore */ }

    try {
      const gr = (lecons || []).filter(r =>
        (r.titre || '').toLowerCase().includes(q) ||
        (r.introduction || '').toLowerCase().includes(q)
      ).slice(0, 3);
      if (gr.length > 0) res.grammaire = gr.map(r => ({ titre: r.titre, sous: (r.introduction || '').slice(0, 80) }));
    } catch { /* ignore */ }

    const termsTheo = vocabulaireTheologique.filter(t =>
      t.terme.toLowerCase().includes(q) ||
      (t.translitteration || '').toLowerCase().includes(q) ||
      t.definition_fr.toLowerCase().includes(q)
    ).slice(0, 3);
    if (termsTheo.length > 0) res.theologie = termsTheo.map(t => ({ titre: `${t.terme} (${t.translitteration || t.langue})`, sous: t.definition_fr.slice(0, 80) }));

    const docts = doctrines.filter(d =>
      d.titre.toLowerCase().includes(q) || d.definition.toLowerCase().includes(q)
    ).slice(0, 2);
    if (docts.length > 0) {
      res.theologie = [...(res.theologie || []), ...docts.map(d => ({ titre: d.titre, sous: d.definition.slice(0, 80) }))];
    }

    const annsArr = [];
    annotations.forEach(ann => annsArr.push(ann));
    const bibl = annsArr.filter(ann =>
      ann.ref.toLowerCase().includes(q) ||
      (ann.fr_court || '').toLowerCase().includes(q) ||
      (ann.note_litteraire || '').toLowerCase().includes(q) ||
      (ann.mots_cles || []).some(m => m.fr.toLowerCase().includes(q))
    ).slice(0, 3);
    if (bibl.length > 0) res.bible = bibl.map(ann => ({ titre: ann.ref, sous: (ann.fr_court || ann.note_litteraire || '').slice(0, 80) }));

    setResultats(res);
    setRechercheFaite(true);

    const totalResultats = Object.values(res).reduce((s, arr) => s + arr.length, 0);
    if (totalResultats < 3) {
      const def = await wikt.fetchMot(terme.trim());
      if (def?.definitions?.length > 0) {
        setResultats(prev => ({
          ...prev,
          wiktionnaire: [{ titre: def.mot, sous: def.definitions[0]?.texte?.slice(0, 100) || '' }],
        }));
      }
    }
  }

  function naviguer(onglet) {
    naviguerVers(onglet);
    fermer();
  }

  const totalResultats = Object.values(resultats).reduce((s, arr) => s + arr.length, 0);

  return (
    <div className="recherche-modal-overlay" onClick={e => e.target === e.currentTarget && fermer()}>
      <div className="recherche-modal">
        <div style={{ padding: 'var(--sp-4)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
            <input
              ref={inputRef}
              type="text"
              value={terme}
              onChange={e => setTerme(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && chercher()}
              placeholder="Chercher dans toutes les sections..."
              className="input-standard"
              style={{ flex: 1, border: 'none', padding: 'var(--sp-2) 0' }}
            />
            <button onClick={fermer} className="btn-ghost" style={{ fontSize: 'var(--text-lg)' }}>×</button>
          </div>
          <button
            onClick={chercher}
            disabled={terme.length < 2}
            className="btn-primaire"
            style={{ marginTop: 'var(--sp-3)', width: 'auto', opacity: terme.length < 2 ? 0.5 : 1 }}
          >
            Rechercher
          </button>
        </div>

        <div style={{ overflowY: 'auto', padding: 'var(--sp-3) var(--sp-4)', flex: 1 }}>
          {rechercheFaite && totalResultats === 0 && !wikt.loading && (
            <div className="etat-vide" style={{ padding: 'var(--sp-8) 0' }}>
              <h3>Aucun résultat pour « {terme} »</h3>
            </div>
          )}

          {wikt.loading && (
            <div className="text-meta" style={{ textAlign: 'center', padding: 'var(--sp-2)' }}>
              Recherche dans le Wiktionnaire...
            </div>
          )}

          {Object.entries(resultats).map(([section, items]) => {
            const info = SECTIONS[section];
            if (!info || !items?.length) return null;
            return (
              <div key={section} style={{ marginBottom: 'var(--sp-4)' }}>
                <div className="section-label">{info.label}</div>
                {items.map((item, i) => (
                  <div
                    key={i}
                    style={{ padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--radius)', background: 'var(--surface-alt)', marginBottom: 'var(--sp-1)', cursor: 'pointer', transition: 'background var(--duration) var(--ease)' }}
                    onClick={() => naviguer(info.onglet)}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-alt)'}
                  >
                    <div className="heading-card" style={{ fontSize: 'var(--text-sm)', marginBottom: 2 }}>{item.titre}</div>
                    {item.sous && <div className="text-meta">{item.sous}{item.sous.length >= 80 ? '...' : ''}</div>}
                  </div>
                ))}
                <button onClick={() => naviguer(info.onglet)} className="btn-ghost" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--sp-1)' }}>
                  → Ouvrir {info.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
