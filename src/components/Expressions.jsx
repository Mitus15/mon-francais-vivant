import { useState } from 'react';
import { idiomes } from '../data/idiomes';

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
      <h2 className="section-titre">💬 Expressions & Idiomes</h2>
      <p className="section-intro">
        Les idiomes sont des expressions dont le sens ne peut pas être déduit mot par mot.
        Apprendre les idiomes te fera parler comme un vrai francophone !
      </p>

      <input
        type="text"
        placeholder="Chercher une expression..."
        value={rechercheTexte}
        onChange={e => setRechercheTexte(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(201,168,76,0.3)',
          background: 'rgba(255,255,255,0.08)',
          color: 'var(--blanc)',
          fontSize: '0.9rem',
          marginBottom: '14px',
          outline: 'none',
          fontFamily: 'Inter, sans-serif',
        }}
      />

      {/* Filtres niveau */}
      <div className="filtres">
        {niveaux.map(n => (
          <button key={n} className={`filtre-btn ${filtrNiveau === n ? 'actif' : ''}`} onClick={() => setFiltrNiveau(n)}>
            {n === 'tous' ? 'Tous les niveaux' : n === 'A1' ? '🌱 A1' : n === 'A2' ? '🌿 A2' : '🌳 B1'}
          </button>
        ))}
      </div>

      {/* Filtres catégorie */}
      <div className="filtres">
        {categories.map(c => (
          <button key={c} className={`filtre-btn ${filtrCategorie === c ? 'actif' : ''}`} onClick={() => setFiltrCategorie(c)}>
            {c === 'toutes' ? 'Toutes catégories' : c}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '12px', color: 'rgba(248,246,240,0.5)', fontSize: '0.8rem' }}>
        {idiomesFiltres.length} expression{idiomesFiltres.length !== 1 ? 's' : ''}
      </div>

      {idiomesFiltres.map((id, i) => (
        <div
          key={i}
          className="expression-carte"
          onClick={() => setExpressionOuverte(expressionOuverte === i ? null : i)}
          style={{ cursor: 'pointer' }}
        >
          <div className="expression-en-tete">
            <div>
              <div style={{ fontFamily: 'Lora, serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--bleu-nuit)' }}>
                « {id.expression} »
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--texte-clair)', marginTop: '4px' }}>
                {id.categorie} • {id.contexte}
              </div>
            </div>
            <span className={`chip-niveau chip-${id.niveau}`}>{id.niveau}</span>
          </div>

          {expressionOuverte === i && (
            <div style={{ borderTop: '1px solid var(--gris-clair)', paddingTop: '12px', marginTop: '4px' }}>
              <div style={{ fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '0.9rem', marginBottom: '6px' }}>
                Signification :
              </div>
              <div style={{ color: 'var(--texte)', fontSize: '0.9rem', marginBottom: '12px', lineHeight: 1.6 }}>
                {id.signification}
              </div>
              <div style={{ background: 'var(--or-pale)', borderRadius: '8px', padding: '10px 14px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--or)', marginBottom: '4px' }}>
                  Exemple :
                </div>
                <div style={{ fontStyle: 'italic', color: 'var(--bleu-nuit)', fontSize: '0.9rem' }}>
                  « {id.exemple} »
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {idiomesFiltres.length === 0 && (
        <div className="etat-vide">
          <div className="etat-vide-icone">💬</div>
          <h3>Aucune expression trouvée</h3>
          <p>Essaie avec d'autres filtres ou un autre terme de recherche.</p>
        </div>
      )}
    </div>
  );
}
