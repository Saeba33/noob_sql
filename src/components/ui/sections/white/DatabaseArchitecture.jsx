"use client"

import { useState } from "react";
import { MdTableChart, MdViewColumn, MdTableRows, MdKey, MdLink } from "react-icons/md";

export default function DatabaseArchitecture() {
  const [hoveredElement, setHoveredElement] = useState(null);

  const elements = {
    table: {
      title: "Table (Relation)",
      description: "Structure qui contient les données organisées en lignes et colonnes",
      color: "blue"
    },
    column: {
      title: "Colonne (Attribut)",
      description: "Définit le type de données stockées (nom, email, âge...)",
      color: "green"
    },
    row: {
      title: "Ligne (Enregistrement)",
      description: "Une instance complète de données (un utilisateur spécifique)",
      color: "purple"
    },
    primaryKey: {
      title: "Clé Primaire",
      description: "Identifiant unique pour chaque ligne de la table",
      color: "yellow"
    },
    foreignKey: {
      title: "Clé Étrangère",
      description: "Référence vers une clé primaire d'une autre table",
      color: "red"
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Architecture d'une Base de Données Relationnelle
        </h3>
        <p className="text-gray-600">Survolez les éléments pour en savoir plus</p>
      </div>

      {/* Schéma visuel */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          {/* En-tête de table */}
          <div className="bg-gray-100 border-b-2 border-gray-300">
            <div className="grid grid-cols-4 gap-px">
              <div
                className={`p-3 text-center font-semibold transition-colors ${
                  hoveredElement === 'primaryKey' ? 'bg-yellow-200' : 'bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredElement('primaryKey')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="flex items-center justify-center space-x-1">
                  <MdKey className="w-4 h-4 text-yellow-600" />
                  <span>id</span>
                </div>
              </div>
              <div
                className={`p-3 text-center font-semibold transition-colors ${
                  hoveredElement === 'column' ? 'bg-green-200' : 'bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredElement('column')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="flex items-center justify-center space-x-1">
                  <MdViewColumn className="w-4 h-4 text-green-600" />
                  <span>nom</span>
                </div>
              </div>
              <div
                className={`p-3 text-center font-semibold transition-colors ${
                  hoveredElement === 'column' ? 'bg-green-200' : 'bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredElement('column')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="flex items-center justify-center space-x-1">
                  <MdViewColumn className="w-4 h-4 text-green-600" />
                  <span>email</span>
                </div>
              </div>
              <div
                className={`p-3 text-center font-semibold transition-colors ${
                  hoveredElement === 'column' ? 'bg-green-200' : 'bg-gray-100'
                }`}
                onMouseEnter={() => setHoveredElement('column')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="flex items-center justify-center space-x-1">
                  <MdViewColumn className="w-4 h-4 text-green-600" />
                  <span>âge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lignes de données */}
          {[
            [1, "Alice", "alice@email.com", 28],
            [2, "Bob", "bob@email.com", 35],
            [3, "Charlie", "charlie@email.com", 22]
          ].map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-px border-b border-gray-200 transition-colors ${
                hoveredElement === 'row' ? 'bg-purple-100' : 'bg-white'
              }`}
              onMouseEnter={() => setHoveredElement('row')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className="p-3 text-center">
                  {cellIndex === 0 && (
                    <div className="flex items-center justify-center space-x-1">
                      <MdKey className="w-3 h-3 text-yellow-600" />
                      <span>{cell}</span>
                    </div>
                  )}
                  {cellIndex > 0 && <span>{cell}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Légende */}
        <div className="mt-4 flex items-center justify-center space-x-1 text-sm text-gray-600">
          <MdTableChart className="w-4 h-4" />
          <span>Table "utilisateurs"</span>
        </div>
      </div>

      {/* Description de l'élément survolé */}
      {hoveredElement && (
        <div className="p-4 rounded-lg border-l-4 animate-in slide-in-from-top-2 duration-200"
             style={{
               borderColor: `rgb(${elements[hoveredElement].color === 'blue' ? '59 130 246' : 
                               elements[hoveredElement].color === 'green' ? '34 197 94' :
                               elements[hoveredElement].color === 'purple' ? '147 51 234' :
                               elements[hoveredElement].color === 'yellow' ? '234 179 8' : '239 68 68'})`,
               backgroundColor: `rgb(${elements[hoveredElement].color === 'blue' ? '239 246 255' : 
                                     elements[hoveredElement].color === 'green' ? '240 253 244' :
                                     elements[hoveredElement].color === 'purple' ? '250 245 255' :
                                     elements[hoveredElement].color === 'yellow' ? '254 249 195' : '254 242 242'})`
             }}
        >
          <h4 className="font-semibold text-gray-900 mb-1">
            {elements[hoveredElement].title}
          </h4>
          <p className="text-gray-700 text-sm">
            {elements[hoveredElement].description}
          </p>
        </div>
      )}

      {/* Relations entre tables */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MdLink className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-blue-900">Relations entre tables</h4>
        </div>
        <p className="text-blue-800 text-sm">
          Les clés étrangères créent des liens entre les tables. Par exemple, 
          une table "commandes" pourrait avoir une clé étrangère "utilisateur_id" 
          qui référence l'id de cette table utilisateurs.
        </p>
      </div>
    </div>
  );
}
