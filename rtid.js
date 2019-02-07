module.exports = {
	0: {
		name: 'r_associated',
		expandedLabel: 'idée associée',
		description: 'Il est demandé d\'énumérer les termes les plus étroitement associés au mot cible... Ce mot vous fait penser à quoi ?'
	},
	1: {
		name: 'r_raff_sem',
		expandedLabel: 'raffinement sémantique',
		description: 'Raffinement sémantique vers un usage particulier du terme source'
	},
	2: {
		name: 'r_raff_morpho',
		expandedLabel: 'raffinement morphologique',
		description: 'Raffinement morphologique vers un usage particulier du terme source'
	},
	3: {
		name: 'r_domain',
		expandedLabel: 'domaine',
		description: 'Il est demandé de fournir des domaines relatifs au mot cible. Par exemple, pour \'corner\', on pourra donner les domaines \'football\' ou \'sport\'.'
	},
	4: {
		name: 'r_pos',
		expandedLabel: 'POS',
		description: 'Partie du discours (Nom, Verbe, Adjectif, Adverbe, etc.)'
	},
	5: {
		name: 'r_syn',
		expandedLabel: 'synonyme',
		description: 'Il est demandé d\'énumérer les synonymes ou quasi-synonymes de ce terme.'
	},
	6: {
		name: 'r_isa',
		expandedLabel: 'générique',
		description: 'Il est demandé d\'énumérer les GENERIQUES/hyperonymes du terme. Par exemple, \'animal\' et \'mammifère\' sont des génériques de \'chat\'.'
	},
	7: {
		name: 'r_anto',
		expandedLabel: 'contraire',
		description: 'Il est demandé d\'énumérer des contraires du terme. Par exemple, \'chaud\' est le contraire de \'froid\'.'
	},
	8: {
		name: 'r_hypo',
		expandedLabel: 'spécifique',
		description: 'Il est demandé d\'énumérer des SPECIFIQUES/hyponymes du terme. Par exemple, \'mouche\', \'abeille\', \'guêpe\' pour \'insecte\'.'
	},
	9: {
		name: 'r_has_part',
		expandedLabel: 'partie',
		description: 'Il faut donner des PARTIES/constituants/éléments (a pour méronymes) du mot cible. Par exemple, \'voiture\' a comme parties : \'porte\', \'roue\', \'moteur\', ...'
	},
	10: {
		name: 'r_holo',
		expandedLabel: 'tout',
		description: 'Il est démandé d\'énumérer des \'TOUT\' (a pour holonymes)  de l\'objet en question. Pour \'main\', on aura \'bras\', \'corps\', \'personne\', etc... Le tout est aussi l\'ensemble comme \'classe\' pour \'élève\'.'
	},
	11: {
		name: 'r_locution',
		expandedLabel: 'locution',
		description: 'A partir d\'un terme, il est demandé d\'énumérer les locutions, expression ou mots composés en rapport avec ce terme. Par exemple, pour \'moulin\', ou pourra avoir \'moulin à vent\', \'moulin à eau\', \'moulin à café\'. Pour \'vendre\', on pourra avoir \'vendre la peau de l\'ours avant de l\'avoir tué\', \'vendre à perte\', etc..'
	},
	13: {
		name: 'r_agent',
		expandedLabel: 'action>agent',
		description: 'L\'agent (qu\'on appelle aussi le sujet) est l\'entité qui effectue l\'action, OU la subit pour des formes passives ou des verbes d\'état. Par exemple, dans - Le chat mange la souris -, l\'agent est le chat. Des agents typiques de \'courir\' peuvent être \'sportif\', \'enfant\',...'
	},
	14: {
		name: 'r_patient',
		expandedLabel: 'action>patient',
		description: 'Le patient (qu\'on appelle aussi l\'objet) est l\'entité qui subit l\'action. Par exemple dans - Le chat mange la souris -, le patient est la souris. Des patients typiques de manger peuvent être \'viande\', \'légume\', \'pain\', ...'
	},
	12: {
		name: 'r_flpot',
		expandedLabel: ' 	r_flpot',
		description: '(relation interne) potentiel de relation'
	},
	15: {
		name: 'r_lieu',
		expandedLabel: 'chose>lieu',
		description: 'Il est demandé d\'énumérer les LIEUX typiques où peut se trouver le terme/objet en question.'
	},
	16: {
		name: 'r_instr',
		expandedLabel: 'action>instrument',
		description: 'L\'instrument est l\'objet avec lequel on fait l\'action. Dans - Il mange sa salade avec une fourchette -, fourchette est l\'instrument. Des instruments typiques de \'tuer\' peuvent être \'arme\', \'pistolet\', \'poison\', ...'
	},
	17: {
		name: 'r_carac',
		expandedLabel: 'caractéristique',
		description: 'Pour un terme donné, souvent un objet, il est demandé d\'en énumérer les CARACtéristiques (adjectifs) possibles/typiques. Par exemple, \'liquide\', \'froide\', \'chaude\', pour \'eau\'.'
	},
	18: {
		name: 'r_data',
		expandedLabel: 'r_data',
		description: 'Informations diverses (plutôt d\'ordre lexicales)'
	},
	19: {
		name: 'r_lemma',
		expandedLabel: 'r_lemma',
		description: 'Le lemme (par exemple \'mangent a pour lemme  \'manger\' ; \'avions\' a pour lemme \'avion\' ou \'avoir\').'
	},
	20: {
		name: 'r_has_magn',
		expandedLabel: 'magn',
		description: 'La magnification ou amplification, par exemple - forte fièvre - ou - fièvre de cheval - pour fièvre. Ou encore - amour fou - pour amour, - peur bleue - pour peur.'
	},
	21: {
		name: 'r_has_antimagn',
		expandedLabel: 'antimagn',
		description: 'L\'inverse de la magnification, par exemple - bruine - pour pluie.'
	},
	22: {
		name: 'r_family',
		expandedLabel: 'famille',
		description: 'Des mots de la même famille lexicale sont demandés (dérivation morphologique, par exemple). Par exemple, pour \'lait\' on pourrait mettre \'laitier\', \'laitage\', \'laiterie\', etc.'
	},
	23: {
		name: 'r_carac-1',
		expandedLabel: 'caractéristique-1',
		description: 'Quels sont les objets (des noms) possédant typiquement/possiblement la caractérisque suivante ? Par exemple, \'soleil\', \'feu\', pour \'chaud\'.'
	},
	24: {
		name: 'r_agent-1',
		expandedLabel: 'agent typique-1',
		description: 'Que peut faire ce SUJET ? (par exemple chat => miauler, griffer, etc.)'
	},
	25: {
		name: 'r_instr-1',
		expandedLabel: 'instrument>action',
		description: 'L\'instrument est l\'objet avec lequel on fait l\'action. Dans - Il mange sa salade avec une fourchette -, fourchette est l\'instrument. On demande ici, ce qu\'on peut faire avec un instrument donné...'
	},
	26: {
		name: 'r_patient-1',
		expandedLabel: 'patient-1',
		description: '(inverse de r_patient) Que peut-on faire à cet OBJET. Pour \'pomme\', on pourrait avoir \'manger\', \'croquer\', couper\', \'éplucher\',  etc.'
	},
	27: {
		name: 'r_domain-1',
		expandedLabel: 'domaine-1',
		description: 'inverse de r_domain : à un domaine, on associe des termes'
	},
	28: {
		name: 'r_lieu-1',
		expandedLabel: 'lieu>chose',
		description: 'A partir d\'un lieu, il est demandé d\'énumérer ce qui peut typiquement s\'y trouver.'
	},
	29: {
		name: 'r_chunk_pred',
		expandedLabel: 'predicat',
		description: '(interne) d\'un prédicat quel chunk ?'
	},
	30: {
		name: 'r_lieu_action',
		expandedLabel: 'lieu>action',
		description: 'A partir d\'un lieu, énumérer les actions typiques possibles dans ce lieu.'
	},
	31: {
		name: 'r_action_lieu',
		expandedLabel: 'action>lieu',
		description: 'A partir d\'une action (un verbe), énumérer les lieux typiques possibles où peut être réalisée cette action.'
	},
	32: {
		name: 'r_sentiment',
		expandedLabel: 'sentiment',
		description: 'Pour un terme donné, évoquer des mots liés à des SENTIMENTS ou des EMOTIONS que vous pourriez associer à ce terme. Par exemple, la joie, le plaisir, le dégoût, la peur, la haine, l\'amour, l\'indifférence, l\'envie, avoir peur, horrible, etc.'
	},
	33: {name: 'r_error', expandedLabel: 'erreur', description: 'lien d\'erreur'},
	34: {
		name: 'r_manner',
		expandedLabel: 'manière',
		description: 'De quelles MANIERES peut être effectuée l\'action (le verbe) proposée. Il s\'agira d\'un adverbe ou d\'un équivalent comme une locution adverbiale, par exemple : \'rapidement\', \'sur le pouce\', \'goulûment\', \'salement\' ... pour \'manger\'.'
	},
	35: {
		name: 'r_meaning',
		expandedLabel: 'sens/signification',
		description: 'Quels SENS/SIGNIFICATIONS pouvez vous donner au terme proposé. Il s\'agira de termes évoquant chacun des sens possibles, par exemple : \'forces de l\'ordre\', \'contrat d\'assurance\', \'police typographique\', ... pour \'police\'.'
	},
	36: {
		name: 'r_infopot',
		expandedLabel: 'information potentielle',
		description: 'Information sémantique potentielle'
	},
	37: {
		name: 'r_telic_role',
		expandedLabel: 'rôle télique',
		description: 'Le rôle télique indique le but ou la fonction du nom ou du verbe. Par exemple, couper pour couteau, scier pour scie, etc. C\'est le rôle qu\'on lui destine communément pour un artéfact, ou bien un rôle qu\'on peut attribuer à un objet naturel (réchauffer, éclairer pour soleil).'
	},
	38: {
		name: 'r_agentif_role',
		expandedLabel: 'rôle agentif',
		description: 'De quelle(s)  manière(s)  peut être CRÉE/CONSTRUIT le terme suivant. On demande des verbes transitifs (le terme en est un complément d\'objet) qui DONNENT NAISSANCE à l\'entité désignée par le terme,  par exemple, \'construire\' pour \'maison\', \'rédiger\'/\'imprimer\' pour \'livre\' ou \'lettre\'.'
	},
	39: {
		name: 'r_verbe-action',
		expandedLabel: 'verbe>action',
		description: 'du verbe vers l\'action. Par exemple, construire -> construction , jardiner -> jardinage . C\'est un terme directement dérivé (ayant la même racine). Applicable que pour un verbe et inverse de la relation 40 (action vers verbe).'
	},
	40: {
		name: 'r_action-verbe',
		expandedLabel: 'action>verbe',
		description: 'de l\'action vers le verbe. Par exemple, construction -> construire, jardinage -> jardiner. C\'est un terme directement dérivé (ayant la même racine). Applicable que pour un nom et inverse de la relation 39 (verbe vers action).'
	},
	42: {
		name: 'r_causatif',
		expandedLabel: 'cause',
		description: 'B (que vous devez donner) est une CAUSE possible de A. A et B sont des verbes ou des noms.  Exemples : se blesser -> tomber ; vol -> pauvreté ; incendie -> négligence ; mort --> maladie ; etc.'
	},
	41: {
		name: 'r_conseq',
		expandedLabel: 'conséquence',
		description: 'B (que vous devez donner) est une CONSEQUENCE possible de A. A et B sont des verbes ou des noms.  Exemples : tomber -> se blesser ; faim -> voler ; allumer -> incendie ; négligence --> accident ; etc.'
	},
	43: {
		name: 'r_adj-verbe',
		expandedLabel: 'adj>verbe',
		description: 'Pour un adjectif de potentialité/possibilité, son verbe correspondant. Par exemple pour \'lavable\' -> \'laver\''
	},
	44: {
		name: 'r_verbe-adj',
		expandedLabel: 'verbe>adj',
		description: 'Pour un verbe, son adjectif de potentialité/possibilité correspondant. Par exemple pour \'laver\' -> \'lavable\''
	},
	45: {
		name: 'r_chunk_sujet',
		expandedLabel: 'r_chunk_sujet',
		description: '(interne)'
	},
	46: {
		name: 'r_chunk_objet',
		expandedLabel: 'r_chunk_objet',
		description: '(interne)'
	},
	47: {
		name: 'r_chunk_loc',
		expandedLabel: 'r_chunk_loc',
		description: '(interne)'
	},
	48: {
		name: 'r_chunk_instr',
		expandedLabel: 'r_chunk_instr',
		description: '(interne)'
	},
	666: {
		name: 'r_aki',
		expandedLabel: 'r_aki',
		description: '(TOTAKI) equivalent pour TOTAKI de l\'association libre'
	},
	49: {
		name: 'r_time',
		expandedLabel: 'action>temps',
		description: 'Donner une valeur temporelle -quel moment- peut-on associer au terme indiqué (par exemple \'dormir\' -> nuit, \'bronzer\' -> été, \'fatigue\' -> \'soir\')'
	},
	1000: {name: 'r_prev', expandedLabel: 'r_prev', description: '(interne)'},
	1001: {name: 'r_succ', expandedLabel: 'r_succ', description: '(interne)'},
	999: {
		name: 'r_inhib',
		expandedLabel: 'r_inhib',
		description: 'relation d\'inhibition, le terme inhibe les termes suivants... ce terme a tendance à exclure le terme associé.'
	},
	50: {
		name: 'r_object>mater',
		expandedLabel: 'objet>matiere',
		description: 'Quel est la ou les MATIERE/SUBSTANCE pouvant composer l\'objet qui suit. Par exemple, \'bois\' pour \'poutre\'.'
	},
	51: {
		name: 'r_mater>object',
		expandedLabel: 'matière>objet',
		description: 'Quel est la ou les CHOSES qui sont composés de la MATIERE/SUBSTANCE qui suit (exemple \'bois\' -> poutre, table, ...).'
	},
	52: {
		name: 'r_successeur-time',
		expandedLabel: 'successeur',
		description: 'Qu\'est ce qui peut SUIVRE temporellement (par exemple Noêl -> jour de l\'an, guerre -> paix, jour -> nuit,  pluie -> beau temps, repas -> sieste, etc) le terme suivant :'
	},
	53: {
		name: 'r_make',
		expandedLabel: 'produit',
		description: 'Que peut PRODUIRE le terme ? (par exemple abeille -> miel, usine -> voiture, agriculteur -> blé,  moteur -> gaz carbonique ...)'
	},
	54: {
		name: 'r_product_of',
		expandedLabel: 'est le produit de',
		description: 'Le terme est le RESULTAT/PRODUIT de qui/quoi ?'
	},
	55: {
		name: 'r_against',
		expandedLabel: 's\'oppose à',
		description: 'A quoi le terme suivant S\'OPPOSE/COMBAT/EMPECHE ? Par exemple, un médicament s\'oppose à la maladie.'
	},
	56: {
		name: 'r_against-1',
		expandedLabel: 'a comme opposition',
		description: 'Inverse de r_against (s\'oppose à) - a comme opposition active (S\'OPPOSE/COMBAT/EMPECHE). Par exemple, une bactérie à comme opposition antibiotique.'
	},
	57: {
		name: 'r_implication',
		expandedLabel: 'implication',
		description: 'Qu\'est-ce que le terme implique logiquement ? Par exemple : ronfler implique dormir, courir implique se déplacer, câlin implique contact physique. (attention ce n\'est pas la cause ni le but...)'
	},
	58: {
		name: 'r_quantificateur',
		expandedLabel: 'quantificateur',
		description: 'Quantificateur(s) typique(s) pour le terme,  indiquant une quantité. Par exemples, sucre -> grain, morceau - sel -> grain, pincée - herbe -> brin, touffe - ...'
	},
	59: {
		name: 'r_masc',
		expandedLabel: 'équivalent masc',
		description: 'L\'équivalent masculin du terme : lionne --> lion.'
	},
	60: {
		name: 'r_fem',
		expandedLabel: 'équivalent fem',
		description: 'L\'équivalent féminin du terme : lion --> lionne.'
	},
	61: {
		name: 'r_equiv',
		expandedLabel: 'équivalent',
		description: 'Termes strictement équivalent/identique : acronymes et sigles (PS -> parti socialiste), apocopes (ciné -> cinéma), entités nommées (Louis XIV -> Le roi soleil), etc. (attention il ne s\'agit pas de synonyme)'
	},
	62: {
		name: 'r_manner-1',
		expandedLabel: 'maniere-1',
		description: 'Quelles ACTIONS (verbes) peut-on effectuer de cette manière ? Par exemple, rapidement -> courir, manger, ...'
	},
	63: {
		name: 'r_agentive_implication',
		expandedLabel: 'implication agentive',
		description: 'Les verbes ou actions qui sont impliqués dans la création de l\'objet. Par exemple pour \'construire\' un livre, il faut, imprimer, relier, brocher, etc. Il s\'agit des étapes nécessaires à la réalisation du rôle agentif.'
	},
	64: {
		name: 'r_has_instance',
		expandedLabel: 'a pour instance',
		description: 'Une instance d\'un \'type\' est un individu particulier de ce type. Il s\'agit d\'une entité nommée (personne, lieu, organisation, etc) - par exemple, \'cheval\' a pour instance possible \'Jolly Jumper\', ou encore \'transatlantique\' a pour instance possible \'Titanic\'.'
	},
	65: {
		name: 'r_verb_real',
		expandedLabel: 'verbe>real',
		description: 'Pour un verbe, celui qui réalise l\'action (par dérivation morphologique). Par exemple, chasser -> chasseur, naviguer -> navigateur.'
	},
	1002: {name: 'r_termgroup', expandedLabel: 'r_termgroup', description: ''},
	66: {name: 'r_chunk_head', expandedLabel: 'r_chunk_head', description: ''},
	67: {
		name: 'r_similar',
		expandedLabel: 'similaire',
		description: 'Similaire/ressemble à ; par exemple le congre est similaire à une anguille, ...'
	},
	68: {
		name: 'r_set>item',
		expandedLabel: 'ensemble>item',
		description: 'Quel est l\'ELEMENT qui compose l\'ENSEMBLE qui suit (par exemple, un essaim est composé d\'aveilles)'
	},
	69: {
		name: 'r_item>set',
		expandedLabel: 'item>ensemble',
		description: 'Quel est l\'ENSEMBLE qui est composé de l\'ELEMENT qui suit (par exemple, un essaim est composé d\'aveilles)'
	},
	70: {
		name: 'r_processus>agent',
		expandedLabel: 'processus>agent',
		description: 'Quel est l\'acteur de ce processus/événement ? Par exemple,  \'nettoyage\' peut avoir comme acteur \'technicien de surface\'.'
	},
	71: {
		name: 'r_variante',
		expandedLabel: 'variante',
		description: 'Variantes du termes cible. Par exemple, yaourt, yahourt, ou encore évènement, événement.'
	},
	101: {
		name: 'r_has_personnage',
		expandedLabel: 'a comme personnages',
		description: 'Quels sont les personnages présents dans l\'oeuvre qui suit ?'
	},
	100: {
		name: 'r_has_auteur',
		expandedLabel: 'a comme auteur',
		description: 'Quel est l\'auteur de l\'oeuvre suivante ?'
	},
	102: {
		name: 'r_can_eat',
		expandedLabel: 'se nourrit de',
		description: 'De quoi peut se nourir l\'animal suivant ?'
	},
	72: {
		name: 'r_syn_strict',
		expandedLabel: 'r_syn_strict',
		description: 'Termes strictement substituables, pour des termes hors du domaine général, et pour la plupart des noms (exemple : endométriose intra-utérine --> adénomyose)'
	},
	103: {
		name: 'r_has_actors',
		expandedLabel: 'a comme acteurs',
		description: 'A comme acteurs (pour un film ou similaire).'
	},
	104: {
		name: 'r_deplac_mode',
		expandedLabel: 'mode de déplacement',
		description: 'Mode de déplacement'
	},
	99: {
		name: 'r_der_morpho',
		expandedLabel: 'dérivation morphologique',
		description: 'Des termes dériviés morphologiquement sont demandés). Par exemple, pour \'lait\' on pourrait mettre \'laitier\', \'laitage\', \'laiterie\', etc. (mais pas \'lactose\'). Pour \'jardin\', on mettra \'jardinier\', \'jardinage\', \'jardiner\', etc. '
	},
	105: {
		name: 'r_has_interpret',
		expandedLabel: 'a comme interprètes',
		description: 'Interprète de personnages (cinéma ou théâtre)'
	},
	106: {
		name: 'r_color',
		expandedLabel: 'couleur',
		description: 'A comme couleur(s)...'
	},
	2001: {
		name: 'r_learning_model',
		expandedLabel: 'r_learning_model',
		description: ''
	},
	777: {
		name: 'r_wiki',
		expandedLabel: 'r_wiki',
		description: 'Associations issues de wikipedia...'
	},
	998: {name: 'r_annotation', expandedLabel: 'r_annotation', description: ''},
	107: {
		name: 'r_cible',
		expandedLabel: 'a comme cible',
		description: 'Cible de la maladie : myxomatose => lapin, rougeole => enfant, ...'
	},
	108: {
		name: 'r_symptomes',
		expandedLabel: 'a comme symptomes',
		description: 'Symptomes de la maladie : myxomatose => yeux rouges, rougeole => boutons, ...'
	},
	997: {
		name: 'r_annotation_exception',
		expandedLabel: 'r_annotation_exception',
		description: ''
	},
	109: {
		name: 'r_predecesseur-time',
		expandedLabel: 'prédécesseur',
		description: 'Qu\'est ce qui peut PRECEDER temporellement (par exemple -  inverse de successeur) le terme suivant :'
	},
	110: {
		name: 'r_diagnostique',
		expandedLabel: 'diagnostique',
		description: 'Diagnostique pour la maladie : diabète => prise de sang, rougeole => examen clinique, ...'
	},
	73: {
		name: 'r_is_smaller_than',
		expandedLabel: 'est plus petit que',
		description: 'Qu\'est-ce qui est physiquement plus gros que... (la comparaison doit être pertinente)'
	},
	74: {
		name: 'r_is_bigger_than',
		expandedLabel: 'est plus gros que',
		description: 'Qu\'est-ce qui est physiquement moins gros que... (la comparaison doit être pertinente)'
	},
	75: {
		name: 'r_accomp',
		expandedLabel: 'accompagne',
		description: 'Est souvent accompagné de, se trouve avec... Par exemple : Astérix et Obelix, le pain et le fromage, les fraises et la chantilly.'
	},
	111: {
		name: 'r_predecesseur-space',
		expandedLabel: 'prédécesseur',
		description: 'Qu\'est ce qui peut PRECEDER spatialement (par exemple -  inverse de successeur spatial) le terme suivant :'
	},
	112: {
		name: 'r_successeur-space',
		expandedLabel: 'successeur',
		description: 'Qu\'est ce qui peut SUIVRE spatialement (par exemple Locomotive à vapeur -> tender, wagon etc.) le terme suivant :'
	},
	150: {
		name: 'r_beneficiaire',
		expandedLabel: 'action>bénéficiaire',
		description: 'Le bénéficiaire est l\'entité qui tire bénéfice/préjudice de l\'action (un complément d\'objet indirect introduit par \'à\', \'pour\', ...). Par exemple dans - La sorcière donne une pomme à Blanche Neige -, la bénéficiaire est Blanche Neige ... enfin, bref, vous avez compris l\'idée.'
	},
	151: {
		name: 'r_descend_de',
		expandedLabel: 'descend de',
		description: 'Descend de (évolution)...'
	},
	113: {
		name: 'r_social_tie',
		expandedLabel: 'relation sociale/famille',
		description: 'Relation sociale/familliale entre les individus... (annotation pour la nature exacte : frère, mari, etc.)'
	},
	114: {
		name: 'r_tributary',
		expandedLabel: 'r_tributary',
		description: 'Tributaire de (physique ou spatial).'
	},
	115: {
		name: 'r_sentiment-1',
		expandedLabel: 'sentiment-1',
		description: 'Pour un SENTIMENT ou EMOTION donné, il est demandé d’énumérer les termes que vous pourriez associer. Par exemple, pour \'joie\', on aurait \'cadeau\', \'naissance\', \'bonne nouvelle\', etc.'
	},
	116: {
		name: 'r_linked-with',
		expandedLabel: 'linked-with',
		description: 'A quoi est-ce relié (un wagon est relié à un autre wagon ou à une locomotive) ?'
	},
	152: {
		name: 'r_domain_subst',
		expandedLabel: 'domain_subst',
		description: 'Quels sont le ou les domaines de substitution pour ce terme quand il est utilisé comme domaine (par exemple, \'muscle\' => \'anatomie du système musculaire\')'
	},
	153: {
		name: 'r_prop',
		expandedLabel: 'propriété',
		description: 'Pour le terme donné, il faut indiquer les noms de propriétés pertinents (par exemple pour \'voiture\', le \'prix\', la \'puissance\', la \'longueur\', le \'poids\', etc. On ne met que des noms et pas des adjectifs).'
	},
	117: {
		name: 'r_foncteur',
		expandedLabel: 'r_foncteur',
		description: 'La fonction de ce terme par rapport à d\'autres. Pour les prépositions notamment, \'chez\' => relation r_location. (demande un type de relation comme valeur)'
	},
	118: {name: 'r_comparison', expandedLabel: 'r_comparison', description: ''},
	119: {name: 'r_but', expandedLabel: 'r_but', description: 'But de l\'action'},
	76: {
		name: 'r_processus>patient',
		expandedLabel: 'processus>patient',
		description: 'Quel est le patient de ce processus/événement ? Par exemple,  \'découpe\' peut avoir comme patient \'viande\'.'
	},
	120: {
		name: 'r_but-1',
		expandedLabel: 'r_but-1',
		description: 'Quel sont les action ou verbe qui le terme cible comme but ?'
	},
	121: {
		name: 'r_own',
		expandedLabel: 'pers>possession',
		description: 'Que POSSEDE le terme suivant ? (un soldat possède un fusil, une cavalière des bottes, ...  soldat r_own fusil, ...)'
	},
	122: {
		name: 'r_own-1',
		expandedLabel: 'possession>pers',
		description: 'Par qui ou quoi EST POSSEDE le terme suivant ? (par exemple, fusil r_own-1 soldat)'
	},
	149: {
		name: 'r_compl_agent',
		expandedLabel: 'complément d\'agent',
		description: 'Le complément d\'agent est celui qui effectue l\'action dans les formes passives. Par exemple, pour \'être mangé\', la souris est l\'agent et le chat le complément d\'agent.'
	},
	154: {
		name: 'r_activ_voice',
		expandedLabel: 'voix active',
		description: 'Pour un verbe à la voix passive, sa voix active. Par exemple, pour \'être mangé\' on aura \'manger\'.'
	},
	555: {
		name: 'r_cooccurrence',
		expandedLabel: 'r_cooccurrence',
		description: 'co-occurences (non utilisée)'
	},
	155: {
		name: 'r_make_use_of',
		expandedLabel: 'r_make_use_of',
		description: 'Peut utiliser un objet ou produit (par exemple électricité pour frigo).'
	},
	156: {
		name: 'r_is_used_by',
		expandedLabel: 'r_is_used_by',
		description: 'Est utilisé par (par exemple essence pour voiture).'
	},
	77: {
		name: 'r_verb_ppas',
		expandedLabel: 'r_verb_ppas',
		description: 'Le participe passé (au masculin singulier) du verbe infinitif. Par exemple, pour manger => mangé'
	},
	123: {
		name: 'r_verb_aux',
		expandedLabel: 'r_verb_aux',
		description: 'Auxiliaire utilisé pour ce verbe'
	},
	78: {
		name: 'r_cohypo',
		expandedLabel: 'co-hyponyme',
		description: 'Il est demandé d\'énumérer les CO-HYPONYMES du terme. Par exemple, \'chat\' et \'tigre\' sont des co-hyponymes (de \'félin\').'
	},
	157: {
		name: 'r_adj-nomprop',
		expandedLabel: 'adj>nomprop',
		description: 'Pour un adjectif, donner le nom de propriété correspondant. Par exemple, pour \'friable\' -> \'friabilité\''
	},
	158: {
		name: 'r_nomprop-adj',
		expandedLabel: 'nomprop>adj',
		description: 'Pour un nom de propriété, donner l\'adjectif correspondant. Par exemple, pour \'friabilité\' -> \'friable\''
	},
	159: {
		name: 'r_adj-adv',
		expandedLabel: 'adj>adv',
		description: 'Pour un adjectif, donner l\'adverbe correspondant. Par exemple, pour \'rapide\' -> \'rapidement\''
	},
	160: {
		name: 'r_adv-adj',
		expandedLabel: 'adv>adj',
		description: 'Pour un adverbe, donner l\'adjectif correspondant. Par exemple, pour \'rapidement\' -> \'rapide\''
	},
	124: {
		name: 'r_predecesseur-logic',
		expandedLabel: 'prédécesseur logique',
		description: 'Qu\'est ce qui peut PRECEDER logiquement (par exemple : A précède B -  inverse de successeur logique) le terme suivant :'
	},
	125: {
		name: 'r_successeur-logic',
		expandedLabel: 'successeur logique',
		description: 'Qu\'est ce qui peut SUIVRE logiquement (par exemple A -> B, C etc.) le terme suivant :'
	},
	444: {
		name: 'r_link',
		expandedLabel: 'r_link',
		description: 'Lien vers une ressource externe (WordNet, RadLex, UMLS, Wikipedia, etc...)'
	},
	126: {
		name: 'r_isa-incompatible',
		expandedLabel: 'r_isa-incompatible',
		description: 'Relation d\'incompatibilité pour les génériques. Si A r_isa-incompatible B alors X ne peut pas être à la fois A et B ou alors X est polysémique. Par exemple, poisson r_isa-incompatible oiseau. Colin est à la fois un oiseau et un poisson, donc colin est polysémique.'
	},
	79: {
		name: 'r_verb_ppre',
		expandedLabel: 'r_verb_ppre',
		description: 'Le participe présent(au masculin singulier) du verbe infinitif. Par exemple, pour manger => mangeant'
	},
	161: {
		name: 'r_homophone',
		expandedLabel: 'homophone',
		description: 'Il est demandé d\'énumérer les homophones ou quasi-homophones de ce terme.'
	},
	162: {
		name: 'r_potential_confusion',
		expandedLabel: 'confusion potentielle',
		description: 'Confusion potentielle avec un autre terme (par exemple, acre et âcre, détonner et détoner).'
	},
	127: {
		name: 'r_incompatible',
		expandedLabel: 'r_incompatible',
		description: 'Relation d\'incompatibilité, ne doivent pas être présents ensemble. Par exemple, alcool r_incompatible antibiotique.'
	},
	333: {
		name: 'r_translation',
		expandedLabel: 'r_translation',
		description: 'Traduction vers une autre langue.'
	},
	128: {
		name: 'r_node2relnode',
		expandedLabel: 'r_node2relnode',
		description: 'Relation entre un noeud (quelconque) et un noeud de relation (type = 10) - permet de rendre le graphe connexe même avec les annotations de relations'
	},
	129: {
		name: 'r_require',
		expandedLabel: 'nécessite / requiert',
		description: 'Il est demandé d\'énumérer les termes nécessaires au mot mot cible... Par exemple, \'se reposer\' => \'calme\', ou \'pain\' => \'farine\'.'
	},
	130: {
		name: 'r_is_instance_of',
		expandedLabel: 'est une instance de',
		description: 'Une instance est un individu particulier. Il s\'agit d\'une entité nommée (personne, lieu, organisation, etc) - par exemple, \'Jolly Jumper\' est une instance de \'cheval\', \'Titanic\' en est une de \'transatlantique\'.'
	},
	131: {
		name: 'r_is_concerned_by',
		expandedLabel: 'est concerné par',
		description: 'A peut être concerné par B. Par exemple, une personne a un rendez-vous a une maladie, une idée, une opinion, etc...'
	},
	163: {
		name: 'r_concerning',
		expandedLabel: 'concernant',
		description: 'Qui concerne quelque chose ou quelqu\'un. Par exemple: maladie r_concerning personne, ou disparition r_concerning emploi. (inverse de r_is_concerned_by)'
	},
	2000: {name: 'r_raff_sem-1', expandedLabel: 'r_raff_sem-1', description: ''},
	164: {
		name: 'r_adj>nom',
		expandedLabel: 'r_adj>nom',
		description: 'Le nom associé à l\'adjectif. Par exemple, \'urinaire\' -> \'urine\''
	},
	165: {
		name: 'r_nom>adj',
		expandedLabel: 'r_nom>adj',
		description: 'L\'adjectif associé au nom. Par exemple, \'urine\' -> \'urinaire\' '
	}
};
