import { useState } from 'react';
import { useProgression } from './hooks/useProgression';
import { useVocabulaire } from './hooks/useVocabulaire';
import { useVersets } from './hooks/useVersets';
import { useGemini } from './hooks/useGemini';
import Tableau from './components/Tableau';
import LecondeDuJour from './components/LecondeDuJour';
import Dictionnaire from './components/Dictionnaire';
import MonVocabulaire from './components/MonVocabulaire';
import Expressions from './components/Expressions';
import Grammaire from './components/Grammaire';
import Verbes from './components/Verbes';
import Prononciation from './components/Prononciation';
import VocabulaireThemes from './components/VocabulaireThemes';
import Bible from './components/Bible';
import Theologie from './components/Theologie';
import Tuteur from './components/Tuteur';
import RechercheGlobale from './components/RechercheGlobale';

const ONGLETS = [
  { id: 'tableau', icone: '🏠', label: 'Tableau' },
  { id: 'lecon', icone: '📅', label: 'Leçon' },
  { id: 'dictionnaire', icone: '🔍', label: 'Dico' },
  { id: 'vocabulaire', icone: '⭐', label: 'Mots' },
  { id: 'themes', icone: '📖', label: 'Thèmes' },
  { id: 'expressions', icone: '💬', label: 'Idiomes' },
  { id: 'grammaire', icone: '📚', label: 'Grammaire' },
  { id: 'verbes', icone: '🔀', label: 'Verbes' },
  { id: 'prononciation', icone: '👂', label: 'Sons' },
  { id: 'bible', icone: '📜', label: 'Bible' },
  { id: 'theologie', icone: '✝️', label: 'Théologie' },
  { id: 'tuteur', icone: '🤖', label: 'Tuteur' },
];

export default function App() {
  const [ongletActif, setOngletActif] = useState('tableau');
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const progression = useProgression();
  const vocabulaire = useVocabulaire();
  const versets = useVersets();
  const gemini = useGemini();

  const { progression: prog, pourcentageNiveau, niveauDebloque } = progression;

  const niveauActuel = (() => {
    if (pourcentageNiveau('A1') < 70) return 'A1';
    if (pourcentageNiveau('A2') < 70) return 'A2';
    return 'B1+';
  })();

  function rendrePage() {
    switch (ongletActif) {
      case 'tableau':
        return <Tableau progression={prog} pourcentageNiveau={pourcentageNiveau} niveauDebloque={niveauDebloque} vocabulaire={vocabulaire} naviguerVers={setOngletActif} />;
      case 'lecon':
        return <LecondeDuJour progression={prog} completerLecon={progression.completerLecon} vocabulaire={vocabulaire} />;
      case 'dictionnaire':
        return <Dictionnaire vocabulaire={vocabulaire} />;
      case 'vocabulaire':
        return <MonVocabulaire vocabulaire={vocabulaire} />;
      case 'expressions':
        return <Expressions niveauActuel={niveauActuel} />;
      case 'grammaire':
        return <Grammaire niveauActuel={niveauActuel} />;
      case 'verbes':
        return <Verbes />;
      case 'themes':
        return <VocabulaireThemes vocabulaire={vocabulaire} />;
      case 'prononciation':
        return <Prononciation />;
      case 'bible':
        return <Bible versets={versets} gemini={gemini} />;
      case 'theologie':
        return <Theologie />;
      case 'tuteur':
        return <Tuteur gemini={gemini} niveauActuel={niveauActuel} />;
      default:
        return null;
    }
  }

  return (
    <div className="app">
      <nav className="nav-barre">
        <div className="nav-entete">
          <div className="nav-logo">Mon <span>Français</span> Vivant</div>
          <div className="nav-info">
            <button
              onClick={() => setRechercheOuverte(true)}
              title="Recherche globale"
              style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--or)', borderRadius: '20px', padding: '4px 12px', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              🔍
            </button>
            <span className="badge-niveau">{niveauActuel}</span>
            {prog.streak > 0 && (
              <span className="streak-badge">🔥 {prog.streak}</span>
            )}
          </div>
        </div>
        <div className="nav-onglets">
          {ONGLETS.map(o => (
            <button
              key={o.id}
              className={`onglet ${ongletActif === o.id ? 'actif' : ''}`}
              onClick={() => setOngletActif(o.id)}
            >
              <span className="onglet-icone">{o.icone}</span>
              {o.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="contenu-principal">
        {rendrePage()}
      </main>

      <RechercheGlobale
        ouvert={rechercheOuverte}
        fermer={() => setRechercheOuverte(false)}
        naviguerVers={setOngletActif}
        vocabulaire={vocabulaire}
      />
    </div>
  );
}
