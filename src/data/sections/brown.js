import { SECTION_DATA_COLORS } from "@/config/colors";

export const brownBeltContent = {
  // Belt configuration
  belt: "brown",
  description: "Relations entre les tables",
  topics: ["Schéma jointures", "Clés primaires/étrangères", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "CROSS JOIN", "SELF JOIN"],
  colors: SECTION_DATA_COLORS.brown,

  // Content sections
  header: {
    title: "Jointures",
    description: "Maîtrisez les relations entre tables avec les jointures",
    tag: "Ceinture Marron",
  },
  pageDescription: {
    title: "Connectez vos Tables avec les Jointures",
    content:
      "La ceinture marron vous enseigne l'art des jointures, permettant de relier les données de plusieurs tables. Comprenez les clés primaires et étrangères, explorez tous les types de jointures (INNER, LEFT, RIGHT, FULL, CROSS, SELF) et apprenez à construire des requêtes complexes sur plusieurs tables.",
  },
  accordions: [
    {
      title: "Schéma Récapitulatif des Types de Jointures",
      content:
        "Vue d'ensemble visuelle des différents types de jointures et leurs résultats.",
      sqlDiagram: `Types de Jointures - Vue d'ensemble

Table A          Table B
┌─────┐         ┌─────┐
│ 1,2,│         │ 2,3,│
│ 3,4 │         │ 4,5 │
└─────┘         └─────┘

INNER JOIN       LEFT JOIN        RIGHT JOIN       FULL JOIN
┌─────┐         ┌─────┐           ┌─────┐         ┌─────┐
│ 2,3,│         │ 1,2,│           │ 2,3,│         │ 1,2,│
│  4  │         │ 3,4 │           │ 4,5 │         │ 3,4,│
└─────┘         └─────┘           └─────┘         │  5  │
                                                  └─────┘

CROSS JOIN : Produit cartésien (A × B)
SELF JOIN : Table jointe avec elle-même`,
      description:
        "Chaque type de jointure a un usage spécifique selon les données que vous voulez récupérer.",
    },
    {
      title: "Clés Primaires et Étrangères - Conditions Nécessaires aux Jointures",
      content:
        "Comprenez les relations qui permettent de lier vos tables.",
      sqlSchema: `-- Structure avec clés primaires et étrangères
CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY,    -- Clé primaire
    nom VARCHAR(100),
    email VARCHAR(255)
);

CREATE TABLE commandes (
    id INTEGER PRIMARY KEY,    -- Clé primaire
    utilisateur_id INTEGER,   -- Clé étrangère
    produit VARCHAR(200),
    prix DECIMAL(10,2),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE details_commande (
    id INTEGER PRIMARY KEY,
    commande_id INTEGER,      -- Clé étrangère vers commandes
    produit_id INTEGER,       -- Clé étrangère vers produits
    quantite INTEGER,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);`,
      description:
        "Les clés primaires identifient de manière unique chaque ligne. Les clés étrangères créent les relations entre tables.",
    },
    {
      title: "JOIN (INNER JOIN) - Jointure Interne",
      content:
        "Récupérez uniquement les lignes qui ont une correspondance dans les deux tables.",
      sqlCode: `-- INNER JOIN basique
SELECT u.nom, c.produit, c.prix
FROM utilisateurs u
INNER JOIN commandes c ON u.id = c.utilisateur_id;

-- INNER JOIN avec alias
SELECT 
    u.nom AS client,
    c.produit,
    c.prix,
    c.date_commande
FROM utilisateurs u
JOIN commandes c ON u.id = c.utilisateur_id -- INNER optionnel
WHERE c.prix > 100;

-- Jointure sur plusieurs tables
SELECT 
    u.nom,
    c.numero_commande,
    p.nom AS produit,
    dc.quantite,
    p.prix
FROM utilisateurs u
JOIN commandes c ON u.id = c.utilisateur_id
JOIN details_commande dc ON c.id = dc.commande_id
JOIN produits p ON dc.produit_id = p.id;`,
      sqlResult: `15 commandes avec clients trouvées
8 commandes > 100€ avec clients
42 détails de commandes complets`,
      description:
        "INNER JOIN ne retourne que les lignes qui existent dans les deux tables. C'est la jointure la plus courante.",
    },
    {
      title: "LEFT JOIN (LEFT OUTER JOIN) - Jointure Externe Gauche",
      content:
        "Récupérez toutes les lignes de la table de gauche, même sans correspondance à droite.",
      sqlCode: `-- LEFT JOIN : tous les utilisateurs, avec ou sans commandes
SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id;

-- Trouver les utilisateurs sans commandes
SELECT 
    u.nom,
    u.email
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
WHERE c.id IS NULL;

-- LEFT JOIN avec agrégation
SELECT 
    u.nom,
    u.email,
    COUNT(c.id) AS nombre_commandes,
    COALESCE(SUM(c.prix), 0) AS total_depense
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
GROUP BY u.id, u.nom, u.email
ORDER BY total_depense DESC;`,
      sqlResult: `25 utilisateurs (certains sans commandes)
3 utilisateurs sans commandes trouvés
Statistiques complètes par utilisateur`,
      description:
        "LEFT JOIN garde toutes les lignes de la table de gauche. Parfait pour trouver les éléments sans relation.",
    },
    {
      title: "RIGHT JOIN (RIGHT OUTER JOIN) - Jointure Externe Droite",
      content:
        "Récupérez toutes les lignes de la table de droite, même sans correspondance à gauche.",
      sqlCode: `-- RIGHT JOIN : toutes les commandes, avec ou sans utilisateur valide
SELECT 
    u.nom,
    c.produit,
    c.prix,
    c.date_commande
FROM utilisateurs u
RIGHT JOIN commandes c ON u.id = c.utilisateur_id;

-- Équivalent avec LEFT JOIN (plus lisible)
SELECT 
    u.nom,
    c.produit,
    c.prix,
    c.date_commande
FROM commandes c
LEFT JOIN utilisateurs u ON c.utilisateur_id = u.id;

-- Trouver les commandes orphelines
SELECT 
    c.id,
    c.produit,
    c.prix,
    c.utilisateur_id
FROM utilisateurs u
RIGHT JOIN commandes c ON u.id = c.utilisateur_id
WHERE u.id IS NULL;`,
      sqlResult: `18 commandes (certaines sans utilisateur)
Même résultat avec LEFT JOIN
2 commandes orphelines trouvées`,
      description:
        "RIGHT JOIN est moins utilisé que LEFT JOIN. La plupart des développeurs préfèrent réorganiser avec LEFT JOIN.",
    },
    {
      title: "FULL JOIN (FULL OUTER JOIN) - Jointure Externe Complète",
      content:
        "Récupérez toutes les lignes des deux tables, avec ou sans correspondance.",
      sqlCode: `-- FULL JOIN : tous les utilisateurs ET toutes les commandes
SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
FULL OUTER JOIN commandes c ON u.id = c.utilisateur_id;

-- Équivalent avec UNION (pour SQLite qui ne supporte pas FULL JOIN)
SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id

UNION

SELECT 
    u.nom,
    u.email,
    c.produit,
    c.prix
FROM utilisateurs u
RIGHT JOIN commandes c ON u.id = c.utilisateur_id;

-- Analyse complète des relations
SELECT 
    u.nom,
    c.produit,
    CASE 
        WHEN u.id IS NULL THEN 'Commande orpheline'
        WHEN c.id IS NULL THEN 'Utilisateur sans commande'
        ELSE 'Relation normale'
    END AS statut_relation
FROM utilisateurs u
FULL OUTER JOIN commandes c ON u.id = c.utilisateur_id;`,
      sqlResult: `Toutes les données des deux tables
Même résultat avec UNION
Analyse complète des relations`,
      description:
        "FULL JOIN combine LEFT et RIGHT JOIN. Utile pour l'analyse complète de relations entre tables.",
    },
    {
      title: "CROSS JOIN - Produit Cartésien",
      content:
        "Créez toutes les combinaisons possibles entre deux tables.",
      sqlCode: `-- CROSS JOIN : toutes les combinaisons
SELECT 
    u.nom AS utilisateur,
    p.nom AS produit,
    p.prix
FROM utilisateurs u
CROSS JOIN produits p;

-- Cas d'usage : matrice de compatibilité
SELECT 
    t.nom AS taille,
    c.nom AS couleur,
    CONCAT(t.nom, ' - ', c.nom) AS variante
FROM tailles t
CROSS JOIN couleurs c
ORDER BY t.ordre, c.ordre;

-- CROSS JOIN avec condition (équivalent à INNER JOIN)
SELECT u.nom, p.nom
FROM utilisateurs u
CROSS JOIN produits p
WHERE u.id = p.createur_id; -- Évitez ceci, utilisez JOIN

-- Génération de données de test
SELECT 
    d.date,
    h.heure,
    DATETIME(d.date || ' ' || h.heure) AS creneau
FROM dates_semaine d
CROSS JOIN heures_ouverture h;`,
      sqlResult: `500 combinaisons utilisateur-produit
24 variantes de produit
Créneaux de rendez-vous générés`,
      description:
        "CROSS JOIN crée le produit cartésien. Attention à la taille du résultat : n × m lignes !",
    },
    {
      title: "SELF JOIN - Auto-jointure",
      content:
        "Joignez une table avec elle-même pour analyser les relations hiérarchiques.",
      sqlCode: `-- Structure hiérarchique : employés et managers
CREATE TABLE employes (
    id INTEGER PRIMARY KEY,
    nom VARCHAR(100),
    manager_id INTEGER, -- Référence vers un autre employé
    FOREIGN KEY (manager_id) REFERENCES employes(id)
);

-- SELF JOIN : employés avec leur manager
SELECT 
    e.nom AS employe,
    m.nom AS manager
FROM employes e
LEFT JOIN employes m ON e.manager_id = m.id;

-- Trouver les collègues (même manager)
SELECT 
    e1.nom AS employe1,
    e2.nom AS employe2,
    m.nom AS manager_commun
FROM employes e1
JOIN employes e2 ON e1.manager_id = e2.manager_id AND e1.id != e2.id
JOIN employes m ON e1.manager_id = m.id
WHERE e1.id < e2.id; -- Éviter les doublons

-- Hiérarchie complète (employé -> manager -> grand-manager)
SELECT 
    e.nom AS employe,
    m1.nom AS manager_direct,
    m2.nom AS grand_manager
FROM employes e
LEFT JOIN employes m1 ON e.manager_id = m1.id
LEFT JOIN employes m2 ON m1.manager_id = m2.id;`,
      sqlResult: `15 employés avec leurs managers
8 paires de collègues trouvées
Hiérarchie sur 3 niveaux affichée`,
      description:
        "SELF JOIN permet d'analyser les relations au sein d'une même table. Très utile pour les hiérarchies.",
    }
  ],
};
