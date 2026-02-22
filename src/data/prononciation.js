// Guide complet de prononciation française
export const sons = [
  // Voyelles
  {
    son: "[a]",
    lettre: "a, à, â",
    description: "Comme le 'a' en espagnol ou en portugais. Bouche ouverte.",
    exemples: [
      { mot: "chat", phonetique: "[ʃa]", traduction: "le son 'ch' + 'a' ouvert" },
      { mot: "patte", phonetique: "[pat]", traduction: "'p' + 'a' + 't'" },
      { mot: "ami", phonetique: "[ami]", traduction: "'a' + 'mi'" },
    ],
    niveau: "A1",
    categorie: "voyelles",
  },
  {
    son: "[e] et [ɛ]",
    lettre: "é, er, ez vs è, ê, ai, ei",
    description: "[e] = fermé, bouche mi-ouverte, lèvres souriantes. [ɛ] = ouvert, bouche plus ouverte.",
    exemples: [
      { mot: "été", phonetique: "[ete]", traduction: "'é-té' — deux 'e' fermés" },
      { mot: "fête", phonetique: "[fɛt]", traduction: "'f' + 'ê' ouvert + 't'" },
      { mot: "lait", phonetique: "[lɛ]", traduction: "'l' + 'ai' ouvert" },
    ],
    niveau: "A1",
    categorie: "voyelles",
  },
  {
    son: "[ə]",
    lettre: "e (sans accent)",
    description: "Le 'e' muet ou caduc. Souvent non prononcé en français courant. Bouche à moitié ouverte, neutre.",
    exemples: [
      { mot: "le", phonetique: "[lə] ou silence", traduction: "Souvent muet dans la parole rapide" },
      { mot: "semaine", phonetique: "[s(ə)mɛn]", traduction: "Le 'e' peut être muet" },
    ],
    niveau: "A2",
    categorie: "voyelles",
    astuce: "En parole rapide, le 'e' muet disparaît souvent : 'je ne sais pas' → 'j'sais pas'",
  },
  {
    son: "[i]",
    lettre: "i, î, y",
    description: "Comme en espagnol. Bouche presque fermée, lèvres étirées.",
    exemples: [
      { mot: "vie", phonetique: "[vi]", traduction: "'v' + 'i'" },
      { mot: "île", phonetique: "[il]", traduction: "'i' + 'l'" },
      { mot: "stylo", phonetique: "[stilo]", traduction: "le 'y' = 'i'" },
    ],
    niveau: "A1",
    categorie: "voyelles",
  },
  {
    son: "[o] et [ɔ]",
    lettre: "o, au, eau vs o (ouvert)",
    description: "[o] fermé : lèvres arrondies, bouche peu ouverte. [ɔ] ouvert : bouche plus ouverte.",
    exemples: [
      { mot: "eau", phonetique: "[o]", traduction: "'o' fermé — même son que 'au'" },
      { mot: "or", phonetique: "[ɔʀ]", traduction: "'o' ouvert + 'r'" },
      { mot: "chaud", phonetique: "[ʃo]", traduction: "'ch' + 'au' = 'o' fermé" },
    ],
    niveau: "A1",
    categorie: "voyelles",
  },
  {
    son: "[u]",
    lettre: "ou",
    description: "Lèvres très arrondies et projetées en avant. Comme le 'ou' en français.",
    exemples: [
      { mot: "vous", phonetique: "[vu]", traduction: "'v' + 'ou'" },
      { mot: "rouge", phonetique: "[ʀuʒ]", traduction: "'r' + 'ou' + 'ge'" },
      { mot: "tour", phonetique: "[tuʀ]", traduction: "'t' + 'ou' + 'r'" },
    ],
    niveau: "A1",
    categorie: "voyelles",
  },
  {
    son: "[y]",
    lettre: "u",
    description: "SON UNIQUE EN FRANÇAIS ! Prononcez 'i' (bouche) mais avec les lèvres arrondies comme pour 'ou'. Très difficile pour les anglophones.",
    exemples: [
      { mot: "tu", phonetique: "[ty]", traduction: "Pas comme 'too' ! Lèvres arrondies + son 'i'" },
      { mot: "rue", phonetique: "[ʀy]", traduction: "r + u français" },
      { mot: "lune", phonetique: "[lyn]", traduction: "l + u + n" },
    ],
    niveau: "A2",
    categorie: "voyelles",
    astuce: "Exercice : prononcez 'i', puis arrondissez les lèvres sans changer la langue. C'est le [y] !",
  },
  {
    son: "[ø] et [œ]",
    lettre: "eu, œu",
    description: "Sons uniques en français. Comme [y] mais légèrement plus ouverts.",
    exemples: [
      { mot: "feu", phonetique: "[fø]", traduction: "eu fermé — bouche mi-arrondie" },
      { mot: "fleur", phonetique: "[flœʀ]", traduction: "eu ouvert — devant consonne prononcée" },
      { mot: "coeur", phonetique: "[kœʀ]", traduction: "œu = son ouvert" },
    ],
    niveau: "A2",
    categorie: "voyelles",
  },

  // Voyelles nasales
  {
    son: "[ɑ̃]",
    lettre: "an, am, en, em",
    description: "Voyelle nasale. Bouche ouverte, air sort par le nez. SON UNIQUE EN FRANÇAIS.",
    exemples: [
      { mot: "dans", phonetique: "[dɑ̃]", traduction: "d + 'an' nasal" },
      { mot: "enfant", phonetique: "[ɑ̃fɑ̃]", traduction: "deux 'an' nasaux" },
      { mot: "temps", phonetique: "[tɑ̃]", traduction: "t + 'en' nasal, le 'ps' est muet" },
    ],
    niveau: "A2",
    categorie: "voyelles-nasales",
    astuce: "Exercice : pincez votre nez et essayez de prononcer ce son — vous sentez la vibration nasale !",
  },
  {
    son: "[ɛ̃]",
    lettre: "in, im, ain, aim, ein, un, um",
    description: "Voyelle nasale. Prononcez [ɛ] mais laissez l'air sortir par le nez.",
    exemples: [
      { mot: "vin", phonetique: "[vɛ̃]", traduction: "v + 'in' nasal" },
      { mot: "pain", phonetique: "[pɛ̃]", traduction: "p + 'ain' nasal" },
      { mot: "brun", phonetique: "[bʀɛ̃]", traduction: "br + 'un' nasal (= même son)" },
    ],
    niveau: "A2",
    categorie: "voyelles-nasales",
  },
  {
    son: "[ɔ̃]",
    lettre: "on, om",
    description: "Voyelle nasale. Prononcez [o] avec l'air qui sort par le nez.",
    exemples: [
      { mot: "bon", phonetique: "[bɔ̃]", traduction: "b + 'on' nasal" },
      { mot: "maison", phonetique: "[mɛzɔ̃]", traduction: "mais + 'on' nasal" },
      { mot: "monde", phonetique: "[mɔ̃d]", traduction: "m + 'on' nasal + d" },
    ],
    niveau: "A2",
    categorie: "voyelles-nasales",
  },

  // Consonnes
  {
    son: "[ʀ]",
    lettre: "r",
    description: "Le 'r' français est guttural — il vient du fond de la gorge, pas de la langue. Imaginez que vous faites des gargarismes.",
    exemples: [
      { mot: "rouge", phonetique: "[ʀuʒ]", traduction: "r guttural + ou + j" },
      { mot: "Paris", phonetique: "[paʀi]", traduction: "pa + r guttural + i" },
      { mot: "arbre", phonetique: "[aʀbʀ]", traduction: "a + r + br" },
    ],
    niveau: "A1",
    categorie: "consonnes",
    astuce: "Exercice : dites 'kh' comme en arabe, puis progressivement transformez en 'r' français.",
  },
  {
    son: "[ʃ] et [ʒ]",
    lettre: "ch vs j, g (devant e/i)",
    description: "[ʃ] = 'ch' comme dans 'shoe' en anglais. [ʒ] = comme le 's' dans 'pleasure' en anglais.",
    exemples: [
      { mot: "chat", phonetique: "[ʃa]", traduction: "'ch' = son doux, comme 'sh'" },
      { mot: "je", phonetique: "[ʒə]", traduction: "'j' = son doux, comme 'zh'" },
      { mot: "genou", phonetique: "[ʒənu]", traduction: "'g' devant 'e' = [ʒ]" },
    ],
    niveau: "A1",
    categorie: "consonnes",
  },
];

