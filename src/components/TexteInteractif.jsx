import { useDefinition } from '../contexts/DefinitionContext';

export default function TexteInteractif({ texte, className = '' }) {
  const { ouvrir } = useDefinition();

  if (!texte) return null;

  // Split on word boundaries — include all apostrophe types as separators
  const segments = texte.split(/(\s+|[.,;:!?''\u2019\u2018"«»()[\]{}—–…])/);

  function handleClick(e, mot) {
    const cleaned = mot.replace(/[.,;:!?''\u2019\u2018"«»()[\]{}—–\-…]/g, '').trim();
    if (!cleaned || cleaned.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ouvrir(cleaned, rect);
  }

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (/^[\s.,;:!?''\u2019\u2018"«»()[\]{}—–…]*$/.test(seg)) {
          return <span key={i}>{seg}</span>;
        }
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
