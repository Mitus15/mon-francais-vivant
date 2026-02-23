import { useState } from 'react';
import { conjuguerVerbe, listeIrreguliers, verbesReguliersCourants } from '../data/conjugaison';
import { temps } from '../data/verbes';
import TexteInteractif from './TexteInteractif';

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
  const [vue, setVue] = useState('conjugueur');
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
      <h2 className="section-titre">Verbes & Conjugaisons</h2>
      <p className="section-intro">
        Conjugue n'importe quel verbe français — régulier ou irrégulier.
        Le moteur couvre les verbes en <strong className="text-accent">-er, -ir, -re</strong> (réguliers) +
        les <strong className="text-accent">{listeIrreguliers.length} verbes irréguliers</strong> les plus importants.
      </p>

      <div className="filtres" style={{ marginBottom: 'var(--sp-5)' }}>
        {[['conjugueur','Conjugueur'],['liste','Liste'],['temps','Les Temps']].map(([v,l]) => (
          <button key={v} className={`filtre-btn ${vue === v ? 'actif' : ''}`} onClick={() => setVue(v)}>{l}</button>
        ))}
      </div>

      {vue === 'conjugueur' && (
        <div>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)' }}>
            <input
              type="text"
              value={saisie}
              onChange={e => setSaisie(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && conjuguer()}
              placeholder="Entrez un verbe (parler, finir, prendre, être...)"
              className="input-standard"
              style={{ flex: 1, fontFamily: "'Source Serif 4', Georgia, serif" }}
            />
            <button onClick={conjuguer} className="btn-primaire" style={{ width: 'auto' }}>Conjuguer</button>
          </div>

          {erreur && <div className="message-erreur">{erreur}</div>}

          {resultatConj && (
            <div>
              <div className="carte" style={{ marginBottom: 'var(--sp-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                  <div className="heading-page">{resultatConj.infinitif}</div>
                  <span className="chip-niveau chip-A2">{resultatConj.groupe}</span>
                  <span className="text-secondary" style={{ fontStyle: 'italic' }}>
                    Participe passé : <strong>{resultatConj.participe}</strong> (aux. {resultatConj.auxiliaire})
                  </span>
                </div>
                {resultatConj.sens && <div className="text-secondary" style={{ marginTop: 'var(--sp-2)' }}>{resultatConj.sens}</div>}
              </div>

              <div className="filtres" style={{ marginBottom: 'var(--sp-4)' }}>
                {TOUS_TEMPS.map(t => (
                  <button key={t} className={`filtre-btn ${tempsChoisi === t ? 'actif' : ''}`} onClick={() => setTempsChoisi(t)}>
                    {TEMPS_LABELS[t]}
                  </button>
                ))}
              </div>

              {resultatConj[tempsChoisi] && (
                <div className="carte" style={{ padding: 0, overflow: 'hidden' }}>
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
                          <td className="text-secondary" style={{ fontStyle: 'italic' }}>{ligne.pronom}</td>
                          <td style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 600 }}>
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

              <div style={{ marginTop: 'var(--sp-5)' }}>
                <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Tous les temps d'un coup d'œil :</div>
                <div className="grid-cards">
                  {TOUS_TEMPS.filter(t => t !== tempsChoisi && resultatConj[t]).map(t => (
                    <div key={t} className="carte carte-clickable" style={{ padding: 'var(--sp-3)' }} onClick={() => setTempsChoisi(t)}>
                      <div className="section-label">{TEMPS_LABELS[t]}</div>
                      {resultatConj[t]?.slice(0, 3).map((l, i) => (
                        <div key={i} className="text-secondary">
                          <span className="text-meta">{l.pronom.split('/')[0]} </span>
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
              <h3>Conjugue n'importe quel verbe</h3>
              <p>Exemples : parler, finir, prendre, être, aller, vouloir, manger...</p>
            </div>
          )}
        </div>
      )}

      {vue === 'liste' && (
        <div>
          <div className="filtres">
            {[['tous','Tous'],['irregulier','Irréguliers'],['1er','1er groupe (-er)'],['2e','2e groupe (-ir)'],['3e','3e groupe (-re)']].map(([f,l]) => (
              <button key={f} className={`filtre-btn ${filtreGroupe === f ? 'actif' : ''}`} onClick={() => setFiltreGroupe(f)}>{l}</button>
            ))}
          </div>
          <div className="result-count">{verbesFiltres.length} verbe{verbesFiltres.length !== 1 ? 's' : ''} — Clique pour conjuguer</div>
          <div className="grid-cards">
            {verbesFiltres.map((v, i) => (
              <div key={i} className="carte carte-clickable" style={{ padding: 'var(--sp-3)' }} onClick={() => choisirVerbe(v.infinitif)}>
                <div className="heading-card" style={{ marginBottom: 'var(--sp-1)' }}>{v.infinitif}</div>
                <div className="text-meta" style={{ lineHeight: 1.3, marginBottom: 'var(--sp-2)' }}>{v.sens}</div>
                <span className="text-meta" style={{ background: 'var(--surface-alt)', borderRadius: 'var(--radius-pill)', padding: '2px 8px' }}>{v.groupe}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {vue === 'temps' && (
        <div>
          {temps.map((t, i) => (
            <div key={i} className="carte" style={{ marginBottom: 'var(--sp-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                <div>
                  <div className="heading-card">{t.nom}</div>
                  <div className="text-secondary" style={{ marginTop: 2 }}>{t.usage}</div>
                </div>
                <span className={`chip-niveau chip-${t.niveau}`}>{t.niveau}</span>
              </div>

              {t.formation && (
                <div className="tip-box" style={{ fontStyle: 'italic' }}>
                  Formation : <TexteInteractif texte={t.formation} />
                </div>
              )}

              {t.exemples.map((ex, j) => (
                <div key={j} style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)', fontStyle: 'italic', marginBottom: 'var(--sp-1)' }}>
                  • <TexteInteractif texte={ex} />
                </div>
              ))}

              {t.astuce && (
                <div className="tip-box-success" style={{ marginTop: 'var(--sp-3)' }}>
                  <TexteInteractif texte={t.astuce} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
