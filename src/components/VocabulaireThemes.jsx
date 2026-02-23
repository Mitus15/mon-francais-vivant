import { useState } from 'react';
import { themes, tousLesMots } from '../data/vocabulaire_themes';
import TexteInteractif from './TexteInteractif';

export default function VocabulaireThemes({ vocabulaire }) {
  const [themeChoisi, setThemeChoisi] = useState(null);
  const [filtreNiveau, setFiltreNiveau] = useState('tous');
  const [recherche, setRecherche] = useState('');

  const themesFiltres = filtreNiveau === 'tous' ? themes : themes.filter(t => t.niveau === filtreNiveau);

  if (themeChoisi) {
    return <DetailTheme theme={themeChoisi} vocabulaire={vocabulaire} retour={() => setThemeChoisi(null)} />;
  }

  return (
    <div>
      <h2 className="section-titre">Vocabulaire Thématique</h2>
      <p className="section-intro">
        Plus de <strong className="text-accent">5 000 mots</strong> organisés par thème.
        Explore les catégories, apprends les mots en contexte, et sauvegarde-les dans ton vocabulaire.
      </p>

      <input
        type="text"
        value={recherche}
        onChange={e => setRecherche(e.target.value)}
        placeholder="Chercher un mot dans tous les thèmes..."
        className="input-standard"
        style={{ marginBottom: 'var(--sp-4)' }}
      />

      {recherche.length > 1 ? (
        <RechercheResultats recherche={recherche} vocabulaire={vocabulaire} />
      ) : (
        <>
          <div className="filtres">
            {[['tous','Tous'],['A1','A1'],['A2','A2'],['B1','B1']].map(([f,l]) => (
              <button key={f} className={`filtre-btn ${filtreNiveau === f ? 'actif' : ''}`} onClick={() => setFiltreNiveau(f)}>{l}</button>
            ))}
          </div>

          <div className="grid-cards">
            {themesFiltres.map(theme => (
              <div key={theme.id} className="carte carte-clickable" style={{ padding: 'var(--sp-4) var(--sp-3)', textAlign: 'center' }} onClick={() => setThemeChoisi(theme)}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--sp-2)' }}>{theme.emoji}</div>
                <div className="heading-card" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-1)' }}>{theme.titre}</div>
                <div className="text-meta" style={{ marginBottom: 'var(--sp-2)' }}>{theme.mots.length} mots</div>
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
        <h3>Aucun résultat</h3>
        <p>Essaie un autre terme de recherche.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="result-count">{resultats.length} résultat{resultats.length !== 1 ? 's' : ''}</div>
      <div className="stack-sm">
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
      <button onClick={retour} className="btn-retour">← Retour aux thèmes</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '2rem' }}>{theme.emoji}</span>
        <div>
          <h2 className="section-titre" style={{ marginBottom: 2 }}>{theme.titre}</h2>
          <span className={`chip-niveau chip-${theme.niveau}`}>{theme.niveau}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="filtres" style={{ marginBottom: 0 }}>
          {[['tous','Tous'],['nonsauves','Non sauvés'],['sauvés','Sauvés']].map(([f,l]) => (
            <button key={f} className={`filtre-btn ${filtre === f ? 'actif' : ''}`} onClick={() => setFiltre(f)}>{l}</button>
          ))}
        </div>
        <button onClick={sauvegarderTous} className="btn-ajouter">+ Sauvegarder tous</button>
      </div>

      <div className="result-count">
        {motsFiltres.length} mot{motsFiltres.length !== 1 ? 's' : ''}
        {motsSauves.size > 0 ? ` — ${theme.mots.filter(m => motsSauves.has(m.mot)).length} déjà sauvegardés` : ''}
      </div>

      <div className="stack-sm">
        {motsFiltres.map((m, i) => <MotCarte key={i} mot={m} vocabulaire={vocabulaire} />)}
      </div>
    </div>
  );
}

function MotCarte({ mot, vocabulaire, showTheme }) {
  const [ouvert, setOuvert] = useState(false);
  const sauvegarde = vocabulaire.mots.find(m => m.mot === mot.mot);

  return (
    <div className="carte carte-clickable" style={{ padding: 'var(--sp-3) var(--sp-4)' }} onClick={() => setOuvert(!ouvert)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <div style={{ flex: 1 }}>
          <div className="heading-card" style={{ fontSize: 'var(--text-base)' }}>{mot.mot}</div>
          <div className="text-meta" style={{ marginTop: 2 }}>{mot.type}</div>
          {showTheme && mot.themeNom && <div className="text-meta" style={{ color: 'var(--primary)', marginTop: 2 }}>{mot.themeNom}</div>}
        </div>
        <button
          className={`btn-ajouter ${sauvegarde ? 'deja' : ''}`}
          onClick={e => { e.stopPropagation(); vocabulaire.ajouterMot({ mot: mot.mot, definition: mot.definition, exemple: mot.exemple }); }}
        >
          {sauvegarde ? '✓' : '+'}
        </button>
      </div>

      {ouvert && (
        <div style={{ marginTop: 'var(--sp-3)', borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-3)' }}>
          <div className="text-body" style={{ marginBottom: 'var(--sp-2)' }}><TexteInteractif texte={mot.definition} /></div>
          <div style={{ fontStyle: 'italic', color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>
            <TexteInteractif texte={`« ${mot.exemple} »`} />
          </div>
        </div>
      )}
    </div>
  );
}
