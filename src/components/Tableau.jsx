import { versetsDuJour } from '../data/bible_annotations';

const versetDuJour = versetsDuJour[new Date().getDay() % versetsDuJour.length];

export default function Tableau({ progression, pourcentageNiveau, niveauDebloque, vocabulaire, naviguerVers }) {
  const totalJours = 90;
  const joursFaits = progression.leconsFaites?.length || 0;
  const pctGlobal = Math.round((joursFaits / totalJours) * 100);

  const niveaux = [
    { code: 'A1', emoji: '🌱', nom: 'Débutant', description: 'Bases du français' },
    { code: 'A2', emoji: '🌿', nom: 'Intermédiaire', description: 'Conversation' },
    { code: 'B1', emoji: '🌳', nom: 'Avancé', description: 'Expression libre' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="tableau-hero">
        <div className="tableau-titre">Bonjour ! 🇫🇷</div>
        <div className="tableau-sous-titre">
          {progression.streak > 0
            ? `🔥 ${progression.streak} jour${progression.streak > 1 ? 's' : ''} de suite — Continue !`
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

      {/* Niveaux */}
      <div className="grille-niveaux">
        {niveaux.map(n => {
          const debloque = niveauDebloque(n.code);
          const pct = pourcentageNiveau(n.code);
          return (
            <div
              key={n.code}
              className={`carte-niveau ${!debloque ? 'verrouille' : ''}`}
              onClick={() => debloque && naviguerVers('lecon')}
            >
              <div className="niveau-emoji">{debloque ? n.emoji : '🔒'}</div>
              <div className="niveau-code">{n.code}</div>
              <div className="niveau-nom">{n.nom}</div>
              <div className="niveau-pourcentage">{pct}%</div>
            </div>
          );
        })}
      </div>

      {/* Verset du Jour */}
      {versetDuJour && (
        <div className="carte" style={{ marginBottom: '16px', borderLeft: '3px solid var(--or)', background: 'rgba(201,168,76,0.05)', cursor: 'pointer' }} onClick={() => naviguerVers('bible')}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>📜 Verset du Jour</div>
          <div style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--bleu-nuit)', lineHeight: 1.6, marginBottom: '6px' }}>
            « {versetDuJour.fr_court} »
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--or)', fontWeight: 600 }}>{versetDuJour.ref}</div>
          {versetDuJour.mot_cle && (
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--texte-clair)' }}>
              Mot clé : <span style={{ color: 'var(--bleu-nuit)', fontWeight: 600 }}>{versetDuJour.mot_cle.fr}</span> — <span style={{ color: 'var(--or)' }}>{versetDuJour.mot_cle.original}</span>
            </div>
          )}
          <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--bleu-clair)' }}>Lire le passage complet →</div>
        </div>
      )}

      {/* Actions rapides */}
      <div style={{ display: 'grid', gap: '12px' }}>
        <div className="carte">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '4px' }}>
                📅 Leçon du jour
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--texte-clair)' }}>
                Jour {Math.min((progression.leconsFaites?.length || 0) + 1, 90)} sur 90
              </div>
            </div>
            <button className="btn-primaire" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => naviguerVers('lecon')}>
              Commencer →
            </button>
          </div>
        </div>

        {vocabulaire.stats.aReviser > 0 && (
          <div className="carte">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '4px' }}>
                  ⭐ Mots à réviser
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--rouge-erreur)' }}>
                  {vocabulaire.stats.aReviser} mot{vocabulaire.stats.aReviser > 1 ? 's' : ''} t'attendent !
                </div>
              </div>
              <button className="btn-secondaire" style={{ padding: '10px 20px' }} onClick={() => naviguerVers('vocabulaire')}>
                Réviser →
              </button>
            </div>
          </div>
        )}

        {/* Mode maîtrise après 90 jours */}
        {joursFaits >= 90 && (
          <div className="carte" style={{ background: 'linear-gradient(135deg, var(--bleu-moyen), var(--bleu-fonce))', border: '1px solid rgba(201,168,76,0.3)' }}>
            <div style={{ textAlign: 'center', color: 'var(--blanc)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
              <div style={{ fontFamily: 'Lora, serif', fontSize: '1.1rem', color: 'var(--or)', marginBottom: '6px' }}>
                Félicitations ! Tu es Francophone !
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(248,246,240,0.7)' }}>
                Tu continues avec le Mode Maîtrise — apprentissage infini pour perfectionner ton français.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
