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
} from "react-icons/md";

export default function BestPractices() {
  const ddlRules = [
    {
      title: "Nommage des Tables",
      icon: <MdTableChart className="w-5 h-5 text-yellow-600" />,
      rule: "Utilise des noms explicites au singulier pour les tables",
      good: "utilisateur, commande, produit",
      bad: "user, cmd, t1, data_table",
      reason: "Clarity et cohérence dans le schéma de base",
    },
    {
      title: "Clés Primaires",
      icon: <MdKey className="w-5 h-5 text-yellow-600" />,
      rule: "Toujours définir une clé primaire auto-incrémentée",
      good: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
      bad: "Pas de clé primaire ou clé composite complexe",
      reason: "Performance et simplicité des relations",
    },
    {
      title: "Types de Données",
      icon: <MdDataset className="w-5 h-5 text-yellow-600" />,
      rule: "Choisis le type de données le plus approprié et restrictif",
      good: "age INTEGER CHECK (age >= 0), email VARCHAR(255)",
      bad: "age TEXT, email TEXT",
      reason: "Optimisation de l'espace et validation automatique",
    },
    {
      title: "Contraintes NOT NULL",
      icon: <MdSecurity className="w-5 h-5 text-yellow-600" />,
      rule: "Applique NOT NULL aux colonnes obligatoires",
      good: "nom VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL",
      bad: "Laisser des colonnes critiques sans contrainte",
      reason: "Garantit l'intégrité des données essentielles",
    },
    {
      title: "Valeurs par Défaut",
      icon: <MdBuild className="w-5 h-5 text-yellow-600" />,
      rule: "Définis des valeurs par défaut logiques",
      good: "statut VARCHAR(20) DEFAULT 'actif', date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      bad: "Laisser les colonnes sans valeur par défaut",
      reason: "Simplifie les insertions et évite les erreurs",
    },
    {
      title: "Index Stratégiques",
      icon: <MdSpeed className="w-5 h-5 text-yellow-600" />,
      rule: "Crée des index sur les colonnes de recherche fréquente",
      good: "CREATE INDEX idx_email ON utilisateur(email)",
      bad: "Aucun index sur les colonnes WHERE/JOIN",
      reason: "Améliore drastiquement les performances",
    },
  ];

  const ddlTips = [
    {
      title: "Documentation",
      tip: "Ajoute des commentaires aux tables et colonnes complexes",
      example: "COMMENT 'Stocke les informations des utilisateurs actifs'",
    },
    {
      title: "Migration",
      tip: "Utilise ALTER TABLE pour les modifications en production",
      example: "ALTER TABLE utilisateur ADD COLUMN telephone VARCHAR(20)",
    },
    {
      title: "Sauvegarde",
      tip: "Toujours sauvegarder avant les modifications DDL",
      example: "mysqldump database > backup_before_alter.sql",
    },
  ];

  return (
    <div>
      {/* Introduction */}
      <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          Le <strong>Data Definition Language (DDL)</strong> est la fondation de
          votre base de données. Une structure bien pensée dès le départ vous
          évitera des heures de refactoring plus tard ! Voici les bonnes
          pratiques essentielles pour créer des tables robustes et maintenables.
        </p>
      </div>

      {/* Règles DDL */}
      <div className="border border-yellow-300 rounded-lg bg-yellow-50 p-6">
        <h2 className="text-lg font-bold text-yellow-800 mb-6 flex items-center">
          <MdCheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
          Bonnes Pratiques DDL
        </h2>

        <div className="flex flex-wrap gap-4">
          {ddlRules.map((rule, index) => (
            <div
              key={index}
              className="flex-1 min-w-[300px] bg-white border border-yellow-300 rounded-lg p-4 shadow-sm"
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

      {/* Exemple pratique DDL */}
      <div className="mt-8 border border-yellow-300 rounded-lg bg-yellow-50 p-6">
        <h2 className="text-lg font-bold text-yellow-800 mb-6 flex items-center">
          <MdTableChart className="w-5 h-5 text-yellow-600 mr-3" />
          Exemple de Création de Table Optimisée
        </h2>

        <div className="bg-white border border-yellow-300 rounded-lg p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Table utilisateur suivant les bonnes pratiques :
          </h3>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <MdCheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Structure optimisée
              </h4>
              <pre className="text-sm text-green-700 overflow-x-auto">
{`CREATE TABLE utilisateur (
    -- Clé primaire auto-incrémentée
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    
    -- Informations obligatoires avec contraintes
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    
    -- Informations optionnelles avec valeurs par défaut
    statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    age INTEGER CHECK (age >= 0 AND age <= 150),
    
    -- Timestamps automatiques
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index pour les recherches fréquentes
CREATE INDEX idx_email ON utilisateur(email);
CREATE INDEX idx_statut ON utilisateur(statut);`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Conseils supplémentaires */}
      <div className="mt-8 border border-yellow-300 rounded-lg bg-yellow-50 p-6">
        <h2 className="text-lg font-bold text-yellow-800 mb-6 flex items-center">
          <MdLightbulb className="w-5 h-5 text-yellow-600 mr-3" />
          Conseils Pro
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {ddlTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white border border-yellow-300 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3">{tip.tip}</p>
              <code className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded block">
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
          Erreurs Courantes à Éviter
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-red-300 rounded-lg p-4 shadow-sm">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Oublier la clé primaire :</strong> Toute table doit avoir une clé primaire</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Types trop génériques :</strong> Éviter TEXT pour tout, choisir VARCHAR avec une taille appropriée</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Pas de contraintes :</strong> Utiliser NOT NULL, UNIQUE, CHECK pour valider les données</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Noms ambigus :</strong> Éviter des noms comme 'data', 'info', 'temp'</span>
              </li>
              <li className="flex items-start space-x-2">
                <MdWarning className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong>Pas d'index :</strong> Créer des index sur les colonnes de recherche et jointure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