export const regles = [
  {
    titre: "Les lettres muettes en fin de mot",
    description: "En français, beaucoup de consonnes finales ne se prononcent pas.",
    exemples: [
      { regle: "s final muet", exemple: "les (= [le]), vous (= [vu]), chats (= [ʃa])" },
      { regle: "t final muet", exemple: "petit (= [p(ə)ti]), chat (= [ʃa])" },
      { regle: "d final muet", exemple: "grand (= [gʀɑ̃]), chaud (= [ʃo])" },
      { regle: "p final muet", exemple: "beaucoup (= [boku]), trop (= [tʀo])" },
      { regle: "x final muet", exemple: "deux (= [dø]), voix (= [vwa])" },
      { regle: "Exceptions : c, r, f, l se prononcent souvent", exemple: "parc, mer, chef, sol" },
    ],
    niveau: "A1",
  },
  {
    titre: "La Liaison",
    description: "Quand un mot termine par une consonne muette et le suivant commence par une voyelle, on prononce la consonne muette. Cela crée une continuité dans la phrase.",
    exemples: [
      { regle: "les amis", exemple: "les (z)amis → [lezami] — le 's' de 'les' se prononce" },
      { regle: "vous avez", exemple: "vous (z)avez → [vuzave] — le 's' de 'vous' se prononce" },
      { regle: "un enfant", exemple: "un (n)enfant → [œ̃nɑ̃fɑ̃] — le 'n' de 'un' se prononce" },
      { regle: "ils arrivent", exemple: "ils (z)arrivent → [ilzaʀiv] — le 's' de 'ils' se prononce" },
    ],
    niveau: "A2",
    astuce: "La liaison est obligatoire avec : les articles, les pronoms, les adjectifs devant un nom.",
  },
  {
    titre: "L'Élision",
    description: "Quand certains petits mots (je, me, le, la, de, que, ne, se, ce) sont suivis d'une voyelle ou d'un 'h' muet, la voyelle du petit mot disparaît et est remplacée par une apostrophe.",
    exemples: [
      { regle: "je + voyelle → j'", exemple: "je aime → j'aime, je arrive → j'arrive" },
      { regle: "le/la + voyelle → l'", exemple: "le ami → l'ami, la école → l'école" },
      { regle: "de + voyelle → d'", exemple: "de accord → d'accord, de eau → d'eau" },
      { regle: "que + voyelle → qu'", exemple: "que il → qu'il, que elle → qu'elle" },
      { regle: "ne + voyelle → n'", exemple: "ne est → n'est, ne a → n'a" },
    ],
    niveau: "A1",
  },
  {
    titre: "L'Accent Tonique",
    description: "En français, l'accent tonique tombe toujours sur la DERNIÈRE SYLLABE du groupe de mots. C'est très différent de l'anglais ou du portugais.",
    exemples: [
      { regle: "bonjour", exemple: "bon-JOUR (accent sur 'jour')" },
      { regle: "appartement", exemple: "ap-par-te-MENT" },
      { regle: "une bonne idée", exemple: "une bonne i-DÉE" },
    ],
    niveau: "A2",
    astuce: "Contrairement à l'anglais, il n'y a pas d'accent tonique fort en français. La langue est plus monotone et régulière.",
  },
  {
    titre: "Les Accents et ce qu'ils changent",
    description: "Les accents en français changent le son de la lettre ou distinguent des mots.",
    exemples: [
      { regle: "é (accent aigu)", exemple: "été [ete] — 'e' fermé" },
      { regle: "è, ê (accent grave, circonflexe)", exemple: "père [pɛʀ], fête [fɛt] — 'e' ouvert" },
      { regle: "à vs a", exemple: "'à' = préposition (Il est à Paris), 'a' = avoir (Il a faim)" },
      { regle: "où vs ou", exemple: "'où' = question de lieu (Où es-tu ?), 'ou' = conjonction (café ou thé)" },
      { regle: "ç (cédille)", exemple: "ça [sa], garçon [gaʀsɔ̃] — 'c' prononcé [s] devant a, o, u" },
    ],
    niveau: "A1",
  },
];
