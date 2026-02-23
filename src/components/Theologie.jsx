import { useState } from 'react';
import { vocabulaireTheologique, doctrines, domaines } from '../data/theologie';
import TexteInteractif from './TexteInteractif';

const domainesFiltres = domaines.filter(d => d !== 'tous');

export default function Theologie() {
  const [onglet, setOnglet] = useState('vocabulaire');

  return (
    <div>
      <h2 className="section-titre">Théologie & Langues Bibliques</h2>
      <p className="section-intro">
        <strong className="text-accent">{vocabulaireTheologique.length} termes</strong> en grec, hébreu et latin —
        chacun éclaire le français. Plus <strong className="text-accent">{doctrines.length} fiches doctrinales</strong>.
      </p>

      <div className="filtres" style={{ marginBottom: 'var(--sp-5)' }}>
        {[['vocabulaire', 'Vocabulaire'], ['doctrines', 'Doctrines']].map(([v, l]) => (
          <button key={v} className={`filtre-btn ${onglet === v ? 'actif' : ''}`} onClick={() => setOnglet(v)}>{l}</button>
        ))}
      </div>

      {onglet === 'vocabulaire' ? <VueVocabulaire /> : <VueDoctrines />}
    </div>
  );
}

function VueVocabulaire() {
  const [filtreLangue, setFiltreLangue] = useState('tous');
  const [filtreDomaine, setFiltreDomaine] = useState('tous');
  const [recherche, setRecherche] = useState('');
  const [ouvert, setOuvert] = useState(null);

  const termsFiltres = vocabulaireTheologique.filter(t => {
    const matchLangue = filtreLangue === 'tous' || t.langue === filtreLangue;
    const matchDomaine = filtreDomaine === 'tous' || t.domaine === filtreDomaine;
    const q = recherche.toLowerCase();
    const matchRecherche = !recherche || t.terme.toLowerCase().includes(q) ||
      t.definition_fr.toLowerCase().includes(q) ||
      (t.translitteration || '').toLowerCase().includes(q);
    return matchLangue && matchDomaine && matchRecherche;
  });

  return (
    <div>
      <input
        type="text"
        value={recherche}
        onChange={e => setRecherche(e.target.value)}
        placeholder="Chercher un terme (logos, grâce, alliance...)..."
        className="input-standard"
        style={{ marginBottom: 'var(--sp-3)' }}
      />
      <div className="filtres">
        {[['tous', 'Tous'], ['grec', 'Grec'], ['hébreu', 'Hébreu'], ['latin', 'Latin']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreLangue === f ? 'actif' : ''}`} onClick={() => setFiltreLangue(f)}>{l}</button>
        ))}
      </div>
      <div className="filtres">
        {[['tous', 'Tous domaines'], ...domainesFiltres.map(d => [d, d])].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreDomaine === f ? 'actif' : ''}`} onClick={() => setFiltreDomaine(f)}>{l}</button>
        ))}
      </div>
      <div className="result-count">{termsFiltres.length} terme{termsFiltres.length !== 1 ? 's' : ''}</div>
      <div className="stack-sm">
        {termsFiltres.map((t, i) => (
          <TermeCarte key={i} terme={t} ouvert={ouvert === i} toggle={() => setOuvert(ouvert === i ? null : i)} />
        ))}
      </div>
    </div>
  );
}

