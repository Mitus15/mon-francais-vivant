import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = {
  A1: ["Présente-toi en français", "Explique-moi les articles (le, la, les)", "Aide-moi à conjuguer 'être'", "Comment dit-on 'bonjour' et 'au revoir' ?"],
  A2: ["Comment utiliser les prépositions ?", "Quelle est la différence entre 'savoir' et 'connaître' ?", "Aide-moi à écrire une lettre simple", "Raconte-moi une histoire courte"],
  'B1+': ["Discutons d'un verset biblique en français", "Explique la notion de grâce en français élégant", "Aide-moi à écrire un essai sur la foi", "Débattons : quelle est la valeur du multilinguisme ?"],
};

export default function Tuteur({ gemini, niveauActuel }) {
  const [onglet, setOnglet] = useState(gemini.hasKey ? 'chat' : 'config');

  return (
    <div>
      <h2 className="section-titre">🤖 Tuteur IA — Gemini</h2>
      <p className="section-intro">
        Un tuteur personnel en français, adapté à ton niveau <strong style={{ color: 'var(--or)' }}>{niveauActuel}</strong>.
        Conversation, corrections, exercices — tout en français.
      </p>

      <div className="filtres" style={{ marginBottom: '20px' }}>
        {[['chat', '💬 Conversation'], ['correcteur', '✍️ Correcteur'], ['exercices', '🎯 Exercices'], ['config', '⚙️ Config']].map(([v, l]) => (
          <button key={v} className={`filtre-btn ${onglet === v ? 'actif' : ''}`} onClick={() => setOnglet(v)}>{l}</button>
        ))}
      </div>

      {onglet === 'chat' && <VueChat gemini={gemini} niveauActuel={niveauActuel} />}
      {onglet === 'correcteur' && <VueCorrecteur gemini={gemini} niveauActuel={niveauActuel} />}
      {onglet === 'exercices' && <VueExercices gemini={gemini} niveauActuel={niveauActuel} />}
      {onglet === 'config' && <VueConfig gemini={gemini} allerVersChat={() => setOnglet('chat')} />}
    </div>
  );
}

function VueChat({ gemini, niveauActuel }) {
  const [messages, setMessages] = useState([]);
  const [saisie, setSaisie] = useState('');
  const finRef = useRef(null);
  const suggestions = SUGGESTIONS[niveauActuel] || SUGGESTIONS.A1;

  const systemPrompt = `Tu es un tuteur de français bienveillant et encourageant. L'utilisateur est de niveau ${niveauActuel}.
- Réponds TOUJOURS en français.
- Adapte ton vocabulaire et ta complexité grammaticale au niveau ${niveauActuel}.
- Si l'utilisateur fait une faute, corrige-le doucement à la fin de ta réponse (entre parenthèses).
- Sois chaleureux, patient et encourageant.
- Pour le niveau A1 : phrases courtes, vocabulaire simple, beaucoup d'exemples.
- Pour le niveau B1+ : phrases plus complexes, vocabulaire riche, discussions approfondies.`;

  useEffect(() => { finRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, gemini.loading]);

  async function envoyer() {
    const texte = saisie.trim();
    if (!texte || gemini.loading) return;
    const nouvsMessages = [...messages, { role: 'user', text: texte }];
    setMessages(nouvsMessages);
    setSaisie('');
    const rep = await gemini.generateResponse(systemPrompt, nouvsMessages);
    if (rep) setMessages(prev => [...prev, { role: 'assistant', text: rep }]);
    else if (gemini.erreur) setMessages(prev => [...prev, { role: 'erreur', text: gemini.erreur }]);
  }

  if (!gemini.hasKey) return <BanniereConfigRequise />;

  return (
    <div>
      {messages.length === 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--texte-clair)', marginBottom: '10px' }}>Suggestions pour ton niveau {niveauActuel} :</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => setSaisie(s)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--texte)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px', padding: '4px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            background: m.role === 'user' ? 'var(--bleu-moyen)' : m.role === 'erreur' ? 'rgba(244,67,54,0.15)' : 'rgba(255,255,255,0.08)',
            border: '1px solid ' + (m.role === 'user' ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.1)'),
            borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            padding: '10px 14px', fontSize: '0.88rem',
            color: m.role === 'erreur' ? '#ef5350' : 'var(--texte)',
            lineHeight: 1.6, whiteSpace: 'pre-wrap',
          }}>
            {m.role === 'assistant' && <div style={{ fontSize: '0.65rem', color: 'var(--or)', fontWeight: 700, marginBottom: '4px' }}>🤖 TUTEUR IA</div>}
            {m.text}
          </div>
        ))}
        {gemini.loading && <div style={{ alignSelf: 'flex-start', color: 'var(--gris)', fontSize: '0.85rem', fontStyle: 'italic' }}>Gemini réfléchit...</div>}
        <div ref={finRef} />
      </div>

      {messages.length > 0 && (
        <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: 'var(--gris)', cursor: 'pointer', fontSize: '0.78rem', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
          🗑️ Nouvelle conversation
        </button>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text" value={saisie} onChange={e => setSaisie(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && envoyer()}
          placeholder="Écris en français..."
          style={{ flex: 1, padding: '12px 14px', borderRadius: 'var(--radius)', border: '2px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.97)', color: 'var(--texte)', fontSize: '0.95rem', outline: 'none', fontFamily: 'Inter, sans-serif' }}
        />
        <button onClick={envoyer} disabled={gemini.loading} className="btn-primaire" style={{ width: 'auto', padding: '12px 18px' }}>Envoyer</button>
      </div>
    </div>
  );
}

