import { useState } from 'react';
import { conjuguerVerbe, listeIrreguliers, verbesReguliersCourants } from '../data/conjugaison';
import { temps } from '../data/verbes';

const PRONOMS_AFFICH = ["je/j'","tu","il/elle/on","nous","vous","ils/elles"];
const TOUS_TEMPS = ["présent","passéComposé","imparfait","futurSimple","conditionnel","subjonctif"];
const TEMPS_LABELS = {
  présent: "Présent",
  passéComposé: "Passé Composé",
  imparfait: "Imparfait",
  futurSimple: "Futur Simple",
  conditionnel: "Conditionnel",
  subjonctif: "Subjonctif",
};

export default function Verbes() {
  const [vue, setVue] = useState('conjugueur'); // 'conjugueur' | 'liste' | 'temps'
  const [saisie, setSaisie] = useState('');
  const [resultatConj, setResultatConj] = useState(null);
  const [tempsChoisi, setTempsChoisi] = useState('présent');
  const [erreur, setErreur] = useState(null);
  const [filtreGroupe, setFiltreGroupe] = useState('tous');

  function conjuguer() {
    const verbe = saisie.trim().toLowerCase();
    if (!verbe) return;
    const res = conjuguerVerbe(verbe);
    if (res) {
      setResultatConj({ ...res, infinitif: verbe });
      setErreur(null);
    } else {
      setErreur(`"${verbe}" n'est pas reconnu. Essaie avec un verbe se terminant en -er, -ir ou -re.`);
      setResultatConj(null);
    }
  }

  function choisirVerbe(infinitif) {
    setSaisie(infinitif);
    const res = conjuguerVerbe(infinitif);
    if (res) {
      setResultatConj({ ...res, infinitif });
      setErreur(null);
    }
    setVue('conjugueur');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const tousLesVerbes = [
    ...listeIrreguliers.map(v => ({ ...v, categorie: 'irrégulier' })),
    ...verbesReguliersCourants.map(v => ({ ...v, categorie: 'régulier' })),
  ];

  const verbesFiltres = filtreGroupe === 'tous' ? tousLesVerbes
    : filtreGroupe === 'irregulier' ? listeIrreguliers
    : verbesReguliersCourants.filter(v => v.groupe.includes(filtreGroupe));

  return (
    <div>
      <h2 className="section-titre">🔀 Verbes & Conjugaisons</h2>
      <p className="section-intro">
        Conjugue n'importe quel verbe français — régulier ou irrégulier.
        Le moteur couvre les verbes en <strong style={{color:'var(--or)'}}>-er, -ir, -re</strong> (réguliers) +
        les <strong style={{color:'var(--or)'}}>{listeIrreguliers.length} verbes irréguliers</strong> les plus importants.
      </p>

      <div className="filtres" style={{ marginBottom: '20px' }}>
        {[['conjugueur','🔀 Conjugueur'],['liste','📋 Liste'],['temps','📖 Les Temps']].map(([v,l]) => (
          <button key={v} className={`filtre-btn ${vue === v ? 'actif' : ''}`} onClick={() => setVue(v)}>{l}</button>
        ))}
      </div>

      {/* ===== CONJUGUEUR ===== */}
      {vue === 'conjugueur' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              value={saisie}
              onChange={e => setSaisie(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && conjuguer()}
              placeholder="Entrez un verbe (parler, finir, prendre, être...)"
              style={{ flex: 1, padding: '14px 16px', borderRadius: 'var(--radius)', border: '2px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.97)', color: 'var(--texte)', fontSize: '1rem', outline: 'none', fontFamily: 'Lora, serif' }}
            />
            <button onClick={conjuguer} className="btn-primaire" style={{ width: 'auto', padding: '14px 20px' }}>
              Conjuguer
            </button>
          </div>

          {erreur && <div className="message-erreur">{erreur}</div>}

          {resultatConj && (
            <div>
              <div className="carte" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--bleu-nuit)' }}>
                    {resultatConj.infinitif}
                  </div>
                  <span style={{ background: 'var(--or-pale)', border: '1px solid var(--or)', borderRadius: '20px', padding: '3px 12px', fontSize: '0.78rem', color: 'var(--bleu-nuit)', fontWeight: 600 }}>
                    {resultatConj.groupe}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gris)', fontStyle: 'italic' }}>
                    Participe passé : <strong>{resultatConj.participe}</strong> (aux. {resultatConj.auxiliaire})
                  </span>
                </div>
                {resultatConj.sens && (
                  <div style={{ color: 'var(--texte-clair)', fontSize: '0.88rem', marginTop: '6px' }}>{resultatConj.sens}</div>
                )}
              </div>

              {/* Sélection du temps */}
              <div className="filtres" style={{ marginBottom: '16px' }}>
                {TOUS_TEMPS.map(t => (
                  <button key={t} className={`filtre-btn ${tempsChoisi === t ? 'actif' : ''}`} onClick={() => setTempsChoisi(t)}>
                    {TEMPS_LABELS[t]}
                  </button>
                ))}
              </div>

              {/* Table de conjugaison */}
              {resultatConj[tempsChoisi] && (
                <div className="carte" style={{ padding: '0', overflow: 'hidden' }}>
                  <table className="conjugaison-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40%' }}>Pronom</th>
                        <th>{TEMPS_LABELS[tempsChoisi]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultatConj[tempsChoisi].map((ligne, i) => (
                        <tr key={i}>
                          <td style={{ color: 'var(--gris)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                            {ligne.pronom}
                          </td>
                          <td style={{ fontFamily: 'Lora, serif', fontWeight: 600, fontSize: '1rem' }}>
                            {ligne.pronom === "je/j'" || ligne.pronom === "je" ? (
                              /^[aeiouéèêëàâùûîïôœh]/i.test(ligne.forme) ? `j'${ligne.forme}` : `je ${ligne.forme}`
                            ) : (
                              `${ligne.pronom.split('/')[0]} ${ligne.forme}`
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tous les temps en aperçu */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--blanc)', marginBottom: '12px' }}>
                  Tous les temps d'un coup d'œil :
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {TOUS_TEMPS.filter(t => t !== tempsChoisi && resultatConj[t]).map(t => (
                    <div
                      key={t}
                      className="carte"
                      style={{ padding: '12px', cursor: 'pointer' }}
                      onClick={() => setTempsChoisi(t)}
                    >
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                        {TEMPS_LABELS[t]}
                      </div>
                      {resultatConj[t]?.slice(0, 3).map((l, i) => (
                        <div key={i} style={{ fontSize: '0.82rem', color: 'var(--texte)' }}>
                          <span style={{ color: 'var(--gris)' }}>{l.pronom.split('/')[0]} </span>
                          {l.forme}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!resultatConj && !erreur && (
            <div className="etat-vide">
              <div className="etat-vide-icone">🔀</div>
              <h3>Conjugue n'importe quel verbe</h3>
              <p>Exemples : parler, finir, prendre, être, aller, vouloir, manger...</p>
            </div>
          )}
        </div>
      )}

      {/* ===== LISTE DES VERBES ===== */}
      {vue === 'liste' && (
        <div>
          <div className="filtres">
            {[['tous','Tous'],['irregulier','Irréguliers'],['1er','1er groupe (-er)'],['2e','2e groupe (-ir)'],['3e','3e groupe (-re)']].map(([f,l]) => (
              <button key={f} className={`filtre-btn ${filtreGroupe === f ? 'actif' : ''}`} onClick={() => setFiltreGroupe(f)}>{l}</button>
            ))}
          </div>
          <div style={{ marginBottom: '10px', color: 'rgba(248,246,240,0.5)', fontSize: '0.8rem' }}>
            {verbesFiltres.length} verbe{verbesFiltres.length !== 1 ? 's' : ''} — Clique pour conjuguer
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '8px' }}>
            {verbesFiltres.map((v, i) => (
              <div
                key={i}
                className="carte"
                style={{ padding: '12px', cursor: 'pointer', transition: 'var(--transition)' }}
                onClick={() => choisirVerbe(v.infinitif)}
              >
                <div style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--bleu-nuit)', marginBottom: '3px' }}>
                  {v.infinitif}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--texte-clair)', marginBottom: '6px', lineHeight: 1.3 }}>
                  {v.sens}
                </div>
                <span style={{ fontSize: '0.65rem', background: 'var(--gris-clair)', borderRadius: '20px', padding: '2px 8px', color: 'var(--texte-clair)' }}>
                  {v.groupe}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== LES TEMPS ===== */}
      {vue === 'temps' && (
        <div>
          {temps.map((t, i) => (
            <div key={i} className="carte" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: 'Lora, serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--bleu-nuit)' }}>{t.nom}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--texte-clair)', marginTop: '2px' }}>{t.usage}</div>
                </div>
                <span className={`chip-niveau chip-${t.niveau}`}>{t.niveau}</span>
              </div>

              {t.formation && (
                <div style={{ background: 'var(--or-pale)', borderRadius: '8px', padding: '8px 12px', marginBottom: '10px', fontSize: '0.82rem', color: 'var(--bleu-nuit)', fontStyle: 'italic' }}>
                  📐 Formation : {t.formation}
                </div>
              )}

              {t.exemples.map((ex, j) => (
                <div key={j} style={{ fontSize: '0.88rem', color: 'var(--bleu-moyen)', fontStyle: 'italic', marginBottom: '4px' }}>
                  • {ex}
                </div>
              ))}

              {t.astuce && (
                <div style={{ marginTop: '10px', background: 'var(--vert-clair)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', color: 'var(--vert-succes)' }}>
                  💡 {t.astuce}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
