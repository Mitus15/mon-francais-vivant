import { useDefinition } from '../contexts/DefinitionContext';

export default function DefinitionPopover() {
  const { motActif, definition, loading, fermer, sauvegarder } = useDefinition();

  if (!motActif) return null;

  // Position: below the clicked word, centered
  const { rect } = motActif;
  const top = Math.min(rect.bottom + 8, window.innerHeight - 320);
  const left = Math.max(16, Math.min(rect.left + rect.width / 2 - 150, window.innerWidth - 316));

  return (
    <>
      <div className="definition-popover-overlay" onClick={fermer} />
      <div className="definition-popover" style={{ top: `${top}px`, left: `${left}px` }}>
        <div className="definition-popover-header">
          <span className="definition-popover-mot">{motActif.mot}</span>
          <button className="definition-popover-close" onClick={fermer}>&times;</button>
        </div>

        {loading && (
          <div style={{ padding: '12px 0', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
            Chargement...
          </div>
        )}

        {!loading && !definition && (
          <div style={{ padding: '12px 0', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
            Définition introuvable.
          </div>
        )}

        {!loading && definition && (
          <div>
            {definition.definitions?.slice(0, 3).map((d, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? '12px' : 0 }}>
                {d.type && (
                  <span className="type-grammatical" style={{ marginBottom: '4px' }}>{d.type}</span>
                )}
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', lineHeight: 1.5, marginTop: d.type ? '4px' : 0 }}>
                  {d.texte}
                </div>
                {d.exemples?.[0] && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', fontStyle: 'italic', marginTop: '4px' }}>
                    {d.exemples[0]}
                  </div>
                )}
              </div>
            ))}

            {definition.etymologie && (
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                Étymologie : {definition.etymologie}
              </div>
            )}

            {definition.synonymes?.length > 0 && (
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' }}>
                <span className="text-meta" style={{ fontSize: 'var(--text-xs)' }}>Syn :</span>
                {definition.synonymes.slice(0, 3).map((s, i) => (
                  <span key={i} className="synonyme-chip" style={{ fontSize: 'var(--text-xs)', padding: '2px 6px' }}>
                    {typeof s === 'string' ? s : s.mot}
                  </span>
                ))}
              </div>
            )}

            {definition.antonymes?.length > 0 && (
              <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' }}>
                <span className="text-meta" style={{ fontSize: 'var(--text-xs)' }}>Ant :</span>
                {definition.antonymes.slice(0, 3).map((a, i) => (
                  <span key={i} className="synonyme-chip" style={{ fontSize: 'var(--text-xs)', padding: '2px 6px', borderColor: 'var(--error)' }}>
                    {typeof a === 'string' ? a : a.mot}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-ajouter" onClick={sauvegarder}>
                Sauvegarder
              </button>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                {definition.source}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
