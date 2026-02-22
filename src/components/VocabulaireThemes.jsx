import { useState } from 'react';
import { themes, tousLesMots } from '../data/vocabulaire_themes';

export default function VocabulaireThemes({ vocabulaire }) {
  const [themeChoisi, setThemeChoisi] = useState(null);
  const [filtreNiveau, setFiltreNiveau] = useState('tous');
  const [recherche, setRecherche] = useState('');
  const [motSelectionne, setMotSelectionne] = useState(null);

  const themesFiltres = filtreNiveau === 'tous' ? themes : themes.filter(t => t.niveau === filtreNiveau);

  if (themeChoisi) {
    return <DetailTheme theme={themeChoisi} vocabulaire={vocabulaire} retour={() => setThemeChoisi(null)} />;
  }

  return (
    <div>
      <h2 className="section-titre">📖 Vocabulaire Thématique</h2>
      <p className="section-intro">
        Plus de <strong style={{color:'var(--or)'}}>5 000 mots</strong> organisés par thème.
        Explore les catégories, apprends les mots en contexte, et sauvegarde-les dans ton vocabulaire.
      </p>

      <input
        type="text"
        value={recherche}
        onChange={e => setRecherche(e.target.value)}
        placeholder="Chercher un mot dans tous les thèmes..."
        style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius)', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.08)', color: 'var(--blanc)', fontSize: '0.9rem', marginBottom: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }}
      />

      {recherche.length > 1 ? (
        <RechercheResultats recherche={recherche} vocabulaire={vocabulaire} />
      ) : (
        <>
          <div className="filtres">
            {[['tous','Tous'],['A1','🌱 A1'],['A2','🌿 A2'],['B1','🌳 B1']].map(([f,l]) => (
              <button key={f} className={`filtre-btn ${filtreNiveau === f ? 'actif' : ''}`} onClick={() => setFiltreNiveau(f)}>{l}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {themesFiltres.map(theme => (
              <div
                key={theme.id}
                className="carte"
                style={{ padding: '18px 14px', cursor: 'pointer', textAlign: 'center', transition: 'var(--transition)' }}
                onClick={() => setThemeChoisi(theme)}
              >
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{theme.emoji}</div>
                <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '0.95rem', marginBottom: '4px' }}>
                  {theme.titre}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--texte-clair)', marginBottom: '8px' }}>
                  {theme.mots.length} mots
                </div>
                <span className={`chip-niveau chip-${theme.niveau}`}>{theme.niveau}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RechercheResultats({ recherche, vocabulaire }) {
  const resultats = tousLesMots.filter(m =>
    m.mot.toLowerCase().includes(recherche.toLowerCase()) ||
    m.definition.toLowerCase().includes(recherche.toLowerCase())
  ).slice(0, 30);

  if (resultats.length === 0) {
    return (
      <div className="etat-vide">
        <div className="etat-vide-icone">🔍</div>
        <h3>Aucun résultat</h3>
        <p>Essaie un autre terme de recherche.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ color: 'rgba(248,246,240,0.5)', fontSize: '0.8rem', marginBottom: '12px' }}>
        {resultats.length} résultat{resultats.length !== 1 ? 's' : ''}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {resultats.map((m, i) => <MotCarte key={i} mot={m} vocabulaire={vocabulaire} showTheme />)}
      </div>
    </div>
  );
}

function DetailTheme({ theme, vocabulaire, retour }) {
  const [filtre, setFiltre] = useState('tous');
  const motsSauves = new Set(vocabulaire.mots.map(m => m.mot));

  const motsFiltres = filtre === 'tous' ? theme.mots
    : filtre === 'sauvés' ? theme.mots.filter(m => motsSauves.has(m.mot))
    : theme.mots.filter(m => !motsSauves.has(m.mot));

  function sauvegarderTous() {
    theme.mots.forEach(m => {
      if (!motsSauves.has(m.mot)) {
        vocabulaire.ajouterMot({ mot: m.mot, definition: m.definition, exemple: m.exemple });
      }
    });
  }

  return (
    <div>
      <button
        onClick={retour}
        style={{ background: 'none', border: 'none', color: 'var(--or)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
      >
        ← Retour aux thèmes
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '2rem' }}>{theme.emoji}</span>
        <div>
          <h2 className="section-titre" style={{ marginBottom: '2px' }}>{theme.titre}</h2>
          <span className={`chip-niveau chip-${theme.niveau}`}>{theme.niveau}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="filtres" style={{ marginBottom: 0 }}>
          {[['tous','Tous'],['nonsauves','Non sauvés'],['sauvés','Sauvés ✓']].map(([f,l]) => (
            <button key={f} className={`filtre-btn ${filtre === f ? 'actif' : ''}`} onClick={() => setFiltre(f)}>{l}</button>
          ))}
        </div>
        <button
          onClick={sauvegarderTous}
          style={{ background: 'var(--bleu-moyen)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--or)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          + Sauvegarder tous
        </button>
      </div>

      <div style={{ color: 'rgba(248,246,240,0.5)', fontSize: '0.8rem', marginBottom: '12px' }}>
        {motsFiltres.length} mot{motsFiltres.length !== 1 ? 's' : ''}
        {' '}— {motsSauves.size > 0 ? `${theme.mots.filter(m => motsSauves.has(m.mot)).length} déjà sauvegardés` : ''}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {motsFiltres.map((m, i) => <MotCarte key={i} mot={m} vocabulaire={vocabulaire} />)}
      </div>
    </div>
  );
}

function MotCarte({ mot, vocabulaire, showTheme }) {
  const [ouvert, setOuvert] = useState(false);
  const sauvegarde = vocabulaire.mots.find(m => m.mot === mot.mot);

  return (
    <div
      className="carte"
      style={{ padding: '12px 16px', cursor: 'pointer' }}
      onClick={() => setOuvert(!ouvert)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--bleu-nuit)' }}>
            {mot.mot}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--gris)', marginTop: '2px' }}>{mot.type}</div>
          {showTheme && mot.themeNom && (
            <div style={{ fontSize: '0.7rem', color: 'var(--bleu-clair)', marginTop: '2px' }}>📂 {mot.themeNom}</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          <button
            className={`btn-ajouter ${sauvegarde ? 'deja' : ''}`}
            onClick={e => { e.stopPropagation(); vocabulaire.ajouterMot({ mot: mot.mot, definition: mot.definition, exemple: mot.exemple }); }}
          >
            {sauvegarde ? '✓' : '+'}
          </button>
        </div>
      </div>

      {ouvert && (
        <div style={{ marginTop: '10px', borderTop: '1px solid var(--gris-clair)', paddingTop: '10px' }}>
          <div style={{ fontSize: '0.88rem', color: 'var(--texte)', lineHeight: 1.6, marginBottom: '6px' }}>
            {mot.definition}
          </div>
          <div style={{ fontStyle: 'italic', color: 'var(--bleu-moyen)', fontSize: '0.85rem' }}>
            « {mot.exemple} »
          </div>
        </div>
      )}
    </div>
  );
}
