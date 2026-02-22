import { useState, useCallback } from 'react';

const CLE_API = 'monFrancaisVivant_geminiKey';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [apiKey, setApiKeyState] = useState(() => {
    try { return localStorage.getItem(CLE_API) || ''; } catch { return ''; }
  });

  function setApiKey(key) {
    const k = key.trim();
    localStorage.setItem(CLE_API, k);
    setApiKeyState(k);
  }

  const generateResponse = useCallback(async (systemPrompt, messages) => {
    const key = localStorage.getItem(CLE_API) || apiKey;
    if (!key) {
      setErreur('Clé API Gemini manquante. Configure-la dans l\'onglet Tuteur.');
      return null;
    }

    setLoading(true);
    setErreur(null);

    // Build contents array — Gemini expects alternating user/model roles
    const contents = [];

    // If there's a system prompt, prepend as first user message
    if (systemPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: `[Instructions système] ${systemPrompt}` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Compris. Je suis prêt à t\'aider.' }],
      });
    }

    for (const msg of messages) {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.text }],
      });
    }

    try {
      const res = await fetch(`${API_URL}?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.error?.message || `Erreur ${res.status}`;
        throw new Error(msg);
      }

      const texte = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!texte) throw new Error('Réponse vide de Gemini.');

      return texte;
    } catch (e) {
      setErreur(e.message || 'Erreur de connexion à Gemini.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  async function testerConnexion() {
    const rep = await generateResponse(null, [{ role: 'user', text: 'Dis bonjour en français en une phrase.' }]);
    return rep !== null;
  }

  return {
    generateResponse,
    testerConnexion,
    loading,
    erreur,
    apiKey,
    setApiKey,
    hasKey: !!apiKey,
  };
}
