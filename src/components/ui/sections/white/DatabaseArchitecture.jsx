import {
  MdKey,
  MdLink,
  MdStorage,
  MdTableChart,
  MdTableRows,
  MdViewColumn,
} from "react-icons/md";

export default function DatabaseArchitecture() {
  return (
    <div>
      {/* Texte explicatif avec analogie */}
      <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          Une <strong>base de données</strong> peut être comparée à une{" "}
          <strong>bibliothèque</strong> bien organisée.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p>
            <MdStorage className="w-5 h-5 text-blue-600 inline mr-2" />
            <strong>La bibliothèque</strong> = la{" "}
            <strong>base de données</strong>
            <br />
            <MdTableChart className="w-5 h-5 text-blue-600 inline mr-2" />
            <strong>Chaque étagère</strong> = une <strong>table</strong>
            <br />
            <MdTableRows className="w-5 h-5 text-blue-600 inline mr-2" />
            <strong>Chaque livre sur l'étagère</strong> = une{" "}
            <strong>ligne</strong> (aussi appelée "enregistrement")
            <br />
            <MdViewColumn className="w-5 h-5 text-blue-600 inline mr-2" />
            <strong>Les infos sur la couverture du livre</strong> (titre,
            auteur, ISBN) = les <strong>colonnes</strong>
          </p>
        </div>

        <p>
          Tout comme une bibliothèque organise ses livres par sections (une
          étagère pour la fiction, une pour l'histoire), une base de données
          organise les informations en <strong>tables</strong> thématiques.
          Chaque <strong>table</strong> contient des <strong>colonnes</strong>{" "}
          (les types d'informations) et des <strong>lignes</strong> (les données
          réelles). Une bibliothèque peut même contenir des livres liés entre
          eux (séries ou collections), comme les{" "}
          <strong>clés étrangères</strong> relient des tables entre elles.
        </p>
      </div>

      {/* Représentation visuelle - Base de données */}

        <div className="mx-auto">
          {/* Tables */}
          <div className="space-y-8">
            {/* Table Utilisateurs */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MdTableChart className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Table "utilisateurs"
                </h3>
              </div>

              {/* En-tête des colonnes */}
              <div className="bg-gray-100 border border-gray-300 rounded-t-lg overflow-x-auto">
                <div className="grid grid-cols-4 min-w-[600px]">
                  <div className="p-3 text-center font-semibold text-yellow-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdKey className="w-4 h-4 text-yellow-600" />
                      <span>id</span>
                    </div>
                    <div className="text-xs text-yellow-700 mt-1">
                      Clé Primaire
                    </div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>nom</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>email</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>date_inscription</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                </div>
              </div>

              {/* Lignes de données */}
              <div className="bg-white border-x border-b border-gray-300 rounded-b-lg overflow-x-auto">
                <div className="min-w-[600px]">
                  {[
                    [1, "Marie Dubois", "marie.dubois@email.com", "2024-01-15"],
                    [
                      2,
                      "Pierre Martin",
                      "pierre.martin@email.com",
                      "2024-02-20",
                    ],
                    [3, "Sophie Leroy", "sophie.leroy@email.com", "2024-03-10"],
                  ].map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 border-b border-gray-300 last:border-b-0"
                    >
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className={`p-3 text-center ${
                            cellIndex < 3 ? "border-r border-gray-300" : ""
                          }`}
                        >
                          {cellIndex === 0 && (
                            <div className="flex items-center justify-center space-x-1 bg-yellow-100 py-1 px-2 rounded w-full h-full">
                              <MdKey className="w-3 h-3 text-yellow-600" />
                              <span className="font-semibold text-yellow-900">
                                {cell}
                              </span>
                            </div>
                          )}
                          {cellIndex > 0 && (
                            <span className="text-gray-900 text-sm">
                              {cell}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                <MdTableRows className="w-4 h-4" />
                <span>
                  3 <strong>lignes</strong> (utilisateurs) dans cette table
                </span>
              </div>
            </div>

            {/* Table Livres */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MdTableChart className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Table "livres"
                </h3>
              </div>

              {/* En-tête des colonnes */}
              <div className="bg-gray-100 border border-gray-300 rounded-t-lg overflow-x-auto">
                <div className="grid grid-cols-5 min-w-[800px]">
                  <div className="p-3 text-center font-semibold text-yellow-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdKey className="w-4 h-4 text-yellow-600" />
                      <span>id</span>
                    </div>
                    <div className="text-xs text-yellow-700 mt-1">
                      Clé Primaire
                    </div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>titre</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>auteur</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>isbn</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>annee</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                </div>
              </div>

              {/* Lignes de données */}
              <div className="bg-white border-x border-b border-gray-300 rounded-b-lg overflow-x-auto">
                <div className="min-w-[800px]">
                  {[
                    [
                      1,
                      "Le Petit Prince",
                      "Antoine de Saint-Exupéry",
                      "978-2070408504",
                      1943,
                    ],
                    [2, "1984", "George Orwell", "978-0451524935", 1949],
                    [3, "L'Étranger", "Albert Camus", "978-2070360024", 1942],
                  ].map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 border-b border-gray-300 last:border-b-0"
                    >
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className={`p-3 text-center ${
                            cellIndex < 4 ? "border-r border-gray-300" : ""
                          }`}
                        >
                          {cellIndex === 0 && (
                            <div className="flex items-center justify-center space-x-1 bg-yellow-100 py-1 px-2 rounded w-full h-full">
                              <MdKey className="w-3 h-3 text-yellow-600" />
                              <span className="font-semibold text-yellow-900">
                                {cell}
                              </span>
                            </div>
                          )}
                          {cellIndex > 0 && (
                            <span className="text-gray-900 text-sm">
                              {cell}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                <MdTableRows className="w-4 h-4" />
                <span>
                  3 <strong>lignes</strong> (livres) dans cette table
                </span>
              </div>
            </div>

            {/* Table Emprunts */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MdTableChart className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Table "emprunts"
                </h3>
              </div>

              {/* En-tête des colonnes */}
              <div className="bg-gray-100 border border-gray-300 rounded-t-lg overflow-x-auto">
                <div className="grid grid-cols-6 min-w-[900px]">
                  <div className="p-3 text-center font-semibold text-yellow-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdKey className="w-4 h-4 text-yellow-600" />
                      <span>id</span>
                    </div>
                    <div className="text-xs text-yellow-700 mt-1">
                      Clé Primaire
                    </div>
                  </div>
                  <div className="p-3 text-center font-semibold text-red-900 bg-red-100 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdLink className="w-4 h-4 text-red-600" />
                      <span>utilisateur_id</span>
                    </div>
                    <div className="text-xs text-red-700 mt-1">
                      Clé Étrangère
                    </div>
                  </div>
                  <div className="p-3 text-center font-semibold text-red-900 bg-red-100 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdLink className="w-4 h-4 text-red-600" />
                      <span>livre_id</span>
                    </div>
                    <div className="text-xs text-red-700 mt-1">
                      Clé Étrangère
                    </div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>date_emprunt</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-r border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>date_retour</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                  <div className="p-3 text-center font-semibold text-gray-900 border-b border-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                      <MdViewColumn className="w-4 h-4 text-gray-600" />
                      <span>statut</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Colonne</div>
                  </div>
                </div>
              </div>

              {/* Lignes de données */}
              <div className="bg-white border-x border-b border-gray-300 rounded-b-lg overflow-x-auto">
                <div className="min-w-[900px]">
                  {[
                    [201, 1, 1, "2025-01-10", "2025-01-24", "Rendu"],
                    [202, 2, 2, "2025-01-12", null, "En cours"],
                    [203, 3, 1, "2025-01-15", null, "En cours"],
                  ].map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 border-b border-gray-300 last:border-b-0"
                    >
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className={`p-3 text-center ${
                            cellIndex < 5 ? "border-r border-gray-300" : ""
                          }`}
                        >
                          {cellIndex === 0 && (
                            <div className="flex items-center justify-center space-x-1 bg-yellow-100 py-1 px-2 rounded w-full h-full">
                              <MdKey className="w-3 h-3 text-yellow-600" />
                              <span className="font-semibold text-yellow-900">
                                {cell}
                              </span>
                            </div>
                          )}
                          {(cellIndex === 1 || cellIndex === 2) && (
                            <div className="flex items-center justify-center space-x-1 bg-red-100 py-1 px-2 rounded w-full h-full">
                              <MdLink className="w-3 h-3 text-red-600" />
                              <span className="font-semibold text-red-900">
                                {cell}
                              </span>
                            </div>
                          )}
                          {cellIndex > 2 && (
                            <span className="text-gray-900 text-sm">
                              {cell || "—"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                <MdTableRows className="w-4 h-4" />
                <span>
                  3 <strong>lignes</strong> (emprunts) dans cette table
                </span>
              </div>
            </div>
          </div>

          {/* Lexique */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-100 border border-yellow-200 rounded-lg">
              <h4 className="font-bold text-yellow-900 mb-2 flex items-center">
                <MdKey className="w-4 h-4 mr-2 text-yellow-600" />
                Clé Primaire
              </h4>
              <p className="text-yellow-800 text-sm">
                Identifiant unique de chaque ligne dans une table
              </p>
            </div>
            <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
              <h4 className="font-bold text-red-900 mb-2 flex items-center">
                <MdLink className="w-4 h-4 mr-2 text-red-600" />
                Clé Étrangère
              </h4>
              <p className="text-red-800 text-sm">
                Référence vers la clé primaire d'une autre table
              </p>
            </div>
          </div>

          {/* Explication des relations */}
          <div className="mt-8 p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <MdLink className="w-5 h-5 text-gray-600" />
              <h4 className="text-lg font-bold text-gray-900">
                Relations entre les tables
              </h4>
            </div>
            <p className="text-gray-800 leading-relaxed mb-3">
              Les clés étrangères (<strong>FOREIGN KEY</strong>) créent des
              liens entre les tables. Dans notre exemple :
            </p>
            <ul className="text-gray-800 mb-4 space-y-1">
              <li>
                • <strong>utilisateur_id</strong> dans la table "emprunts" fait référence à
                <strong> id</strong> dans la table "utilisateurs".
              </li>
              <li>
                • <strong>livre_id</strong> dans la table "emprunts" fait référence à
                <strong> id</strong> dans la table "livres".
              </li>
            </ul>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 text-sm">
                En regardant la première ligne de la table "emprunts" (id 201),
                on peut voir que :
                <br />• <strong>utilisateur_id = 1</strong> → ce qui correspond
                à <strong>Marie Dubois</strong> dans la table "utilisateurs"
                <br />• <strong>livre_id = 1</strong> → ce qui correspond à{" "}
                <strong>"Le Petit Prince"</strong> dans la table "livres"
                <br />
                <br />
                Ainsi, on sait que Marie Dubois a emprunté "Le Petit Prince" le
                10 janvier 2025 et l'a rendu le 24 janvier.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
