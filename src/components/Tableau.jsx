import { versetsDuJour } from '../data/bible_annotations';
import TexteInteractif from './TexteInteractif';

const versetDuJour = versetsDuJour[new Date().getDay() % versetsDuJour.length];

export default function Tableau({ progression, pourcentageNiveau, niveauDebloque, vocabulaire, naviguerVers }) {
  const totalJours = 90;
  const joursFaits = progression.leconsFaites?.length || 0;
  const pctGlobal = Math.round((joursFaits / totalJours) * 100);

  const niveaux = [
    { code: 'A1', nom: 'Débutant' },
    { code: 'A2', nom: 'Intermédiaire' },
    { code: 'B1', nom: 'Avancé' },
  ];

  return (
    <div>
      <div className="tableau-hero">
        <div className="tableau-titre">Bonjour !</div>
        <div className="tableau-sous-titre">
          {progression.streak > 0
            ? `${progression.streak} jour${progression.streak > 1 ? 's' : ''} de suite — Continue !`
            : 'Commence ta leçon du jour pour démarrer ta série !'}
        </div>
        <div className="progression-label">
          <span>Objectif : Francophone en 3 mois</span>
          <span>{pctGlobal}%</span>
        </div>
        <div className="barre-progression">
          <div className="barre-remplie" style={{ width: `${pctGlobal}%` }} />
        </div>
        <div className="grille-stats">
          <div className="stat-carte">
            <span className="stat-valeur">{joursFaits}</span>
            <div className="stat-label">Leçons</div>
          </div>
          <div className="stat-carte">
            <span className="stat-valeur">{vocabulaire.stats.total}</span>
            <div className="stat-label">Mots sauvés</div>
          </div>
          <div className="stat-carte">
            <span className="stat-valeur">{vocabulaire.stats.maîtrisés}</span>
            <div className="stat-label">Maîtrisés</div>
          </div>
        </div>
      </div>

      <div className="grille-niveaux">
        {niveaux.map(n => {
          const debloque = niveauDebloque(n.code);
          const pct = pourcentageNiveau(n.code);
          return (
            <div key={n.code} className={`carte-niveau ${!debloque ? 'verrouille' : ''}`} onClick={() => debloque && naviguerVers('lecon')}>
              <div className="niveau-code">{debloque ? n.code : '—'}</div>
              <div className="niveau-nom">{n.nom}</div>
              <div className="niveau-pourcentage">{pct}%</div>
            </div>
          );
        })}
      </div>

      {versetDuJour && (
        <div className="carte-accent carte-clickable" style={{ marginBottom: 'var(--sp-4)' }} onClick={() => naviguerVers('bible')}>
          <div className="section-label">Verset du Jour</div>
          <div className="heading-card" style={{ fontStyle: 'italic', marginBottom: 'var(--sp-2)' }}>
            <TexteInteractif texte={`« ${versetDuJour.fr_court} »`} />
          </div>
          <div className="text-accent">{versetDuJour.ref}</div>
          {versetDuJour.mot_cle && (
            <div className="text-secondary" style={{ marginTop: 'var(--sp-2)' }}>
              Mot clé : <strong>{versetDuJour.mot_cle.fr}</strong> — <span className="text-accent">{versetDuJour.mot_cle.original}</span>
            </div>
          )}
          <div style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>Lire le passage complet →</div>
        </div>
      )}

      <div className="stack">
        <div className="carte">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-4)' }}>
            <div>
              <div className="heading-card" style={{ marginBottom: 'var(--sp-1)' }}>Leçon du jour</div>
              <div className="text-secondary">Jour {Math.min((progression.leconsFaites?.length || 0) + 1, 120)} sur 120</div>
            </div>
            <button className="btn-primaire" style={{ width: 'auto' }} onClick={() => naviguerVers('lecon')}>Commencer →</button>
          </div>
        </div>

        {vocabulaire.stats.aReviser > 0 && (
          <div className="carte">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-4)' }}>
              <div>
                <div className="heading-card" style={{ marginBottom: 'var(--sp-1)' }}>Mots à réviser</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--error)' }}>
                  {vocabulaire.stats.aReviser} mot{vocabulaire.stats.aReviser > 1 ? 's' : ''} t'attendent !
                </div>
              </div>
              <button className="btn-secondaire" onClick={() => naviguerVers('vocabulaire')}>Réviser →</button>
            </div>
          </div>
        )}

        {joursFaits >= 120 && (
          <div className="carte-primary" style={{ textAlign: 'center' }}>
            <div className="heading-section" style={{ color: 'var(--accent)', marginBottom: 'var(--sp-2)' }}>
              Félicitations ! Tu es Francophone !
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.75)' }}>
              Tu continues avec le Mode Maîtrise — apprentissage infini pour perfectionner ton français.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
