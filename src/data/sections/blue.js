import { SECTION_DATA_COLORS } from "@/config/colors";

export const blueBeltContent = {
  // Belt configuration
  belt: "blue",
  description: "Agrégations - Calculs et regroupements",
  topics: ["COUNT, SUM, AVG, MIN, MAX", "GROUP BY", "HAVING"],
  colors: SECTION_DATA_COLORS.blue,

  // Content sections
  header: {
    title: "Agrégations",
    description: "Calculez et regroupez vos données pour des analyses poussées",
    tag: "Ceinture Bleue",
  },
  pageDescription: {
    title: "Analysez vos Données avec les Fonctions d'Agrégation",
    content:
      "La ceinture bleue vous initie aux fonctions d'agrégation qui permettent de calculer des statistiques sur vos données. Apprenez COUNT, SUM, AVG, MIN, MAX pour vos calculs, GROUP BY pour regrouper vos données, et HAVING pour filtrer les groupes. Ces outils sont essentiels pour l'analyse de données.",
  },
  accordions: [
    {
      title: "Fonctions d'Agrégation (COUNT, SUM, AVG, MIN, MAX)",
      content:
        "Calculez des statistiques sur vos données avec les fonctions d'agrégation.",
      sqlCode: `-- COUNT : compter les lignes
SELECT COUNT(*) FROM utilisateurs; -- Toutes les lignes
SELECT COUNT(telephone) FROM utilisateurs; -- Seulement les non-NULL
SELECT COUNT(DISTINCT age) FROM utilisateurs; -- Valeurs uniques

-- SUM : somme des valeurs
SELECT SUM(prix) FROM commandes; -- Chiffre d'affaires total
SELECT SUM(quantite) FROM commandes; -- Quantité totale vendue

-- AVG : moyenne des valeurs
SELECT AVG(age) FROM utilisateurs; -- Âge moyen
SELECT AVG(prix) FROM produits; -- Prix moyen

-- MIN et MAX : valeurs minimum et maximum
SELECT MIN(age) FROM utilisateurs; -- Plus jeune utilisateur
SELECT MAX(prix) FROM produits; -- Produit le plus cher
SELECT MIN(date_commande), MAX(date_commande) FROM commandes;

-- Combinaison de fonctions
SELECT 
    COUNT(*) AS nombre_utilisateurs,
    AVG(age) AS age_moyen,
    MIN(age) AS plus_jeune,
    MAX(age) AS plus_age
FROM utilisateurs;`,
      sqlResult: `150 utilisateurs au total
142 utilisateurs avec téléphone
25 âges différents
45750.50 € de chiffre d'affaires
320 articles vendus
32.5 ans d'âge moyen
Statistics complètes calculées`,
      description:
        "Les fonctions d'agrégation transforment plusieurs lignes en une seule valeur calculée.",
    },
    {
      title: "GROUP BY - Regroupement et Filtrage des Groupes",
      content:
        "Regroupez vos données pour des analyses par catégorie.",
      sqlCode: `-- Regroupement simple
SELECT age, COUNT(*) AS nombre
FROM utilisateurs 
GROUP BY age
ORDER BY age;

-- Regroupement avec calculs
SELECT 
    categorie,
    COUNT(*) AS nombre_produits,
    AVG(prix) AS prix_moyen,
    SUM(stock) AS stock_total
FROM produits 
GROUP BY categorie;

-- Regroupement sur plusieurs colonnes
SELECT 
    ville,
    age,
    COUNT(*) AS nombre
FROM utilisateurs 
GROUP BY ville, age
ORDER BY ville, age;

-- Regroupement avec dates
SELECT 
    STRFTIME('%Y-%m', date_commande) AS mois,
    COUNT(*) AS nombre_commandes,
    SUM(montant) AS chiffre_affaires
FROM commandes 
GROUP BY STRFTIME('%Y-%m', date_commande)
ORDER BY mois;`,
      sqlResult: `Répartition par âge affichée
Statistiques par catégorie
Répartition par ville et âge
Évolution mensuelle du CA`,
      description:
        "GROUP BY divise vos données en groupes et applique les fonctions d'agrégation à chaque groupe.",
    },
    {
      title: "HAVING - Filtrage des Groupes",
      content:
        "Filtrez les résultats des regroupements avec HAVING.",
      sqlCode: `-- Différence WHERE vs HAVING
-- WHERE filtre AVANT regroupement
-- HAVING filtre APRÈS regroupement

-- Groupes avec plus de 5 éléments
SELECT 
    age,
    COUNT(*) AS nombre
FROM utilisateurs 
GROUP BY age
HAVING COUNT(*) > 5;

-- Catégories avec prix moyen élevé
SELECT 
    categorie,
    AVG(prix) AS prix_moyen,
    COUNT(*) AS nombre_produits
FROM produits 
GROUP BY categorie
HAVING AVG(prix) > 100;

-- Combinaison WHERE et HAVING
SELECT 
    ville,
    COUNT(*) AS nombre_utilisateurs,
    AVG(age) AS age_moyen
FROM utilisateurs 
WHERE age >= 18  -- Filtre avant regroupement
GROUP BY ville
HAVING COUNT(*) >= 10  -- Filtre après regroupement
ORDER BY nombre_utilisateurs DESC;

-- HAVING avec plusieurs conditions
SELECT 
    STRFTIME('%Y', date_commande) AS annee,
    COUNT(*) AS nombre_commandes,
    SUM(montant) AS ca_total
FROM commandes 
GROUP BY STRFTIME('%Y', date_commande)
HAVING COUNT(*) > 100 AND SUM(montant) > 50000
ORDER BY annee;`,
      sqlResult: `Ages représentés 5+ fois
Catégories premium trouvées
Villes avec 10+ utilisateurs adultes
Années avec fort volume et CA`,
      description:
        "HAVING est le WHERE des regroupements. Il filtre les groupes selon des conditions sur les agrégations.",
    }
  ],
};
