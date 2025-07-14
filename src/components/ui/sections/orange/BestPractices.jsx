import {
  MdCheckCircle,
  MdTextFormat,
  MdFormatIndentIncrease,
  MdSpellcheck,
  MdCode,
  MdWarning,
} from "react-icons/md";

export default function BestPractices() {
  const syntaxRules = [
    {
      title: "Mots-clés en MAJUSCULES",
      icon: <MdSpellcheck className="w-5 h-5 text-gray-600" />,
      rule: "Écris tous les mots-clés SQL en lettres majuscules pour une meilleure lisibilité",
      good: "SELECT nom FROM utilisateurs WHERE age > 25",
      bad: "select nom from utilisateurs where age > 25",
      reason: "Standard universel, distinction claire entre mots-clés et noms",
    },
    {
      title: "Indentation cohérente",
      icon: <MdFormatIndentIncrease className="w-5 h-5 text-gray-600" />,
      rule: "Indente les clauses SQL pour structurer visuellement tes requêtes",
      good: "SELECT nom, email\nFROM utilisateurs\nWHERE age > 18\nORDER BY nom",
      bad: "SELECT nom, email FROM utilisateurs WHERE age > 18 ORDER BY nom",
      reason: "Code lisible, maintenance facilitée, moins d'erreurs",
    },
    {
      title: "Nommage en snake_case",
      icon: <MdTextFormat className="w-5 h-5 text-gray-600" />,
      rule: "Utilise le snake_case pour les noms de tables et colonnes",
      good: "nom_utilisateur, date_creation, prix_total",
      bad: "nomUtilisateur, dateCreation, prixTotal",
      reason: "Convention standard, compatible avec tous les SGBD",
    },
    {
      title: "Alias explicites",
      icon: <MdCode className="w-5 h-5 text-gray-600" />,
      rule: "Utilise des alias clairs avec AS pour renommer les colonnes",
      good: "SELECT COUNT(*) AS nombre_total",
      bad: "SELECT COUNT(*) nombre_total",
      reason: "Clarté du code, intention explicite",
    },
  ];

  return (
    <div>
      {/* Introduction */}
      <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          Un code SQL bien formaté est plus facile à lire, déboguer et maintenir ! 
          Voici les <strong>conventions de syntaxe</strong> essentielles pour écrire 
          du SQL propre et professionnel.
        </p>
      </div>

      {/* Règles de syntaxe */}
      <div className="border border-gray-300 rounded-lg bg-gray-50 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          <MdCheckCircle className="w-5 h-5 text-gray-600 mr-3" />
          Conventions de Syntaxe
        </h2>

        <div className="flex flex-wrap gap-4">
          {syntaxRules.map((rule, index) => (
            <div
              key={index}
              className="flex-1 min-w-[300px] bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
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
                    <code className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block whitespace-pre-line">
                      {rule.good}
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center text-sm">
                      <MdWarning className="w-4 h-4 text-red-600 mr-1" />À
                      éviter
                    </h4>
                    <code className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded block whitespace-pre-line">
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

      {/* Exemple pratique */}
      <div className="mt-8 border border-gray-300 rounded-lg bg-gray-50 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          <MdCode className="w-5 h-5 text-gray-600 mr-3" />
          Exemple Avant/Après
        </h2>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center">
              <MdWarning className="w-4 h-4 text-red-600 mr-2" />
              Code mal formaté
            </h4>
            <code className="text-sm text-red-700 block bg-white p-3 rounded border whitespace-pre-line">
{`select u.nom,u.email,c.total from utilisateurs u join commandes c on u.id=c.utilisateur_id where c.statut='validée' and u.age>18 order by c.total desc;`}
            </code>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <MdCheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Code bien formaté
            </h4>
            <code className="text-sm text-green-700 block bg-white p-3 rounded border whitespace-pre-line">
{`SELECT 
    u.nom AS nom_utilisateur,
    u.email AS adresse_email,
    c.total AS montant_commande
FROM utilisateurs u
JOIN commandes c ON u.id = c.utilisateur_id
WHERE 
    c.statut = 'validée' 
    AND u.age > 18
ORDER BY c.total DESC;`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}