import { useState } from 'react';
import { useProgression } from './hooks/useProgression';
import { useVocabulaire } from './hooks/useVocabulaire';
import { useVersets } from './hooks/useVersets';
import { useGemini } from './hooks/useGemini';
import { DefinitionProvider } from './contexts/DefinitionContext';
import DefinitionPopover from './components/DefinitionPopover';
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
  { id: 'accueil', label: 'Accueil' },
  { id: 'apprendre', label: 'Apprendre' },
  { id: 'mots', label: 'Mots' },
  { id: 'bible', label: 'Bible' },
  { id: 'ia', label: 'Tuteur' },
];

const SOUS_ONGLETS = {
  apprendre: [
    { id: 'lecon', label: 'Leçon du jour' },
    { id: 'grammaire', label: 'Grammaire' },
    { id: 'verbes', label: 'Conjugaison' },
    { id: 'expressions', label: 'Expressions' },
    { id: 'prononciation', label: 'Prononciation' },
  ],
  mots: [
    { id: 'dictionnaire', label: 'Dictionnaire' },
    { id: 'vocabulaire', label: 'Mon vocabulaire' },
    { id: 'themes', label: 'Par thème' },
  ],
  bible: [
    { id: 'bible', label: 'Lire la Bible' },
    { id: 'theologie', label: 'Théologie' },
  ],
};

export default function App() {
  const [ongletActif, setOngletActif] = useState('accueil');
  const [sousOnglets, setSousOnglets] = useState({
    apprendre: 'lecon',
    mots: 'dictionnaire',
    bible: 'bible',
  });
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

  function naviguerVers(page) {
    // Smart navigation: map old page ids to new grouped structure
    if (page === 'tableau') { setOngletActif('accueil'); return; }
    if (['lecon', 'grammaire', 'verbes', 'expressions', 'prononciation'].includes(page)) {
      setOngletActif('apprendre');
      setSousOnglets(prev => ({ ...prev, apprendre: page }));
      return;
    }
    if (['dictionnaire', 'vocabulaire', 'themes'].includes(page)) {
      setOngletActif('mots');
      setSousOnglets(prev => ({ ...prev, mots: page }));
      return;
    }
    if (['bible', 'theologie'].includes(page)) {
      setOngletActif('bible');
      setSousOnglets(prev => ({ ...prev, bible: page }));
      return;
    }
    if (page === 'tuteur' || page === 'ia') { setOngletActif('ia'); return; }
  }

  function sousOngletActif() {
    return sousOnglets[ongletActif] || null;
  }

  function rendrePage() {
    if (ongletActif === 'accueil') {
      return <Tableau progression={prog} pourcentageNiveau={pourcentageNiveau} niveauDebloque={niveauDebloque} vocabulaire={vocabulaire} naviguerVers={naviguerVers} />;
    }
    if (ongletActif === 'ia') {
      return <Tuteur gemini={gemini} niveauActuel={niveauActuel} />;
    }

    const sous = sousOngletActif();
    switch (sous) {
      case 'lecon': return <LecondeDuJour progression={prog} completerLecon={progression.completerLecon} vocabulaire={vocabulaire} />;
      case 'grammaire': return <Grammaire niveauActuel={niveauActuel} />;
      case 'verbes': return <Verbes />;
      case 'expressions': return <Expressions niveauActuel={niveauActuel} />;
      case 'prononciation': return <Prononciation />;
      case 'dictionnaire': return <Dictionnaire vocabulaire={vocabulaire} />;
      case 'vocabulaire': return <MonVocabulaire vocabulaire={vocabulaire} />;
      case 'themes': return <VocabulaireThemes vocabulaire={vocabulaire} />;
      case 'bible': return <Bible versets={versets} gemini={gemini} />;
      case 'theologie': return <Theologie />;
      default: return null;
    }
  }

  const sousList = SOUS_ONGLETS[ongletActif] || null;

  return (
    <DefinitionProvider vocabulaire={vocabulaire}>
      <div className="app">
        <nav className="nav-barre">
          <div className="nav-entete">
            <div className="nav-logo">Mon <span>Français</span> Vivant</div>
            <div className="nav-info">
              <button
                onClick={() => setRechercheOuverte(true)}
                className="btn-ghost"
                title="Recherche"
              >
                Rechercher
              </button>
              <span className="badge-niveau">{niveauActuel}</span>
              {prog.streak > 0 && (
                <span className="streak-badge">{prog.streak}j</span>
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
                {o.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="contenu-principal">
          {sousList && (
            <div className="sous-nav">
              {sousList.map(s => (
                <button
                  key={s.id}
                  className={`sous-nav-btn ${sousOnglets[ongletActif] === s.id ? 'actif' : ''}`}
                  onClick={() => setSousOnglets(prev => ({ ...prev, [ongletActif]: s.id }))}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          {rendrePage()}
        </main>

        <RechercheGlobale
          ouvert={rechercheOuverte}
          fermer={() => setRechercheOuverte(false)}
          naviguerVers={naviguerVers}
          vocabulaire={vocabulaire}
        />
        <DefinitionPopover />
      </div>
    </DefinitionProvider>
  );
}
