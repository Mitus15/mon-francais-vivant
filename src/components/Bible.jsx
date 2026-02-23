import { useState } from 'react';
import { useBible } from '../hooks/useBible';
import { livresCanon, livresAnnotes, annotations } from '../data/bible_annotations';
import TexteInteractif from './TexteInteractif';

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
    return <VueChapitre livre={livreChoisi} chapitre={chapitreChoisi} bible={bible} versets={versets} gemini={gemini} retour={() => setVue('livre')} />;
  }

  if (vue === 'livre') {
    return <VueLivre livre={livreChoisi} saisieChapitre={saisieChapitre} setSaisieChapitre={setSaisieChapitre} ouvrirChapitre={ouvrirChapitre} retour={() => { setVue('livres'); setLivreChoisi(null); }} />;
  }

  return (
    <div>
      <h2 className="section-titre">La Bible en Français</h2>
      <p className="section-intro">
        Toute la Bible <strong className="text-accent">Louis Segond 1910</strong> avec
        textes originaux en <strong className="text-accent">grec, hébreu et latin</strong>.
        Les livres marqués ✦ contiennent des annotations littéraires.
      </p>

      <div className="filtres" style={{ marginBottom: 'var(--sp-4)' }}>
        {[['tous', 'Tous (66)'], ['AT', 'Ancien Testament'], ['NT', 'Nouveau Testament']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreTestament === f ? 'actif' : ''}`} onClick={() => setFiltreTestament(f)}>{l}</button>
        ))}
      </div>

      <div className="grid-cards-sm">
        {livresTous.map(livre => {
          const annote = livresAnnotesIds.has(livre.id);
          return (
            <div key={livre.id} className="carte carte-clickable" style={{ padding: 'var(--sp-3)', position: 'relative' }} onClick={() => ouvrirLivre(livre)}>
              {annote && <span style={{ position: 'absolute', top: 6, right: 8, color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>✦</span>}
              <div className="heading-card" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-1)' }}>{livre.nom}</div>
              <div className="text-meta">{livre.chapitres} ch. · {livre.testament}</div>
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
      <button onClick={retour} className="btn-retour">← Retour aux livres</button>
      <h2 className="section-titre" style={{ marginBottom: 'var(--sp-1)' }}>{livre.nom}</h2>
      <div className="text-secondary" style={{ marginBottom: 'var(--sp-5)' }}>
        {livre.chapitres} chapitre{livre.chapitres > 1 ? 's' : ''} · {livre.testament}
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp-2)', marginBottom: 'var(--sp-5)', flexWrap: 'wrap' }}>
        <input
          type="number" min="1" max={livre.chapitres}
          value={saisieChapitre} onChange={e => setSaisieChapitre(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ouvrirChapitre(saisieChapitre)}
          placeholder="Chapitre"
          className="input-standard"
          style={{ width: 110 }}
        />
        <button onClick={() => ouvrirChapitre(saisieChapitre)} className="btn-primaire" style={{ width: 'auto' }}>Lire</button>
      </div>

      {annsArr.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-5)' }}>
          <div className="section-label" style={{ color: 'var(--accent)' }}>✦ Passages annotés</div>
          <div className="stack-sm">
            {annsArr.map(ann => (
              <div key={ann.id} className="carte-accent carte-clickable" onClick={() => ouvrirChapitre(ann.chapitre)}>
                <div className="heading-card" style={{ marginBottom: 'var(--sp-1)' }}>{ann.ref}</div>
                <div className="text-secondary" style={{ fontStyle: 'italic' }}>{ann.fr_court}</div>
                <div className="text-meta" style={{ color: 'var(--accent-dark)', marginTop: 'var(--sp-1)' }}>Thème : {ann.theme}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Accès rapide</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
          {Array.from({ length: livre.chapitres }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => ouvrirChapitre(n)} className="btn-ghost" style={{ minWidth: 36, textAlign: 'center' }}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VueChapitre({ livre, chapitre, bible, versets, gemini, retour }) {
  const [languesVisibles, setLanguesVisibles] = useState(false);
  const [langueActive, setLangueActive] = useState(null); // 'gr', 'heb', 'lat' or null (all)
  const [versetExplique, setVersetExplique] = useState(null);
  const [explicationIA, setExplicationIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  const estAT = livre.testament === 'AT';

  // Annotations for this chapter
  const annsChap = [];
  annotations.forEach(ann => {
    if ((ann.livre === livre.nom || ann.abrev === livre.abrev) && ann.chapitre === chapitre) annsChap.push(ann);
  });
  const annParVerset = {};
  for (const ann of annsChap) {
    const match = ann.ref.match(/:(\d+)/);
    if (match) annParVerset[Number(match[1])] = ann;
  }
  const annPrincipale = annsChap[0] || null;

  async function toggleLangues() {
    if (languesVisibles) {
      setLanguesVisibles(false);
      return;
    }
    setLanguesVisibles(true);
    if (!bible.languesOriginales) {
      await bible.fetchLangues(livre.nom, chapitre);
    }
  }

  async function expliquerParIA(num, texte) {
    if (!gemini.hasKey) {
      setVersetExplique(num);
      setExplicationIA('Configure ta clé Gemini dans l\'onglet Tuteur pour obtenir des explications IA.');
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

  // Get original language verse text for a given verse number
  function getOriginal(lang, numero) {
    const langData = bible.languesOriginales?.[lang];
    if (!langData) return null;
    const v = langData.find(v => v.numero === numero);
    return v?.texte || null;
  }

  const languesDispos = [];
  if (languesVisibles && bible.languesOriginales) {
    if (bible.languesOriginales.heb) languesDispos.push({ code: 'heb', label: 'Hébreu', chipClass: 'hebreu' });
    if (bible.languesOriginales.gr) languesDispos.push({ code: 'gr', label: 'Grec', chipClass: 'grec' });
    if (bible.languesOriginales.lat) languesDispos.push({ code: 'lat', label: 'Latin', chipClass: 'latin' });
  }

  return (
    <div>
      <button onClick={retour} className="btn-retour">← {livre.nom}</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-4)', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
        <div>
          <h2 className="section-titre" style={{ marginBottom: 2 }}>{livre.nom} {chapitre}</h2>
          {annsChap.length > 0 && <span className="text-meta" style={{ color: 'var(--accent-dark)', fontWeight: 600 }}>✦ Chapitre annoté</span>}
        </div>
        <button onClick={toggleLangues} className={languesVisibles ? 'btn-ajouter' : 'btn-secondaire'} style={{ fontSize: 'var(--text-xs)' }}>
          {bible.loadingLangues ? 'Chargement...' : 'Langues originales'}
        </button>
      </div>

      {/* Language filter chips */}
      {languesVisibles && languesDispos.length > 0 && (
        <div className="filtres" style={{ marginBottom: 'var(--sp-3)' }}>
          <button className={`filtre-btn ${langueActive === null ? 'actif' : ''}`} onClick={() => setLangueActive(null)}>Toutes</button>
          {languesDispos.map(l => (
            <button key={l.code} className={`filtre-btn ${langueActive === l.code ? 'actif' : ''}`} onClick={() => setLangueActive(l.code)}>{l.label}</button>
          ))}
        </div>
      )}

      {/* Annotation panel (editorial notes, keywords) */}
      {annPrincipale && languesVisibles && (
        <div className="carte-accent" style={{ marginBottom: 'var(--sp-4)' }}>
          {annPrincipale.mots_cles?.length > 0 && (
            <div style={{ marginBottom: 'var(--sp-3)' }}>
              <div className="section-label">Mots clés</div>
              {annPrincipale.mots_cles.map((m, i) => (
                <div key={i} style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 'var(--sp-2) var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                  <span className="heading-card" style={{ fontSize: 'var(--text-sm)' }}>{m.fr}</span>{' '}
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)' }}>{m.original}</span>
                  {m.lat && <span className="text-meta"> · {m.lat}</span>}
                  <div className="text-secondary" style={{ marginTop: 'var(--sp-1)' }}>{m.sens}</div>
                </div>
              ))}
            </div>
          )}
          {annPrincipale.note_litteraire && (
            <div className="tip-box" style={{ marginTop: 'var(--sp-3)' }}>
              <TexteInteractif texte={annPrincipale.note_litteraire} />
            </div>
          )}
        </div>
      )}

      {bible.loading && <div className="etat-vide"><p>Chargement...</p></div>}
      {bible.erreur && <div className="message-erreur">{bible.erreur}</div>}

      {bible.donnees?.versets && (
        <div className="stack-sm">
          {bible.donnees.versets.map(v => {
            const annV = annParVerset[v.numero];
            const estSauvegarde = versets.versets.find(sv => sv.id === `${livre.abrev || livre.nom}-${chapitre}-${v.numero}`);

            // Gather originals for this verse
            const showLangs = languesVisibles && bible.languesOriginales;
            const langsToShow = showLangs ? languesDispos.filter(l => langueActive === null || langueActive === l.code) : [];

            return (
              <div key={v.numero} style={{ padding: 'var(--sp-3) var(--sp-4)', borderRadius: 'var(--radius)', background: annV ? 'var(--accent-light)' : 'transparent', borderLeft: annV ? '3px solid var(--accent)' : '3px solid transparent' }}>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-dark)', fontWeight: 700, minWidth: 20, marginTop: 'var(--sp-1)' }}>{v.numero}</span>
                  <div style={{ flex: 1, fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 1.7 }}>
                    <TexteInteractif texte={v.texte} />{annV && <span style={{ color: 'var(--accent)', fontSize: 'var(--text-xs)', marginLeft: 'var(--sp-2)' }}>✦</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--sp-2)', flexShrink: 0 }}>
                    <button onClick={() => versetExplique === v.numero ? setVersetExplique(null) : expliquerParIA(v.numero, v.texte)} title="Expliquer avec IA" className="btn-ghost" style={{ fontSize: 'var(--text-sm)', color: versetExplique === v.numero ? 'var(--accent)' : 'var(--text-tertiary)' }}>IA</button>
                    <button onClick={() => sauvegarder(v.numero, v.texte)} title={estSauvegarde ? 'Sauvegardé' : 'Sauvegarder'} className="btn-ghost" style={{ color: estSauvegarde ? 'var(--accent)' : 'var(--text-tertiary)' }}>{estSauvegarde ? '★' : '☆'}</button>
                  </div>
                </div>

                {/* Interlinear original languages */}
                {langsToShow.length > 0 && (
                  <div style={{ marginTop: 'var(--sp-2)', marginLeft: 28, display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                    {langsToShow.map(lang => {
                      const texteOriginal = getOriginal(lang.code, v.numero);
                      if (!texteOriginal) return null;
                      return (
                        <div key={lang.code} style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'baseline' }}>
                          <span className={`langue-chip ${lang.chipClass}`} style={{ fontSize: '0.6rem', padding: '1px 6px' }}>{lang.label.slice(0, 2)}</span>
                          <div style={{
                            fontFamily: 'serif',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            fontStyle: lang.code === 'lat' ? 'italic' : 'normal',
                            direction: lang.code === 'heb' ? 'rtl' : 'ltr',
                            textAlign: lang.code === 'heb' ? 'right' : 'left',
                            flex: 1,
                          }}>
                            {texteOriginal}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* AI explanation */}
                {versetExplique === v.numero && (
                  <div style={{ marginTop: 'var(--sp-3)', marginLeft: 28, background: 'var(--surface-alt)', borderRadius: 'var(--radius)', padding: 'var(--sp-3)', fontSize: 'var(--text-sm)', color: 'var(--text)', lineHeight: 1.6 }}>
                    {loadingIA
                      ? <span className="text-meta">Gemini réfléchit...</span>
                      : <>
                          <div className="section-label">Explication IA</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}><TexteInteractif texte={explicationIA} /></div>
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
