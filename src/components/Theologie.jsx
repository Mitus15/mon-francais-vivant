import { useState } from 'react';
import { vocabulaireTheologique, doctrines, domaines } from '../data/theologie';

// Remove 'tous' from domaines since we add it manually
const domainesFiltres = domaines.filter(d => d !== 'tous');

export default function Theologie() {
  const [onglet, setOnglet] = useState('vocabulaire');

  return (
    <div>
      <h2 className="section-titre">✝️ Théologie & Langues Bibliques</h2>
      <p className="section-intro">
        <strong style={{ color: 'var(--or)' }}>{vocabulaireTheologique.length} termes</strong> en grec, hébreu et latin —
        chacun éclaire le français. Plus <strong style={{ color: 'var(--or)' }}>{doctrines.length} fiches doctrinales</strong>.
      </p>

      <div className="filtres" style={{ marginBottom: '20px' }}>
        {[['vocabulaire', '📚 Vocabulaire'], ['doctrines', '🏛️ Doctrines']].map(([v, l]) => (
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
        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.08)', color: 'var(--blanc)', fontSize: '0.9rem', marginBottom: '12px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
      />
      <div className="filtres">
        {[['tous', 'Tous'], ['grec', '🇬🇷 Grec'], ['hébreu', '🕎 Hébreu'], ['latin', '🏛️ Latin']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreLangue === f ? 'actif' : ''}`} onClick={() => setFiltreLangue(f)}>{l}</button>
        ))}
      </div>
      <div className="filtres">
        {[['tous', 'Tous domaines'], ...domainesFiltres.map(d => [d, d])].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtreDomaine === f ? 'actif' : ''}`} onClick={() => setFiltreDomaine(f)}>{l}</button>
        ))}
      </div>
      <div style={{ color: 'rgba(248,246,240,0.5)', fontSize: '0.8rem', margin: '10px 0' }}>
        {termsFiltres.length} terme{termsFiltres.length !== 1 ? 's' : ''}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {termsFiltres.map((t, i) => (
          <TermeCarte key={i} terme={t} ouvert={ouvert === i} toggle={() => setOuvert(ouvert === i ? null : i)} />
        ))}
      </div>
    </div>
  );
}

function TermeCarte({ terme, ouvert, toggle }) {
  const couleurs = { grec: '#4CAF50', hébreu: '#64B5F6', latin: '#CE93D8' };
  const couleur = couleurs[terme.langue] || '#fff';

  return (
    <div className="carte" style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={toggle}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Lora, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--bleu-nuit)' }}>{terme.terme}</span>
            {terme.translitteration && (
              <span style={{ fontSize: '0.82rem', color: 'var(--gris)', fontStyle: 'italic' }}>({terme.translitteration})</span>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: couleur, marginTop: '2px', fontWeight: 600 }}>
            {terme.langue.charAt(0).toUpperCase() + terme.langue.slice(1)} · {terme.domaine}
          </div>
        </div>
        <span style={{ color: ouvert ? 'var(--or)' : 'var(--gris)', fontSize: '0.8rem' }}>{ouvert ? '▲' : '▼'}</span>
      </div>

      {ouvert && (
        <div style={{ marginTop: '12px', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '12px' }}>
          <div style={{ fontSize: '0.88rem', color: 'var(--texte)', lineHeight: 1.6, marginBottom: '10px' }}>
            {terme.definition_fr}
          </div>
          {terme.etymologie_francais && (
            <div style={{ background: 'var(--or-pale)', borderRadius: '8px', padding: '8px 12px', marginBottom: '10px', fontSize: '0.82rem', color: 'var(--bleu-nuit)' }}>
              🇫🇷 <strong>En français :</strong> {terme.etymologie_francais}
            </div>
          )}
          {terme.versets?.length > 0 && (
            <div style={{ fontSize: '0.78rem', color: 'var(--bleu-clair)' }}>
              📖 {terme.versets.join(' · ')}
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', marginTop: '4px' }}>
        {docsFiltres.map(doc => (
          <div key={doc.id} className="carte" style={{ padding: '16px 14px', cursor: 'pointer', textAlign: 'center' }} onClick={() => setDocChoisi(doc)}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{doc.emoji}</div>
            <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', fontSize: '0.9rem', marginBottom: '4px' }}>{doc.titre}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--texte-clair)', marginBottom: '8px', lineHeight: 1.3 }}>{doc.sous_titre}</div>
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
      <button onClick={retour} style={{ background: 'none', border: 'none', color: 'var(--or)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', fontWeight: 600, padding: 0 }}>
        ← Retour aux doctrines
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '2.5rem' }}>{doctrine.emoji}</span>
        <div>
          <h2 className="section-titre" style={{ marginBottom: '2px' }}>{doctrine.titre}</h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--texte-clair)', fontStyle: 'italic' }}>{doctrine.sous_titre}</div>
        </div>
      </div>

      <div className="carte" style={{ marginBottom: '12px' }}>
        <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '8px' }}>Définition</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--texte)', lineHeight: 1.7 }}>{doctrine.definition}</div>
      </div>

      {doctrine.termes_cles?.length > 0 && (
        <div className="carte" style={{ marginBottom: '12px' }}>
          <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '10px' }}>Termes clés</div>
          {doctrine.termes_cles.map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 10px', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--or)' }}>{t.terme}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--texte-clair)', marginLeft: '8px' }}>— {t.explication}</span>
            </div>
          ))}
        </div>
      )}

      {doctrine.points?.length > 0 && (
        <div className="carte" style={{ marginBottom: '12px' }}>
          <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '10px' }}>Points essentiels</div>
          {doctrine.points.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.88rem', color: 'var(--texte)', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--or)', flexShrink: 0 }}>•</span>{p}
            </div>
          ))}
        </div>
      )}

      {doctrine.versets_cles?.length > 0 && (
        <div className="carte" style={{ marginBottom: '12px' }}>
          <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '8px' }}>📖 Versets clés</div>
          {doctrine.versets_cles.map((v, i) => (
            <div key={i} style={{ fontSize: '0.85rem', color: 'var(--bleu-clair)', marginBottom: '4px' }}>• {v}</div>
          ))}
        </div>
      )}

      {doctrine.connexion_francais && (
        <div style={{ background: 'var(--or-pale)', borderRadius: '8px', padding: '12px 14px', borderLeft: '3px solid var(--or)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--bleu-nuit)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>🇫🇷 Connexion au Français</div>
          <div style={{ fontSize: '0.88rem', color: 'var(--bleu-nuit)', lineHeight: 1.6 }}>{doctrine.connexion_francais}</div>
        </div>
      )}
    </div>
  );
}
