import { useState } from 'react';
import { useDictionnaire } from '../hooks/useDictionnaire';
import TexteInteractif from './TexteInteractif';

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
      <h2 className="section-titre">Dictionnaire</h2>
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
        <button type="submit" className="bouton-recherche">→</button>
      </form>

      {chargement && (
        <div className="chargement">
          <div className="spinner" />
          <span>Recherche en cours...</span>
        </div>
      )}

      {erreur && <div className="message-erreur">{erreur}</div>}

      {resultat && (
        <div className="carte">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)', marginBottom: 'var(--sp-1)' }}>
            <div>
              <div className="resultat-mot">{resultat.mot}</div>
              {resultat.phonetique && <div className="resultat-phonetique">{resultat.phonetique}</div>}
            </div>
            <button
              className={`btn-ajouter ${motSauvegarde ? 'deja' : ''}`}
              style={{ marginTop: 'var(--sp-2)' }}
              onClick={() => vocabulaire.ajouterMot({
                mot: resultat.mot,
                definition: resultat.definitions[0]?.definition || '',
                exemple: resultat.definitions[0]?.exemple || '',
              })}
            >
              {motSauvegarde ? 'Sauvé' : '+ Sauvegarder'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-4)' }}>
            {resultat.definitions.map((def, i) => (
              <div key={i} className="definition-item">
                <span className="type-grammatical">{def.typeGrammatical}</span>
                <div className="definition-texte"><TexteInteractif texte={def.definition} /></div>
                {def.exemple && (
                  <div className="definition-exemple"><TexteInteractif texte={`« ${def.exemple} »`} /></div>
                )}
                {def.synonymes.length > 0 && (
                  <div className="synonymes">
                    <span className="text-meta" style={{ marginRight: 'var(--sp-1)' }}>Synonymes :</span>
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
            <div className="text-secondary" style={{ fontStyle: 'italic', textAlign: 'center', padding: 'var(--sp-4) 0' }}>
              Aucune définition disponible pour ce mot.
            </div>
          )}
        </div>
      )}

      {!resultat && !chargement && !erreur && (
        <div className="etat-vide">
          <h3>Cherche un mot</h3>
          <p>Tape n'importe quel mot français ci-dessus pour voir sa définition.</p>
        </div>
      )}
    </div>
  );
}
