import { useState, useEffect } from 'react';
import { programme } from '../data/programme';
import { useLeconSession } from '../hooks/useLeconSession';
import TexteInteractif from './TexteInteractif';

export default function LecondeDuJour({ progression, completerLecon, vocabulaire }) {
  const jourActuel = Math.min(progression.jourActuel || 1, 120);
  const leconComplete = programme.find(l => l.jour === jourActuel);

  if (leconComplete) {
    return <LeconComplete lecon={leconComplete} jourActuel={jourActuel} progression={progression} completerLecon={completerLecon} vocabulaire={vocabulaire} />;
  }
  return <LeconGenerique jourActuel={jourActuel} progression={progression} completerLecon={completerLecon} />;
}

// ==================== Shell principal ====================

function LeconComplete({ lecon, jourActuel, progression, completerLecon, vocabulaire }) {
  const dejaFaite = progression.leconsFaites?.includes(jourActuel);
  const session = useLeconSession(lecon, jourActuel, dejaFaite);

  // Compléter la leçon quand la session est terminée
  useEffect(() => {
    if (session.termine && !dejaFaite) {
      completerLecon(jourActuel, session.scoreFinal);
    }
  }, [session.termine]);

  if (session.termine) {
    return (
      <div className="carte" style={{ textAlign: 'center', padding: 'var(--sp-10) var(--sp-6)' }}>
        <div className="heading-section" style={{ marginBottom: 'var(--sp-2)' }}>Leçon terminée !</div>
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-4)' }}>
          {dejaFaite ? 'Tu avais déjà fait cette leçon.' : `Jour ${jourActuel} complété ! Continue demain.`}
        </div>
        {!dejaFaite && (
          <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--primary)', marginBottom: 'var(--sp-4)' }}>
            +{session.scoreFinal * 10} XP
          </div>
        )}
        <div className="text-meta" style={{ marginBottom: 'var(--sp-6)' }}>
          Score : {session.scoreFinal}%
        </div>
      </div>
    );
  }

  return (
    <div>
      <BarreProgression
        jourActuel={jourActuel}
        dejaFaite={dejaFaite}
        phases={session.phases}
        phaseIndex={session.phaseIndex}
        activitesDone={session.activitesDone}
        totalActivites={session.totalActivites}
        lecon={lecon}
      />

      <div className="carte">
        <RenduActivite
          activite={session.activiteActuelle}
          vocabulaire={vocabulaire}
          onComplete={session.completerActivite}
        />
      </div>
    </div>
  );
}

// ==================== Barre de progression ====================

function BarreProgression({ jourActuel, dejaFaite, phases, phaseIndex, activitesDone, totalActivites, lecon }) {
  const pourcent = totalActivites > 0 ? (activitesDone / totalActivites) * 100 : 0;

  return (
    <div style={{ marginBottom: 'var(--sp-4)' }}>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 120</span>
        <span className={`chip-niveau chip-${lecon.niveau}`}>{lecon.niveau}</span>
        {dejaFaite && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 600 }}>Complété</span>}
      </div>

      <div className="phases-breadcrumb">
        {phases.map((phase, i) => (
          <span key={phase.id}>
            {i > 0 && <span className="phase-separateur"> &gt; </span>}
            <span className={`phase-item ${i === phaseIndex ? 'actif' : i < phaseIndex ? 'fait' : ''}`}>
              {i < phaseIndex ? '\u2713 ' : ''}{phase.label}
            </span>
          </span>
        ))}
      </div>

      <div className="session-barre">
        <div className="session-remplie" style={{ width: `${pourcent}%` }} />
      </div>
      <div className="text-meta" style={{ marginTop: 'var(--sp-1)' }}>
        {activitesDone} / {totalActivites} activités
      </div>
    </div>
  );
}

// ==================== Dispatcher ====================

