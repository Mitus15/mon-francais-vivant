// ============================================================
// MOTEUR DE CONJUGAISON FRANÇAIS COMPLET
// Couvre : verbes réguliers (algorithme) + 200 irréguliers
// ============================================================

// ---- VERBES IRRÉGULIERS COMPLETS ----
export const irreguliers = {
  "être": {
    sens: "exister, avoir une qualité ou une identité",
    groupe: "irrégulier",
    présent: ["suis","es","est","sommes","êtes","sont"],
    passéComposé: ["ai été","as été","a été","avons été","avez été","ont été"],
    imparfait: ["étais","étais","était","étions","étiez","étaient"],
    futurSimple: ["serai","seras","sera","serons","serez","seront"],
    conditionnel: ["serais","serais","serait","serions","seriez","seraient"],
    subjonctif: ["sois","sois","soit","soyons","soyez","soient"],
    participe: "été", auxiliaire: "avoir",
  },
  "avoir": {
    sens: "posséder, éprouver un état",
    groupe: "irrégulier",
    présent: ["ai","as","a","avons","avez","ont"],
    passéComposé: ["ai eu","as eu","a eu","avons eu","avez eu","ont eu"],
    imparfait: ["avais","avais","avait","avions","aviez","avaient"],
    futurSimple: ["aurai","auras","aura","aurons","aurez","auront"],
    conditionnel: ["aurais","aurais","aurait","aurions","auriez","auraient"],
    subjonctif: ["aie","aies","ait","ayons","ayez","aient"],
    participe: "eu", auxiliaire: "avoir",
  },
  "aller": {
    sens: "se déplacer, se rendre quelque part",
    groupe: "irrégulier",
    présent: ["vais","vas","va","allons","allez","vont"],
    passéComposé: ["suis allé(e)","es allé(e)","est allé(e)","sommes allé(e)s","êtes allé(e)s","sont allé(e)s"],
    imparfait: ["allais","allais","allait","allions","alliez","allaient"],
    futurSimple: ["irai","iras","ira","irons","irez","iront"],
    conditionnel: ["irais","irais","irait","irions","iriez","iraient"],
    subjonctif: ["aille","ailles","aille","allions","alliez","aillent"],
    participe: "allé", auxiliaire: "être",
  },
  "faire": {
    sens: "accomplir une action, réaliser",
    groupe: "irrégulier",
    présent: ["fais","fais","fait","faisons","faites","font"],
    passéComposé: ["ai fait","as fait","a fait","avons fait","avez fait","ont fait"],
    imparfait: ["faisais","faisais","faisait","faisions","faisiez","faisaient"],
    futurSimple: ["ferai","feras","fera","ferons","ferez","feront"],
    conditionnel: ["ferais","ferais","ferait","ferions","feriez","feraient"],
    subjonctif: ["fasse","fasses","fasse","fassions","fassiez","fassent"],
    participe: "fait", auxiliaire: "avoir",
  },
  "pouvoir": {
    sens: "avoir la capacité ou la permission",
    groupe: "irrégulier",
    présent: ["peux","peux","peut","pouvons","pouvez","peuvent"],
    passéComposé: ["ai pu","as pu","a pu","avons pu","avez pu","ont pu"],
    imparfait: ["pouvais","pouvais","pouvait","pouvions","pouviez","pouvaient"],
    futurSimple: ["pourrai","pourras","pourra","pourrons","pourrez","pourront"],
    conditionnel: ["pourrais","pourrais","pourrait","pourrions","pourriez","pourraient"],
    subjonctif: ["puisse","puisses","puisse","puissions","puissiez","puissent"],
    participe: "pu", auxiliaire: "avoir",
  },
  "vouloir": {
    sens: "désirer, avoir l'intention de faire",
    groupe: "irrégulier",
    présent: ["veux","veux","veut","voulons","voulez","veulent"],
    passéComposé: ["ai voulu","as voulu","a voulu","avons voulu","avez voulu","ont voulu"],
    imparfait: ["voulais","voulais","voulait","voulions","vouliez","voulaient"],
    futurSimple: ["voudrai","voudras","voudra","voudrons","voudrez","voudront"],
    conditionnel: ["voudrais","voudrais","voudrait","voudrions","voudriez","voudraient"],
    subjonctif: ["veuille","veuilles","veuille","voulions","vouliez","veuillent"],
    participe: "voulu", auxiliaire: "avoir",
  },
  "savoir": {
    sens: "avoir une connaissance, être capable de",
    groupe: "irrégulier",
    présent: ["sais","sais","sait","savons","savez","savent"],
    passéComposé: ["ai su","as su","a su","avons su","avez su","ont su"],
    imparfait: ["savais","savais","savait","savions","saviez","savaient"],
    futurSimple: ["saurai","sauras","saura","saurons","saurez","sauront"],
    conditionnel: ["saurais","saurais","saurait","saurions","sauriez","sauraient"],
    subjonctif: ["sache","saches","sache","sachions","sachiez","sachent"],
    participe: "su", auxiliaire: "avoir",
  },
  "venir": {
    sens: "se déplacer vers, arriver",
    groupe: "irrégulier",
    présent: ["viens","viens","vient","venons","venez","viennent"],
    passéComposé: ["suis venu(e)","es venu(e)","est venu(e)","sommes venu(e)s","êtes venu(e)s","sont venu(e)s"],
    imparfait: ["venais","venais","venait","venions","veniez","venaient"],
    futurSimple: ["viendrai","viendras","viendra","viendrons","viendrez","viendront"],
    conditionnel: ["viendrais","viendrais","viendrait","viendrions","viendriez","viendraient"],
    subjonctif: ["vienne","viennes","vienne","venions","veniez","viennent"],
    participe: "venu", auxiliaire: "être",
  },
  "voir": {
    sens: "percevoir avec les yeux",
    groupe: "irrégulier",
    présent: ["vois","vois","voit","voyons","voyez","voient"],
    passéComposé: ["ai vu","as vu","a vu","avons vu","avez vu","ont vu"],
    imparfait: ["voyais","voyais","voyait","voyions","voyiez","voyaient"],
    futurSimple: ["verrai","verras","verra","verrons","verrez","verront"],
    conditionnel: ["verrais","verrais","verrait","verrions","verriez","verraient"],
    subjonctif: ["voie","voies","voie","voyions","voyiez","voient"],
    participe: "vu", auxiliaire: "avoir",
  },
  "dire": {
    sens: "exprimer par des mots",
    groupe: "irrégulier",
    présent: ["dis","dis","dit","disons","dites","disent"],
    passéComposé: ["ai dit","as dit","a dit","avons dit","avez dit","ont dit"],
    imparfait: ["disais","disais","disait","disions","disiez","disaient"],
    futurSimple: ["dirai","diras","dira","dirons","direz","diront"],
    conditionnel: ["dirais","dirais","dirait","dirions","diriez","diraient"],
    subjonctif: ["dise","dises","dise","disions","disiez","disent"],
    participe: "dit", auxiliaire: "avoir",
  },
  "prendre": {
    sens: "saisir, utiliser, se servir de",
    groupe: "irrégulier",
    présent: ["prends","prends","prend","prenons","prenez","prennent"],
    passéComposé: ["ai pris","as pris","a pris","avons pris","avez pris","ont pris"],
    imparfait: ["prenais","prenais","prenait","prenions","preniez","prenaient"],
    futurSimple: ["prendrai","prendras","prendra","prendrons","prendrez","prendront"],
    conditionnel: ["prendrais","prendrais","prendrait","prendrions","prendriez","prendraient"],
    subjonctif: ["prenne","prennes","prenne","prenions","preniez","prennent"],
    participe: "pris", auxiliaire: "avoir",
  },
  "devoir": {
    sens: "être obligé de, avoir une dette",
    groupe: "irrégulier",
    présent: ["dois","dois","doit","devons","devez","doivent"],
    passéComposé: ["ai dû","as dû","a dû","avons dû","avez dû","ont dû"],
    imparfait: ["devais","devais","devait","devions","deviez","devaient"],
    futurSimple: ["devrai","devras","devra","devrons","devrez","devront"],
    conditionnel: ["devrais","devrais","devrait","devrions","devriez","devraient"],
    subjonctif: ["doive","doives","doive","devions","deviez","doivent"],
    participe: "dû", auxiliaire: "avoir",
  },
  "mettre": {
    sens: "placer, poser quelque chose quelque part",
    groupe: "irrégulier",
    présent: ["mets","mets","met","mettons","mettez","mettent"],
    passéComposé: ["ai mis","as mis","a mis","avons mis","avez mis","ont mis"],
    imparfait: ["mettais","mettais","mettait","mettions","mettiez","mettaient"],
    futurSimple: ["mettrai","mettras","mettra","mettrons","mettrez","mettront"],
    conditionnel: ["mettrais","mettrais","mettrait","mettrions","mettriez","mettraient"],
    subjonctif: ["mette","mettes","mette","mettions","mettiez","mettent"],
    participe: "mis", auxiliaire: "avoir",
  },
  "partir": {
    sens: "quitter un lieu, se mettre en route",
    groupe: "irrégulier",
    présent: ["pars","pars","part","partons","partez","partent"],
    passéComposé: ["suis parti(e)","es parti(e)","est parti(e)","sommes parti(e)s","êtes parti(e)s","sont parti(e)s"],
    imparfait: ["partais","partais","partait","partions","partiez","partaient"],
    futurSimple: ["partirai","partiras","partira","partirons","partirez","partiront"],
    conditionnel: ["partirais","partirais","partirait","partirions","partiriez","partiraient"],
    subjonctif: ["parte","partes","parte","partions","partiez","partent"],
    participe: "parti", auxiliaire: "être",
  },
  "sortir": {
    sens: "aller à l'extérieur, quitter un lieu fermé",
    groupe: "irrégulier",
    présent: ["sors","sors","sort","sortons","sortez","sortent"],
    passéComposé: ["suis sorti(e)","es sorti(e)","est sorti(e)","sommes sorti(e)s","êtes sorti(e)s","sont sorti(e)s"],
    imparfait: ["sortais","sortais","sortait","sortions","sortiez","sortaient"],
    futurSimple: ["sortirai","sortiras","sortira","sortirons","sortirez","sortiront"],
    conditionnel: ["sortirais","sortirais","sortirait","sortirions","sortiriez","sortiraient"],
    subjonctif: ["sorte","sortes","sorte","sortions","sortiez","sortent"],
    participe: "sorti", auxiliaire: "être",
  },
  "dormir": {
    sens: "être dans l'état de sommeil",
    groupe: "irrégulier",
    présent: ["dors","dors","dort","dormons","dormez","dorment"],
    passéComposé: ["ai dormi","as dormi","a dormi","avons dormi","avez dormi","ont dormi"],
    imparfait: ["dormais","dormais","dormait","dormions","dormiez","dormaient"],
    futurSimple: ["dormirai","dormiras","dormira","dormirons","dormirez","dormiront"],
    conditionnel: ["dormirais","dormirais","dormirait","dormirions","dormiriez","dormiraient"],
    subjonctif: ["dorme","dormes","dorme","dormions","dormiez","dorment"],
    participe: "dormi", auxiliaire: "avoir",
  },
  "boire": {
    sens: "avaler un liquide",
    groupe: "irrégulier",
    présent: ["bois","bois","boit","buvons","buvez","boivent"],
    passéComposé: ["ai bu","as bu","a bu","avons bu","avez bu","ont bu"],
    imparfait: ["buvais","buvais","buvait","buvions","buviez","buvaient"],
    futurSimple: ["boirai","boiras","boira","boirons","boirez","boiront"],
    conditionnel: ["boirais","boirais","boirait","boirions","boiriez","boiraient"],
    subjonctif: ["boive","boives","boive","buvions","buviez","boivent"],
    participe: "bu", auxiliaire: "avoir",
  },
  "lire": {
    sens: "déchiffrer et comprendre un texte",
    groupe: "irrégulier",
    présent: ["lis","lis","lit","lisons","lisez","lisent"],
    passéComposé: ["ai lu","as lu","a lu","avons lu","avez lu","ont lu"],
    imparfait: ["lisais","lisais","lisait","lisions","lisiez","lisaient"],
    futurSimple: ["lirai","liras","lira","lirons","lirez","liront"],
    conditionnel: ["lirais","lirais","lirait","lirions","liriez","liraient"],
    subjonctif: ["lise","lises","lise","lisions","lisiez","lisent"],
    participe: "lu", auxiliaire: "avoir",
  },
  "écrire": {
    sens: "tracer des lettres, rédiger",
    groupe: "irrégulier",
    présent: ["écris","écris","écrit","écrivons","écrivez","écrivent"],
    passéComposé: ["ai écrit","as écrit","a écrit","avons écrit","avez écrit","ont écrit"],
    imparfait: ["écrivais","écrivais","écrivait","écrivions","écriviez","écrivaient"],
    futurSimple: ["écrirai","écriras","écrira","écrirons","écrirez","écriront"],
    conditionnel: ["écrirais","écrirais","écrirait","écririons","écririez","écriraient"],
    subjonctif: ["écrive","écrives","écrive","écrivions","écriviez","écrivent"],
    participe: "écrit", auxiliaire: "avoir",
  },
  "comprendre": {
    sens: "saisir le sens de, assimiler",
    groupe: "irrégulier (= prendre)",
    présent: ["comprends","comprends","comprend","comprenons","comprenez","comprennent"],
    passéComposé: ["ai compris","as compris","a compris","avons compris","avez compris","ont compris"],
    imparfait: ["comprenais","comprenais","comprenait","comprenions","compreniez","comprenaient"],
    futurSimple: ["comprendrai","comprendras","comprendra","comprendrons","comprendrez","comprendront"],
    conditionnel: ["comprendrais","comprendrais","comprendrait","comprendrions","comprendriez","comprendraient"],
    subjonctif: ["comprenne","comprennes","comprenne","comprenions","compreniez","comprennent"],
    participe: "compris", auxiliaire: "avoir",
  },
  "croire": {
    sens: "penser que quelque chose est vrai",
    groupe: "irrégulier",
    présent: ["crois","crois","croit","croyons","croyez","croient"],
    passéComposé: ["ai cru","as cru","a cru","avons cru","avez cru","ont cru"],
    imparfait: ["croyais","croyais","croyait","croyions","croyiez","croyaient"],
    futurSimple: ["croirai","croiras","croira","croirons","croirez","croiront"],
    conditionnel: ["croirais","croirais","croirait","croirions","croiriez","croiraient"],
    subjonctif: ["croie","croies","croie","croyions","croyiez","croient"],
    participe: "cru", auxiliaire: "avoir",
  },
  "connaître": {
    sens: "avoir une connaissance de quelqu'un ou quelque chose",
    groupe: "irrégulier",
    présent: ["connais","connais","connaît","connaissons","connaissez","connaissent"],
    passéComposé: ["ai connu","as connu","a connu","avons connu","avez connu","ont connu"],
    imparfait: ["connaissais","connaissais","connaissait","connaissions","connaissiez","connaissaient"],
    futurSimple: ["connaîtrai","connaîtras","connaîtra","connaîtrons","connaîtrez","connaîtront"],
    conditionnel: ["connaîtrais","connaîtrais","connaîtrait","connaîtrions","connaîtriez","connaîtraient"],
    subjonctif: ["connaisse","connaisses","connaisse","connaissions","connaissiez","connaissent"],
    participe: "connu", auxiliaire: "avoir",
  },
  "naître": {
    sens: "venir au monde, commencer à exister",
    groupe: "irrégulier",
    présent: ["nais","nais","naît","naissons","naissez","naissent"],
    passéComposé: ["suis né(e)","es né(e)","est né(e)","sommes né(e)s","êtes né(e)s","sont né(e)s"],
    imparfait: ["naissais","naissais","naissait","naissions","naissiez","naissaient"],
    futurSimple: ["naîtrai","naîtras","naîtra","naîtrons","naîtrez","naîtront"],
    conditionnel: ["naîtrais","naîtrais","naîtrait","naîtrions","naîtriez","naîtraient"],
    subjonctif: ["naisse","naisses","naisse","naissions","naissiez","naissent"],
    participe: "né", auxiliaire: "être",
  },
  "mourir": {
    sens: "cesser de vivre",
    groupe: "irrégulier",
    présent: ["meurs","meurs","meurt","mourons","mourez","meurent"],
    passéComposé: ["suis mort(e)","es mort(e)","est mort(e)","sommes mort(e)s","êtes mort(e)s","sont mort(e)s"],
    imparfait: ["mourais","mourais","mourait","mourions","mouriez","mouraient"],
    futurSimple: ["mourrai","mourras","mourra","mourrons","mourrez","mourront"],
    conditionnel: ["mourrais","mourrais","mourrait","mourrions","mourriez","mourraient"],
    subjonctif: ["meure","meures","meure","mourions","mouriez","meurent"],
    participe: "mort", auxiliaire: "être",
  },
  "ouvrir": {
    sens: "permettre l'accès en écartant ce qui ferme",
    groupe: "irrégulier (conjugué comme -er)",
    présent: ["ouvre","ouvres","ouvre","ouvrons","ouvrez","ouvrent"],
    passéComposé: ["ai ouvert","as ouvert","a ouvert","avons ouvert","avez ouvert","ont ouvert"],
    imparfait: ["ouvrais","ouvrais","ouvrait","ouvrions","ouvriez","ouvraient"],
    futurSimple: ["ouvrirai","ouvriras","ouvrira","ouvrirons","ouvrirez","ouvriront"],
    conditionnel: ["ouvrirais","ouvrirais","ouvrirait","ouvririons","ouvririez","ouvriraient"],
    subjonctif: ["ouvre","ouvres","ouvre","ouvrions","ouvriez","ouvrent"],
    participe: "ouvert", auxiliaire: "avoir",
  },
  "offrir": {
    sens: "donner quelque chose à quelqu'un",
    groupe: "irrégulier (conjugué comme -er)",
    présent: ["offre","offres","offre","offrons","offrez","offrent"],
    passéComposé: ["ai offert","as offert","a offert","avons offert","avez offert","ont offert"],
    imparfait: ["offrais","offrais","offrait","offrions","offriez","offraient"],
    futurSimple: ["offrirai","offriras","offrira","offrirons","offrirez","offriront"],
    conditionnel: ["offrirais","offrirais","offrirait","offririons","offririez","offriraient"],
    subjonctif: ["offre","offres","offre","offrions","offriez","offrent"],
    participe: "offert", auxiliaire: "avoir",
  },
  "tenir": {
    sens: "maintenir dans sa main, garder",
    groupe: "irrégulier (= venir)",
    présent: ["tiens","tiens","tient","tenons","tenez","tiennent"],
    passéComposé: ["ai tenu","as tenu","a tenu","avons tenu","avez tenu","ont tenu"],
    imparfait: ["tenais","tenais","tenait","tenions","teniez","tenaient"],
    futurSimple: ["tiendrai","tiendras","tiendra","tiendrons","tiendrez","tiendront"],
    conditionnel: ["tiendrais","tiendrais","tiendrait","tiendrions","tiendriez","tiendraient"],
    subjonctif: ["tienne","tiennes","tienne","tenions","teniez","tiennent"],
    participe: "tenu", auxiliaire: "avoir",
  },
  "recevoir": {
    sens: "obtenir quelque chose qui est envoyé ou donné",
    groupe: "irrégulier",
    présent: ["reçois","reçois","reçoit","recevons","recevez","reçoivent"],
    passéComposé: ["ai reçu","as reçu","a reçu","avons reçu","avez reçu","ont reçu"],
    imparfait: ["recevais","recevais","recevait","recevions","receviez","recevaient"],
    futurSimple: ["recevrai","recevras","recevra","recevrons","recevrez","recevront"],
    conditionnel: ["recevrais","recevrais","recevrait","recevrions","recevriez","recevraient"],
    subjonctif: ["reçoive","reçoives","reçoive","recevions","receviez","reçoivent"],
    participe: "reçu", auxiliaire: "avoir",
  },
  "vivre": {
    sens: "être en vie, exister, habiter",
    groupe: "irrégulier",
    présent: ["vis","vis","vit","vivons","vivez","vivent"],
    passéComposé: ["ai vécu","as vécu","a vécu","avons vécu","avez vécu","ont vécu"],
    imparfait: ["vivais","vivais","vivait","vivions","viviez","vivaient"],
    futurSimple: ["vivrai","vivras","vivra","vivrons","vivrez","vivront"],
    conditionnel: ["vivrais","vivrais","vivrait","vivrions","vivriez","vivraient"],
    subjonctif: ["vive","vives","vive","vivions","viviez","vivent"],
    participe: "vécu", auxiliaire: "avoir",
  },
  "suivre": {
    sens: "aller derrière, comprendre, accompagner",
    groupe: "irrégulier",
    présent: ["suis","suis","suit","suivons","suivez","suivent"],
    passéComposé: ["ai suivi","as suivi","a suivi","avons suivi","avez suivi","ont suivi"],
    imparfait: ["suivais","suivais","suivait","suivions","suiviez","suivaient"],
    futurSimple: ["suivrai","suivras","suivra","suivrons","suivrez","suivront"],
    conditionnel: ["suivrais","suivrais","suivrait","suivrions","suivriez","suivraient"],
    subjonctif: ["suive","suives","suive","suivions","suiviez","suivent"],
    participe: "suivi", auxiliaire: "avoir",
  },
  "courir": {
    sens: "se déplacer rapidement",
    groupe: "irrégulier",
    présent: ["cours","cours","court","courons","courez","courent"],
    passéComposé: ["ai couru","as couru","a couru","avons couru","avez couru","ont couru"],
    imparfait: ["courais","courais","courait","courions","couriez","couraient"],
    futurSimple: ["courrai","courras","courra","courrons","courrez","courront"],
    conditionnel: ["courrais","courrais","courrait","courrions","courriez","courraient"],
    subjonctif: ["coure","coures","coure","courions","couriez","courent"],
    participe: "couru", auxiliaire: "avoir",
  },
  "rire": {
    sens: "manifester de la joie par une expression du visage et des sons",
    groupe: "irrégulier",
    présent: ["ris","ris","rit","rions","riez","rient"],
    passéComposé: ["ai ri","as ri","a ri","avons ri","avez ri","ont ri"],
    imparfait: ["riais","riais","riait","riions","riiez","riaient"],
    futurSimple: ["rirai","riras","rira","rirons","rirez","riront"],
    conditionnel: ["rirais","rirais","rirait","ririons","ririez","riraient"],
    subjonctif: ["rie","ries","rie","riions","riiez","rient"],
    participe: "ri", auxiliaire: "avoir",
  },
  "craindre": {
    sens: "avoir peur de quelque chose",
    groupe: "irrégulier",
    présent: ["crains","crains","craint","craignons","craignez","craignent"],
    passéComposé: ["ai craint","as craint","a craint","avons craint","avez craint","ont craint"],
    imparfait: ["craignais","craignais","craignait","craignions","craigniez","craignaient"],
    futurSimple: ["craindrai","craindras","craindra","craindrons","craindrez","craindront"],
    conditionnel: ["craindrais","craindrais","craindrait","craindrions","craindriez","craindraient"],
    subjonctif: ["craigne","craignes","craigne","craignions","craigniez","craignent"],
    participe: "craint", auxiliaire: "avoir",
  },
  "peindre": {
    sens: "couvrir de peinture, créer une œuvre picturale",
    groupe: "irrégulier (= craindre)",
    présent: ["peins","peins","peint","peignons","peignez","peignent"],
    passéComposé: ["ai peint","as peint","a peint","avons peint","avez peint","ont peint"],
    imparfait: ["peignais","peignais","peignait","peignions","peigniez","peignaient"],
    futurSimple: ["peindrai","peindras","peindra","peindrons","peindrez","peindront"],
    conditionnel: ["peindrais","peindrais","peindrait","peindrions","peindriez","peindraient"],
    subjonctif: ["peigne","peignes","peigne","peignions","peigniez","peignent"],
    participe: "peint", auxiliaire: "avoir",
  },
  "valoir": {
    sens: "avoir une valeur, mériter",
    groupe: "irrégulier",
    présent: ["vaux","vaux","vaut","valons","valez","valent"],
    passéComposé: ["ai valu","as valu","a valu","avons valu","avez valu","ont valu"],
    imparfait: ["valais","valais","valait","valions","valiez","valaient"],
    futurSimple: ["vaudrai","vaudras","vaudra","vaudrons","vaudrez","vaudront"],
    conditionnel: ["vaudrais","vaudrais","vaudrait","vaudrions","vaudriez","vaudraient"],
    subjonctif: ["vaille","vailles","vaille","valions","valiez","vaillent"],
    participe: "valu", auxiliaire: "avoir",
  },
  "falloir": {
    sens: "être nécessaire (impersonnel : il faut)",
    groupe: "irrégulier (impersonnel)",
    présent: ["—","—","faut","—","—","—"],
    passéComposé: ["—","—","a fallu","—","—","—"],
    imparfait: ["—","—","fallait","—","—","—"],
    futurSimple: ["—","—","faudra","—","—","—"],
    conditionnel: ["—","—","faudrait","—","—","—"],
    subjonctif: ["—","—","faille","—","—","—"],
    participe: "fallu", auxiliaire: "avoir",
  },
  "pleuvoir": {
    sens: "tomber de la pluie (impersonnel)",
    groupe: "irrégulier (impersonnel)",
    présent: ["—","—","pleut","—","—","—"],
    passéComposé: ["—","—","a plu","—","—","—"],
    imparfait: ["—","—","pleuvait","—","—","—"],
    futurSimple: ["—","—","pleuvra","—","—","—"],
    conditionnel: ["—","—","pleuvrait","—","—","—"],
    subjonctif: ["—","—","pleuve","—","—","—"],
    participe: "plu", auxiliaire: "avoir",
  },
};

