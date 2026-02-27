import { useState, useEffect, useRef } from 'react';
import { useDictionnaire } from '../hooks/useDictionnaire';
import TexteInteractif from './TexteInteractif';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Dictionnaire({ vocabulaire }) {
  const [saisie, setSaisie] = useState('');
  const [mode, setMode] = useState('accueil'); // accueil, resultat, browse
  const [lettreActive, setLettreActive] = useState(null);
  const inputRef = useRef(null);

  const {
    resultat, suggestions, browseListe, chargement, erreur, stats,
    chercher, autocompléter, parcourir, motAuHasard, chargerStats, reinitialiser,
  } = useDictionnaire();

  useEffect(() => { chargerStats(); }, [chargerStats]);

  useEffect(() => {
    if (resultat) setMode('resultat');
  }, [resultat]);

  useEffect(() => {
    if (browseListe) setMode('browse');
  }, [browseListe]);

  function soumettre(e) {
    e.preventDefault();
    if (saisie.trim()) {
      chercher(saisie);
    }
  }

  function choisirSuggestion(mot) {
    setSaisie(mot);
    autocompléter('');
    chercher(mot);
  }

  function naviguerLettre(l) {
    setLettreActive(l);
    setSaisie('');
    reinitialiser();
    parcourir(l, 0);
  }

  function hasard() {
    setSaisie('');
    reinitialiser();
    motAuHasard();
  }

  function retourAccueil() {
    setSaisie('');
    setMode('accueil');
    setLettreActive(null);
    reinitialiser();
    inputRef.current?.focus();
  }

  function ouvrirMot(mot) {
    setSaisie(mot);
    chercher(mot);
  }

  const motSauvegarde = resultat && vocabulaire.mots.find(m => m.mot === resultat.mot);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
        <h2 className="section-titre" style={{ margin: 0 }}>Dictionnaire</h2>
        {stats && (
          <span className="text-meta" style={{ fontSize: '0.8rem' }}>
            {stats.total.toLocaleString('fr-FR')} mots
          </span>
        )}
      </div>

      <form onSubmit={soumettre} className="dictionnaire-recherche" style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={saisie}
          onChange={e => {
            setSaisie(e.target.value);
            autocompléter(e.target.value);
          }}
          placeholder="Chercher un mot en français..."
          className="champ-recherche"
        />
        <button type="submit" className="bouton-recherche">→</button>

        {suggestions.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', marginTop: '2px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', maxHeight: '240px', overflow: 'auto',
          }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choisirSuggestion(s.mot)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: 'var(--sp-3) var(--sp-4)',
                  background: 'none', border: 'none', borderBottom: '1px solid var(--border)',
                  cursor: 'pointer', color: 'var(--text)', fontSize: '0.95rem',
                }}
              >
                <strong>{s.mot}</strong>
                {s.type && <span className="text-meta" style={{ marginLeft: 'var(--sp-2)', fontSize: '0.8rem' }}>{s.type}</span>}
                {s.definition && (
                  <div className="text-secondary" style={{ fontSize: '0.82rem', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.definition.slice(0, 80)}{s.definition.length > 80 ? '...' : ''}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <button className="bouton-secondaire" onClick={hasard} disabled={chargement}>
          Mot au hasard
        </button>
        {mode !== 'accueil' && (
          <button className="bouton-secondaire" onClick={retourAccueil}>
            Retour
          </button>
        )}
      </div>

      {/* Alphabet bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: 'var(--sp-4)',
        justifyContent: 'center',
      }}>
        {ALPHABET.map(l => (
          <button
            key={l}
            onClick={() => naviguerLettre(l)}
            style={{
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: lettreActive === l ? 'var(--accent)' : 'var(--surface)',
              color: lettreActive === l ? '#fff' : 'var(--text)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: lettreActive === l ? '700' : '500',
              transition: 'all 0.15s',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {chargement && (
        <div className="chargement" style={{ marginTop: 'var(--sp-4)' }}>
          <div className="spinner" />
          <span>Recherche en cours...</span>
        </div>
      )}

      {erreur && <div className="message-erreur" style={{ marginTop: 'var(--sp-3)' }}>{erreur}</div>}

      {/* Single word result */}
      {mode === 'resultat' && resultat && (
        <div className="carte" style={{ marginTop: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)', marginBottom: 'var(--sp-1)' }}>
            <div>
              <div className="resultat-mot">{resultat.mot}</div>
              {resultat.type && <span className="text-meta" style={{ fontSize: '0.85rem' }}>{resultat.type}</span>}
            </div>
            <button
              className={`btn-ajouter ${motSauvegarde ? 'deja' : ''}`}
              style={{ marginTop: 'var(--sp-2)', flexShrink: 0 }}
              onClick={() => vocabulaire.ajouterMot({
                mot: resultat.mot,
                definition: resultat.definition || '',
                exemple: resultat.exemple || '',
              })}
            >
              {motSauvegarde ? 'Sauvegardé' : '+ Sauvegarder'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-4)' }}>
            {resultat.definition ? (
              resultat.definition.split(' ; ').map((def, i) => (
                <div key={i} className="definition-item">
                  <div className="definition-texte"><TexteInteractif texte={def} /></div>
                </div>
              ))
            ) : (
              <div className="text-secondary" style={{ fontStyle: 'italic', textAlign: 'center', padding: 'var(--sp-4) 0' }}>
                Aucune définition disponible.
              </div>
            )}

            {resultat.exemple && (
              <div className="definition-exemple" style={{ marginTop: 'var(--sp-2)' }}>
                <TexteInteractif texte={`« ${resultat.exemple} »`} />
              </div>
            )}

            {resultat.synonymes?.length > 0 && (
              <div className="relations-section" style={{ marginTop: 'var(--sp-4)' }}>
                <div className="text-meta" style={{ marginBottom: 'var(--sp-2)', fontWeight: 600 }}>Synonymes</div>
                <div className="relations-liste">
                  {resultat.synonymes.map((s, j) => {
                    const mot = typeof s === 'string' ? s : s.mot;
                    const def = typeof s === 'string' ? null : s.definition;
                    return (
                      <button key={j} className="relation-carte" onClick={() => ouvrirMot(mot)}>
                        <span className="relation-mot">{mot}</span>
                        {def && <span className="relation-definition">{def.length > 80 ? def.slice(0, 80) + '...' : def}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {resultat.antonymes?.length > 0 && (
              <div className="relations-section" style={{ marginTop: 'var(--sp-3)' }}>
                <div className="text-meta" style={{ marginBottom: 'var(--sp-2)', fontWeight: 600 }}>Antonymes</div>
                <div className="relations-liste">
                  {resultat.antonymes.map((a, j) => {
                    const mot = typeof a === 'string' ? a : a.mot;
                    const def = typeof a === 'string' ? null : a.definition;
                    return (
                      <button key={j} className="relation-carte relation-antonyme" onClick={() => ouvrirMot(mot)}>
                        <span className="relation-mot">{mot}</span>
                        {def && <span className="relation-definition">{def.length > 80 ? def.slice(0, 80) + '...' : def}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Browse list */}
      {mode === 'browse' && browseListe && (
        <div style={{ marginTop: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem' }}>
              Lettre {browseListe.lettre}
            </h3>
            <span className="text-meta" style={{ fontSize: '0.8rem' }}>
              {browseListe.total.toLocaleString('fr-FR')} mots
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {browseListe.results.map((entry, i) => (
              <button
                key={i}
                onClick={() => ouvrirMot(entry.mot)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: 'var(--sp-3) var(--sp-4)',
                  background: i % 2 === 0 ? 'var(--surface)' : 'transparent',
                  border: 'none', borderRadius: 'var(--radius)',
                  cursor: 'pointer', color: 'var(--text)',
                }}
              >
                <strong style={{ color: 'var(--accent)' }}>{entry.mot}</strong>
                {entry.definition && (
                  <span className="text-secondary" style={{ marginLeft: 'var(--sp-3)', fontSize: '0.85rem' }}>
                    {entry.definition.slice(0, 60)}{entry.definition.length > 60 ? '...' : ''}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Pagination */}
          {browseListe.total > 100 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
              {browseListe.page > 0 && (
                <button className="bouton-secondaire" onClick={() => parcourir(browseListe.lettre, browseListe.page - 1)}>
                  Précédent
                </button>
              )}
              <span className="text-meta" style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem' }}>
                Page {browseListe.page + 1} / {Math.ceil(browseListe.total / 100)}
              </span>
              {(browseListe.page + 1) * 100 < browseListe.total && (
                <button className="bouton-secondaire" onClick={() => parcourir(browseListe.lettre, browseListe.page + 1)}>
                  Suivant
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Accueil */}
      {mode === 'accueil' && !chargement && !erreur && (
        <div className="etat-vide" style={{ marginTop: 'var(--sp-4)' }}>
          <h3>Explore le dictionnaire</h3>
          <p>Cherche un mot, navigue par lettre, ou découvre un mot au hasard.</p>
        </div>
      )}
    </div>
  );
}
