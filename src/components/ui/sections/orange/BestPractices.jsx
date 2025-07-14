import {
  MdCheckCircle,
  MdDataset,
  MdKey,
  MdLightbulb,
  MdLink,
  MdSecurity,
  MdSpeed,
  MdTableChart,
  MdTextFormat,
  MdWarning,
  MdStorage,
  MdBuild,
  MdSearch,
  MdEdit,
  MdDelete,
  MdAdd,
} from "react-icons/md";

export default function BestPractices() {
  const crudRules = [
    {
      title: "SELECT Performant",
      icon: <MdSearch className="w-5 h-5 text-orange-600" />,
      rule: "Sélectionne uniquement les colonnes nécessaires",
      good: "SELECT nom, email FROM utilisateurs WHERE actif = 1",
      bad: "SELECT * FROM utilisateurs",
      reason: "Réduit la charge réseau et améliore les performances",
    },
    {
      title: "INSERT Sécurisé",
      icon: <MdAdd className="w-5 h-5 text-orange-600" />,
      rule: "Spécifie toujours les colonnes dans INSERT",
      good: "INSERT INTO utilisateurs (nom, email) VALUES ('John', 'john@email.com')",
      bad: "INSERT INTO utilisateurs VALUES ('John', 'john@email.com')",
      reason: "Évite les erreurs si la structure de table change",
    },
    {
      title: "UPDATE Prudent",
      icon: <MdEdit className="w-5 h-5 text-orange-600" />,
      rule: "Toujours utiliser WHERE avec UPDATE",
      good: "UPDATE utilisateurs SET age = 30 WHERE id = 1",
      bad: "UPDATE utilisateurs SET age = 30",
      reason: "Évite de modifier toutes les lignes par accident",
    },
    {
      title: "DELETE Contrôlé",
      icon: <MdDelete className="w-5 h-5 text-orange-600" />,
      rule: "Utilise WHERE avec DELETE et teste d'abord avec SELECT",
      good: "-- Test: SELECT * FROM utilisateurs WHERE age < 18;\nDELETE FROM utilisateurs WHERE age < 18",
      bad: "DELETE FROM utilisateurs",
      reason: "Évite la suppression accidentelle de toutes les données",
    },
    {
      title: "Transactions",
      icon: <MdSecurity className="w-5 h-5 text-orange-600" />,
      rule: "Utilise les transactions pour les opérations critiques",
      good: "BEGIN; UPDATE...; INSERT...; COMMIT;",
      bad: "Opérations séparées sans transaction",
      reason: "Garantit la cohérence des données en cas d'erreur",
    },
    {
      title: "Gestion des NULL",
      icon: <MdWarning className="w-5 h-5 text-orange-600" />,
      rule: "Gère explicitement les valeurs NULL",
      good: "WHERE email IS NOT NULL AND email != ''",
      bad: "WHERE email = 'valeur'",
      reason: "Évite les résultats inattendus avec les valeurs NULL",
    },
  ];

  const performanceTips = [
    {
      title: "Index",
      tip: "Utilise des index sur les colonnes WHERE fréquentes",
      example: "CREATE INDEX idx_email ON utilisateurs(email)",
    },
    {
      title: "LIMIT",
      tip: "Limite toujours les résultats pour éviter les surcharges",
      example: "SELECT * FROM logs ORDER BY date DESC LIMIT 100",
    },
    {
      title: "Pagination",
      tip: "Utilise OFFSET pour la pagination sur de gros datasets",
      example: "SELECT * FROM articles LIMIT 20 OFFSET 40",
    },
  ];

  return (
    <div>
      {/* Introduction */}
      <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          Les <strong>opérations CRUD</strong> (Create, Read, Update, Delete) sont
          au cœur de toute application. Une mauvaise utilisation peut causer des
          pertes de données ou des problèmes de performance ! Voici les bonnes
          pratiques essentielles pour manipuler vos données en toute sécurité.
        </p>
      </div>

      {/* Règles CRUD */}
      <div className="border border-orange-300 rounded-lg bg-orange-50 p-6">
        <h2 className="text-lg font-bold text-orange-800 mb-6 flex items-center">
          <MdCheckCircle className="w-5 h-5 text-orange-600 mr-3" />
          Bonnes Pratiques CRUD
        </h2>

        <div className="flex flex-wrap gap-4">
          {crudRules.map((rule, index) => (
            <div
              key={index}
              className="flex-1 min-w-[300px] bg-white border border-orange-300 rounded-lg p-4 shadow-sm"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-3">
                  {rule.icon}
                  <h3 className="text-base font-bold text-gray-900">
                    {rule.title}
                  </h3>
                </div>

                <p className="text-gray-700 mb-4 flex-grow text-sm">{rule.rule}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center text-sm">
                      <MdCheckCircle className="w-4 h-4 text-green-600 mr-1" />
                      Recommandé
                    </h4>
                    <code className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block">
                      {rule.good}
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center text-sm">
                      <MdWarning className="w-4 h-4 text-red-600 mr-1" />À
                      éviter
                    </h4>
                    <code className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded block">
                      {rule.bad}
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                      Pourquoi ?
                    </h4>
                    <p className="text-xs text-gray-600">{rule.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exemple pratique CRUD */}
      <div className="mt-8 border border-orange-300 rounded-lg bg-orange-50 p-6">
        <h2 className="text-lg font-bold text-orange-800 mb-6 flex items-center">
          <MdTableChart className="w-5 h-5 text-orange-600 mr-3" />
          Workflow CRUD Sécurisé
        </h2>

        <div className="bg-white border border-orange-300 rounded-lg p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Exemple : Gestion d'utilisateurs avec transaction
          </h3>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <MdCheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Opérations sécurisées
              </h4>
              <pre className="text-sm text-green-700 overflow-x-auto">
{`-- 1. CREATE : Insertion avec validation
INSERT INTO utilisateurs (nom, email, age) 
VALUES ('Alice Dupont', 'alice@email.com', 28)
WHERE NOT EXISTS (SELECT 1 FROM utilisateurs WHERE email = 'alice@email.com');

-- 2. READ : Sélection optimisée  
SELECT u.nom, u.email, COUNT(c.id) as nb_commandes
FROM utilisateurs u
LEFT JOIN commandes c ON u.id = c.utilisateur_id
WHERE u.actif = 1
GROUP BY u.id
LIMIT 50;

-- 3. UPDATE : Modification sécurisée avec transaction
BEGIN TRANSACTION;
UPDATE utilisateurs 
SET email = 'nouveau@email.com', date_modification = NOW()
WHERE id = 123 AND email = 'ancien@email.com';
-- Vérifier le résultat avant COMMIT
COMMIT;

-- 4. DELETE : Suppression contrôlée
-- Test d'abord avec SELECT
SELECT COUNT(*) FROM utilisateurs WHERE derniere_connexion < '2023-01-01';
-- Puis suppression
DELETE FROM utilisateurs WHERE derniere_connexion < '2023-01-01';`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Conseils Performance */}
      <div className="mt-8 border border-orange-300 rounded-lg bg-orange-50 p-6">
        <h2 className="text-lg font-bold text-orange-800 mb-6 flex items-center">
          <MdSpeed className="w-5 h-5 text-orange-600 mr-3" />
          Performance CRUD
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {performanceTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white border border-orange-300 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3">{tip.tip}</p>
              <code className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded block">
                {tip.example}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Erreurs courantes */}
      <div className="mt-8 border border-red-300 rounded-lg bg-red-50 p-6">
        <h2 className="text-lg font-bold text-red-800 mb-6 flex items-center">
          <MdWarning className="w-5 h-5 text-red-600 mr-3" />
          Erreurs CRUD à Éviter
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-red-300 rounded-lg p-4 shadow-sm">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>UPDATE/DELETE sans WHERE :</strong> Peut modifier/supprimer toutes les lignes</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>SELECT * sur grosses tables :</strong> Surcharge réseau et mémoire</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>INSERT sans spécifier colonnes :</strong> Erreurs si la structure change</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Pas de validation des données :</strong> Données incohérentes en base</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Oublier les transactions :</strong> Données corrompues en cas d'erreur</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