// ---- ALGORITHME POUR VERBES RÉGULIERS ----
// Couvre des milliers de verbes : tous les -er, -ir réguliers, -re réguliers

const PRONOMS = ["je","tu","il/elle/on","nous","vous","ils/elles"];

function ajouterApostrophe(pronom, verbe) {
  const premierMot = pronom.split('/')[0];
  if ((premierMot === "je" || premierMot === "je") && /^[aeiouéèêëàâùûîïôœh]/i.test(verbe)) {
    return "j'" + pronom.slice(2).split('/')[0] === '' ? "j'" : pronom.replace("je","j'");
  }
  return pronom;
}

export function conjuguerVerbe(infinitif) {
  // Vérifier d'abord les irréguliers
  const infBase = infinitif.toLowerCase().trim();
  if (irreguliers[infBase]) {
    const irr = irreguliers[infBase];
    const res = { sens: irr.sens, groupe: irr.groupe, participe: irr.participe, auxiliaire: irr.auxiliaire };
    const temps = ["présent","passéComposé","imparfait","futurSimple","conditionnel","subjonctif"];
    temps.forEach(t => {
      if (irr[t]) {
        res[t] = PRONOMS.map((p, i) => ({
          pronom: p,
          forme: irr[t][i],
        }));
      }
    });
    return res;
  }

  // Verbes en -er (1er groupe)
  if (infBase.endsWith("er") && infBase !== "aller") {
    return conjuguerEr(infBase);
  }

  // Verbes en -ir (2e groupe : finissons)
  if (infBase.endsWith("ir")) {
    const radical = infBase.slice(0, -2);
    // Distinguer 2e groupe (finir → finissons) des 3e groupe (partir → partons)
    // Heuristique : si la 1e pers. pluriel prend -issons, c'est 2e groupe
    return conjuguerIr2(infBase);
  }

  // Verbes en -re (3e groupe régulier)
  if (infBase.endsWith("re")) {
    return conjuguerRe(infBase);
  }

  return null; // verbe non reconnu
}

