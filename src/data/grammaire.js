// Leçons de grammaire structurées par niveau
export const lecons = [
  // ============ A1 — DÉBUTANT ============
  {
    id: "articles",
    titre: "Les Articles",
    niveau: "A1",
    categorie: "articles",
    introduction: "En français, chaque nom a un genre : masculin ou féminin. L'article s'accorde avec le nom.",
    sections: [
      {
        sous_titre: "Articles définis — pour une chose précise",
        regles: [
          { regle: "le", usage: "devant un nom masculin singulier", exemple: "le livre, le soleil, le chat" },
          { regle: "la", usage: "devant un nom féminin singulier", exemple: "la maison, la lune, la femme" },
          { regle: "l'", usage: "devant un nom commençant par une voyelle ou un h muet", exemple: "l'école, l'homme, l'ami" },
          { regle: "les", usage: "devant tout nom pluriel (masculin ou féminin)", exemple: "les livres, les maisons, les amis" },
        ],
      },
      {
        sous_titre: "Articles indéfinis — pour une chose non précisée",
        regles: [
          { regle: "un", usage: "devant un nom masculin singulier", exemple: "un livre, un garçon" },
          { regle: "une", usage: "devant un nom féminin singulier", exemple: "une maison, une fille" },
          { regle: "des", usage: "devant tout nom pluriel", exemple: "des livres, des maisons" },
        ],
      },
      {
        sous_titre: "Articles partitifs — pour une quantité indéfinie",
        regles: [
          { regle: "du", usage: "masculin singulier (= une partie de)", exemple: "Je mange du pain. Je bois du lait." },
          { regle: "de la", usage: "féminin singulier", exemple: "Je mange de la viande. Elle boit de la limonade." },
          { regle: "de l'", usage: "devant une voyelle", exemple: "Je bois de l'eau. Je mange de l'agneau." },
        ],
      },
    ],
    exercices: [
      { question: "J'ai ___ chien et ___ chat.", reponse: "un chien et un chat", options: ["un / un", "le / la", "une / une", "du / de la"] },
      { question: "___ soleil brille aujourd'hui.", reponse: "Le soleil", options: ["Le soleil", "Un soleil", "La soleil", "Des soleil"] },
      { question: "Elle boit ___ café chaque matin.", reponse: "du café", options: ["du café", "le café", "un café", "des café"] },
    ],
  },
  {
    id: "pronoms-personnels",
    titre: "Les Pronoms Personnels",
    niveau: "A1",
    categorie: "pronoms",
    introduction: "Les pronoms personnels remplacent les noms de personnes ou de choses pour éviter les répétitions.",
    sections: [
      {
        sous_titre: "Pronoms sujets — qui fait l'action",
        regles: [
          { regle: "je / j'", usage: "la première personne du singulier (moi)", exemple: "Je parle français." },
          { regle: "tu", usage: "la deuxième personne du singulier (une personne, informel)", exemple: "Tu es mon ami." },
          { regle: "il / elle", usage: "la troisième personne du singulier (lui / elle)", exemple: "Il travaille. Elle chante." },
          { regle: "nous", usage: "la première personne du pluriel (moi + d'autres)", exemple: "Nous mangeons ensemble." },
          { regle: "vous", usage: "deuxième personne du pluriel ou forme de politesse", exemple: "Vous êtes professeur ? (formel)" },
          { regle: "ils / elles", usage: "troisième personne du pluriel (eux / elles)", exemple: "Ils arrivent. Elles partent." },
        ],
      },
      {
        sous_titre: "Pronoms toniques — pour insister",
        regles: [
          { regle: "moi, toi, lui, elle", usage: "singulier — pour insister ou après une préposition", exemple: "C'est moi. Viens avec moi. C'est lui !" },
          { regle: "nous, vous, eux, elles", usage: "pluriel", exemple: "C'est nous ! Ils parlent d'eux." },
        ],
      },
    ],
    exercices: [
      { question: "___ suis étudiant.", reponse: "Je", options: ["Je", "Tu", "Il", "Nous"] },
      { question: "Marie chante bien. ___ est musicienne.", reponse: "Elle", options: ["Elle", "Il", "Je", "Vous"] },
      { question: "Paul et Marc arrivent. ___ sont en retard.", reponse: "Ils", options: ["Ils", "Elles", "Nous", "Vous"] },
    ],
  },
  {
    id: "negation",
    titre: "La Négation",
    niveau: "A1",
    categorie: "negation",
    introduction: "En français, la négation encadre le verbe : ne...pas, ne...jamais, ne...rien, etc.",
    sections: [
      {
        sous_titre: "La négation simple : ne...pas",
        regles: [
          { regle: "ne + verbe + pas", usage: "pour nier une action", exemple: "Je ne parle pas. Elle ne mange pas." },
          { regle: "n' + verbe (voyelle) + pas", usage: "devant une voyelle, ne devient n'", exemple: "Il n'aime pas. Je n'ai pas faim." },
        ],
      },
      {
        sous_titre: "Autres formes de négation",
        regles: [
          { regle: "ne...jamais", usage: "pour nier une habitude (never)", exemple: "Je ne fume jamais." },
          { regle: "ne...rien", usage: "pour dire qu'il n'y a rien (nothing)", exemple: "Je ne vois rien." },
          { regle: "ne...plus", usage: "pour dire que l'action a cessé (not anymore)", exemple: "Il ne travaille plus ici." },
          { regle: "ne...personne", usage: "pour dire qu'il n'y a personne (nobody)", exemple: "Je ne connais personne ici." },
        ],
      },
    ],
    exercices: [
      { question: "Je parle anglais. → (négatif)", reponse: "Je ne parle pas anglais.", options: ["Je ne parle pas anglais.", "Je parle ne pas anglais.", "Je pas parle anglais.", "Ne je parle pas anglais."] },
      { question: "Elle mange toujours. → (jamais)", reponse: "Elle ne mange jamais.", options: ["Elle ne mange jamais.", "Elle jamais mange.", "Elle ne jamais mange.", "Elle mange ne jamais."] },
    ],
  },
  {
    id: "prepositions-lieu",
    titre: "Les Prépositions de Lieu",
    niveau: "A1",
    categorie: "prepositions",
    introduction: "Les prépositions de lieu indiquent où se trouve quelque chose ou quelqu'un.",
    sections: [
      {
        sous_titre: "Prépositions essentielles",
        regles: [
          { regle: "dans", usage: "à l'intérieur de", exemple: "Le chat est dans la boîte." },
          { regle: "sur", usage: "au-dessus et en contact avec", exemple: "Le livre est sur la table." },
          { regle: "sous", usage: "en dessous de", exemple: "Le chien est sous la chaise." },
          { regle: "devant", usage: "en face, à l'avant", exemple: "Il attend devant la porte." },
          { regle: "derrière", usage: "à l'arrière", exemple: "Le jardin est derrière la maison." },
          { regle: "entre", usage: "au milieu de deux choses", exemple: "La banque est entre la boulangerie et la pharmacie." },
          { regle: "à côté de", usage: "près de, adjacent", exemple: "Elle habite à côté de l'école." },
          { regle: "en face de", usage: "vis-à-vis de", exemple: "La poste est en face de la mairie." },
          { regle: "près de", usage: "non loin de", exemple: "Nous habitons près de la mer." },
          { regle: "loin de", usage: "à grande distance de", exemple: "Il habite loin du centre-ville." },
        ],
      },
      {
        sous_titre: "à, en, au, aux — pour les pays et villes",
        regles: [
          { regle: "à + ville", usage: "pour les villes", exemple: "Je suis à Paris. Elle est à Lyon." },
          { regle: "en + pays féminin/voyelle", usage: "pour les pays féminins", exemple: "Je suis en France, en Espagne, en Italie." },
          { regle: "au + pays masculin", usage: "pour les pays masculins", exemple: "Il est au Japon, au Canada, au Maroc." },
          { regle: "aux + pays pluriel", usage: "pour les pays pluriel", exemple: "Elle est aux États-Unis." },
        ],
      },
    ],
    exercices: [
      { question: "Le livre est ___ la table.", reponse: "sur", options: ["sur", "dans", "sous", "derrière"] },
      { question: "Je vis ___ Paris.", reponse: "à Paris", options: ["à Paris", "en Paris", "au Paris", "dans Paris"] },
      { question: "Il habite ___ France.", reponse: "en France", options: ["en France", "à France", "au France", "dans France"] },
    ],
  },

  // ============ A2 — INTERMÉDIAIRE ============
  {
    id: "pronoms-cod-coi",
    titre: "Les Pronoms COD et COI",
    niveau: "A2",
    categorie: "pronoms",
    introduction: "COD = Complément d'Objet Direct (répond à 'qui ?' ou 'quoi ?'). COI = Complément d'Objet Indirect (répond à 'à qui ?' ou 'à quoi ?').",
    sections: [
      {
        sous_titre: "Pronoms COD — remplacent une personne ou chose directe",
        regles: [
          { regle: "me / m'", usage: "me, moi", exemple: "Il me voit. Elle m'appelle." },
          { regle: "te / t'", usage: "te, toi", exemple: "Je te comprends. Il t'entend." },
          { regle: "le / la / l'", usage: "lui (masc.) / elle (fém.) / devant voyelle", exemple: "Je le connais. Je la vois. Je l'aime." },
          { regle: "nous", usage: "nous", exemple: "Elle nous aide." },
          { regle: "vous", usage: "vous", exemple: "Je vous remercie." },
          { regle: "les", usage: "eux, elles", exemple: "Je les vois chaque jour." },
        ],
      },
      {
        sous_titre: "Pronoms COI — remplacent une personne après 'à'",
        regles: [
          { regle: "me / m'", usage: "à moi", exemple: "Il me parle. Elle m'écrit." },
          { regle: "te / t'", usage: "à toi", exemple: "Je te téléphone." },
          { regle: "lui", usage: "à lui ou à elle", exemple: "Je lui donne le livre. (à Paul / à Marie)" },
          { regle: "nous", usage: "à nous", exemple: "Il nous explique." },
          { regle: "vous", usage: "à vous", exemple: "Je vous réponds." },
          { regle: "leur", usage: "à eux ou à elles", exemple: "Il leur envoie un message." },
        ],
      },
      {
        sous_titre: "Les pronoms y et en",
        regles: [
          { regle: "y", usage: "remplace un lieu ou un complément avec 'à'", exemple: "Tu vas à Paris ? → Tu y vas. Il pense à ses études ? → Il y pense." },
          { regle: "en", usage: "remplace un complément avec 'de' ou une quantité", exemple: "Tu veux du café ? → Tu en veux ? Il parle de son voyage ? → Il en parle." },
        ],
      },
    ],
    exercices: [
      { question: "Je vois Marie tous les jours. → Je ___ vois tous les jours.", reponse: "la", options: ["la", "le", "lui", "les"] },
      { question: "Il parle à ses parents. → Il ___ parle.", reponse: "leur", options: ["leur", "les", "lui", "y"] },
      { question: "Elle va à l'école. → Elle ___ va.", reponse: "y", options: ["y", "en", "lui", "la"] },
    ],
  },
  {
    id: "prepositions-temps",
    titre: "Les Prépositions de Temps",
    niveau: "A2",
    categorie: "prepositions",
    introduction: "Les prépositions de temps permettent de situer une action dans le temps.",
    sections: [
      {
        sous_titre: "Les prépositions essentielles",
        regles: [
          { regle: "à", usage: "pour une heure précise", exemple: "Le train arrive à 14h. Je me lève à 7h." },
          { regle: "en", usage: "pour un mois, une année, une saison (sauf printemps), une durée", exemple: "Je suis né en 1995. En janvier. En été. En deux heures." },
          { regle: "au", usage: "pour le printemps", exemple: "Au printemps, les fleurs éclosent." },
          { regle: "dans", usage: "dans combien de temps (futur)", exemple: "Je pars dans une heure. Le film commence dans 5 minutes." },
          { regle: "depuis", usage: "depuis quand (action qui continue)", exemple: "J'étudie le français depuis 3 mois." },
          { regle: "pendant", usage: "durée d'une action passée ou future", exemple: "J'ai étudié pendant deux heures." },
          { regle: "il y a", usage: "il y a combien de temps (passé)", exemple: "Il est arrivé il y a une heure." },
          { regle: "avant / après", usage: "avant ou après un événement", exemple: "Avant le déjeuner. Après le film." },
        ],
      },
    ],
    exercices: [
      { question: "J'apprends le français ___ six mois.", reponse: "depuis six mois", options: ["depuis six mois", "pendant six mois", "dans six mois", "il y a six mois"] },
      { question: "Il est parti ___ une heure. (il vient de partir)", reponse: "il y a une heure", options: ["il y a une heure", "dans une heure", "depuis une heure", "pendant une heure"] },
    ],
  },

  // ============ B1 — AVANCÉ ============
  {
    id: "subjonctif",
    titre: "Le Subjonctif",
    niveau: "B1",
    categorie: "temps",
    introduction: "Le subjonctif exprime un doute, un souhait, une émotion, une obligation. Il apparaît après certaines conjonctions et expressions.",
    sections: [
      {
        sous_titre: "Quand utiliser le subjonctif ?",
        regles: [
          { regle: "il faut que + subjonctif", usage: "obligation", exemple: "Il faut que tu étudies." },
          { regle: "je veux que + subjonctif", usage: "volonté", exemple: "Je veux que tu viennes." },
          { regle: "je suis content(e) que + subjonctif", usage: "émotion", exemple: "Je suis content que tu sois là." },
          { regle: "bien que + subjonctif", usage: "concession (although)", exemple: "Bien qu'il soit tard, je travaille." },
          { regle: "pour que + subjonctif", usage: "but (so that)", exemple: "Je t'explique pour que tu comprennes." },
          { regle: "avant que + subjonctif", usage: "avant une action", exemple: "Pars avant qu'il pleuve." },
          { regle: "douter que + subjonctif", usage: "doute", exemple: "Je doute qu'il vienne." },
        ],
      },
      {
        sous_titre: "Formation du subjonctif",
        regles: [
          { regle: "Radical (ils au présent) + -e, -es, -e, -ions, -iez, -ent", usage: "règle générale", exemple: "parler → ils parlent → que je parle, que tu parles..." },
          { regle: "être → que je sois, tu sois, il soit...", usage: "irrégulier", exemple: "Il faut que tu sois patient." },
          { regle: "avoir → que j'aie, tu aies, il ait...", usage: "irrégulier", exemple: "Il faut que tu aies confiance." },
          { regle: "aller → que j'aille, tu ailles, il aille...", usage: "irrégulier", exemple: "Je veux qu'il aille chez le médecin." },
          { regle: "faire → que je fasse, tu fasses...", usage: "irrégulier", exemple: "Il faut que tu fasses attention." },
          { regle: "pouvoir → que je puisse, tu puisses...", usage: "irrégulier", exemple: "Je veux que tu puisses venir." },
        ],
      },
    ],
    exercices: [
      { question: "Il faut que tu ___ (venir).", reponse: "viennes", options: ["viennes", "viens", "viendrais", "est venu"] },
      { question: "Bien qu'il ___ (être) fatigué, il travaille.", reponse: "soit", options: ["soit", "est", "sera", "serait"] },
    ],
  },
  {
    id: "voix-passive",
    titre: "La Voix Passive",
    niveau: "B1",
    categorie: "construction",
    introduction: "La voix passive met l'accent sur l'objet de l'action plutôt que sur celui qui fait l'action.",
    sections: [
      {
        sous_titre: "Construction de la voix passive",
        regles: [
          { regle: "être + participe passé (+ par + agent)", usage: "forme de base", exemple: "Le gâteau est mangé par les enfants." },
          { regle: "Actif → Passif", usage: "transformation", exemple: "Paul construit la maison. → La maison est construite par Paul." },
        ],
      },
      {
        sous_titre: "La voix passive à différents temps",
        regles: [
          { regle: "Présent passif", usage: "être (présent) + participe passé", exemple: "Ce film est aimé par tous." },
          { regle: "Passé composé passif", usage: "avoir été + participe passé", exemple: "La lettre a été écrite hier." },
          { regle: "Futur passif", usage: "être (futur) + participe passé", exemple: "Le livre sera publié demain." },
        ],
      },
    ],
    exercices: [
      { question: "Le professeur corrige les copies. → Les copies ___ par le professeur.", reponse: "sont corrigées", options: ["sont corrigées", "sont corrigés", "ont été corrigées", "seront corrigées"] },
    ],
  },
];

