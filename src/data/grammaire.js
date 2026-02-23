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
  {
    id: "adjectifs",
    titre: "L'Adjectif",
    niveau: "A1",
    categorie: "adjectifs",
    introduction: "En français, l'adjectif s'accorde en genre (masculin/féminin) et en nombre (singulier/pluriel) avec le nom qu'il qualifie. La plupart des adjectifs se placent après le nom, mais quelques-uns courants se placent avant.",
    sections: [
      {
        sous_titre: "L'accord en genre — masculin et féminin",
        regles: [
          { regle: "Règle générale : + e au féminin", usage: "on ajoute -e au masculin", exemple: "petit → petite, grand → grande, français → française" },
          { regle: "Adjectifs terminés en -e", usage: "identiques au masculin et au féminin", exemple: "jeune → jeune, calme → calme, rouge → rouge" },
          { regle: "Adjectifs en -eux → -euse", usage: "changement de terminaison", exemple: "heureux → heureuse, sérieux → sérieuse" },
          { regle: "Adjectifs en -if → -ive", usage: "changement de terminaison", exemple: "actif → active, sportif → sportive" },
          { regle: "Adjectifs en -er → -ère", usage: "changement de terminaison", exemple: "premier → première, dernier → dernière" },
          { regle: "Irréguliers courants", usage: "formes à mémoriser", exemple: "beau → belle, nouveau → nouvelle, vieux → vieille, blanc → blanche" },
        ],
      },
      {
        sous_titre: "L'accord en nombre — singulier et pluriel",
        regles: [
          { regle: "Règle générale : + s au pluriel", usage: "on ajoute -s", exemple: "petit → petits, petite → petites" },
          { regle: "Adjectifs terminés en -s ou -x", usage: "ne changent pas au pluriel", exemple: "gros → gros, heureux → heureux" },
          { regle: "Adjectifs en -al → -aux", usage: "changement au pluriel masculin", exemple: "national → nationaux, spécial → spéciaux" },
        ],
      },
      {
        sous_titre: "La position de l'adjectif",
        regles: [
          { regle: "Après le nom (majorité)", usage: "la plupart des adjectifs", exemple: "une voiture rouge, un film intéressant, une robe bleue" },
          { regle: "Avant le nom (BANGS)", usage: "Beauté, Âge, Nombre, Grandeur, Sentiment", exemple: "un beau jardin, un jeune homme, un grand arbre, un bon repas" },
          { regle: "Sens différent selon la position", usage: "certains adjectifs changent de sens", exemple: "un homme grand (tall) ≠ un grand homme (great)" },
        ],
      },
    ],
    exercices: [
      { question: "C'est une fille ___ (intelligent).", reponse: "intelligente", options: ["intelligente", "intelligent", "intelligents", "intelligentes"] },
      { question: "Ils ont une ___ maison (beau).", reponse: "belle", options: ["belle", "beau", "bel", "beaux"] },
      { question: "Les garçons sont ___ (heureux).", reponse: "heureux", options: ["heureux", "heureuse", "heureuses", "heureus"] },
      { question: "Elle porte une robe ___ (blanc).", reponse: "blanche", options: ["blanche", "blanc", "blancs", "blanches"] },
    ],
  },
  {
    id: "nombres-heure",
    titre: "Les Nombres & l'Heure",
    niveau: "A1",
    categorie: "nombres",
    introduction: "Savoir compter et dire l'heure est essentiel pour la vie quotidienne en français. Les nombres français ont quelques particularités, notamment à partir de 70.",
    sections: [
      {
        sous_titre: "Les nombres de 0 à 20",
        regles: [
          { regle: "0-10", usage: "à mémoriser individuellement", exemple: "zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix" },
          { regle: "11-16", usage: "formes uniques", exemple: "onze, douze, treize, quatorze, quinze, seize" },
          { regle: "17-19", usage: "dix + unité", exemple: "dix-sept, dix-huit, dix-neuf" },
          { regle: "20", usage: "vingt", exemple: "J'ai vingt ans." },
        ],
      },
      {
        sous_titre: "Les dizaines et les particularités",
        regles: [
          { regle: "20, 30, 40, 50, 60", usage: "vingt, trente, quarante, cinquante, soixante", exemple: "trente-deux, quarante-cinq, cinquante-huit" },
          { regle: "70 = soixante-dix", usage: "60 + 10 (en France)", exemple: "soixante-dix, soixante et onze, soixante-douze..." },
          { regle: "80 = quatre-vingts", usage: "4 × 20", exemple: "quatre-vingts, quatre-vingt-un, quatre-vingt-deux..." },
          { regle: "90 = quatre-vingt-dix", usage: "4 × 20 + 10", exemple: "quatre-vingt-dix, quatre-vingt-onze..." },
          { regle: "100, 1000", usage: "cent, mille", exemple: "cent, deux cents, mille, deux mille" },
        ],
      },
      {
        sous_titre: "Dire l'heure",
        regles: [
          { regle: "Il est + heure(s)", usage: "forme de base", exemple: "Il est trois heures. Il est huit heures." },
          { regle: "et quart / et demie / moins le quart", usage: "les quarts d'heure", exemple: "Il est deux heures et quart. Il est midi et demie. Il est six heures moins le quart." },
          { regle: "midi / minuit", usage: "12h et 0h", exemple: "Il est midi. Il est minuit." },
          { regle: "Système de 24h (formel)", usage: "horaires officiels", exemple: "Le train part à quatorze heures trente (14h30)." },
        ],
      },
    ],
    exercices: [
      { question: "73 en français =", reponse: "soixante-treize", options: ["soixante-treize", "septante-trois", "soixante-trois", "soixante-dix-trois"] },
      { question: "Il est 8h15 =", reponse: "Il est huit heures et quart", options: ["Il est huit heures et quart", "Il est huit heures quinze", "Il est huit et quart", "Il est huit heures et demie"] },
      { question: "91 en français =", reponse: "quatre-vingt-onze", options: ["quatre-vingt-onze", "nonante-un", "quatre-vingt-un", "quatre-vingt-dix-un"] },
    ],
  },
  {
    id: "questions",
    titre: "Les Questions",
    niveau: "A1",
    categorie: "questions",
    introduction: "En français, il y a trois manières principales de poser une question : l'intonation montante (informel), « est-ce que » (standard), et l'inversion sujet-verbe (formel).",
    sections: [
      {
        sous_titre: "Les trois manières de poser une question fermée",
        regles: [
          { regle: "Intonation montante ↗", usage: "oral informel, on monte la voix à la fin", exemple: "Tu parles français ? Vous êtes prêt ?" },
          { regle: "Est-ce que + sujet + verbe ?", usage: "standard, courant", exemple: "Est-ce que tu parles français ? Est-ce qu'elle travaille ici ?" },
          { regle: "Verbe + trait d'union + sujet ?", usage: "formel, inversion", exemple: "Parlez-vous français ? Êtes-vous prêt ?" },
        ],
      },
      {
        sous_titre: "Les mots interrogatifs",
        regles: [
          { regle: "qui", usage: "pour une personne (who)", exemple: "Qui est-ce ? Qui parle ?" },
          { regle: "que / qu'est-ce que", usage: "pour une chose (what)", exemple: "Que fais-tu ? Qu'est-ce que tu fais ?" },
          { regle: "où", usage: "pour un lieu (where)", exemple: "Où habites-tu ? Où est la gare ?" },
          { regle: "quand", usage: "pour le temps (when)", exemple: "Quand pars-tu ? Quand est-ce que tu arrives ?" },
          { regle: "pourquoi / parce que", usage: "pour la raison (why / because)", exemple: "Pourquoi tu pleures ? — Parce que je suis triste." },
          { regle: "comment", usage: "pour la manière (how)", exemple: "Comment tu t'appelles ? Comment ça va ?" },
        ],
      },
      {
        sous_titre: "Quel / Quelle — adjectif interrogatif",
        regles: [
          { regle: "quel + nom masculin singulier", usage: "which / what", exemple: "Quel livre lis-tu ? Quel est ton nom ?" },
          { regle: "quelle + nom féminin singulier", usage: "which / what", exemple: "Quelle heure est-il ? Quelle est ta couleur préférée ?" },
          { regle: "quels / quelles + nom pluriel", usage: "which / what (pluriel)", exemple: "Quels films aimes-tu ? Quelles langues parles-tu ?" },
        ],
      },
    ],
    exercices: [
      { question: "___ tu habites ? (standard)", reponse: "Où est-ce que tu habites ?", options: ["Où est-ce que tu habites ?", "Où tu habites ?", "Habites-tu où ?", "Tu habites où est-ce que ?"] },
      { question: "___ est ton nom ? (formel)", reponse: "Quel est ton nom ?", options: ["Quel est ton nom ?", "Quelle est ton nom ?", "Quels est ton nom ?", "Qui est ton nom ?"] },
      { question: "Vous parlez anglais ? → (inversion)", reponse: "Parlez-vous anglais ?", options: ["Parlez-vous anglais ?", "Vous parlez-anglais ?", "Est-ce que vous parlez anglais ?", "Anglais parlez-vous ?"] },
      { question: "___ tu pleures ? — ___ je suis fatigué.", reponse: "Pourquoi / Parce que", options: ["Pourquoi / Parce que", "Comment / Car", "Quand / Depuis que", "Que / Parce que"] },
    ],
  },
  {
    id: "futur-proche",
    titre: "Le Futur Proche",
    niveau: "A1",
    categorie: "temps",
    introduction: "Le futur proche exprime une action qui va se passer bientôt. Il est très utilisé à l'oral et se forme avec le verbe « aller » conjugué au présent + l'infinitif du verbe.",
    sections: [
      {
        sous_titre: "Formation : aller (présent) + infinitif",
        regles: [
          { regle: "je vais + infinitif", usage: "première personne", exemple: "Je vais manger. Je vais partir." },
          { regle: "tu vas + infinitif", usage: "deuxième personne", exemple: "Tu vas comprendre. Tu vas voir." },
          { regle: "il/elle/on va + infinitif", usage: "troisième personne", exemple: "Elle va arriver. On va danser." },
          { regle: "nous allons + infinitif", usage: "première personne pluriel", exemple: "Nous allons voyager." },
          { regle: "vous allez + infinitif", usage: "deuxième personne pluriel / politesse", exemple: "Vous allez adorer ce film." },
          { regle: "ils/elles vont + infinitif", usage: "troisième personne pluriel", exemple: "Ils vont partir demain." },
        ],
      },
      {
        sous_titre: "La négation au futur proche",
        regles: [
          { regle: "ne + aller + pas + infinitif", usage: "la négation encadre « aller »", exemple: "Je ne vais pas sortir. Elle ne va pas venir." },
          { regle: "Avec les pronoms", usage: "le pronom se place devant l'infinitif", exemple: "Je vais le faire. Je ne vais pas le faire." },
        ],
      },
    ],
    exercices: [
      { question: "Demain, nous ___ (visiter) le musée.", reponse: "allons visiter", options: ["allons visiter", "visitons", "avons visité", "visiterons"] },
      { question: "Ce soir, je ___ (regarder) un film.", reponse: "vais regarder", options: ["vais regarder", "regarde", "ai regardé", "regarderai"] },
      { question: "Elle ___ (ne pas venir) à la fête.", reponse: "ne va pas venir", options: ["ne va pas venir", "ne vient pas", "ne venir pas", "va ne pas venir"] },
    ],
  },
  {
    id: "passe-recent",
    titre: "Le Passé Récent",
    niveau: "A1",
    categorie: "temps",
    introduction: "Le passé récent exprime une action qui vient de se terminer, il y a très peu de temps. Il se forme avec « venir de » conjugué au présent + l'infinitif.",
    sections: [
      {
        sous_titre: "Formation : venir de (présent) + infinitif",
        regles: [
          { regle: "je viens de + infinitif", usage: "première personne", exemple: "Je viens de manger. Je viens d'arriver." },
          { regle: "tu viens de + infinitif", usage: "deuxième personne", exemple: "Tu viens de partir ?" },
          { regle: "il/elle/on vient de + infinitif", usage: "troisième personne", exemple: "Elle vient de téléphoner. On vient de finir." },
          { regle: "nous venons de + infinitif", usage: "première personne pluriel", exemple: "Nous venons de déjeuner." },
          { regle: "vous venez de + infinitif", usage: "deuxième personne pluriel", exemple: "Vous venez d'arriver ?" },
          { regle: "ils/elles viennent de + infinitif", usage: "troisième personne pluriel", exemple: "Ils viennent de partir." },
        ],
      },
      {
        sous_titre: "Emploi et sens",
        regles: [
          { regle: "Action très récente", usage: "quelque chose qui s'est passé il y a quelques instants", exemple: "Le bus vient de partir. (= il est parti il y a 1 minute)" },
          { regle: "≠ passé composé", usage: "le passé récent insiste sur le fait que c'est tout juste terminé", exemple: "J'ai mangé (passé composé) ≠ Je viens de manger (passé récent, tout juste)" },
        ],
      },
    ],
    exercices: [
      { question: "Le film ___ (commencer) — dépêche-toi !", reponse: "vient de commencer", options: ["vient de commencer", "a commencé", "va commencer", "commence"] },
      { question: "Nous ___ (finir) nos devoirs.", reponse: "venons de finir", options: ["venons de finir", "avons fini", "allons finir", "finissons"] },
      { question: "Ils ___ (arriver) à l'aéroport.", reponse: "viennent d'arriver", options: ["viennent d'arriver", "sont arrivés", "vont arriver", "arrivent"] },
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
  {
    id: "imparfait-vs-pc",
    titre: "L'Imparfait vs le Passé Composé",
    niveau: "A2",
    categorie: "temps",
    introduction: "L'imparfait et le passé composé sont les deux temps principaux pour parler du passé. L'imparfait décrit le décor, les habitudes et les états ; le passé composé raconte les événements ponctuels et terminés.",
    sections: [
      {
        sous_titre: "Formation de l'imparfait",
        regles: [
          { regle: "Radical du « nous » au présent + terminaisons", usage: "règle générale", exemple: "nous parlons → je parlais, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient" },
          { regle: "Terminaisons : -ais, -ais, -ait, -ions, -iez, -aient", usage: "identiques pour tous les verbes", exemple: "je finissais, tu venais, il faisait, nous avions, vous étiez" },
          { regle: "Exception : être → ét-", usage: "seul verbe irrégulier à l'imparfait", exemple: "j'étais, tu étais, il était, nous étions, vous étiez, ils étaient" },
        ],
      },
      {
        sous_titre: "Quand utiliser l'imparfait ?",
        regles: [
          { regle: "Description / décor", usage: "le contexte, l'arrière-plan", exemple: "Il faisait beau. Les oiseaux chantaient." },
          { regle: "Habitude dans le passé", usage: "action répétée autrefois", exemple: "Quand j'étais petit, je jouais dans le jardin." },
          { regle: "État / sentiment", usage: "comment on se sentait", exemple: "Elle était fatiguée. J'avais peur." },
        ],
      },
      {
        sous_titre: "Quand utiliser le passé composé ?",
        regles: [
          { regle: "Action ponctuelle terminée", usage: "un événement précis dans le passé", exemple: "Hier, j'ai mangé au restaurant." },
          { regle: "Action avec une durée définie", usage: "début et fin clairs", exemple: "J'ai habité à Paris pendant trois ans." },
          { regle: "Succession d'événements", usage: "une série d'actions", exemple: "Il s'est levé, il a mangé, il est parti." },
        ],
      },
      {
        sous_titre: "Imparfait et passé composé ensemble",
        regles: [
          { regle: "Imparfait = décor + PC = événement", usage: "le décor est interrompu par un événement", exemple: "Je dormais (imparfait) quand le téléphone a sonné (PC)." },
          { regle: "Pendant que + imparfait, PC", usage: "deux actions simultanées de nature différente", exemple: "Pendant qu'il lisait, quelqu'un a frappé à la porte." },
        ],
      },
    ],
    exercices: [
      { question: "Quand j'___ (être) enfant, je ___ (jouer) dehors.", reponse: "étais / jouais", options: ["étais / jouais", "ai été / ai joué", "suis / joue", "étais / ai joué"] },
      { question: "Hier, il ___ (pleuvoir) quand je ___ (sortir).", reponse: "pleuvait / suis sorti(e)", options: ["pleuvait / suis sorti(e)", "a plu / sortais", "pleuvait / sortais", "a plu / suis sorti(e)"] },
      { question: "Elle ___ (regarder) la télé quand le chat ___ (sauter) sur la table.", reponse: "regardait / a sauté", options: ["regardait / a sauté", "a regardé / sautait", "regardait / sautait", "a regardé / a sauté"] },
      { question: "Avant, nous ___ (aller) à la plage chaque été.", reponse: "allions", options: ["allions", "sommes allés", "irons", "allons"] },
    ],
  },
  {
    id: "futur-simple",
    titre: "Le Futur Simple",
    niveau: "A2",
    categorie: "temps",
    introduction: "Le futur simple exprime une action qui se passera dans l'avenir. Il est plus formel que le futur proche et s'utilise souvent à l'écrit, pour des promesses, des prévisions ou des projets lointains.",
    sections: [
      {
        sous_titre: "Formation régulière",
        regles: [
          { regle: "Infinitif + -ai, -as, -a, -ons, -ez, -ont", usage: "verbes en -er et -ir", exemple: "parler → je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront" },
          { regle: "Verbes en -re : infinitif sans le -e final", usage: "on enlève le -e avant d'ajouter les terminaisons", exemple: "prendre → je prendrai, vivre → je vivrai" },
        ],
      },
      {
        sous_titre: "Verbes irréguliers courants au futur",
        regles: [
          { regle: "être → je serai", usage: "radical irrégulier : ser-", exemple: "Je serai médecin. Nous serons en vacances." },
          { regle: "avoir → j'aurai", usage: "radical irrégulier : aur-", exemple: "J'aurai 30 ans en décembre." },
          { regle: "aller → j'irai", usage: "radical irrégulier : ir-", exemple: "J'irai en France l'été prochain." },
          { regle: "faire → je ferai", usage: "radical irrégulier : fer-", exemple: "Demain, je ferai du sport." },
          { regle: "pouvoir → je pourrai", usage: "radical irrégulier : pourr-", exemple: "Un jour, tu pourras parler français couramment." },
          { regle: "venir → je viendrai", usage: "radical irrégulier : viendr-", exemple: "Ils viendront nous voir en mars." },
        ],
      },
      {
        sous_titre: "Emploi du futur simple",
        regles: [
          { regle: "Prédiction / prévision", usage: "ce qui va se passer", exemple: "Demain, il pleuvra." },
          { regle: "Promesse", usage: "engagement pour le futur", exemple: "Je t'appellerai ce soir, c'est promis." },
          { regle: "Hypothèse avec « si » (présent)", usage: "si + présent → futur simple", exemple: "Si tu travailles, tu réussiras." },
        ],
      },
    ],
    exercices: [
      { question: "Demain, je ___ (aller) au cinéma.", reponse: "irai", options: ["irai", "vais aller", "allais", "suis allé"] },
      { question: "Si tu étudies, tu ___ (réussir).", reponse: "réussiras", options: ["réussiras", "réussis", "réussirais", "as réussi"] },
      { question: "L'année prochaine, nous ___ (être) en France.", reponse: "serons", options: ["serons", "sommes", "étions", "serions"] },
      { question: "Elle ___ (avoir) 25 ans en juillet.", reponse: "aura", options: ["aura", "a", "avait", "aurait"] },
    ],
  },
  {
    id: "conditionnel-present",
    titre: "Le Conditionnel Présent",
    niveau: "A2",
    categorie: "temps",
    introduction: "Le conditionnel présent exprime une action hypothétique, un souhait poli, un conseil ou une information non confirmée. Il se forme avec le radical du futur simple + les terminaisons de l'imparfait.",
    sections: [
      {
        sous_titre: "Formation du conditionnel présent",
        regles: [
          { regle: "Radical du futur + -ais, -ais, -ait, -ions, -iez, -aient", usage: "même radical que le futur simple", exemple: "parler → je parlerais, finir → je finirais" },
          { regle: "Irréguliers (mêmes que le futur)", usage: "être → ser-, avoir → aur-, aller → ir-, faire → fer-", exemple: "je serais, j'aurais, j'irais, je ferais, je pourrais, je voudrais" },
        ],
      },
      {
        sous_titre: "Les emplois du conditionnel",
        regles: [
          { regle: "Politesse", usage: "demande polie avec « je voudrais, pourriez-vous »", exemple: "Je voudrais un café, s'il vous plaît. Pourriez-vous m'aider ?" },
          { regle: "Souhait / désir", usage: "ce qu'on aimerait faire", exemple: "J'aimerais voyager. Il voudrait apprendre le piano." },
          { regle: "Conseil", usage: "suggestion avec « tu devrais »", exemple: "Tu devrais te reposer. Vous devriez étudier davantage." },
          { regle: "Hypothèse (si + imparfait)", usage: "condition irréelle au présent", exemple: "Si j'avais de l'argent, je voyagerais. Si j'étais toi, je partirais." },
          { regle: "Information non confirmée", usage: "presse, rumeurs", exemple: "Le président serait malade. Il y aurait dix victimes." },
        ],
      },
    ],
    exercices: [
      { question: "Je ___ (vouloir) un croissant, s'il vous plaît.", reponse: "voudrais", options: ["voudrais", "veux", "voudrai", "voulais"] },
      { question: "Si j'étais riche, je ___ (voyager) partout.", reponse: "voyagerais", options: ["voyagerais", "voyage", "voyagerai", "voyageais"] },
      { question: "Tu ___ (devoir) faire tes devoirs.", reponse: "devrais", options: ["devrais", "dois", "devras", "devais"] },
      { question: "Si nous avions le temps, nous ___ (aller) au musée.", reponse: "irions", options: ["irions", "allons", "irons", "allions"] },
    ],
  },
  {
    id: "adverbes",
    titre: "Les Adverbes",
    niveau: "A2",
    categorie: "adverbes",
    introduction: "Les adverbes modifient un verbe, un adjectif ou un autre adverbe. Ils sont invariables (ne changent jamais de forme). Beaucoup se forment à partir d'un adjectif au féminin + « -ment ».",
    sections: [
      {
        sous_titre: "Formation des adverbes en -ment",
        regles: [
          { regle: "Adjectif féminin + -ment", usage: "règle générale", exemple: "lente → lentement, heureuse → heureusement, douce → doucement" },
          { regle: "Adjectif en -ant → -amment", usage: "transformation spéciale", exemple: "courant → couramment, méchant → méchamment" },
          { regle: "Adjectif en -ent → -emment", usage: "transformation spéciale", exemple: "patient → patiemment, récent → récemment" },
          { regle: "Exceptions", usage: "formes irrégulières", exemple: "bon → bien, mauvais → mal, vite (pas d'adjectif)" },
        ],
      },
      {
        sous_titre: "Adverbes courants par catégorie",
        regles: [
          { regle: "Temps", usage: "quand", exemple: "aujourd'hui, hier, demain, souvent, toujours, jamais, parfois, déjà, encore" },
          { regle: "Lieu", usage: "où", exemple: "ici, là, là-bas, partout, dehors, dedans, loin, près" },
          { regle: "Quantité", usage: "combien", exemple: "beaucoup, peu, trop, assez, très, plus, moins" },
          { regle: "Manière", usage: "comment", exemple: "bien, mal, vite, lentement, ensemble, facilement" },
        ],
      },
      {
        sous_titre: "Place de l'adverbe",
        regles: [
          { regle: "Après le verbe simple", usage: "temps simples (présent, imparfait, futur)", exemple: "Elle parle bien. Il mange beaucoup." },
          { regle: "Entre l'auxiliaire et le participe passé", usage: "temps composés (passé composé)", exemple: "Il a bien mangé. Elle a beaucoup travaillé." },
          { regle: "Adverbes longs : après le participe passé", usage: "adverbes en -ment aux temps composés", exemple: "Il a parlé lentement. Elle a répondu poliment." },
        ],
      },
    ],
    exercices: [
      { question: "Elle chante ___ (bon).", reponse: "bien", options: ["bien", "bon", "bonne", "bonnement"] },
      { question: "Il conduit trop ___ (rapide).", reponse: "vite", options: ["vite", "rapide", "rapidement", "vitement"] },
      { question: "L'adverbe de « patient » est :", reponse: "patiemment", options: ["patiemment", "patientement", "patientment", "patienment"] },
      { question: "Il a ___ travaillé hier. (beaucoup)", reponse: "Il a beaucoup travaillé hier.", options: ["Il a beaucoup travaillé hier.", "Il a travaillé beaucoup hier.", "Il beaucoup a travaillé hier.", "Beaucoup il a travaillé hier."] },
    ],
  },
  {
    id: "comparatifs-superlatifs",
    titre: "Les Comparatifs et Superlatifs",
    niveau: "A2",
    categorie: "adjectifs",
    introduction: "Le comparatif permet de comparer deux éléments (plus, moins, aussi). Le superlatif exprime le degré le plus élevé ou le plus bas dans un groupe.",
    sections: [
      {
        sous_titre: "Le comparatif",
        regles: [
          { regle: "plus + adjectif + que", usage: "supériorité", exemple: "Paris est plus grand que Lyon. Elle est plus intelligente que lui." },
          { regle: "moins + adjectif + que", usage: "infériorité", exemple: "Le chat est moins grand que le chien." },
          { regle: "aussi + adjectif + que", usage: "égalité", exemple: "Marie est aussi grande que Paul." },
          { regle: "bon → meilleur(e) que", usage: "comparatif irrégulier de « bon »", exemple: "Ce gâteau est meilleur que l'autre. (pas « plus bon »)" },
          { regle: "bien → mieux que", usage: "comparatif irrégulier de « bien »", exemple: "Elle chante mieux que moi. (pas « plus bien »)" },
        ],
      },
      {
        sous_titre: "Le superlatif",
        regles: [
          { regle: "le/la/les plus + adjectif", usage: "superlatif de supériorité", exemple: "C'est la plus belle ville du monde." },
          { regle: "le/la/les moins + adjectif", usage: "superlatif d'infériorité", exemple: "C'est le moins cher de tous." },
          { regle: "bon → le/la meilleur(e)", usage: "superlatif irrégulier", exemple: "C'est le meilleur restaurant de la ville." },
          { regle: "bien → le mieux", usage: "superlatif irrégulier", exemple: "C'est elle qui chante le mieux." },
        ],
      },
      {
        sous_titre: "Le comparatif avec les noms et les verbes",
        regles: [
          { regle: "plus de + nom + que", usage: "quantité supérieure", exemple: "Il a plus d'amis que moi." },
          { regle: "moins de + nom + que", usage: "quantité inférieure", exemple: "Elle a moins de temps que toi." },
          { regle: "autant de + nom + que", usage: "quantité égale", exemple: "J'ai autant de livres que toi." },
        ],
      },
    ],
    exercices: [
      { question: "Marie est ___ (+ intelligent) ___ Paul.", reponse: "plus intelligente que", options: ["plus intelligente que", "plus intelligent que", "plus intelligente de", "intelligente plus que"] },
      { question: "Ce gâteau est ___ (+ bon) ___ l'autre.", reponse: "meilleur que", options: ["meilleur que", "plus bon que", "mieux que", "plus bien que"] },
      { question: "C'est ___ (le + beau) film de l'année.", reponse: "le plus beau", options: ["le plus beau", "le plus belle", "le meilleur", "le beau plus"] },
      { question: "Elle chante ___ (+ bien) ___ moi.", reponse: "mieux que", options: ["mieux que", "plus bien que", "meilleur que", "bien plus que"] },
    ],
  },
  {
    id: "pronoms-relatifs",
    titre: "Les Pronoms Relatifs",
    niveau: "A2",
    categorie: "pronoms",
    introduction: "Les pronoms relatifs relient deux phrases en remplaçant un nom déjà mentionné. Ils permettent de construire des phrases plus longues et plus élégantes.",
    sections: [
      {
        sous_titre: "Les pronoms relatifs simples",
        regles: [
          { regle: "qui", usage: "remplace le sujet (personne ou chose)", exemple: "La femme qui parle est ma mère. Le livre qui est sur la table est à moi." },
          { regle: "que / qu'", usage: "remplace le complément d'objet direct", exemple: "Le film que j'ai vu est excellent. L'homme qu'elle aime est gentil." },
          { regle: "où", usage: "remplace un lieu ou un moment", exemple: "La ville où j'habite est belle. Le jour où je suis arrivé, il pleuvait." },
          { regle: "dont", usage: "remplace un complément introduit par « de »", exemple: "Le livre dont je parle est célèbre. L'homme dont j'ai besoin est absent." },
        ],
      },
      {
        sous_titre: "Comment choisir le bon pronom relatif",
        regles: [
          { regle: "Sujet → qui", usage: "le mot remplacé fait l'action du verbe qui suit", exemple: "C'est l'homme. L'homme chante. → C'est l'homme qui chante." },
          { regle: "COD → que", usage: "le mot remplacé est l'objet du verbe qui suit", exemple: "C'est le livre. Je lis le livre. → C'est le livre que je lis." },
          { regle: "Lieu/temps → où", usage: "le mot remplacé est un lieu ou un moment", exemple: "C'est la maison. J'habite dans la maison. → C'est la maison où j'habite." },
          { regle: "Complément de « de » → dont", usage: "le verbe qui suit utilise « de »", exemple: "C'est le film. Je parle de ce film. → C'est le film dont je parle." },
        ],
      },
      {
        sous_titre: "Les pronoms relatifs composés (introduction)",
        regles: [
          { regle: "lequel / laquelle / lesquels / lesquelles", usage: "après une préposition (pour, avec, dans, sur...)", exemple: "Le stylo avec lequel j'écris. La raison pour laquelle je suis venu." },
          { regle: "auquel / à laquelle / auxquels / auxquelles", usage: "à + lequel (contraction)", exemple: "Le projet auquel je pense." },
          { regle: "duquel / de laquelle", usage: "de + lequel (contraction), rare", exemple: "Le bâtiment à côté duquel je travaille." },
        ],
      },
    ],
    exercices: [
      { question: "C'est l'homme ___ travaille ici.", reponse: "qui", options: ["qui", "que", "où", "dont"] },
      { question: "Le livre ___ je lis est passionnant.", reponse: "que", options: ["que", "qui", "dont", "où"] },
      { question: "La ville ___ j'habite est magnifique.", reponse: "où", options: ["où", "que", "qui", "dont"] },
      { question: "C'est le film ___ tout le monde parle.", reponse: "dont", options: ["dont", "que", "qui", "où"] },
    ],
  },
  {
    id: "pronoms-y-en",
    titre: "Les Pronoms Y et EN",
    niveau: "A2",
    categorie: "pronoms",
    introduction: "Les pronoms « y » et « en » remplacent des compléments pour éviter les répétitions. « Y » remplace un lieu ou un complément avec « à ». « En » remplace un complément avec « de » ou une quantité.",
    sections: [
      {
        sous_titre: "Le pronom Y",
        regles: [
          { regle: "Y remplace un lieu", usage: "un endroit déjà mentionné (= là-bas)", exemple: "Tu vas à Paris ? — Oui, j'y vais demain." },
          { regle: "Y remplace « à + chose »", usage: "avec les verbes suivis de « à » + chose", exemple: "Tu penses à ton examen ? — Oui, j'y pense souvent." },
          { regle: "Verbes courants avec « à »", usage: "penser à, participer à, s'intéresser à, réfléchir à", exemple: "Il s'intéresse à la musique. → Il s'y intéresse." },
          { regle: "Position : avant le verbe", usage: "ou avant l'infinitif", exemple: "J'y vais. Je vais y aller. Je n'y vais pas." },
        ],
      },
      {
        sous_titre: "Le pronom EN",
        regles: [
          { regle: "En remplace « de + chose »", usage: "avec les verbes suivis de « de »", exemple: "Tu parles de ton voyage ? — Oui, j'en parle souvent." },
          { regle: "En remplace une quantité", usage: "avec un article partitif ou un nombre", exemple: "Tu veux du café ? — Oui, j'en veux. Tu as des frères ? — J'en ai deux." },
          { regle: "En remplace « de + lieu »", usage: "venir d'un endroit", exemple: "Tu viens de la bibliothèque ? — Oui, j'en viens." },
          { regle: "Position : avant le verbe", usage: "ou avant l'infinitif", exemple: "J'en veux. Je vais en prendre. Je n'en veux pas." },
        ],
      },
      {
        sous_titre: "Y et EN ensemble et pièges courants",
        regles: [
          { regle: "Ordre : Y avant EN", usage: "quand les deux sont présents", exemple: "Il y en a beaucoup. (= il y a beaucoup de choses dans cet endroit)" },
          { regle: "Y ≠ personnes (avec « à »)", usage: "pour les personnes, on utilise les pronoms COI (lui, leur)", exemple: "Je pense à Marie → Je pense à elle. (pas « j'y pense »)" },
          { regle: "EN ≠ personnes (avec « de »)", usage: "pour les personnes, on utilise « de + pronom tonique »", exemple: "Je parle de Paul → Je parle de lui. (pas « j'en parle »)" },
        ],
      },
    ],
    exercices: [
      { question: "Tu vas au marché ? — Oui, j'___ vais.", reponse: "y", options: ["y", "en", "lui", "le"] },
      { question: "Tu veux du fromage ? — Oui, j'___ veux bien.", reponse: "en", options: ["en", "y", "le", "lui"] },
      { question: "Tu as combien de livres ? — J'___ ai vingt.", reponse: "en", options: ["en", "y", "les", "leur"] },
      { question: "Elle pense à son examen ? — Oui, elle ___ pense.", reponse: "y", options: ["y", "en", "lui", "le"] },
    ],
  },
  {
    id: "discours-indirect",
    titre: "Le Discours Indirect",
    niveau: "A2",
    categorie: "construction",
    introduction: "Le discours indirect permet de rapporter les paroles de quelqu'un sans les citer directement. On utilise des verbes comme « dire que », « demander si », « répondre que ». La structure de la phrase change.",
    sections: [
      {
        sous_titre: "Rapporter une affirmation",
        regles: [
          { regle: "dire / affirmer / répondre + que", usage: "pour rapporter une déclaration", exemple: "Il dit : « Je suis fatigué. » → Il dit qu'il est fatigué." },
          { regle: "Changement de pronom", usage: "le « je » devient « il/elle » etc.", exemple: "Elle dit : « J'ai faim. » → Elle dit qu'elle a faim." },
          { regle: "Changement de possessif", usage: "« mon/ma » → « son/sa » etc.", exemple: "Il dit : « Ma voiture est neuve. » → Il dit que sa voiture est neuve." },
        ],
      },
      {
        sous_titre: "Rapporter une question",
        regles: [
          { regle: "demander si + question fermée", usage: "oui/non questions", exemple: "Il demande : « Tu viens ? » → Il demande si tu viens." },
          { regle: "demander + mot interrogatif", usage: "questions ouvertes", exemple: "Il demande : « Où habites-tu ? » → Il demande où tu habites." },
          { regle: "demander ce que / ce qui", usage: "remplace « qu'est-ce que / qu'est-ce qui »", exemple: "Il demande : « Qu'est-ce que tu fais ? » → Il demande ce que tu fais." },
        ],
      },
      {
        sous_titre: "Rapporter un ordre ou une demande",
        regles: [
          { regle: "dire / demander + de + infinitif", usage: "pour rapporter un impératif", exemple: "Il dit : « Ferme la porte ! » → Il dit de fermer la porte." },
          { regle: "demander + de + ne pas + infinitif", usage: "ordre négatif", exemple: "Elle dit : « Ne pars pas ! » → Elle demande de ne pas partir." },
        ],
      },
    ],
    exercices: [
      { question: "Il dit : « Je suis content. » → Il dit ___.", reponse: "qu'il est content", options: ["qu'il est content", "que je suis content", "s'il est content", "qu'il soit content"] },
      { question: "Elle demande : « Tu viens ? » → Elle demande ___.", reponse: "si tu viens", options: ["si tu viens", "que tu viens", "est-ce que tu viens", "tu viens"] },
      { question: "Le prof dit : « Ouvrez vos livres ! » → Le prof dit ___.", reponse: "d'ouvrir nos livres", options: ["d'ouvrir nos livres", "que nous ouvrons nos livres", "ouvrez vos livres", "si nous ouvrons nos livres"] },
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
  {
    id: "plus-que-parfait",
    titre: "Le Plus-que-parfait",
    niveau: "B1",
    categorie: "temps",
    introduction: "Le plus-que-parfait exprime une action passée qui s'est produite avant une autre action passée. C'est le « passé du passé ». Il se forme avec l'auxiliaire (être ou avoir) à l'imparfait + le participe passé.",
    sections: [
      {
        sous_titre: "Formation du plus-que-parfait",
        regles: [
          { regle: "avoir (imparfait) + participe passé", usage: "majorité des verbes", exemple: "j'avais mangé, tu avais fini, il avait compris, nous avions parlé" },
          { regle: "être (imparfait) + participe passé", usage: "verbes de mouvement et pronominaux", exemple: "j'étais parti(e), elle était venue, nous nous étions levé(e)s" },
          { regle: "Accord du participe passé", usage: "avec être : accord avec le sujet", exemple: "Elle était partie. Ils étaient arrivés. Elles s'étaient assises." },
        ],
      },
      {
        sous_titre: "Emplois du plus-que-parfait",
        regles: [
          { regle: "Antériorité dans le passé", usage: "une action avant une autre action passée", exemple: "Quand je suis arrivé, il avait déjà mangé." },
          { regle: "Avec « quand / lorsque / après que »", usage: "pour marquer la chronologie", exemple: "Après qu'il avait fini, il est sorti." },
          { regle: "Hypothèse irréelle passée (si + PQP)", usage: "si + plus-que-parfait → conditionnel passé", exemple: "Si j'avais su, je ne serais pas venu." },
          { regle: "Regret", usage: "exprimer un regret avec « si seulement »", exemple: "Si seulement j'avais étudié davantage !" },
        ],
      },
    ],
    exercices: [
      { question: "Quand je suis arrivé, elle ___ (partir) déjà.", reponse: "était déjà partie", options: ["était déjà partie", "est déjà partie", "avait déjà parti", "partait déjà"] },
      { question: "Il ne pouvait pas entrer parce qu'il ___ (oublier) ses clés.", reponse: "avait oublié", options: ["avait oublié", "a oublié", "oubliait", "oubliera"] },
      { question: "Si j'___ (savoir), je t'aurais aidé.", reponse: "avais su", options: ["avais su", "ai su", "savais", "saurais"] },
    ],
  },
  {
    id: "conditionnel-passe",
    titre: "Le Conditionnel Passé",
    niveau: "B1",
    categorie: "temps",
    introduction: "Le conditionnel passé exprime une action qui aurait pu se produire dans le passé mais qui ne s'est pas réalisée. Il sert à exprimer des regrets, des reproches ou des hypothèses irréelles sur le passé.",
    sections: [
      {
        sous_titre: "Formation du conditionnel passé",
        regles: [
          { regle: "avoir (conditionnel) + participe passé", usage: "majorité des verbes", exemple: "j'aurais mangé, tu aurais fini, il aurait compris, nous aurions parlé" },
          { regle: "être (conditionnel) + participe passé", usage: "verbes de mouvement et pronominaux", exemple: "je serais parti(e), elle serait venue, nous nous serions levé(e)s" },
          { regle: "Accord du participe passé", usage: "avec être : accord avec le sujet", exemple: "Elle serait partie. Ils seraient arrivés." },
        ],
      },
      {
        sous_titre: "Emplois du conditionnel passé",
        regles: [
          { regle: "Hypothèse irréelle dans le passé", usage: "si + plus-que-parfait → conditionnel passé", exemple: "Si j'avais étudié, j'aurais réussi l'examen." },
          { regle: "Regret", usage: "ce qu'on aurait aimé faire", exemple: "J'aurais voulu être artiste. J'aurais dû étudier plus." },
          { regle: "Reproche", usage: "ce que quelqu'un aurait dû faire", exemple: "Tu aurais pu m'appeler ! Vous auriez dû me prévenir." },
          { regle: "Information non confirmée (passé)", usage: "presse, rumeurs au passé", exemple: "L'accident aurait fait trois victimes." },
        ],
      },
    ],
    exercices: [
      { question: "Si j'avais su, je ___ (venir).", reponse: "serais venu(e)", options: ["serais venu(e)", "viendrais", "suis venu(e)", "étais venu(e)"] },
      { question: "Tu ___ (devoir) me prévenir !", reponse: "aurais dû", options: ["aurais dû", "avais dû", "as dû", "devrais"] },
      { question: "Si elle avait étudié, elle ___ (réussir) son examen.", reponse: "aurait réussi", options: ["aurait réussi", "réussirait", "a réussi", "avait réussi"] },
    ],
  },
  {
    id: "connecteurs-logiques",
    titre: "Les Connecteurs Logiques",
    niveau: "B1",
    categorie: "construction",
    introduction: "Les connecteurs logiques organisent le discours et expriment des relations entre les idées : addition, opposition, cause, conséquence, but, condition, etc. Ils sont essentiels pour structurer un texte ou un argument.",
    sections: [
      {
        sous_titre: "Addition et énumération",
        regles: [
          { regle: "et, aussi, également", usage: "ajouter une idée", exemple: "Il parle français et anglais. Elle est aussi musicienne." },
          { regle: "de plus, en outre, par ailleurs", usage: "ajouter un argument (formel)", exemple: "Ce restaurant est bon. De plus, il n'est pas cher." },
          { regle: "d'abord, ensuite, enfin", usage: "ordonner les idées", exemple: "D'abord, je me lève. Ensuite, je prends mon café. Enfin, je pars." },
        ],
      },
      {
        sous_titre: "Opposition et concession",
        regles: [
          { regle: "mais", usage: "opposition simple", exemple: "Il est intelligent mais paresseux." },
          { regle: "cependant, pourtant, néanmoins", usage: "opposition plus formelle", exemple: "Il pleut. Cependant, je sors quand même." },
          { regle: "bien que + subjonctif", usage: "concession (although)", exemple: "Bien qu'il soit fatigué, il travaille." },
          { regle: "malgré + nom", usage: "concession avec un nom", exemple: "Malgré la pluie, nous sommes sortis." },
        ],
      },
      {
        sous_titre: "Cause et conséquence",
        regles: [
          { regle: "parce que, car, puisque", usage: "exprimer la cause", exemple: "Je reste parce que j'ai du travail. Puisque tu insistes, je viens." },
          { regle: "donc, alors, c'est pourquoi", usage: "exprimer la conséquence", exemple: "Il pleut, donc je prends un parapluie." },
          { regle: "grâce à / à cause de", usage: "cause positive / cause négative", exemple: "Grâce à toi, j'ai réussi. À cause de la pluie, je suis en retard." },
        ],
      },
      {
        sous_titre: "But et condition",
        regles: [
          { regle: "pour + infinitif / pour que + subjonctif", usage: "exprimer le but", exemple: "J'étudie pour réussir. Je t'explique pour que tu comprennes." },
          { regle: "afin de + infinitif / afin que + subjonctif", usage: "but (formel)", exemple: "Il travaille afin de gagner sa vie." },
          { regle: "si + présent → futur", usage: "condition réelle", exemple: "Si tu viens, je serai content." },
          { regle: "à condition que + subjonctif", usage: "condition (formel)", exemple: "Je viendrai à condition que tu sois là." },
        ],
      },
    ],
    exercices: [
      { question: "Il est fatigué. ___, il continue de travailler.", reponse: "Cependant", options: ["Cependant", "Donc", "Parce que", "De plus"] },
      { question: "Je suis en retard ___ les embouteillages.", reponse: "à cause des", options: ["à cause des", "grâce aux", "malgré les", "pour les"] },
      { question: "Elle étudie beaucoup ___ réussir son examen.", reponse: "pour", options: ["pour", "parce que", "donc", "bien que"] },
      { question: "___ la pluie, nous avons fait une promenade.", reponse: "Malgré", options: ["Malgré", "À cause de", "Grâce à", "Pour"] },
    ],
  },
  {
    id: "gerondif",
    titre: "Le Gérondif",
    niveau: "B1",
    categorie: "construction",
    introduction: "Le gérondif exprime la simultanéité de deux actions faites par le même sujet. Il se forme avec « en » + le participe présent du verbe. C'est une structure très courante en français.",
    sections: [
      {
        sous_titre: "Formation du gérondif",
        regles: [
          { regle: "en + participe présent (-ant)", usage: "base « nous » au présent sans -ons + -ant", exemple: "parler → nous parlons → en parlant, finir → en finissant" },
          { regle: "Trois exceptions", usage: "être, avoir, savoir", exemple: "être → en étant, avoir → en ayant, savoir → en sachant" },
        ],
      },
      {
        sous_titre: "Les emplois du gérondif",
        regles: [
          { regle: "Simultanéité (en même temps)", usage: "deux actions en même temps, même sujet", exemple: "Il mange en regardant la télé. Elle chante en cuisinant." },
          { regle: "Manière (comment ?)", usage: "la façon de faire quelque chose", exemple: "Il a appris le français en regardant des films." },
          { regle: "Condition", usage: "si + on fait quelque chose", exemple: "En travaillant dur, tu réussiras. (= si tu travailles dur)" },
          { regle: "Cause", usage: "parce que + on fait quelque chose", exemple: "En arrivant en retard, il a raté le début du film." },
          { regle: "tout en + gérondif", usage: "insiste sur la simultanéité ou l'opposition", exemple: "Elle travaille tout en écoutant de la musique." },
        ],
      },
      {
        sous_titre: "Gérondif vs participe présent",
        regles: [
          { regle: "Gérondif = en + -ant", usage: "le sujet du gérondif = le sujet de la phrase", exemple: "En arrivant (je), j'ai vu Marie." },
          { regle: "Participe présent = -ant (sans en)", usage: "peut avoir un sujet différent, rôle d'adjectif verbal", exemple: "J'ai vu un homme portant un chapeau. (= qui portait)" },
        ],
      },
    ],
    exercices: [
      { question: "Il écoute de la musique ___ (travailler).", reponse: "en travaillant", options: ["en travaillant", "travaillant", "à travailler", "de travailler"] },
      { question: "Comment a-t-il appris le français ? — ___ (regarder) des films.", reponse: "En regardant", options: ["En regardant", "Regardant", "Pour regarder", "De regarder"] },
      { question: "Le gérondif de « savoir » est :", reponse: "en sachant", options: ["en sachant", "en savant", "en saissant", "en su"] },
    ],
  },
  {
    id: "cause-consequence",
    titre: "L'Expression de la Cause, Conséquence et But",
    niveau: "B1",
    categorie: "construction",
    introduction: "Savoir exprimer la cause (pourquoi ?), la conséquence (quel résultat ?) et le but (dans quel objectif ?) est essentiel pour argumenter et s'exprimer avec précision en français.",
    sections: [
      {
        sous_titre: "Exprimer la cause",
        regles: [
          { regle: "parce que + phrase", usage: "cause la plus courante, répond à « pourquoi ? »", exemple: "Je suis fatigué parce que j'ai mal dormi." },
          { regle: "puisque + phrase", usage: "cause évidente, connue de l'interlocuteur", exemple: "Puisque tu es là, aide-moi !" },
          { regle: "car + phrase", usage: "cause (plus littéraire, pas en début de phrase)", exemple: "Il est parti car il avait un rendez-vous." },
          { regle: "comme + phrase (en début)", usage: "cause en début de phrase", exemple: "Comme il pleuvait, nous sommes restés à la maison." },
          { regle: "grâce à + nom (cause positive)", usage: "résultat positif", exemple: "Grâce à ton aide, j'ai réussi." },
          { regle: "à cause de + nom (cause négative)", usage: "résultat négatif", exemple: "À cause du bruit, je ne peux pas dormir." },
        ],
      },
      {
        sous_titre: "Exprimer la conséquence",
        regles: [
          { regle: "donc", usage: "conséquence logique", exemple: "Il pleut, donc je prends un parapluie." },
          { regle: "alors", usage: "conséquence (plus oral)", exemple: "J'avais faim, alors j'ai mangé." },
          { regle: "c'est pourquoi / c'est pour ça que", usage: "conséquence explicative", exemple: "Il est malade, c'est pourquoi il est absent." },
          { regle: "tellement... que / si... que", usage: "conséquence d'une intensité", exemple: "Il est tellement fatigué qu'il ne peut plus marcher. Elle est si belle que tout le monde la regarde." },
        ],
      },
      {
        sous_titre: "Exprimer le but",
        regles: [
          { regle: "pour + infinitif", usage: "but (même sujet)", exemple: "J'étudie pour apprendre le français." },
          { regle: "pour que + subjonctif", usage: "but (sujets différents)", exemple: "Je parle lentement pour que tu comprennes." },
          { regle: "afin de + infinitif / afin que + subjonctif", usage: "but (formel)", exemple: "Il s'entraîne afin de gagner la compétition." },
          { regle: "de peur de + infinitif / de peur que + subjonctif", usage: "but négatif (pour éviter)", exemple: "Je me dépêche de peur d'être en retard." },
        ],
      },
    ],
    exercices: [
      { question: "Je reste à la maison ___ il pleut.", reponse: "parce qu'", options: ["parce qu'", "pour qu'", "donc", "afin qu'"] },
      { question: "Il était ___ fatigué ___ il s'est endormi.", reponse: "tellement / qu'", options: ["tellement / qu'", "si / de", "très / que", "plus / que"] },
      { question: "Elle s'entraîne ___ gagner le match.", reponse: "pour", options: ["pour", "parce que", "donc", "à cause de"] },
      { question: "___ tu le sais déjà, je ne répète pas.", reponse: "Puisque", options: ["Puisque", "Parce que", "Pour que", "Afin que"] },
    ],
  },

  // ============ B2 — AVANCÉ SUPÉRIEUR ============
  {
    id: "passe-simple",
    titre: "Le Passé Simple",
    niveau: "B2",
    categorie: "temps",
    introduction: "Le passé simple est un temps littéraire utilisé principalement à l'écrit (romans, contes, récits historiques). On ne l'utilise presque jamais à l'oral. Il est important de savoir le reconnaître pour pouvoir lire la littérature française.",
    sections: [
      {
        sous_titre: "Formation des verbes en -er",
        regles: [
          { regle: "Radical + -ai, -as, -a, -âmes, -âtes, -èrent", usage: "tous les verbes en -er", exemple: "parler → je parlai, tu parlas, il parla, nous parlâmes, vous parlâtes, ils parlèrent" },
          { regle: "aller → j'allai", usage: "se conjugue comme un verbe en -er", exemple: "Il alla au marché. Ils allèrent à la montagne." },
        ],
      },
      {
        sous_titre: "Formation des verbes en -ir et -re",
        regles: [
          { regle: "Verbes en -ir : -is, -is, -it, -îmes, -îtes, -irent", usage: "finir, partir, dormir, etc.", exemple: "finir → il finit, ils finirent. partir → il partit, ils partirent" },
          { regle: "Verbes en -re : -is, -is, -it, -îmes, -îtes, -irent", usage: "prendre, mettre, etc.", exemple: "prendre → il prit, ils prirent. mettre → il mit, ils mirent" },
          { regle: "Verbes en -oir : -us, -us, -ut, -ûmes, -ûtes, -urent", usage: "pouvoir, vouloir, savoir, etc.", exemple: "pouvoir → il put. vouloir → il voulut. savoir → il sut" },
        ],
      },
      {
        sous_titre: "Verbes irréguliers fréquents",
        regles: [
          { regle: "être → je fus, tu fus, il fut, nous fûmes, ils furent", usage: "très fréquent dans les récits", exemple: "Ce fut une belle journée. Ils furent surpris." },
          { regle: "avoir → j'eus, tu eus, il eut, nous eûmes, ils eurent", usage: "très fréquent dans les récits", exemple: "Il eut une idée. Ils eurent peur." },
          { regle: "faire → je fis, il fit, ils firent", usage: "courant en littérature", exemple: "Il fit un pas en avant. Ils firent la paix." },
          { regle: "venir → je vins, il vint, ils vinrent", usage: "et tous les composés de venir", exemple: "Il vint me voir. Ils devinrent amis." },
        ],
      },
    ],
    exercices: [
      { question: "« Il ___ (être) une fois un roi. » — Quel temps ?", reponse: "fut (passé simple)", options: ["fut (passé simple)", "était (imparfait)", "a été (passé composé)", "serait (conditionnel)"] },
      { question: "Ils ___ (arriver) au château à minuit.", reponse: "arrivèrent", options: ["arrivèrent", "arrivaient", "sont arrivés", "arriverent"] },
      { question: "Le prince ___ (prendre) son épée et ___ (partir).", reponse: "prit / partit", options: ["prit / partit", "prena / partis", "pris / parti", "prendit / partut"] },
      { question: "Elle ___ (avoir) soudain une idée brillante.", reponse: "eut", options: ["eut", "avait", "a eu", "eût"] },
    ],
  },
  {
    id: "subjonctif-passe",
    titre: "Le Subjonctif Passé",
    niveau: "B2",
    categorie: "temps",
    introduction: "Le subjonctif passé exprime une action terminée dans un contexte qui demande le subjonctif. Il se forme avec l'auxiliaire (avoir ou être) au subjonctif présent + le participe passé. Il est fréquent après des expressions de doute, d'émotion ou de jugement sur des actions passées.",
    sections: [
      {
        sous_titre: "Formation du subjonctif passé",
        regles: [
          { regle: "avoir (subjonctif) + participe passé", usage: "majorité des verbes", exemple: "que j'aie mangé, que tu aies fini, qu'il ait compris" },
          { regle: "être (subjonctif) + participe passé", usage: "verbes de mouvement et pronominaux", exemple: "que je sois parti(e), qu'elle soit venue, qu'ils se soient levés" },
          { regle: "Rappel subjonctif de « avoir »", usage: "que j'aie, que tu aies, qu'il ait, que nous ayons", exemple: "Il faut que tu aies terminé avant midi." },
          { regle: "Rappel subjonctif de « être »", usage: "que je sois, que tu sois, qu'il soit, que nous soyons", exemple: "Je doute qu'elle soit arrivée à l'heure." },
        ],
      },
      {
        sous_titre: "Emplois du subjonctif passé",
        regles: [
          { regle: "Action passée + émotion", usage: "exprimer un sentiment sur un fait passé", exemple: "Je suis content que tu aies réussi ton examen." },
          { regle: "Action passée + doute", usage: "douter de quelque chose qui s'est passé", exemple: "Je doute qu'il ait dit la vérité." },
          { regle: "Antériorité avec « avant que »", usage: "une action terminée avant une autre", exemple: "Pars avant qu'il ait fini de parler." },
          { regle: "Action passée + jugement", usage: "évaluer un événement passé", exemple: "C'est dommage que vous n'ayez pas pu venir." },
        ],
      },
      {
        sous_titre: "Subjonctif présent vs subjonctif passé",
        regles: [
          { regle: "Subjonctif présent = simultané ou futur", usage: "action en cours ou à venir", exemple: "Je veux qu'il vienne. (maintenant ou bientôt)" },
          { regle: "Subjonctif passé = antérieur", usage: "action déjà terminée", exemple: "Je suis content qu'il soit venu. (c'est déjà fait)" },
        ],
      },
    ],
    exercices: [
      { question: "Je suis content que tu ___ (réussir) ton examen.", reponse: "aies réussi", options: ["aies réussi", "as réussi", "réussisses", "avais réussi"] },
      { question: "Je doute qu'elle ___ (partir) sans dire au revoir.", reponse: "soit partie", options: ["soit partie", "est partie", "parte", "était partie"] },
      { question: "C'est dommage que vous n'___ pas ___ (pouvoir) venir.", reponse: "ayez / pu", options: ["ayez / pu", "avez / pu", "aviez / pu", "puissiez / venir"] },
    ],
  },
  {
    id: "nuances-modales",
    titre: "Les Nuances Modales",
    niveau: "B2",
    categorie: "construction",
    introduction: "Les nuances modales permettent d'exprimer avec précision son degré de certitude, sa capacité, son obligation ou sa volonté. Elles utilisent des verbes modaux, des adverbes et des structures variées pour moduler le discours.",
    sections: [
      {
        sous_titre: "Devoir — obligation, probabilité, conseil",
        regles: [
          { regle: "devoir + infinitif (présent)", usage: "obligation ou forte probabilité", exemple: "Tu dois étudier. (obligation) Il doit être malade. (probabilité)" },
          { regle: "devoir + infinitif (conditionnel)", usage: "conseil atténué", exemple: "Tu devrais te reposer. Vous devriez lire ce livre." },
          { regle: "devoir + infinitif (conditionnel passé)", usage: "reproche ou regret", exemple: "Tu aurais dû m'écouter. J'aurais dû partir plus tôt." },
          { regle: "devoir + infinitif (imparfait)", usage: "plan initial qui ne s'est pas réalisé", exemple: "Il devait venir hier, mais il a annulé." },
        ],
      },
      {
        sous_titre: "Pouvoir — capacité, permission, possibilité",
        regles: [
          { regle: "pouvoir + infinitif (présent)", usage: "capacité ou permission", exemple: "Je peux nager. Tu peux entrer." },
          { regle: "pouvoir + infinitif (conditionnel)", usage: "possibilité, demande polie, suggestion", exemple: "Il pourrait pleuvoir. Pourriez-vous m'aider ? Tu pourrais essayer." },
          { regle: "pouvoir + infinitif (conditionnel passé)", usage: "reproche ou possibilité non réalisée", exemple: "Tu aurais pu m'appeler ! Ça aurait pu être pire." },
        ],
      },
      {
        sous_titre: "Savoir vs Pouvoir",
        regles: [
          { regle: "savoir + infinitif", usage: "compétence apprise, capacité intellectuelle", exemple: "Je sais nager. (j'ai appris) Elle sait parler trois langues." },
          { regle: "pouvoir + infinitif", usage: "possibilité physique ou permission", exemple: "Je peux nager aujourd'hui. (les conditions le permettent)" },
          { regle: "Nuance importante", usage: "savoir = compétence acquise, pouvoir = possibilité de le faire", exemple: "Je sais conduire (compétence) mais je ne peux pas conduire aujourd'hui (ma voiture est en panne)." },
        ],
      },
      {
        sous_titre: "Exprimer la certitude et l'incertitude",
        regles: [
          { regle: "Certitude : je suis sûr(e) que + indicatif", usage: "conviction", exemple: "Je suis sûr qu'il viendra." },
          { regle: "Probabilité : il est probable que + indicatif", usage: "probable mais pas certain", exemple: "Il est probable qu'il pleuvra demain." },
          { regle: "Doute : je doute que + subjonctif", usage: "incertitude", exemple: "Je doute qu'il vienne." },
          { regle: "Possibilité : il est possible que + subjonctif", usage: "éventualité", exemple: "Il est possible qu'elle soit en retard." },
          { regle: "Adverbes modaux", usage: "peut-être, sans doute, certainement, probablement", exemple: "Il viendra peut-être. Elle a certainement raison." },
        ],
      },
    ],
    exercices: [
      { question: "Tu ___ (devoir, conditionnel) te coucher plus tôt.", reponse: "devrais", options: ["devrais", "dois", "devais", "as dû"] },
      { question: "Il ___ (pouvoir, conditionnel passé) nous prévenir !", reponse: "aurait pu", options: ["aurait pu", "pourrait", "a pu", "pouvait"] },
      { question: "Je ___ nager (compétence apprise).", reponse: "sais", options: ["sais", "peux", "dois", "veux"] },
      { question: "Il est possible qu'elle ___ (être) en retard.", reponse: "soit", options: ["soit", "est", "sera", "serait"] },
      { question: "Il ___ (devoir, imparfait) arriver hier, mais il a annulé.", reponse: "devait", options: ["devait", "doit", "devrait", "a dû"] },
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
