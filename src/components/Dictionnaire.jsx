import { useState } from 'react';
import { useDictionnaire } from '../hooks/useDictionnaire';

export default function Dictionnaire({ vocabulaire }) {
  const [saisie, setSaisie] = useState('');
  const { resultat, chargement, erreur, chercher } = useDictionnaire();

  function soumettre(e) {
    e.preventDefault();
    chercher(saisie);
  }

  const motSauvegarde = resultat && vocabulaire.mots.find(m => m.mot === resultat.mot);

  return (
    <div>
      <h2 className="section-titre">🔍 Dictionnaire</h2>
      <p className="section-intro">
        Cherche n'importe quel mot français. Tu verras sa définition, des exemples et sa prononciation.
      </p>

      <form onSubmit={soumettre} className="dictionnaire-recherche">
        <input
          type="text"
          value={saisie}
          onChange={e => setSaisie(e.target.value)}
          placeholder="Chercher un mot en français..."
          className="champ-recherche"
          autoFocus
        />
        <button type="submit" className="bouton-recherche">🔍</button>
      </form>

      {chargement && (
        <div className="chargement">
          <div className="spinner" />
          <span>Recherche en cours...</span>
        </div>
      )}

      {erreur && (
        <div className="message-erreur">{erreur}</div>
      )}

      {resultat && (
        <div className="carte">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
            <div>
              <div className="resultat-mot">{resultat.mot}</div>
              {resultat.phonetique && (
                <div className="resultat-phonetique">{resultat.phonetique}</div>
              )}
            </div>
            <button
              className={`btn-ajouter ${motSauvegarde ? 'deja' : ''}`}
              style={{ marginTop: '6px' }}
              onClick={() => vocabulaire.ajouterMot({
                mot: resultat.mot,
                definition: resultat.definitions[0]?.definition || '',
                exemple: resultat.definitions[0]?.exemple || '',
              })}
            >
              {motSauvegarde ? '✓ Sauvé' : '+ Sauvegarder'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--gris-clair)', paddingTop: '16px' }}>
            {resultat.definitions.map((def, i) => (
              <div key={i} className="definition-item">
                <span className="type-grammatical">{def.typeGrammatical}</span>
                <div className="definition-texte">{def.definition}</div>
                {def.exemple && (
                  <div className="definition-exemple">« {def.exemple} »</div>
                )}
                {def.synonymes.length > 0 && (
                  <div className="synonymes">
                    <span style={{ fontSize: '0.75rem', color: 'var(--gris)', marginRight: '4px' }}>Synonymes :</span>
                    {def.synonymes.map((s, j) => (
                      <span key={j} className="synonyme-chip" style={{ cursor: 'pointer' }} onClick={() => { setSaisie(s); chercher(s); }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {resultat.definitions.length === 0 && (
            <div style={{ color: 'var(--gris)', fontStyle: 'italic', textAlign: 'center', padding: '16px 0' }}>
              Aucune définition disponible pour ce mot.
            </div>
          )}
        </div>
      )}

      {!resultat && !chargement && !erreur && (
        <div className="etat-vide">
          <div className="etat-vide-icone">📖</div>
          <h3>Cherche un mot</h3>
          <p>Tape n'importe quel mot français ci-dessus pour voir sa définition.</p>
        </div>
      )}
    </div>
  );
}
