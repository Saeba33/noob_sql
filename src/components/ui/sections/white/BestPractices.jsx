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
} from "react-icons/md";

export default function BestPractices() {
  const coreRules = [
    {
      title: "Normalisation des tables",
      icon: <MdTableChart className="w-5 h-5 text-gray-600" />,
      rule: "Sépare les données en tables distinctes pour éviter la duplication. Chaque information ne doit apparaître qu'une seule fois dans la base.",
      good: "Tables: utilisateurs, commandes, produits (séparées)",
      bad: "Une table avec nom_client dupliqué dans chaque commande",
      reason: "Évite les incohérences, facilite les mises à jour",
    },
    {
      title: "Clés primaires simples",
      icon: <MdKey className="w-5 h-5 text-gray-600" />,
      rule: "Utilise des clés primaires simples et stables (id numérique)",
      good: "id INTEGER PRIMARY KEY AUTO_INCREMENT",
      bad: "Clés composées ou textuelles comme clé primaire",
      reason: "Performance optimale, simplicité des relations",
    },
    {
      title: "Clés étrangères",
      icon: <MdLink className="w-5 h-5 text-gray-600" />,
      rule: "Définis des clés étrangères pour assurer les relations",
      good: "utilisateur_id INTEGER REFERENCES utilisateurs(id)",
      bad: "Pas de contraintes, relations non déclarées",
      reason: "Intégrité référentielle garantie",
    },
    {
      title: "Convention snake_case",
      icon: <MdTextFormat className="w-5 h-5 text-gray-600" />,
      rule: "Utilise le snake_case pour les noms",
      good: "nom_utilisateur, date_creation, prix_total",
      bad: "nomUtilisateur, dateCreation, prixTotal",
      reason: "Standard universel, lisible dans tous les SGBD",
    },
    {
      title: "Noms explicites",
      icon: <MdDataset className="w-5 h-5 text-gray-600" />,
      rule: "Privilégie des noms explicites pour tables et colonnes",
      good: "utilisateurs, commande_id, prix_total",
      bad: "usr, cmd, tot, t1, c_id",
      reason: "Code auto-documenté, maintenance facilitée",
    },
    {
      title: "Index stratégiques",
      icon: <MdSpeed className="w-5 h-5 text-gray-600" />,
      rule: "Crée des index sur les colonnes de filtrage et jointure",
      good: "INDEX sur email, date_creation, statut",
      bad: "Aucun index sur les colonnes WHERE/JOIN",
      reason: "Performances optimales des requêtes",
    },
  ];

  return (
    <div>
      {/* Introduction */}
      <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          Les <strong>bonnes pratiques SQL</strong> essentielles pour concevoir
          des bases de données maintenables et performantes. Suivez ces règles
          fondamentales pour éviter les pièges courants.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="flex items-start">
            <MdLightbulb className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Règle d'or :</strong> Une base de données bien conçue
              facilite le développement et évite les erreurs !
            </span>
          </p>
        </div>
      </div>

      {/* Règles fondamentales */}
      <div className="border border-gray-300 rounded-lg bg-gray-50">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MdCheckCircle className="w-7 h-7 text-gray-600 mr-3" />
            Règles Fondamentales
          </h2>

          <div className="flex flex-wrap gap-4">
            {coreRules.map((rule, index) => (
              <div
                key={index}
                className="flex-1 min-w-[300px] bg-white border border-gray-300 rounded-lg p-4"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-3">
                    {rule.icon}
                    <h3 className="text-lg font-bold text-gray-900">
                      {rule.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4 flex-grow">{rule.rule}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center text-sm">
                        <MdCheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        Bon
                      </h4>
                      <code className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block">
                        {rule.good}
                      </code>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center text-sm">
                        <MdWarning className="w-4 h-4 text-red-600 mr-1" />
                        À éviter
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
      </div>

      {/* Exemple pratique */}
      <div className="mt-8 border border-gray-300 rounded-lg bg-gray-50">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MdTableChart className="w-7 h-7 text-gray-600 mr-3" />
            Exemple Concret
          </h2>

          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Structure recommandée pour un e-commerce :
            </h3>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <MdCheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Tables bien normalisées
                </h4>
                <code className="text-sm text-green-700 block">
                  utilisateurs (id, nom_complet, email, date_creation)
                  <br />
                  commandes (id, utilisateur_id, date_commande, prix_total)
                  <br />
                  produits (id, nom_produit, prix_unitaire, stock_disponible)
                  <br />
                  commande_produits (commande_id, produit_id, quantite, prix)
                </code>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <MdLink className="w-4 h-4 text-blue-600 mr-2" />
                  Contraintes et index
                </h4>
                <code className="text-sm text-blue-700 block">
                  PRIMARY KEY (id) sur chaque table
                  <br />
                  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
                  <br />
                  UNIQUE INDEX sur email des utilisateurs
                  <br />
                  INDEX sur date_commande, nom_produit (colonnes de recherche)
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