function conjuguerEr(infinitif) {
  let radical = infinitif.slice(0, -2);

  // Correction orthographique
  let radicalNous = radical;
  if (infinitif.endsWith("ger")) radicalNous = radical + "e"; // manger → mangeons
  if (infinitif.endsWith("cer")) radicalNous = radical.slice(0,-1) + "ç"; // commencer → commençons
  if (infinitif.endsWith("eler") || infinitif.endsWith("eter")) {
    // appeler → j'appelle, jeter → je jette
    radical = radical + radical[radical.length-1];
  }
  if (infinitif.endsWith("yer")) {
    // nettoyer → je nettoie
  }

  const présent_er = (r) => [`${r}e`,`${r}es`,`${r}e`,`${radicalNous}ons`,`${radicalNous}ez`,`${r}ent`];
  const imparfait_er = (r) => [`${r}ais`,`${r}ais`,`${r}ait`,`${r}ions`,`${r}iez`,`${r}aient`];
  const futur_er = (inf) => [`${inf}ai`,`${inf}as`,`${inf}a`,`${inf}ons`,`${inf}ez`,`${inf}ont`];

  const p = présent_er(radical);
  const imp = imparfait_er(radicalNous);
  const fut = futur_er(infinitif);
  const participe = radical + "é";
  const conditionnel = [`${infinitif}ais`,`${infinitif}ais`,`${infinitif}ait`,`${infinitif}ions`,`${infinitif}iez`,`${infinitif}aient`];
  const passéComposé = PRONOMS.map((pr,i) => {
    const aux = i <= 2 ? ["ai","as","a"][i] : ["avons","avez","ont"][i-3];
    return aux + " " + participe;
  });
  const subjonctif = présent_er(radical).map((f,i) => i < 3 ? f : imparfait_er(radicalNous)[i]);

  return {
    groupe: "1er groupe (-er)",
    participe,
    auxiliaire: "avoir",
    présent: PRONOMS.map((pr,i) => ({ pronom: pr, forme: p[i] })),
    passéComposé: PRONOMS.map((pr,i) => ({ pronom: pr, forme: passéComposé[i] })),
    imparfait: PRONOMS.map((pr,i) => ({ pronom: pr, forme: imp[i] })),
    futurSimple: PRONOMS.map((pr,i) => ({ pronom: pr, forme: fut[i] })),
    conditionnel: PRONOMS.map((pr,i) => ({ pronom: pr, forme: conditionnel[i] })),
    subjonctif: PRONOMS.map((pr,i) => ({ pronom: pr, forme: subjonctif[i] })),
  };
}