function RenduActivite({ activite, vocabulaire, onComplete }) {
  if (!activite) return null;

  switch (activite.type) {
    case 'lecture_regle':
      return <LectureRegle data={activite.data} onComplete={onComplete} />;
    case 'lecture_expression':
      return <LectureExpression data={activite.data} onComplete={onComplete} />;
    case 'lecture_dialogue':
      return <LectureDialogue data={activite.data} onComplete={onComplete} />;
    case 'flashcards_lecon':
      return <FlashcardsLecon mots={activite.data} vocabulaire={vocabulaire} onComplete={onComplete} />;
    case 'qcm_definition':
    case 'qcm_inverse':
    case 'qcm_comprehension':
      return <QcmSerie items={activite.data} onComplete={onComplete} />;
    case 'paires':
      return <JeuPaires data={activite.data} onComplete={onComplete} />;
    case 'lacunes':
      return <RemplisBlancs items={activite.data} onComplete={onComplete} />;
    case 'qcm':
      return <QcmUnique exercice={activite.data} onComplete={onComplete} />;
    case 'production':
    case 'conjugaison':
      return <SaisieLibre exercice={activite.data} onComplete={onComplete} />;
    case 'traduction_inverse':
      return <LectureEtRappel exercice={activite.data} onComplete={onComplete} />;
    default:
      return (
        <div>
          <div className="text-secondary" style={{ marginBottom: 'var(--sp-4)' }}>Activité en cours...</div>
          <button className="btn-primaire" onClick={() => onComplete(100)}>Continuer</button>
        </div>
      );
  }
}

// ==================== Composants d'activité ====================

// --- Lecture Règle ---
function LectureRegle({ data, onComplete }) {
  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Règle du jour</div>
      <div className="section-regle">
        <h3>{data.titre}</h3>
        <p><TexteInteractif texte={data.contenu} /></p>
      </div>
      <button className="btn-primaire" onClick={() => onComplete(100)}>Continuer</button>
    </div>
  );
}

// --- Lecture Expression ---
function LectureExpression({ data, onComplete }) {
  return (
    <div>
      <div className="section-expression">
        <div className="expression-badge">Expression du jour</div>
        <div className="expression-texte"><TexteInteractif texte={`« ${data.expression} »`} /></div>
        <div className="expression-sens"><TexteInteractif texte={data.signification} /></div>
        <div className="expression-exemple"><TexteInteractif texte={data.exemple} /></div>
      </div>
      <button className="btn-primaire" onClick={() => onComplete(100)}>Continuer</button>
    </div>
  );
}

// --- Lecture Dialogue ---
function LectureDialogue({ data, onComplete }) {
  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Dialogue</div>
      {data.contexte && (
        <div className="text-meta" style={{ marginBottom: 'var(--sp-4)', fontStyle: 'italic' }}>{data.contexte}</div>
      )}
      <div className="stack" style={{ marginBottom: 'var(--sp-5)' }}>
        {data.repliques.map((r, i) => (
          <div key={i} className="dialogue-replique">
            <span className="dialogue-personnage">{r.personnage} :</span>{' '}
            <TexteInteractif texte={r.texte} />
          </div>
        ))}
      </div>
      <button className="btn-primaire" onClick={() => onComplete(100)}>Continuer</button>
    </div>
  );
}