function VueCorrecteur({ gemini, niveauActuel }) {
  const [texte, setTexte] = useState('');
  const [resultat, setResultat] = useState(null);

  if (!gemini.hasKey) return <BanniereConfigRequise />;

  async function analyser() {
    if (!texte.trim() || gemini.loading) return;
    const prompt = `Tu es un professeur de français expert. Analyse ce texte écrit par un apprenant de niveau ${niveauActuel} et fournis :

1. **TEXTE CORRIGÉ** : la version corrigée
2. **ERREURS** : liste des erreurs avec la règle grammaticale (max 5 erreurs importantes)
3. **POINTS FORTS** : ce qui est bien écrit
4. **NIVEAU ESTIMÉ** : A1 / A2 / B1 / B2

Texte : "${texte}"`;
    setResultat(null);
    const rep = await gemini.generateResponse(null, [{ role: 'user', text: prompt }]);
    setResultat(rep);
  }

  return (
    <div>
      <div style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'var(--texte-clair)' }}>
        Écris ou colle un texte en français — l'IA le corrige et explique les règles.
      </div>
      <textarea
        value={texte} onChange={e => setTexte(e.target.value)}
        placeholder="Colle ou écris ton texte en français ici..."
        rows={6}
        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius)', border: '2px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.97)', color: 'var(--texte)', fontSize: '0.9rem', outline: 'none', fontFamily: 'Lora, serif', resize: 'vertical', marginBottom: '10px', boxSizing: 'border-box' }}
      />
      <button onClick={analyser} disabled={gemini.loading || !texte.trim()} className="btn-primaire" style={{ width: 'auto', padding: '12px 24px', marginBottom: '16px' }}>
        {gemini.loading ? 'Analyse en cours...' : 'Analyser'}
      </button>
      {resultat && (
        <div className="carte" style={{ whiteSpace: 'pre-wrap', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--texte)' }}>
          {resultat}
        </div>
      )}
    </div>
  );
}

