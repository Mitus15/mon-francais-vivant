import { useDefinition } from '../contexts/DefinitionContext';

export default function TexteInteractif({ texte, className = '' }) {
  const { ouvrir } = useDefinition();

  if (!texte) return null;

  // Split on word boundaries, keeping punctuation and spaces as separators
  const segments = texte.split(/(\s+|[.,;:!?'"«»()[\]{}—–…])/);

  function handleClick(e, mot) {
    const cleaned = mot.replace(/[.,;:!?'"«»()[\]{}—–\-…]/g, '').trim();
    if (!cleaned || cleaned.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ouvrir(cleaned, rect);
  }

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        // If it's whitespace or punctuation, render as-is
        if (/^[\s.,;:!?'"«»()[\]{}—–…]*$/.test(seg)) {
          return <span key={i}>{seg}</span>;
        }
        // It's a word — make it clickable
        return (
          <span
            key={i}
            className="texte-interactif-mot"
            onClick={(e) => handleClick(e, seg)}
          >
            {seg}
          </span>
        );
      })}
    </span>
  );
}