// --- Flashcards Leçon ---
function FlashcardsLecon({ mots, vocabulaire, onComplete }) {
  const [index, setIndex] = useState(0);
  const [retournee, setRetournee] = useState(false);
  const [connus, setConnus] = useState(0);

  const motActuel = mots[index];
  const total = mots.length;

  function repondre(connu) {
    if (connu) setConnus(prev => prev + 1);
    setRetournee(false);
    if (index + 1 >= total) {
      const score = Math.round(((connus + (connu ? 1 : 0)) / total) * 100);
      onComplete(score);
    } else {
      setIndex(prev => prev + 1);
    }
  }

  if (!motActuel) return null;
  const motSauvegarde = vocabulaire.mots.find(m => m.mot === motActuel.mot);

  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Flashcards</div>
      <div className="text-meta" style={{ textAlign: 'center', marginBottom: 'var(--sp-3)' }}>
        {index + 1} / {total} cartes
      </div>

      <div className="flashcard-scene" onClick={() => setRetournee(!retournee)}>
        <div className={`flashcard-carte ${retournee ? 'retournee' : ''}`}>
          <div className="flashcard-face flashcard-recto">
            <div className="flashcard-mot">{motActuel.mot}</div>
            <div className="flashcard-hint">Touche pour retourner</div>
          </div>
          <div className="flashcard-face flashcard-verso">
            <div className="flashcard-definition">{motActuel.definition}</div>
            <div className="flashcard-exemple">{motActuel.exemple}</div>
            <div style={{ marginTop: 'var(--sp-3)' }}>
              <button
                className={`btn-ajouter ${motSauvegarde ? 'deja' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  vocabulaire.ajouterMot({ mot: motActuel.mot, definition: motActuel.definition, exemple: motActuel.exemple });
                }}
              >
                {motSauvegarde ? 'Sauvé' : '+ Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {retournee && (
        <div className="flashcard-boutons">
          <button className="btn-connu" onClick={() => repondre(true)}>Je connais</button>
          <button className="btn-revoir" onClick={() => repondre(false)}>À revoir</button>
        </div>
      )}
    </div>
  );
}

// --- QCM Série ---
function QcmSerie({ items, onComplete }) {
  const [indexQ, setIndexQ] = useState(0);
  const [reponseChoisie, setReponseChoisie] = useState(null);
  const [score, setScore] = useState(0);

  const total = items.length;
  const question = items[indexQ];

  function choisir(opt) {
    if (reponseChoisie) return;
    setReponseChoisie(opt);
    const correct = opt === question.reponse;
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      setReponseChoisie(null);
      if (indexQ + 1 >= total) {
        onComplete(Math.round(((score + (correct ? 1 : 0)) / total) * 100));
      } else {
        setIndexQ(prev => prev + 1);
      }
    }, 1200);
  }

  if (!question) return null;

  return (
    <div>
      <div className="text-meta" style={{ marginBottom: 'var(--sp-3)' }}>
        Question {indexQ + 1} / {total}
      </div>
      <div className="quiz-question">{question.question}</div>
      <div className="quiz-options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`quiz-option ${reponseChoisie ? opt === question.reponse ? 'correct' : opt === reponseChoisie ? 'incorrect' : '' : ''}`}
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

// --- Jeu de Paires (Matching) ---
function JeuPaires({ data, onComplete }) {
  const [selMot, setSelMot] = useState(null);
  const [selDef, setSelDef] = useState(null);
  const [trouves, setTrouves] = useState([]);
  const [erreur, setErreur] = useState(null);

  const { paires, mots, definitions } = data;

  useEffect(() => {
    if (selMot !== null && selDef !== null) {
      const paire = paires.find(p => p.mot === selMot && p.definition === selDef);
      if (paire) {
        setTrouves(prev => [...prev, paire.mot]);
        setSelMot(null);
        setSelDef(null);
        if (trouves.length + 1 >= paires.length) {
          setTimeout(() => onComplete(100), 600);
        }
      } else {
        setErreur({ mot: selMot, def: selDef });
        setTimeout(() => {
          setSelMot(null);
          setSelDef(null);
          setErreur(null);
        }, 800);
      }
    }
  }, [selMot, selDef]);

  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Associe les paires</div>
      <div className="text-meta" style={{ marginBottom: 'var(--sp-3)' }}>
        {trouves.length} / {paires.length} paires trouvées
      </div>
      <div className="paires-grille">
        <div className="paire-colonne">
          {mots.map((mot, i) => {
            const trouve = trouves.includes(mot);
            const estErreur = erreur?.mot === mot;
            return (
              <button
                key={i}
                className={`quiz-option ${trouve ? 'correct' : selMot === mot ? 'selected' : estErreur ? 'incorrect' : ''}`}
                onClick={() => !trouve && setSelMot(mot)}
                disabled={trouve}
                style={trouve ? { opacity: 0.5 } : {}}
              >
                {mot}
              </button>
            );
          })}
        </div>
        <div className="paire-colonne">
          {definitions.map((def, i) => {
            const trouve = paires.some(p => p.definition === def && trouves.includes(p.mot));
            const estErreur = erreur?.def === def;
            return (
              <button
                key={i}
                className={`quiz-option ${trouve ? 'correct' : selDef === def ? 'selected' : estErreur ? 'incorrect' : ''}`}
                onClick={() => !trouve && setSelDef(def)}
                disabled={trouve}
                style={trouve ? { opacity: 0.5 } : {}}
              >
                {def}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Remplis les Blancs (Lacunes) ---
function RemplisBlancs({ items, onComplete }) {
  const [indexL, setIndexL] = useState(0);
  const [saisie, setSaisie] = useState('');
  const [etat, setEtat] = useState(null); // null | 'correct' | 'incorrect'
  const [score, setScore] = useState(0);

  const total = items.length;
  const item = items[indexL];

  function verifier() {
    const correct = saisie.trim().toLowerCase() === item.reponse.toLowerCase();
    setEtat(correct ? 'correct' : 'incorrect');
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      setEtat(null);
      setSaisie('');
      if (indexL + 1 >= total) {
        onComplete(Math.round(((score + (correct ? 1 : 0)) / total) * 100));
      } else {
        setIndexL(prev => prev + 1);
      }
    }, 1500);
  }

  if (!item) return null;

  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Complète la phrase</div>
      <div className="text-meta" style={{ marginBottom: 'var(--sp-3)' }}>
        {indexL + 1} / {total}
      </div>

      <div className="quiz-question" style={{ lineHeight: 2 }}>
        {item.phrase.split('___').map((part, i, arr) => (
          <span key={i}>
            <TexteInteractif texte={part} />
            {i < arr.length - 1 && (
              <input
                className={`champ-lacune ${etat || ''}`}
                value={saisie}
                onChange={e => setSaisie(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saisie.trim() && verifier()}
                placeholder="..."
                disabled={!!etat}
                style={{ width: `${Math.max(item.reponse.length * 12, 80)}px` }}
                autoFocus
              />
            )}
          </span>
        ))}
      </div>

      {etat === 'incorrect' && (
        <div style={{ color: 'var(--error)', fontSize: 'var(--text-sm)', marginTop: 'var(--sp-2)' }}>
          Réponse : {item.reponse}
        </div>
      )}

      <div className="text-meta" style={{ marginTop: 'var(--sp-2)', marginBottom: 'var(--sp-3)' }}>
        Indice : {item.indice}
      </div>

      {!etat && (
        <button className="btn-primaire" onClick={verifier} disabled={!saisie.trim()}>
          Vérifier
        </button>
      )}
    </div>
  );
}

// --- QCM Unique (exercice existant) ---
function QcmUnique({ exercice, onComplete }) {
  const [reponseChoisie, setReponseChoisie] = useState(null);

  function choisir(opt) {
    if (reponseChoisie) return;
    setReponseChoisie(opt);
    const correct = opt === exercice.reponse;
    setTimeout(() => {
      onComplete(correct ? 100 : 60);
    }, 1500);
  }

  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Exercice</div>
      <div className="quiz-question">{exercice.question}</div>
      <div className="quiz-options">
        {exercice.options?.map((opt, i) => (
          <button
            key={i}
            className={`quiz-option ${reponseChoisie ? opt === exercice.reponse ? 'correct' : opt === reponseChoisie ? 'incorrect' : '' : ''}`}
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

// --- Saisie Libre (production / conjugaison) ---
function SaisieLibre({ exercice, onComplete }) {
  const [saisie, setSaisie] = useState('');
  const [revele, setRevele] = useState(false);

  const consigne = exercice.consigne || exercice.question || '';
  const reponse = exercice.reponse || '';

  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Exercice</div>
      <div className="quiz-question"><TexteInteractif texte={consigne} /></div>

      {!revele ? (
        <div>
          <textarea
            value={saisie}
            onChange={e => setSaisie(e.target.value)}
            placeholder="Tape ta réponse ici..."
            style={{
              width: '100%', minHeight: '80px', padding: 'var(--sp-3)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'var(--text-base)',
              resize: 'vertical', background: 'var(--surface)',
            }}
          />
          <button className="btn-primaire" style={{ marginTop: 'var(--sp-3)' }} onClick={() => setRevele(true)}>
            Vérifier
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 'var(--sp-4)' }}>
            <div className="text-meta" style={{ marginBottom: 'var(--sp-1)' }}>Ta réponse :</div>
            <div style={{
              padding: 'var(--sp-3)', background: 'var(--surface-alt)',
              borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-3)',
            }}>
              {saisie || '(vide)'}
            </div>
            <div className="text-meta" style={{ marginBottom: 'var(--sp-1)' }}>Réponse attendue :</div>
            <div style={{
              padding: 'var(--sp-3)', background: 'var(--success-light)',
              borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', color: 'var(--success)', fontWeight: 600,
            }}>
              {reponse}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
            <button className="btn-connu" onClick={() => onComplete(100)}>Je l'avais</button>
            <button className="btn-revoir" onClick={() => onComplete(60)}>Pas tout à fait</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Lecture et Rappel (traduction_inverse) ---
function LectureEtRappel({ exercice, onComplete }) {
  const items = exercice.items || [];
  const [index, setIndex] = useState(0);
  const [retournee, setRetournee] = useState(false);
  const [connus, setConnus] = useState(0);

  if (items.length === 0) {
    return (
      <div>
        <div className="quiz-question"><TexteInteractif texte={exercice.consigne || ''} /></div>
        <button className="btn-primaire" onClick={() => onComplete(100)}>Continuer</button>
      </div>
    );
  }

  const motActuel = items[index];

  function repondre(connu) {
    if (connu) setConnus(prev => prev + 1);
    setRetournee(false);
    if (index + 1 >= items.length) {
      onComplete(Math.round(((connus + (connu ? 1 : 0)) / items.length) * 100));
    } else {
      setIndex(prev => prev + 1);
    }
  }

  return (
    <div>
      <div className="heading-card" style={{ marginBottom: 'var(--sp-3)' }}>Rappel</div>
      {exercice.consigne && (
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-3)' }}>{exercice.consigne}</div>
      )}
      <div className="text-meta" style={{ textAlign: 'center', marginBottom: 'var(--sp-3)' }}>
        {index + 1} / {items.length}
      </div>

      <div className="flashcard-scene" onClick={() => setRetournee(!retournee)}>
        <div className={`flashcard-carte ${retournee ? 'retournee' : ''}`}>
          <div className="flashcard-face flashcard-recto">
            <div className="flashcard-mot">{motActuel}</div>
            <div className="flashcard-hint">Tu connais ce mot ? Touche pour vérifier</div>
          </div>
          <div className="flashcard-face flashcard-verso">
            <div className="flashcard-definition">{motActuel}</div>
          </div>
        </div>
      </div>

      {retournee && (
        <div className="flashcard-boutons">
          <button className="btn-connu" onClick={() => repondre(true)}>Je connais</button>
          <button className="btn-revoir" onClick={() => repondre(false)}>À revoir</button>
        </div>
      )}
    </div>
  );
}

// ==================== Fallback pour jours sans contenu ====================

function LeconGenerique({ jourActuel, progression, completerLecon }) {
  const dejaFaite = progression.leconsFaites?.includes(jourActuel);
  const niveau = jourActuel <= 30 ? 'A1' : jourActuel <= 60 ? 'A2' : jourActuel <= 90 ? 'B1' : 'B2';

  return (
    <div>
      <div className="lecon-header">
        <span className="lecon-numero">Jour {jourActuel} / 120</span>
      </div>

      <div className="carte">
        <div className="lecon-titre-h">Leçon du jour — Niveau {niveau}</div>
        <div className="text-secondary" style={{ marginBottom: 'var(--sp-5)' }}>
          <span className={`chip-niveau chip-${niveau}`}>{niveau}</span>
        </div>

        <div className="section-regle">
          <h3>Pratique libre</h3>
          <p>Pour ce jour, explore les sections qui t'intéressent :{'\n\n'}• Cherche de nouveaux mots dans le Dictionnaire{'\n'}• Révise les verbes et leurs conjugaisons{'\n'}• Lis des expressions idiomatiques{'\n'}• Révise tes flashcards dans Mon Vocabulaire</p>
        </div>

        <button className="btn-primaire" onClick={() => { if (!dejaFaite) completerLecon(jourActuel, 100); }}>
          {dejaFaite ? 'Déjà complété' : 'Marquer comme complété'}
        </button>
      </div>
    </div>
  );
}