function VueExercices({ gemini, niveauActuel }) {
  const [exercice, setExercice] = useState(null);
  const [reponse, setReponse] = useState('');
  const [correction, setCorrection] = useState(null);
  const [typeExo, setTypeExo] = useState('conjugaison');

  if (!gemini.hasKey) return <BanniereConfigRequise />;

  async function genererExercice() {
    setExercice(null); setReponse(''); setCorrection(null);
    const types = {
      conjugaison: 'un exercice de conjugaison avec 5 phrases à compléter (verbe à l\'infinitif entre parenthèses)',
      vocabulaire: 'un exercice de vocabulaire : 5 mots à placer dans les bonnes phrases',
      traduction: '5 courtes phrases à traduire (français ↔ anglais)',
      grammaire: 'un exercice de grammaire sur un point précis (accord, prépositions, articles)',
    };
    const prompt = `Génère ${types[typeExo]} adapté au niveau ${niveauActuel}.\nFormat :\n**EXERCICE : [titre]**\n[Consigne claire]\n[Questions numérotées]\n\nSois précis et pédagogique. Pas encore les réponses.`;
    const rep = await gemini.generateResponse(null, [{ role: 'user', text: prompt }]);
    setExercice(rep);
  }

  async function corriger() {
    if (!reponse.trim() || !exercice) return;
    const prompt = `Voici l'exercice :\n${exercice}\n\nVoici les réponses de l'apprenant (niveau ${niveauActuel}) :\n${reponse}\n\nCorrige les réponses. Pour chaque erreur, explique la règle. Donne un score et encourage l'apprenant.`;
    const rep = await gemini.generateResponse(null, [{ role: 'user', text: prompt }]);
    setCorrection(rep);
  }

  return (
    <div>
      <div className="filtres" style={{ marginBottom: '16px' }}>
        {[['conjugaison', '🔀 Conjugaison'], ['vocabulaire', '📚 Vocabulaire'], ['traduction', '🌐 Traduction'], ['grammaire', '📝 Grammaire']].map(([v, l]) => (
          <button key={v} className={`filtre-btn ${typeExo === v ? 'actif' : ''}`} onClick={() => setTypeExo(v)}>{l}</button>
        ))}
      </div>
      <button onClick={genererExercice} disabled={gemini.loading} className="btn-primaire" style={{ width: 'auto', padding: '12px 24px', marginBottom: '16px' }}>
        {gemini.loading && !exercice ? 'Génération...' : 'Générer un exercice'}
      </button>

      {exercice && (
        <div>
          <div className="carte" style={{ whiteSpace: 'pre-wrap', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--texte)', marginBottom: '12px' }}>{exercice}</div>
          {!correction && (
            <>
              <textarea value={reponse} onChange={e => setReponse(e.target.value)} placeholder="Écris tes réponses ici (numérotées)..." rows={5}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius)', border: '2px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.97)', color: 'var(--texte)', fontSize: '0.9rem', outline: 'none', fontFamily: 'Lora, serif', resize: 'vertical', marginBottom: '10px', boxSizing: 'border-box' }}
              />
              <button onClick={corriger} disabled={gemini.loading || !reponse.trim()} className="btn-primaire" style={{ width: 'auto', padding: '12px 24px' }}>
                {gemini.loading ? 'Correction...' : 'Corriger mes réponses'}
              </button>
            </>
          )}
          {correction && (
            <div>
              <div className="carte" style={{ whiteSpace: 'pre-wrap', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--texte)', marginBottom: '12px' }}>{correction}</div>
              <button onClick={() => { setExercice(null); setCorrection(null); setReponse(''); }} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--or)', borderRadius: '20px', padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Nouvel exercice
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VueConfig({ gemini, allerVersChat }) {
  const [saisieKey, setSaisieKey] = useState(gemini.apiKey);
  const [testOk, setTestOk] = useState(null);
  const [testLoading, setTestLoading] = useState(false);

  async function tester() {
    gemini.setApiKey(saisieKey);
    setTestLoading(true); setTestOk(null);
    const ok = await gemini.testerConnexion();
    setTestOk(ok); setTestLoading(false);
    if (ok) setTimeout(allerVersChat, 1500);
  }

  return (
    <div>
      <div className="carte" style={{ marginBottom: '16px' }}>
        <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--bleu-nuit)', marginBottom: '10px', fontSize: '1rem' }}>Configuration de Gemini AI</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--texte-clair)', lineHeight: 1.6, marginBottom: '14px' }}>
          Pour utiliser le tuteur IA, tu as besoin d'une clé API Gemini (gratuite) :<br />
          1. Va sur <strong style={{ color: 'var(--or)' }}>aistudio.google.com</strong><br />
          2. Clique sur "Get API key" → "Create API key"<br />
          3. Copie la clé et colle-la ci-dessous
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--gris)', marginBottom: '12px' }}>
          🔒 Ta clé est stockée uniquement sur ton appareil (localStorage), jamais envoyée ailleurs.
        </div>
        <input
          type="password" value={saisieKey} onChange={e => setSaisieKey(e.target.value)}
          placeholder="AIza..."
          style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius)', border: '2px solid rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.97)', color: 'var(--texte)', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif', marginBottom: '12px', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={tester} disabled={testLoading || !saisieKey.trim()} className="btn-primaire" style={{ width: 'auto', padding: '10px 20px' }}>
            {testLoading ? 'Test en cours...' : 'Sauvegarder & Tester'}
          </button>
          {testOk === true && <span style={{ color: '#4CAF50', fontSize: '0.85rem', fontWeight: 600 }}>✓ Connexion réussie !</span>}
          {testOk === false && <span style={{ color: '#ef5350', fontSize: '0.85rem' }}>✗ Clé invalide ou erreur réseau.</span>}
        </div>
      </div>

      {gemini.hasKey && (
        <div style={{ background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', fontSize: '0.85rem', color: '#81C784' }}>
          ✓ Clé API configurée. Le tuteur IA est actif.
        </div>
      )}
    </div>
  );
}

function BanniereConfigRequise() {
  return (
    <div className="etat-vide">
      <div className="etat-vide-icone">🔑</div>
      <h3>Clé API requise</h3>
      <p>Configure ta clé Gemini dans l'onglet <strong>⚙️ Config</strong> pour accéder à cette fonctionnalité.</p>
    </div>
  );
}
