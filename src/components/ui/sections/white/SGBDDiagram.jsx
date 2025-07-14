"use client"

import { useState } from "react";
import { MdStorage, MdAccountTree, MdDataObject, MdHub } from "react-icons/md";
import { SiMysql, SiPostgresql, SiSqlite, SiMongodb, SiRedis } from "react-icons/si";

export default function SGBDDiagram() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    relationnel: {
      title: "SGBDR (Relationnels)",
      color: "blue",
      icon: MdStorage,
      databases: [
        { name: "MySQL", icon: SiMysql, color: "text-orange-600" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700" },
        { name: "SQLite", icon: SiSqlite, color: "text-blue-500" },
        { name: "SQL Server", icon: MdStorage, color: "text-red-600" }
      ]
    },
    nosql: {
      title: "NoSQL (Non-Relationnels)",
      color: "green",
      icon: MdAccountTree,
      databases: [
        { name: "MongoDB", icon: SiMongodb, color: "text-green-600", type: "Documents" },
        { name: "Redis", icon: SiRedis, color: "text-red-500", type: "Clé-Valeur" },
        { name: "Cassandra", icon: MdDataObject, color: "text-purple-600", type: "Colonnes" },
        { name: "Neo4j", icon: MdHub, color: "text-blue-600", type: "Graphes" }
      ]
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          SGBD - Système de Gestion de Base de Données
        </h3>
        <p className="text-gray-600">Cliquez sur une catégorie pour explorer</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([key, category]) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === key;
          
          return (
            <div key={key} className="space-y-4">
              <button
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                  isSelected
                    ? `border-${category.color}-400 bg-${category.color}-50`
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <IconComponent 
                    className={`w-6 h-6 ${
                      isSelected ? `text-${category.color}-600` : 'text-gray-600'
                    }`} 
                  />
                  <span className={`font-semibold ${
                    isSelected ? `text-${category.color}-800` : 'text-gray-800'
                  }`}>
                    {category.title}
                  </span>
                </div>
              </button>

              {isSelected && (
                <div className="grid grid-cols-2 gap-3 pl-4 animate-in slide-in-from-top-2 duration-300">
                  {category.databases.map((db) => {
                    const DbIcon = db.icon;
                    return (
                      <div
                        key={db.name}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <DbIcon className={`w-5 h-5 ${db.color}`} />
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {db.name}
                          </div>
                          {db.type && (
                            <div className="text-xs text-gray-500">
                              {db.type}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <p className="text-blue-800 text-sm">
          <strong>💡 Le saviez-vous ?</strong> Les SGBDR utilisent le langage SQL standard, 
          tandis que les bases NoSQL ont chacune leur propre langage de requête.
        </p>
      </div>
    </div>
  );
}
