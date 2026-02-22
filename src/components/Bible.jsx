import { useState } from 'react';
import { useBible } from '../hooks/useBible';
import { livresCanon, livresAnnotes, annotations } from '../data/bible_annotations';

const btnRetourStyle = {
  background: 'none', border: 'none', color: 'var(--or)', cursor: 'pointer',
  fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center',
  gap: '4px', fontFamily: 'Inter, sans-serif', fontWeight: 600, padding: 0,
};

function langueChip(color) {
  return {
    display: 'inline-block', background: `${color}22`, border: `1px solid ${color}66`,
    color, borderRadius: '12px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700,
  };
}

export default function Bible({ versets, gemini }) {
  const [vue, setVue] = useState('livres');
  const [livreChoisi, setLivreChoisi] = useState(null);
  const [chapitreChoisi, setChapitreChoisi] = useState(null);
  const [filtreTestament, setFiltreTestament] = useState('tous');
  const [saisieChapitre, setSaisieChapitre] = useState('1');
  const bible = useBible();

  const livresAnnotesIds = new Set(livresAnnotes.map(l => l.id));

  const livresTous = filtreTestament === 'tous'
    ? livresCanon
    : livresCanon.filter(l => l.testament === filtreTestament);

  function ouvrirLivre(livre) {
    setLivreChoisi(livre);
    setSaisieChapitre('1');
    setVue('livre');
  }

  async function ouvrirChapitre(num) {
    const ch = Number(num);
    if (!ch || ch < 1 || ch > livreChoisi.chapitres) return;
    setChapitreChoisi(ch);
    setVue('chapitre');
    await bible.fetchChapitre(livreChoisi.nom, ch);
  }

  if (vue === 'chapitre') {
    return (
      <VueChapitre
        livre={livreChoisi}
        chapitre={chapitreChoisi}
        bible={bible}
        versets={versets}
        gemini={gemini}
        retour={() => setVue('livre')}
      />
    );
  }

  if (vue === 'livre') {
    return (
      <VueLivre
        livre={livreChoisi}
        saisieChapitre={saisieChapitre}
        setSaisieChapitre={setSaisieChapitre}
        ouvrirChapitre={ouvrirChapitre}
        retour={() => { setVue('livres'); setLivreChoisi(null); }}
      />
    );
  }

  return (
    <div>
      <h2 className="section-titre">📜 La Bible en Français</h2>
      <p className="section-intro">
        Toute la Bible <strong style={{ color: 'var(--or)' }}>Louis Segond</strong> via API.
        Les livres marqués ✦ contiennent des annotations littéraires et étymologiques.
      </p>

      <div className="filtres" style={{ marginBottom: '16px' }}>
        {[['tous', 'Tous (66)'], ['AT', '📖 Ancien Testament'], ['NT', '✝️ Nouveau Testament']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreTestament === f ? 'actif' : ''}`} onClick={() => setFiltreTestament(f)}>{l}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
        {livresTous.map(livre => {
          const annote = livresAnnotesIds.has(livre.id);
          return (
            <div key={livre.id} className="carte" style={{ padding: '12px', cursor: 'pointer', position: 'relative' }} onClick={() => ouvrirLivre(livre)}>
              {annote && <span style={{ position: 'absolute', top: '6px', right: '8px', color: 'var(--or)', fontSize: '0.7rem', fontWeight: 700 }}>✦</span>}
              <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '0.9rem', marginBottom: '3px' }}>{livre.nom}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--texte-clair)' }}>{livre.chapitres} ch. · {livre.testament}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VueLivre({ livre, saisieChapitre, setSaisieChapitre, ouvrirChapitre, retour }) {
  const annsArr = [];
  annotations.forEach(ann => { if (ann.livre === livre.nom || ann.abrev === livre.abrev) annsArr.push(ann); });

  return (
    <div>
      <button onClick={retour} style={btnRetourStyle}>← Retour aux livres</button>
      <h2 className="section-titre" style={{ marginBottom: '4px' }}>{livre.nom}</h2>
      <div style={{ fontSize: '0.82rem', color: 'var(--texte-clair)', marginBottom: '20px' }}>
        {livre.chapitres} chapitre{livre.chapitres > 1 ? 's' : ''} · {livre.testament}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="number" min="1" max={livre.chapitres}
          value={saisieChapitre} onChange={e => setSaisieChapitre(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ouvrirChapitre(saisieChapitre)}
          placeholder="Chapitre"
          style={{ width: '110px', padding: '10px 12px', borderRadius: 'var(--radius)', border: '2px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.97)', color: 'var(--texte)', fontSize: '1rem', outline: 'none', fontFamily: 'Inter, sans-serif' }}
        />
        <button onClick={() => ouvrirChapitre(saisieChapitre)} className="btn-primaire" style={{ width: 'auto', padding: '10px 20px' }}>Lire</button>
      </div>

      {annsArr.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--or)', marginBottom: '10px', fontSize: '0.9rem' }}>✦ Passages annotés</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {annsArr.map(ann => (
              <div key={ann.id} className="carte" style={{ padding: '12px 16px', cursor: 'pointer', borderLeft: '3px solid var(--or)' }} onClick={() => ouvrirChapitre(ann.chapitre)}>
                <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '4px' }}>{ann.ref}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--texte-clair)', fontStyle: 'italic' }}>{ann.fr_court}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--or)', marginTop: '4px' }}>Thème : {ann.theme}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--blanc)', marginBottom: '10px', fontSize: '0.9rem' }}>Accès rapide</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {Array.from({ length: livre.chapitres }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => ouvrirChapitre(n)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--texte)', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer' }}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VueChapitre({ livre, chapitre, bible, versets, gemini, retour }) {
  const [languesVisibles, setLanguesVisibles] = useState(false);
  const [versetExplique, setVersetExplique] = useState(null);
  const [explicationIA, setExplicationIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  const annsChap = [];
  annotations.forEach(ann => {
    if ((ann.livre === livre.nom || ann.abrev === livre.abrev) && ann.chapitre === chapitre) {
      annsChap.push(ann);
    }
  });

  const annParVerset = {};
  for (const ann of annsChap) {
    const match = ann.ref.match(/:(\d+)/);
    if (match) annParVerset[Number(match[1])] = ann;
  }

  const annPrincipale = annsChap[0] || null;

  async function expliquerParIA(num, texte) {
    if (!gemini.hasKey) {
      setVersetExplique(num);
      setExplicationIA('⚙️ Configure ta clé Gemini dans l\'onglet Tuteur pour obtenir des explications IA.');
      return;
    }
    setVersetExplique(num);
    setExplicationIA('');
    setLoadingIA(true);
    const ann = annParVerset[num];
    const contextMots = ann?.mots_cles?.map(m => `${m.fr} (${m.original})`).join(', ') || '';
    const prompt = `Tu es un tuteur de français et de théologie bienveillant. Explique ce verset biblique en français simple et élégant pour un apprenant de niveau A2-B1. Explique le sens, les mots importants, et la beauté littéraire du français.${contextMots ? ` Mots clés : ${contextMots}.` : ''}\n\nVerset : ${livre.nom} ${chapitre}:${num} — "${texte}"`;
    const rep = await gemini.generateResponse(null, [{ role: 'user', text: prompt }]);
    setExplicationIA(rep || 'Impossible d\'obtenir une explication.');
    setLoadingIA(false);
  }

  function sauvegarder(num, texte) {
    versets.ajouterVerset({
      id: `${livre.abrev || livre.nom}-${chapitre}-${num}`,
      ref: `${livre.nom} ${chapitre}:${num}`,
      livre: livre.nom, chapitre, numero: num, texte,
    });
  }

  return (
    <div>
      <button onClick={retour} style={btnRetourStyle}>← {livre.nom}</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 className="section-titre" style={{ marginBottom: '2px' }}>{livre.nom} {chapitre}</h2>
          {annsChap.length > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--or)', fontWeight: 600 }}>✦ Chapitre annoté</span>}
        </div>
        {annsChap.length > 0 && (
          <button
            onClick={() => setLanguesVisibles(!languesVisibles)}
            style={{ background: languesVisibles ? 'var(--or)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.4)', color: languesVisibles ? 'var(--bleu-nuit)' : 'var(--or)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
          >
            🌐 Langues originales
          </button>
        )}
      </div>

      {annPrincipale && languesVisibles && (
        <div className="carte" style={{ marginBottom: '16px', borderLeft: '3px solid var(--or)' }}>
          {annPrincipale.gr && (
            <div style={{ marginBottom: '10px' }}>
              <span style={langueChip('#4CAF50')}>Grec</span>
              <div style={{ fontFamily: 'serif', fontSize: '1rem', color: 'var(--texte)', marginTop: '6px', lineHeight: 1.7 }}>{annPrincipale.gr}</div>
            </div>
          )}
          {annPrincipale.heb && (
            <div style={{ marginBottom: '10px' }}>
              <span style={langueChip('#2196F3')}>Hébreu</span>
              <div dir="rtl" lang="he" style={{ fontFamily: 'serif', fontSize: '1.1rem', color: 'var(--texte)', marginTop: '6px', lineHeight: 1.8, textAlign: 'right' }}>{annPrincipale.heb}</div>
            </div>
          )}
          {annPrincipale.lat && (
            <div style={{ marginBottom: '8px' }}>
              <span style={langueChip('#9C27B0')}>Latin</span>
              <div style={{ fontFamily: 'serif', fontSize: '0.95rem', color: 'var(--texte)', marginTop: '6px', lineHeight: 1.6, fontStyle: 'italic' }}>{annPrincipale.lat}</div>
            </div>
          )}
          {annPrincipale.mots_cles?.length > 0 && (
            <div style={{ marginTop: '12px', borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '10px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Mots clés</div>
              {annPrincipale.mots_cles.map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 10px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)' }}>{m.fr}</span>{' '}
                  <span style={{ fontSize: '0.82rem', color: 'var(--or)' }}>{m.original}</span>
                  {m.lat && <span style={{ fontSize: '0.78rem', color: 'var(--gris)' }}> · {m.lat}</span>}
                  <div style={{ fontSize: '0.82rem', color: 'var(--texte-clair)', marginTop: '3px' }}>{m.sens}</div>
                </div>
              ))}
            </div>
          )}
          {annPrincipale.note_litteraire && (
            <div style={{ marginTop: '12px', background: 'var(--or-pale)', borderRadius: '8px', padding: '10px 12px', fontSize: '0.85rem', color: 'var(--bleu-nuit)', borderLeft: '3px solid var(--or)' }}>
              📖 {annPrincipale.note_litteraire}
            </div>
          )}
        </div>
      )}

      {bible.loading && <div className="etat-vide"><div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📖</div><p>Chargement...</p></div>}
      {bible.erreur && <div className="message-erreur">{bible.erreur}</div>}

      {bible.donnees?.versets && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {bible.donnees.versets.map(v => {
            const annV = annParVerset[v.numero];
            const estSauvegarde = versets.versets.find(sv => sv.id === `${livre.abrev || livre.nom}-${chapitre}-${v.numero}`);
            return (
              <div key={v.numero} style={{ padding: '10px 14px', borderRadius: '8px', background: annV ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)', borderLeft: annV ? '3px solid var(--or)' : '3px solid transparent' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--or)', fontWeight: 700, minWidth: '20px', marginTop: '4px' }}>{v.numero}</span>
                  <div style={{ flex: 1, fontFamily: 'Lora, serif', fontSize: '0.95rem', color: 'var(--texte)', lineHeight: 1.7 }}>
                    {v.texte}{annV && <span style={{ color: 'var(--or)', fontSize: '0.7rem', marginLeft: '6px' }}>✦</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => versetExplique === v.numero ? setVersetExplique(null) : expliquerParIA(v.numero, v.texte)} title="Expliquer avec IA" style={{ background: 'none', border: 'none', color: versetExplique === v.numero ? 'var(--or)' : 'var(--gris)', cursor: 'pointer', fontSize: '0.9rem', padding: '2px 4px' }}>🤖</button>
                    <button onClick={() => sauvegarder(v.numero, v.texte)} title={estSauvegarde ? 'Sauvegardé' : 'Sauvegarder'} style={{ background: 'none', border: 'none', color: estSauvegarde ? 'var(--or)' : 'var(--gris)', cursor: 'pointer', fontSize: '0.85rem', padding: '2px 4px' }}>{estSauvegarde ? '★' : '☆'}</button>
                  </div>
                </div>
                {versetExplique === v.numero && (
                  <div style={{ marginTop: '10px', marginLeft: '30px', background: 'rgba(10,22,40,0.6)', borderRadius: '8px', padding: '12px', fontSize: '0.85rem', color: 'var(--texte)', lineHeight: 1.6 }}>
                    {loadingIA
                      ? <span style={{ color: 'var(--gris)' }}>🤖 Gemini réfléchit...</span>
                      : <>
                          <div style={{ fontSize: '0.7rem', color: 'var(--or)', fontWeight: 700, marginBottom: '6px' }}>🤖 EXPLICATION IA</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>{explicationIA}</div>
                        </>
                    }
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
