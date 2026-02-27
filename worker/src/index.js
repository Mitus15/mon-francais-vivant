export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS + cache headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=300',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      let result;

      // GET /word/:mot — exact word lookup
      if (path.startsWith('/word/')) {
        const mot = decodeURIComponent(path.slice(6)).toLowerCase().trim();
        result = await env.DB.prepare(
          'SELECT mot, type, definition, exemple, synonymes FROM mots WHERE mot = ? LIMIT 1'
        ).bind(mot).first();

        if (!result) {
          // Try partial match (without articles)
          const sansArticle = mot.replace(/^(le |la |l'|les |un |une |des |du |de la |de l')/, '');
          if (sansArticle !== mot) {
            result = await env.DB.prepare(
              'SELECT mot, type, definition, exemple, synonymes FROM mots WHERE mot = ? LIMIT 1'
            ).bind(sansArticle).first();
          }
          // Try with common articles prepended
          if (!result) {
            const { results } = await env.DB.prepare(
              "SELECT mot, type, definition, exemple, synonymes FROM mots WHERE mot LIKE ? LIMIT 5"
            ).bind(`%${mot}`).all();
            if (results.length > 0) result = results[0];
          }
        }

        if (!result) {
          return json({ error: 'Mot non trouvé' }, 404, corsHeaders);
        }

        return json(formatEntry(result), 200, corsHeaders);
      }

      // GET /search?q=:query — search with autocomplete
      if (path === '/search') {
        const q = (url.searchParams.get('q') || '').toLowerCase().trim();
        const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
        if (!q || q.length < 2) {
          return json({ results: [] }, 200, corsHeaders);
        }

        const { results } = await env.DB.prepare(
          'SELECT mot, type, definition, exemple, synonymes FROM mots WHERE mot LIKE ? ORDER BY LENGTH(mot) ASC LIMIT ?'
        ).bind(`${q}%`, limit).all();

        return json({ results: results.map(formatEntry) }, 200, corsHeaders);
      }

      // GET /browse/:lettre — browse by first letter
      if (path.startsWith('/browse/')) {
        const lettre = decodeURIComponent(path.slice(8)).toUpperCase().charAt(0);
        const page = parseInt(url.searchParams.get('page') || '0');
        const limit = 100;
        const offset = page * limit;

        const lower = lettre.toLowerCase();
        const { results } = await env.DB.prepare(
          'SELECT mot, type, definition, exemple, synonymes FROM mots WHERE mot LIKE ? ORDER BY mot COLLATE NOCASE LIMIT ? OFFSET ?'
        ).bind(`${lower}%`, limit, offset).all();

        const countResult = await env.DB.prepare(
          'SELECT COUNT(*) as total FROM mots WHERE mot LIKE ?'
        ).bind(`${lower}%`).first();

        return json({
          lettre,
          total: countResult?.total || 0,
          page,
          results: results.map(formatEntry),
        }, 200, corsHeaders);
      }

      // GET /random — random word
      if (path === '/random') {
        result = await env.DB.prepare(
          'SELECT mot, type, definition, exemple, synonymes FROM mots ORDER BY RANDOM() LIMIT 1'
        ).first();

        return json(formatEntry(result), 200, corsHeaders);
      }

      // GET /stats — dictionary stats
      if (path === '/stats') {
        const count = await env.DB.prepare('SELECT COUNT(*) as total FROM mots').first();
        return json({ total: count?.total || 0 }, 200, corsHeaders);
      }

      return json({ error: 'Route non trouvée' }, 404, corsHeaders);

    } catch (e) {
      return json({ error: e.message }, 500, corsHeaders);
    }
  }
};

function cleanDef(text) {
  if (!text) return '';
  return text
    .replace(/^\['/g, '').replace(/'\]$/g, '')
    .replace(/^, '/g, '').replace(/', $/g, '')
    .replace(/',\s*'/g, ' ; ')
    .replace(/'\s*,\s*/g, ' ; ')
    .replace(/,\s*'/g, ' ; ')
    .replace(/^["']+|["']+$/g, '')
    .replace(/\s*;\s*,\s*/g, ' ; ')
    .replace(/\s*;\s*$/g, '')
    .replace(/^\s*;\s*/g, '')
    .replace(/(\s*;\s*){2,}/g, ' ; ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function formatEntry(row) {
  if (!row) return null;
  let synonymes = [];
  try {
    synonymes = row.synonymes ? JSON.parse(row.synonymes) : [];
  } catch { synonymes = []; }
  return {
    mot: row.mot,
    type: row.type || '',
    definition: cleanDef(row.definition),
    exemple: row.exemple || '',
    synonymes,
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}
