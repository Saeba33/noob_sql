import {
  MdKey,
  MdLink,
  MdTableChart,
  MdTableRows,
  MdViewColumn,
} from "react-icons/md";

export default function DatabaseArchitecture() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Texte explicatif avec analogie */}
      <div className="mb-8 space-y-4 text-gray-700 leading-relaxed">
        <p>
          Une <strong>base de données</strong> peut être comparée à une{" "}
          <strong>bibliothèque</strong> bien organisée.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p>
            🏛️ <strong>La bibliothèque</strong> = la{" "}
            <strong>Base De Données</strong>
            <br />
            📁 <strong>Chaque étagère</strong> = une <strong>table</strong>
            <br />
            📚 <strong>Chaque livre sur l'étagère</strong> = une{" "}
            <strong>ligne</strong> (aussi appelée "enregistrement")
            <br />
            📄 <strong>Les infos sur la couverture du livre</strong> (titre,
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
      <div className="">

        {/* Tables */}
        <div className="space-y-12">
          {/* Table Livres */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <MdTableChart className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-800">
                Table "livres"
              </h3>
            </div>

            {/* En-tête des colonnes */}
            <div className="bg-blue-100 border border-blue-300 rounded-t-lg">
              <div className="grid grid-cols-5 gap-px">
                <div className="p-3 text-center font-semibold text-blue-900 bg-yellow-100 border border-yellow-300">
                  <div className="flex items-center justify-center space-x-1">
                    <MdKey className="w-4 h-4 text-yellow-600" />
                    <span>id</span>
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Clé Primaire
                  </div>
                </div>
                <div className="p-3 text-center font-semibold text-blue-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-blue-600" />
                    <span>titre</span>
                  </div>
                  <div className="text-xs text-blue-700 mt-1">Colonne</div>
                </div>
                <div className="p-3 text-center font-semibold text-blue-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-blue-600" />
                    <span>auteur</span>
                  </div>
                  <div className="text-xs text-blue-700 mt-1">Colonne</div>
                </div>
                <div className="p-3 text-center font-semibold text-blue-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-blue-600" />
                    <span>isbn</span>
                  </div>
                  <div className="text-xs text-blue-700 mt-1">Colonne</div>
                </div>
                <div className="p-3 text-center font-semibold text-blue-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-blue-600" />
                    <span>année</span>
                  </div>
                  <div className="text-xs text-blue-700 mt-1">Colonne</div>
                </div>
              </div>
            </div>

            {/* Lignes de données */}
            <div className="bg-white border-x border-b border-blue-300 rounded-b-lg">
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
                  className="grid grid-cols-5 gap-px border-b border-blue-200 last:border-b-0"
                >
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className="p-3 text-center">
                      {cellIndex === 0 && (
                        <div className="flex items-center justify-center space-x-1 bg-yellow-50 py-1 px-2 rounded">
                          <MdKey className="w-3 h-3 text-yellow-600" />
                          <span className="font-semibold">{cell}</span>
                        </div>
                      )}
                      {cellIndex > 0 && (
                        <span className="text-gray-900 text-sm">{cell}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center space-x-2 text-sm text-blue-700">
              <MdTableRows className="w-4 h-4" />
              <span>
                3 <strong>lignes</strong> (livres) dans cette table
              </span>
            </div>
          </div>

          {/* Table Emprunts */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <MdTableChart className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-emerald-800">
                Table "emprunts"
              </h3>
            </div>

            {/* En-tête des colonnes */}
            <div className="bg-emerald-100 border border-emerald-300 rounded-t-lg">
              <div className="grid grid-cols-5 gap-px">
                <div className="p-3 text-center font-semibold text-emerald-900 bg-yellow-100 border border-yellow-300">
                  <div className="flex items-center justify-center space-x-1">
                    <MdKey className="w-4 h-4 text-yellow-600" />
                    <span>id</span>
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Clé Primaire
                  </div>
                </div>
                <div className="p-3 text-center font-semibold text-emerald-900 bg-red-100 border border-red-300">
                  <div className="flex items-center justify-center space-x-1">
                    <MdLink className="w-4 h-4 text-red-600" />
                    <span>livre_id</span>
                  </div>
                  <div className="text-xs text-red-700 mt-1">Clé Étrangère</div>
                </div>
                <div className="p-3 text-center font-semibold text-emerald-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-emerald-600" />
                    <span>emprunteur</span>
                  </div>
                  <div className="text-xs text-emerald-700 mt-1">Colonne</div>
                </div>
                <div className="p-3 text-center font-semibold text-emerald-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-emerald-600" />
                    <span>date_emprunt</span>
                  </div>
                  <div className="text-xs text-emerald-700 mt-1">Colonne</div>
                </div>
                <div className="p-3 text-center font-semibold text-emerald-900">
                  <div className="flex items-center justify-center space-x-1">
                    <MdViewColumn className="w-4 h-4 text-emerald-600" />
                    <span>date_retour</span>
                  </div>
                  <div className="text-xs text-emerald-700 mt-1">Colonne</div>
                </div>
              </div>
            </div>

            {/* Lignes de données */}
            <div className="bg-white border-x border-b border-emerald-300 rounded-b-lg">
              {[
                [201, 1, "Marie Dubois", "2025-01-10", "2025-01-24"],
                [202, 2, "Pierre Martin", "2025-01-12", "2025-01-26"],
                [203, 1, "Sophie Leroy", "2025-01-15", "2025-01-29"],
              ].map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-px border-b border-emerald-200 last:border-b-0"
                >
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className="p-3 text-center">
                      {cellIndex === 0 && (
                        <div className="flex items-center justify-center space-x-1 bg-yellow-50 py-1 px-2 rounded">
                          <MdKey className="w-3 h-3 text-yellow-600" />
                          <span className="font-semibold">{cell}</span>
                        </div>
                      )}
                      {cellIndex === 1 && (
                        <div className="flex items-center justify-center space-x-1 bg-red-50 py-1 px-2 rounded">
                          <MdLink className="w-3 h-3 text-red-600" />
                          <span className="font-semibold">{cell}</span>
                        </div>
                      )}
                      {cellIndex > 1 && (
                        <span className="text-gray-900 text-sm">{cell}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center space-x-2 text-sm text-emerald-700">
              <MdTableRows className="w-4 h-4" />
              <span>
                3 <strong>lignes</strong> (emprunts) dans cette table
              </span>
            </div>
          </div>
        </div>

        {/* Explication des relations */}
        <div className="mt-8 p-6 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
          <div className="flex items-center space-x-2 mb-3">
            <MdLink className="w-5 h-5 text-purple-600" />
            <h4 className="font-bold text-purple-900">
              Relations entre tables
            </h4>
          </div>
          <p className="text-purple-800 leading-relaxed">
            Les <strong>clés étrangères</strong> créent des liens entre les
            tables. Ici, "livre_id" dans la table "emprunts" fait référence à
            "id" dans la table "livres". Cela permet de savoir quel livre a été
            emprunté dans chaque enregistrement d'emprunt ! C'est comme une
            série de livres où chaque tome fait référence à la collection
            principale.
          </p>
        </div>

        {/* Lexique */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-bold text-yellow-900 mb-2 flex items-center">
              <MdKey className="w-4 h-4 mr-2" />
              Clé Primaire
            </h4>
            <p className="text-yellow-800 text-sm">
              Identifiant unique de chaque ligne dans une table
            </p>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2 flex items-center">
              <MdLink className="w-4 h-4 mr-2" />
              Clé Étrangère
            </h4>
            <p className="text-red-800 text-sm">
              Référence vers la clé primaire d'une autre table
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