export const pronoms = {
  sujets: ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"],
  COD: ["me/m'", "te/t'", "le/la/l'", "nous", "vous", "les"],
  COI: ["me/m'", "te/t'", "lui", "nous", "vous", "leur"],
  toniques: ["moi", "toi", "lui/elle", "nous", "vous", "eux/elles"],
  reflechis: ["me/m'", "te/t'", "se/s'", "nous", "vous", "se/s'"],
  relatifs: {
    "qui": "sujet (personne ou chose) — La femme qui parle est ma mère.",
    "que": "objet direct — Le livre que je lis est passionnant.",
    "où": "lieu ou temps — La ville où j'habite est belle.",
    "dont": "après 'de' — L'homme dont je parle est parti.",
    "lequel/laquelle": "après préposition — Le stylo avec lequel j'écris.",
  },
};

export const prepositions = {
  lieu: {
    "à": "ville, direction",
    "en": "pays féminin",
    "au": "pays masculin",
    "aux": "pays pluriel",
    "dans": "intérieur",
    "sur": "dessus",
    "sous": "dessous",
    "devant": "avant",
    "derrière": "arrière",
    "entre": "au milieu",
    "près de": "proximité",
    "loin de": "distance",
    "à côté de": "à côté",
    "en face de": "vis-à-vis",
  },
  temps: {
    "à": "heure précise",
    "en": "mois, année, durée",
    "dans": "dans combien de temps",
    "depuis": "action qui continue",
    "pendant": "durée passée",
    "il y a": "temps écoulé",
    "avant": "avant un événement",
    "après": "après un événement",
    "jusqu'à": "jusqu'à un moment",
    "dès": "dès que, immédiatement",
  },
};
