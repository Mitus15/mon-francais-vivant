import { useState } from 'react';
import TexteInteractif from './TexteInteractif';

const MODES = ['liste', 'flashcards', 'quiz'];

export default function MonVocabulaire({ vocabulaire }) {
  const [mode, setMode] = useState('liste');
  const [filtre, setFiltre] = useState('tous');

  const { mots, supprimerMot, mettreAJourNiveau, motsAReviser, stats } = vocabulaire;

  const motsFiltres = filtre === 'tous' ? mots
    : filtre === 'reviser' ? motsAReviser()
    : mots.filter(m => m.niveau === filtre);

  return (
    <div>
      <h2 className="section-titre">Mon Vocabulaire</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--sp-2)', marginBottom: 'var(--sp-5)' }}>
        {[
          { label: 'Total', val: stats.total, couleur: 'var(--accent)' },
          { label: 'Nouveaux', val: stats.nouveaux, couleur: 'var(--primary)' },
          { label: 'En cours', val: stats.enCours, couleur: 'var(--accent-dark)' },
          { label: 'Maîtrisés', val: stats.maîtrisés, couleur: 'var(--success)' },
        ].map(s => (
          <div key={s.label} className="stat-carte" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span className="stat-valeur" style={{ color: s.couleur, fontSize: 'var(--text-xl)' }}>{s.val}</span>
            <div className="stat-label" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="filtres" style={{ marginBottom: 'var(--sp-4)' }}>
        {[['liste', 'Liste'], ['flashcards', 'Flashcards'], ['quiz', 'Quiz']].map(([m, label]) => (
          <button key={m} className={`filtre-btn ${mode === m ? 'actif' : ''}`} onClick={() => setMode(m)}>
            {label}
          </button>
        ))}
      </div>

      {mots.length === 0 ? (
        <div className="etat-vide">
          <h3>Aucun mot sauvegardé</h3>
          <p>Cherche des mots dans le Dictionnaire et clique "+ Sauvegarder" pour les ajouter ici.</p>
        </div>
      ) : mode === 'liste' ? (
        <Liste mots={motsFiltres} filtre={filtre} setFiltre={setFiltre} supprimerMot={supprimerMot} />
      ) : mode === 'flashcards' ? (
        <Flashcards mots={motsFiltres.length > 0 ? motsFiltres : mots} mettreAJourNiveau={mettreAJourNiveau} />
      ) : (
        <Quiz mots={mots} mettreAJourNiveau={mettreAJourNiveau} />
      )}
    </div>
  );
}

function Liste({ mots, filtre, setFiltre, supprimerMot }) {
  return (
    <div>
      <div className="filtres">
        {[['tous', 'Tous'], ['nouveau', 'Nouveaux'], ['en_cours', 'En cours'], ['maîtrisé', 'Maîtrisés'], ['reviser', 'À réviser']].map(([f, l]) => (
          <button key={f} className={`filtre-btn ${filtre === f ? 'actif' : ''}`} onClick={() => setFiltre(f)}>{l}</button>
        ))}
      </div>

      {mots.length === 0 ? (
        <div className="etat-vide">
          <h3>Aucun mot dans cette catégorie</h3>
        </div>
      ) : (
        <div className="stack-sm">
          {mots.map(m => (
            <div key={m.id} className="carte" style={{ padding: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
                <div style={{ flex: 1 }}>
                  <div className="heading-card">{m.mot}</div>
                  <div className="text-secondary" style={{ marginTop: 2 }}><TexteInteractif texte={m.definition} /></div>
                  {m.exemple && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)', fontStyle: 'italic', marginTop: 'var(--sp-1)' }}><TexteInteractif texte={`« ${m.exemple} »`} /></div>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexShrink: 0 }}>
                  <span className={`chip-niveau ${m.niveau === 'maîtrisé' ? 'chip-A1' : m.niveau === 'en_cours' ? 'chip-A2' : 'chip-infini'}`}>
                    {m.niveau === 'maîtrisé' ? 'Maîtrisé' : m.niveau === 'en_cours' ? 'En cours' : 'Nouveau'}
                  </span>
                  <button onClick={() => supprimerMot(m.id)} className="btn-ghost" style={{ fontSize: 'var(--text-base)' }}>×</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Flashcards({ mots, mettreAJourNiveau }) {
  const [index, setIndex] = useState(0);
  const [retournee, setRetournee] = useState(false);

  const motsMelangees = [...mots].sort(() => Math.random() - 0.5);
  const motActuel = motsMelangees[index % motsMelangees.length];

  if (!motActuel || mots.length === 0) {
    return (
      <div className="etat-vide">
        <h3>Aucun mot à réviser</h3>
        <p>Sauvegarde des mots pour créer des flashcards.</p>
      </div>
    );
  }

  function repondre(connu) {
    mettreAJourNiveau(motActuel.id, connu);
    setRetournee(false);
    setIndex(prev => prev + 1);
  }

  return (
    <div>
      <div className="text-secondary" style={{ textAlign: 'center', marginBottom: 'var(--sp-3)' }}>
        {(index % mots.length) + 1} / {mots.length} cartes
      </div>

      <div className="flashcard-scene" onClick={() => setRetournee(!retournee)}>
        <div className={`flashcard-carte ${retournee ? 'retournee' : ''}`}>
          <div className="flashcard-face flashcard-recto">
            <div className="flashcard-mot">{motActuel.mot}</div>
            <div className="flashcard-hint">Clique pour voir la définition</div>
          </div>
          <div className="flashcard-face flashcard-verso">
            <div className="flashcard-definition"><TexteInteractif texte={motActuel.definition} /></div>
            {motActuel.exemple && <div className="flashcard-exemple"><TexteInteractif texte={`« ${motActuel.exemple} »`} /></div>}
          </div>
        </div>
      </div>

      {retournee && (
        <div className="flashcard-boutons">
          <button className="btn-revoir" onClick={() => repondre(false)}>À réviser</button>
          <button className="btn-connu" onClick={() => repondre(true)}>Je connais</button>
        </div>
      )}

      {!retournee && (
        <div className="text-meta" style={{ textAlign: 'center' }}>Clique sur la carte pour retourner</div>
      )}
    </div>
  );
}

function Quiz({ mots, mettreAJourNiveau }) {
  const [indexQ, setIndexQ] = useState(0);
  const [reponseChoisie, setReponseChoisie] = useState(null);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);

  const total = Math.min(mots.length, 10);
  const motsMelangees = [...mots].sort(() => Math.random() - 0.5).slice(0, total);
  const question = motsMelangees[indexQ];

  if (mots.length < 3) {
    return (
      <div className="etat-vide">
        <h3>Pas assez de mots</h3>
        <p>Sauvegarde au moins 3 mots pour jouer au quiz.</p>
      </div>
    );
  }

  if (termine) {
    return (
      <div className="carte" style={{ textAlign: 'center', padding: 'var(--sp-10) var(--sp-6)' }}>
        <div className="heading-section" style={{ marginBottom: 'var(--sp-2)' }}>
          {score} / {total} bonnes réponses
        </div>
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-6)' }}>
          {score >= total * 0.8 ? 'Excellent ! Tu maîtrises bien ces mots.' : score >= total * 0.5 ? 'Bien ! Continue à réviser.' : 'Revois ces mots avec les flashcards.'}
        </div>
        <button className="btn-primaire" style={{ width: 'auto' }} onClick={() => { setIndexQ(0); setScore(0); setTermine(false); setReponseChoisie(null); }}>
          Recommencer
        </button>
      </div>
    );
  }

  const autresMots = mots.filter(m => m.id !== question.id);
  const distracteurs = autresMots.sort(() => Math.random() - 0.5).slice(0, 3).map(m => m.mot);
  const options = [...distracteurs, question.mot].sort(() => Math.random() - 0.5);

  function choisir(opt) {
    if (reponseChoisie) return;
    setReponseChoisie(opt);
    const correct = opt === question.mot;
    if (correct) setScore(s => s + 1);
    mettreAJourNiveau(question.id, correct);
    setTimeout(() => {
      setReponseChoisie(null);
      if (indexQ + 1 >= total) setTermine(true);
      else setIndexQ(prev => prev + 1);
    }, 1200);
  }

  return (
    <div className="carte">
      <div className="text-meta" style={{ marginBottom: 'var(--sp-4)' }}>
        Question {indexQ + 1} / {total} — Score : {score}
      </div>
      <div className="quiz-question">
        Quel mot correspond à cette définition ?
        <br /><br />
        <em className="text-secondary" style={{ fontSize: 'var(--text-base)' }}>
          <TexteInteractif texte={`« ${question.definition} »`} />
        </em>
      </div>
      <div className="quiz-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`quiz-option ${reponseChoisie ? opt === question.mot ? 'correct' : opt === reponseChoisie ? 'incorrect' : '' : ''}`}
            onClick={() => choisir(opt)}
            disabled={!!reponseChoisie}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
