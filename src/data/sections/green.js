import { SECTION_DATA_COLORS } from "@/config/colors";

export const greenBeltContent = {
  // Belt configuration
  belt: "green",
  description: "Contrôle et filtrage des données",
  topics: ["WHERE", "Opérateurs de comparaison", "AND, OR, IN, LIKE", "ORDER BY", "NULL", "LIMIT, OFFSET"],
  colors: SECTION_DATA_COLORS.green,

  // Content sections
  header: {
    title: "Filtres et Conditions",
    description: "Contrôlez et filtrez vos données avec précision",
    tag: "Ceinture Verte",
  },
  pageDescription: {
    title: "Maîtrisez le Filtrage et le Tri de vos Données",
    content:
      "La ceinture verte vous enseigne l'art du filtrage et du contrôle des données. Apprenez à utiliser WHERE pour filtrer, les opérateurs pour comparer, ORDER BY pour trier, et gérez les valeurs NULL. Ces compétences vous permettront d'extraire exactement les données dont vous avez besoin.",
  },
  accordions: [
    {
      title: "WHERE - Clause Fondamentale",
      content:
        "Filtrez vos données avec la clause WHERE, base de toute requête précise.",
      sqlCode: `-- WHERE basique
SELECT nom, email, age 
FROM utilisateurs 
WHERE age >= 18;

-- WHERE avec plusieurs conditions
SELECT * 
FROM produits 
WHERE prix > 100 AND stock > 0;

-- WHERE avec différents types de données
SELECT * 
FROM commandes 
WHERE date_commande = '2024-01-15';

-- WHERE avec calculs
SELECT nom, age 
FROM utilisateurs 
WHERE age * 365 > 10000; -- Plus de 27 ans environ`,
      sqlResult: `12 utilisateurs majeurs trouvés
8 produits disponibles et chers
5 commandes du 15 janvier
15 utilisateurs de plus de 27 ans`,
      description:
        "WHERE est la clause la plus importante pour filtrer vos données. Sans elle, vous récupérez tout !",
    },
    {
      title: "Opérateurs de Comparaison",
      content:
        "Utilisez les opérateurs pour comparer et filtrer vos données avec précision.",
      sqlCode: `-- Égalité et inégalité
SELECT * FROM utilisateurs WHERE age = 25;
SELECT * FROM utilisateurs WHERE age != 25;
SELECT * FROM utilisateurs WHERE age <> 25; -- Alternative à !=

-- Comparaisons numériques
SELECT * FROM produits WHERE prix > 50;
SELECT * FROM produits WHERE prix >= 100;
SELECT * FROM produits WHERE prix < 200;
SELECT * FROM produits WHERE prix <= 150;

-- Comparaisons de texte
SELECT * FROM utilisateurs WHERE nom > 'M'; -- Noms après M
SELECT * FROM produits WHERE nom >= 'A' AND nom < 'C';

-- Comparaisons de dates
SELECT * FROM commandes WHERE date_commande > '2024-01-01';
SELECT * FROM commandes WHERE date_commande <= CURRENT_DATE;`,
      sqlResult: `3 utilisateurs de 25 ans
22 utilisateurs qui n'ont pas 25 ans
15 produits chers
8 produits très chers
12 commandes récentes`,
      description:
        "Les opérateurs de comparaison sont vos outils de précision pour extraire exactement ce que vous cherchez.",
    },
    {
      title: "Opérateurs Logiques (AND, OR, IN, LIKE, BETWEEN)",
      content:
        "Combinez et affinez vos conditions avec les opérateurs logiques.",
      sqlCode: `-- AND : toutes les conditions doivent être vraies
SELECT * FROM utilisateurs 
WHERE age >= 18 AND age <= 65 AND email IS NOT NULL;

-- OR : au moins une condition doit être vraie
SELECT * FROM produits 
WHERE categorie = 'livre' OR categorie = 'dvd';

-- IN : valeur dans une liste
SELECT * FROM utilisateurs 
WHERE age IN (25, 30, 35, 40);

-- LIKE : correspondance de motif
SELECT * FROM utilisateurs WHERE nom LIKE 'Jean%'; -- Commence par Jean
SELECT * FROM utilisateurs WHERE email LIKE '%@gmail.com'; -- Finit par @gmail.com
SELECT * FROM produits WHERE nom LIKE '%iphone%'; -- Contient iphone

-- BETWEEN : valeur dans un intervalle
SELECT * FROM produits WHERE prix BETWEEN 50 AND 200;
SELECT * FROM commandes WHERE date_commande BETWEEN '2024-01-01' AND '2024-12-31';`,
      sqlResult: `18 utilisateurs actifs adultes
25 articles média
8 utilisateurs d'âges spécifiques
5 utilisateurs prénommés Jean
12 utilisateurs Gmail
3 produits iPhone
45 produits de prix moyen`,
      description:
        "Les opérateurs logiques vous permettent de créer des filtres complexes et précis.",
    },
    {
      title: "ORDER BY - Tri des Résultats",
      content:
        "Triez vos résultats dans l'ordre qui vous convient.",
      sqlCode: `-- Tri croissant (par défaut)
SELECT nom, age FROM utilisateurs ORDER BY age;
SELECT nom, age FROM utilisateurs ORDER BY age ASC; -- Explicit

-- Tri décroissant
SELECT nom, prix FROM produits ORDER BY prix DESC;

-- Tri sur plusieurs colonnes
SELECT nom, age, ville 
FROM utilisateurs 
ORDER BY ville ASC, age DESC;

-- Tri avec NULL
SELECT nom, telephone 
FROM utilisateurs 
ORDER BY telephone NULLS LAST; -- NULL à la fin

-- Tri sur calcul
SELECT nom, prix, prix * 0.8 AS prix_reduit 
FROM produits 
ORDER BY prix * 0.8 DESC;

-- Tri par position de colonne
SELECT nom, age, email 
FROM utilisateurs 
ORDER BY 2, 1; -- Trier par age (2e colonne), puis nom (1ere)`,
      sqlResult: `Utilisateurs triés par âge croissant
Produits triés par prix décroissant
Utilisateurs triés par ville puis âge
Utilisateurs avec téléphones en premier
Produits triés par prix réduit
Utilisateurs triés par âge puis nom`,
      description:
        "ORDER BY organise vos résultats. Indispensable pour une présentation claire des données.",
    },
    {
      title: "NULL et IS NULL - Gestion des Valeurs Nulles",
      content:
        "Gérez les valeurs manquantes avec NULL et IS NULL.",
      sqlCode: `-- Rechercher les valeurs NULL
SELECT nom, telephone 
FROM utilisateurs 
WHERE telephone IS NULL;

-- Rechercher les valeurs non NULL
SELECT nom, telephone 
FROM utilisateurs 
WHERE telephone IS NOT NULL;

-- NULL dans les conditions (attention aux pièges!)
SELECT * FROM utilisateurs WHERE age = NULL; -- ❌ Ne marche PAS
SELECT * FROM utilisateurs WHERE age IS NULL; -- ✅ Correct

-- Remplacer NULL par une valeur
SELECT nom, COALESCE(telephone, 'Non renseigné') AS contact
FROM utilisateurs;

-- Conditions avec NULL
SELECT * FROM commandes 
WHERE date_livraison IS NULL; -- Commandes non livrées

-- NULL et opérateurs logiques
SELECT * FROM utilisateurs 
WHERE age > 25 OR age IS NULL; -- Inclut les âges inconnus`,
      sqlResult: `8 utilisateurs sans téléphone
17 utilisateurs avec téléphone
0 résultats (piège NULL!)
25 utilisateurs (corrects)
15 commandes non livrées
20 utilisateurs (>25 ans ou âge inconnu)`,
      description:
        "NULL représente l'absence de valeur. Attention : NULL = NULL est toujours FALSE !",
    },
    {
      title: "LIMIT et OFFSET - Pagination",
      content:
        "Contrôlez le nombre de résultats et implémentez la pagination.",
      sqlCode: `-- Limiter le nombre de résultats
SELECT nom, email FROM utilisateurs LIMIT 5;

-- Pagination : ignorer les N premiers résultats
SELECT nom, email FROM utilisateurs 
ORDER BY nom 
LIMIT 10 OFFSET 20; -- Page 3 (10 par page)

-- Top N avec tri
SELECT nom, prix FROM produits 
ORDER BY prix DESC 
LIMIT 3; -- Les 3 produits les plus chers

-- Pagination efficace
SELECT nom, age FROM utilisateurs 
WHERE age > 18 
ORDER BY nom 
LIMIT 10 OFFSET 0; -- Page 1

SELECT nom, age FROM utilisateurs 
WHERE age > 18 
ORDER BY nom 
LIMIT 10 OFFSET 10; -- Page 2

-- LIMIT sans ORDER BY (résultats aléatoires)
SELECT * FROM logs LIMIT 100; -- Attention : ordre non garanti`,
      sqlResult: `5 premiers utilisateurs
10 utilisateurs de la page 3
3 produits les plus chers
Page 1 : 10 utilisateurs
Page 2 : 10 utilisateurs suivants
100 logs (ordre aléatoire)`,
      description:
        "LIMIT et OFFSET sont essentiels pour la pagination et l'optimisation des performances sur grandes tables.",
    }
  ],
};