function TermeCarte({ terme, ouvert, toggle }) {
  const couleurs = { grec: 'var(--grec)', hébreu: 'var(--hebreu)', latin: 'var(--latin)' };
  const couleur = couleurs[terme.langue] || 'var(--text)';

  return (
    <div className="carte carte-clickable" style={{ padding: 'var(--sp-3) var(--sp-4)' }} onClick={toggle}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
            <span className="heading-card">{terme.terme}</span>
            {terme.translitteration && (
              <span className="text-secondary" style={{ fontStyle: 'italic' }}>({terme.translitteration})</span>
            )}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: couleur, marginTop: 2, fontWeight: 600 }}>
            {terme.langue.charAt(0).toUpperCase() + terme.langue.slice(1)} · {terme.domaine}
          </div>
        </div>
        <span style={{ color: ouvert ? 'var(--primary)' : 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>{ouvert ? '▲' : '▼'}</span>
      </div>

      {ouvert && (
        <div style={{ marginTop: 'var(--sp-3)', borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-3)' }}>
          <div className="text-body" style={{ marginBottom: 'var(--sp-3)' }}>
            <TexteInteractif texte={terme.definition_fr} />
          </div>
          {terme.etymologie_francais && (
            <div className="tip-box">
              <strong>En français :</strong> <TexteInteractif texte={terme.etymologie_francais} />
            </div>
          )}
          {terme.versets?.length > 0 && (
            <div className="text-meta" style={{ color: 'var(--primary)' }}>
              {terme.versets.join(' · ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VueDoctrines() {
  const [filtreNiveau, setFiltreNiveau] = useState('tous');
  const [docChoisi, setDocChoisi] = useState(null);

  if (docChoisi) return <DetailDoctrine doctrine={docChoisi} retour={() => setDocChoisi(null)} />;

  const docsFiltres = filtreNiveau === 'tous' ? doctrines : doctrines.filter(d => d.niveau === filtreNiveau);

  return (
    <div>
      <div className="filtres">
        {[['tous', 'Tous'], ['fondamental', 'Fondamental'], ['intermédiaire', 'Intermédiaire'], ['avancé', 'Avancé']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreNiveau === f ? 'actif' : ''}`} onClick={() => setFiltreNiveau(f)}>{l}</button>
        ))}
      </div>
      <div className="grid-cards" style={{ marginTop: 'var(--sp-1)' }}>
        {docsFiltres.map(doc => (
          <div key={doc.id} className="carte carte-clickable" style={{ padding: 'var(--sp-4) var(--sp-3)', textAlign: 'center' }} onClick={() => setDocChoisi(doc)}>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--sp-2)' }}>{doc.emoji}</div>
            <div className="heading-card" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-1)' }}>{doc.titre}</div>
            <div className="text-meta" style={{ marginBottom: 'var(--sp-2)', lineHeight: 1.3 }}>{doc.sous_titre}</div>
            <span className={`chip-niveau chip-${doc.niveau === 'fondamental' ? 'A1' : doc.niveau === 'intermédiaire' ? 'A2' : 'B1'}`}>
              {doc.niveau}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailDoctrine({ doctrine, retour }) {
  return (
    <div>
      <button onClick={retour} className="btn-retour">← Retour aux doctrines</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '2.5rem' }}>{doctrine.emoji}</span>
        <div>
          <h2 className="section-titre" style={{ marginBottom: 2 }}>{doctrine.titre}</h2>
          <div className="text-secondary" style={{ fontStyle: 'italic' }}>{doctrine.sous_titre}</div>
        </div>
      </div>

      <div className="carte" style={{ marginBottom: 'var(--sp-3)' }}>
        <div className="heading-card" style={{ marginBottom: 'var(--sp-2)' }}>Définition</div>
        <div className="text-body" style={{ lineHeight: 1.7 }}><TexteInteractif texte={doctrine.definition} /></div>
      </div>

      {doctrine.termes_cles?.length > 0 && (
        <div className="carte" style={{ marginBottom: 'var(--sp-3)' }}>
          <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Termes clés</div>
          {doctrine.termes_cles.map((t, i) => (
            <div key={i} style={{ background: 'var(--surface-alt)', borderRadius: 'var(--radius)', padding: 'var(--sp-2) var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
              <span className="text-accent">{t.terme}</span>
              <span className="text-secondary" style={{ marginLeft: 'var(--sp-2)' }}>— <TexteInteractif texte={t.explication} /></span>
            </div>
          ))}
        </div>
      )}

      {doctrine.points?.length > 0 && (
        <div className="carte" style={{ marginBottom: 'var(--sp-3)' }}>
          <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Points essentiels</div>
          {doctrine.points.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)', fontSize: 'var(--text-sm)', color: 'var(--text)', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span><TexteInteractif texte={p} />
            </div>
          ))}
        </div>
      )}

      {doctrine.versets_cles?.length > 0 && (
        <div className="carte" style={{ marginBottom: 'var(--sp-3)' }}>
          <div className="heading-card" style={{ marginBottom: 'var(--sp-2)' }}>Versets clés</div>
          {doctrine.versets_cles.map((v, i) => (
            <div key={i} className="text-secondary" style={{ color: 'var(--primary)', marginBottom: 'var(--sp-1)' }}>• {v}</div>
          ))}
        </div>
      )}

      {doctrine.connexion_francais && (
        <div className="carte-accent">
          <div className="section-label">Connexion au Français</div>
          <div className="text-body" style={{ lineHeight: 1.6 }}><TexteInteractif texte={doctrine.connexion_francais} /></div>
        </div>
      )}
    </div>
  );
}