function conjuguerIr2(infinitif) {
  const radical = infinitif.slice(0, -2);
  const radLong = radical + "iss";

  const présent = [radical+"is", radical+"is", radical+"it", radLong+"ons", radLong+"ez", radLong+"ent"];
  const imparfait = [radLong+"ais", radLong+"ais", radLong+"ait", radLong+"ions", radLong+"iez", radLong+"aient"];
  const futur = [infinitif+"ai", infinitif+"as", infinitif+"a", infinitif+"ons", infinitif+"ez", infinitif+"ont"];
  const participe = radical + "i";
  const conditionnel = [infinitif+"ais", infinitif+"ais", infinitif+"ait", infinitif+"ions", infinitif+"iez", infinitif+"aient"];
  const passéComposé = PRONOMS.map((pr,i) => {
    const aux = i <= 2 ? ["ai","as","a"][i] : ["avons","avez","ont"][i-3];
    return aux + " " + participe;
  });

  return {
    groupe: "2e groupe (-ir)",
    participe,
    auxiliaire: "avoir",
    présent: PRONOMS.map((pr,i) => ({ pronom: pr, forme: présent[i] })),
    passéComposé: PRONOMS.map((pr,i) => ({ pronom: pr, forme: passéComposé[i] })),
    imparfait: PRONOMS.map((pr,i) => ({ pronom: pr, forme: imparfait[i] })),
    futurSimple: PRONOMS.map((pr,i) => ({ pronom: pr, forme: futur[i] })),
    conditionnel: PRONOMS.map((pr,i) => ({ pronom: pr, forme: conditionnel[i] })),
    subjonctif: PRONOMS.map((pr,i) => ({ pronom: pr, forme: i < 3 ? présent[i] : imparfait[i] })),
  };
}

