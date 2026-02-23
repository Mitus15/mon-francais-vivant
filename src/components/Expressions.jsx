import { useState } from 'react';
import { idiomes } from '../data/idiomes';
import TexteInteractif from './TexteInteractif';

export default function Expressions() {
  const [filtrNiveau, setFiltrNiveau] = useState('tous');
  const [filtrCategorie, setFiltrCategorie] = useState('toutes');
  const [rechercheTexte, setRechercheTexte] = useState('');
  const [expressionOuverte, setExpressionOuverte] = useState(null);

  const niveaux = ['tous', 'A1', 'A2', 'B1'];
  const categories = ['toutes', ...new Set(idiomes.map(i => i.categorie))];

  const idiomesFiltres = idiomes.filter(id => {
    if (filtrNiveau !== 'tous' && id.niveau !== filtrNiveau) return false;
    if (filtrCategorie !== 'toutes' && id.categorie !== filtrCategorie) return false;
    if (rechercheTexte && !id.expression.toLowerCase().includes(rechercheTexte.toLowerCase())
      && !id.signification.toLowerCase().includes(rechercheTexte.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h2 className="section-titre">Expressions & Idiomes</h2>
      <p className="section-intro">
        Les idiomes sont des expressions dont le sens ne peut pas être déduit mot par mot.
        Apprendre les idiomes te fera parler comme un vrai francophone !
      </p>

      <input
        type="text"
        placeholder="Chercher une expression..."
        value={rechercheTexte}
        onChange={e => setRechercheTexte(e.target.value)}
        className="input-standard"
        style={{ marginBottom: 'var(--sp-4)' }}
      />

      <div className="filtres">
        {niveaux.map(n => (
          <button key={n} className={`filtre-btn ${filtrNiveau === n ? 'actif' : ''}`} onClick={() => setFiltrNiveau(n)}>
            {n === 'tous' ? 'Tous les niveaux' : n}
          </button>
        ))}
      </div>

      <div className="filtres">
        {categories.map(c => (
          <button key={c} className={`filtre-btn ${filtrCategorie === c ? 'actif' : ''}`} onClick={() => setFiltrCategorie(c)}>
            {c === 'toutes' ? 'Toutes catégories' : c}
          </button>
        ))}
      </div>

      <div className="result-count">{idiomesFiltres.length} expression{idiomesFiltres.length !== 1 ? 's' : ''}</div>

      {idiomesFiltres.map((id, i) => (
        <div
          key={i}
          className="expression-carte carte-clickable"
          onClick={() => setExpressionOuverte(expressionOuverte === i ? null : i)}
        >
          <div className="expression-en-tete">
            <div>
              <div className="heading-card"><TexteInteractif texte={`« ${id.expression} »`} /></div>
              <div className="text-secondary" style={{ marginTop: 'var(--sp-1)' }}>{id.categorie} · {id.contexte}</div>
            </div>
            <span className={`chip-niveau chip-${id.niveau}`}>{id.niveau}</span>
          </div>

          {expressionOuverte === i && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-3)', marginTop: 'var(--sp-1)' }}>
              <div className="heading-card" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-2)' }}>Signification :</div>
              <div className="text-body" style={{ marginBottom: 'var(--sp-3)' }}>
                <TexteInteractif texte={id.signification} />
              </div>
              <div className="tip-box">
                <div className="text-meta" style={{ fontWeight: 600, color: 'var(--accent-dark)', marginBottom: 'var(--sp-1)' }}>Exemple :</div>
                <div style={{ fontStyle: 'italic', color: 'var(--text)' }}>
                  <TexteInteractif texte={`« ${id.exemple} »`} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {idiomesFiltres.length === 0 && (
        <div className="etat-vide">
          <h3>Aucune expression trouvée</h3>
          <p>Essaie avec d'autres filtres ou un autre terme de recherche.</p>
        </div>
      )}
    </div>
  );
}
