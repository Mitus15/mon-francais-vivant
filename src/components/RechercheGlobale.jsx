import { useState, useEffect, useRef } from 'react';
import { tousLesMots } from '../data/vocabulaire_themes';
import { idiomes } from '../data/idiomes';
import { lecons } from '../data/grammaire';
import { vocabulaireTheologique, doctrines } from '../data/theologie';
import { annotations } from '../data/bible_annotations';
import { useWiktionnaire } from '../hooks/useWiktionnaire';

const SECTIONS = {
  vocabulaire: { label: 'Vocabulaire', icone: '⭐', onglet: 'vocabulaire' },
  themes: { label: 'Thèmes', icone: '📖', onglet: 'themes' },
  expressions: { label: 'Expressions', icone: '💬', onglet: 'expressions' },
  grammaire: { label: 'Grammaire', icone: '📚', onglet: 'grammaire' },
  theologie: { label: 'Théologie', icone: '✝️', onglet: 'theologie' },
  bible: { label: 'Bible', icone: '📜', onglet: 'bible' },
  wiktionnaire: { label: 'Wiktionnaire', icone: '🌐', onglet: 'dictionnaire' },
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

    // Vocabulaire thématique
    const motsThemes = tousLesMots.filter(m =>
      m.mot.toLowerCase().includes(q) || m.definition.toLowerCase().includes(q)
    ).slice(0, 5);
    if (motsThemes.length > 0) res.themes = motsThemes.map(m => ({ titre: m.mot, sous: m.definition.slice(0, 80) }));

    // Mon vocabulaire sauvegardé
    const motsSauves = (vocabulaire?.mots || []).filter(m =>
      m.mot.toLowerCase().includes(q) || (m.definition || '').toLowerCase().includes(q)
    ).slice(0, 3);
    if (motsSauves.length > 0) res.vocabulaire = motsSauves.map(m => ({ titre: m.mot, sous: (m.definition || '').slice(0, 80) }));

    // Expressions / idiomes
    try {
      const exps = (idiomes || []).filter(e =>
        (e.expression || e.idiome || '').toLowerCase().includes(q) ||
        (e.definition || e.sens || e.signification || '').toLowerCase().includes(q)
      ).slice(0, 3);
      if (exps.length > 0) res.expressions = exps.map(e => ({ titre: e.expression || e.idiome, sous: (e.definition || e.sens || e.signification || '').slice(0, 80) }));
    } catch { /* ignore */ }

    // Grammaire
    try {
      const gr = (lecons || []).filter(r =>
        (r.titre || '').toLowerCase().includes(q) ||
        (r.introduction || '').toLowerCase().includes(q)
      ).slice(0, 3);
      if (gr.length > 0) res.grammaire = gr.map(r => ({ titre: r.titre, sous: (r.introduction || '').slice(0, 80) }));
    } catch { /* ignore */ }

    // Théologie
    const termsTheo = vocabulaireTheologique.filter(t =>
      t.terme.toLowerCase().includes(q) ||
      (t.translitteration || '').toLowerCase().includes(q) ||
      t.definition_fr.toLowerCase().includes(q)
    ).slice(0, 3);
    if (termsTheo.length > 0) res.theologie = termsTheo.map(t => ({ titre: `${t.terme} (${t.translitteration || t.langue})`, sous: t.definition_fr.slice(0, 80) }));

    // Doctrines
    const docts = doctrines.filter(d =>
      d.titre.toLowerCase().includes(q) || d.definition.toLowerCase().includes(q)
    ).slice(0, 2);
    if (docts.length > 0) {
      res.theologie = [...(res.theologie || []), ...docts.map(d => ({ titre: `${d.emoji} ${d.titre}`, sous: d.definition.slice(0, 80) }))];
    }

    // Bible annotations
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

    // Si peu de résultats → appel Wiktionnaire
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
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,0.92)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 16px 20px' }}
      onClick={e => e.target === e.currentTarget && fermer()}
    >
      <div style={{ background: 'var(--bleu-prof)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        {/* Input */}
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={terme}
              onChange={e => setTerme(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && chercher()}
              placeholder="Chercher dans toutes les sections..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--blanc)', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}
            />
            <button onClick={fermer} style={{ background: 'none', border: 'none', color: 'var(--gris)', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}>✕</button>
          </div>
          <button
            onClick={chercher}
            disabled={terme.length < 2}
            style={{ marginTop: '10px', background: 'var(--or)', border: 'none', color: 'var(--bleu-nuit)', borderRadius: '20px', padding: '7px 18px', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 700, opacity: terme.length < 2 ? 0.5 : 1 }}
          >
            Rechercher
          </button>
        </div>

        {/* Résultats */}
        <div style={{ overflowY: 'auto', padding: '12px 16px', flex: 1 }}>
          {rechercheFaite && totalResultats === 0 && !wikt.loading && (
            <div style={{ textAlign: 'center', color: 'var(--gris)', padding: '30px 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
              <div>Aucun résultat pour « {terme} »</div>
            </div>
          )}

          {wikt.loading && (
            <div style={{ textAlign: 'center', color: 'var(--gris)', fontSize: '0.85rem', padding: '8px' }}>
              Recherche dans le Wiktionnaire...
            </div>
          )}

          {Object.entries(resultats).map(([section, items]) => {
            const info = SECTIONS[section];
            if (!info || !items?.length) return null;
            return (
              <div key={section} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {info.icone} {info.label}
                </div>
                {items.map((item, i) => (
                  <div
                    key={i}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', marginBottom: '4px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onClick={() => naviguer(info.onglet)}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '0.9rem', marginBottom: '2px' }}>
                      {item.titre}
                    </div>
                    {item.sous && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--texte-clair)' }}>
                        {item.sous}{item.sous.length >= 80 ? '...' : ''}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => naviguer(info.onglet)}
                  style={{ background: 'none', border: 'none', color: 'var(--bleu-clair)', fontSize: '0.75rem', cursor: 'pointer', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}
                >
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