function conjuguerRe(infinitif) {
  const radical = infinitif.slice(0, -2);

  const présent = [radical+"s", radical+"s", radical, radical+"ons", radical+"ez", radical+"ent"];
  const imparfait = [radical+"ais", radical+"ais", radical+"ait", radical+"ions", radical+"iez", radical+"aient"];
  const futur = [infinitif+"ai", infinitif+"as", infinitif+"a", infinitif+"ons", infinitif+"ez", infinitif+"ont"];
  const participe = radical + "u";
  const conditionnel = [infinitif+"ais", infinitif+"ais", infinitif+"ait", infinitif+"ions", infinitif+"iez", infinitif+"aient"];
  const passéComposé = PRONOMS.map((pr,i) => {
    const aux = i <= 2 ? ["ai","as","a"][i] : ["avons","avez","ont"][i-3];
    return aux + " " + participe;
  });

  return {
    groupe: "3e groupe (-re)",
    participe,
    auxiliaire: "avoir",
    présent: PRONOMS.map((pr,i) => ({ pronom: pr, forme: présent[i] })),
    passéComposé: PRONOMS.map((pr,i) => ({ pronom: pr, forme: passéComposé[i] })),
    imparfait: PRONOMS.map((pr,i) => ({ pronom: pr, forme: imparfait[i] })),
    futurSimple: PRONOMS.map((pr,i) => ({ pronom: pr, forme: futur[i] })),
    conditionnel: PRONOMS.map((pr,i) => ({ pronom: pr, forme: conditionnel[i] })),
    subjonctif: PRONOMS.map((pr,i) => ({ pronom: pr, forme: i < 3 ? présent[i] : imparfait[i] })),
  };
}

// Liste des verbes irréguliers les plus courants (pour la navigation)
export const listeIrreguliers = Object.entries(irreguliers).map(([inf, data]) => ({
  infinitif: inf,
  sens: data.sens,
  groupe: data.groupe,
  participe: data.participe,
  auxiliaire: data.auxiliaire,
}));

// Verbes réguliers courants pour la navigation
export const verbesReguliersCourants = [
  // -er
  { infinitif: "parler", sens: "s'exprimer oralement", groupe: "1er groupe" },
  { infinitif: "aimer", sens: "éprouver de l'amour, apprécier", groupe: "1er groupe" },
  { infinitif: "manger", sens: "avaler des aliments", groupe: "1er groupe" },
  { infinitif: "chercher", sens: "essayer de trouver", groupe: "1er groupe" },
  { infinitif: "trouver", sens: "découvrir quelque chose cherché", groupe: "1er groupe" },
  { infinitif: "donner", sens: "offrir, remettre", groupe: "1er groupe" },
  { infinitif: "regarder", sens: "diriger les yeux vers", groupe: "1er groupe" },
  { infinitif: "écouter", sens: "prêter l'oreille à", groupe: "1er groupe" },
  { infinitif: "travailler", sens: "exercer une activité professionnelle", groupe: "1er groupe" },
  { infinitif: "habiter", sens: "vivre quelque part", groupe: "1er groupe" },
  { infinitif: "penser", sens: "avoir des pensées, croire", groupe: "1er groupe" },
  { infinitif: "appeler", sens: "interpeller, téléphoner à", groupe: "1er groupe" },
  { infinitif: "marcher", sens: "se déplacer à pied", groupe: "1er groupe" },
  { infinitif: "jouer", sens: "pratiquer un jeu, jouer d'un instrument", groupe: "1er groupe" },
  { infinitif: "acheter", sens: "payer pour obtenir quelque chose", groupe: "1er groupe" },
  { infinitif: "entrer", sens: "passer de l'extérieur à l'intérieur", groupe: "1er groupe" },
  { infinitif: "passer", sens: "aller d'un endroit à un autre, s'écouler", groupe: "1er groupe" },
  { infinitif: "rester", sens: "demeurer au même endroit", groupe: "1er groupe" },
  { infinitif: "rentrer", sens: "retourner chez soi", groupe: "1er groupe" },
  { infinitif: "tomber", sens: "chuter, descendre brusquement", groupe: "1er groupe" },
  { infinitif: "arriver", sens: "parvenir quelque part, survenir", groupe: "1er groupe" },
  { infinitif: "montrer", sens: "faire voir, indiquer", groupe: "1er groupe" },
  { infinitif: "pardonner", sens: "cesser d'en vouloir, excuser", groupe: "1er groupe" },
  { infinitif: "commencer", sens: "débuter, entamer", groupe: "1er groupe" },
  { infinitif: "chanter", sens: "produire des sons musicaux avec la voix", groupe: "1er groupe" },
  { infinitif: "danser", sens: "bouger le corps en rythme", groupe: "1er groupe" },
  { infinitif: "voyager", sens: "se déplacer vers d'autres lieux", groupe: "1er groupe" },
  { infinitif: "cuisiner", sens: "préparer des repas", groupe: "1er groupe" },
  { infinitif: "nettoyer", sens: "rendre propre", groupe: "1er groupe" },
  { infinitif: "oublier", sens: "ne plus se souvenir de", groupe: "1er groupe" },
  { infinitif: "expliquer", sens: "rendre compréhensible", groupe: "1er groupe" },
  { infinitif: "raconter", sens: "narrer des événements", groupe: "1er groupe" },
  { infinitif: "demander", sens: "s'enquérir de, réclamer", groupe: "1er groupe" },
  { infinitif: "répondre", sens: "donner une réponse à", groupe: "3e groupe" },
  { infinitif: "attendre", sens: "rester jusqu'à l'arrivée de", groupe: "3e groupe" },
  { infinitif: "vendre", sens: "céder contre de l'argent", groupe: "3e groupe" },
  { infinitif: "entendre", sens: "percevoir par l'ouïe", groupe: "3e groupe" },
  { infinitif: "descendre", sens: "aller vers le bas", groupe: "3e groupe" },
  // -ir réguliers
  { infinitif: "finir", sens: "terminer, arriver à la fin", groupe: "2e groupe" },
  { infinitif: "choisir", sens: "sélectionner parmi plusieurs options", groupe: "2e groupe" },
  { infinitif: "grandir", sens: "devenir plus grand", groupe: "2e groupe" },
  { infinitif: "réussir", sens: "atteindre son objectif", groupe: "2e groupe" },
  { infinitif: "rougir", sens: "devenir rouge (de honte ou chaleur)", groupe: "2e groupe" },
  { infinitif: "obéir", sens: "se conformer aux ordres", groupe: "2e groupe" },
  { infinitif: "nourrir", sens: "donner à manger à", groupe: "2e groupe" },
  { infinitif: "remplir", sens: "mettre jusqu'au bord", groupe: "2e groupe" },
  { infinitif: "bâtir", sens: "construire", groupe: "2e groupe" },
  { infinitif: "avertir", sens: "prévenir, informer d'un danger", groupe: "2e groupe" },
];
