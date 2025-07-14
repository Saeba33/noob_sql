import { MdAccountTree, MdDataObject, MdHub, MdStorage } from "react-icons/md";
import {
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiSqlite,
} from "react-icons/si";

export default function SGBDDiagram() {
  return (
    <div className="bg-white flex flex-col gap-8">
      {/* Texte explicatif */}
      <div className="text-gray-700 leading-relaxed px-4 flex flex-col gap-3">
        <p>
          Un <strong>Système de Gestion de Base de Données (SGBD)</strong> est
          un logiciel permettant de créer, gérer et manipuler des bases de
          données. Il facilite le stockage, la modification, la sécurité et la
          récupération des données. Il existe deux grandes catégories de SGBD :
        </p>

        <p>
          <strong>
            • Systèmes de Gestion de Bases de Données Relationnelles (SGBDR)
          </strong>{" "}
          : ils organisent les données sous forme de tables liées entre elles.
          Ils utilisent le langage <strong>SQL</strong> (Structured Query
          Language), un standard pour interroger et manipuler les données.
          Exemples : MySQL, PostgreSQL, Oracle, SQL Server.
        </p>

        <p>
          <strong> • Not Only SQL (NoSQL)</strong> : adaptés aux données non
          structurées ou semi-structurées, ils offrent plus de flexibilité que
          les SGBDR. Contrairement au SQL, chaque base NoSQL a son propre
          langage de requête spécifique. Il en existe plusieurs types :
          documents JSON (MongoDB), clés-valeurs (Redis), graphes (Neo4j),
          colonnes (Cassandra) ...
        </p>

        <p>
          En résumé, les SGBDR utilisent SQL de manière standardisée, tandis que
          les bases NoSQL varient selon l'implémentation et sont souvent
          utilisées pour des besoins de performance et de scalabilité.
        </p>
      </div>

      {/* Diagramme hiérarchique */}
      <div className="border border-gray-300 rounded-lg bg-gray-50 p-6">
        {/* Niveau racine - SGBD */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-3 px-8 py-4 bg-white border-2 border-gray-300 rounded-lg shadow-sm">
            <MdStorage className="w-7 h-7 text-gray-600" />
            <span className="text-xl font-bold text-gray-800">SGBD</span>
          </div>
        </div>

        {/* Niveau catégories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* SGBDR */}
          <div className="flex flex-col items-center">
            {/* Nœud catégorie SGBDR */}
            <div className="flex items-center space-x-3 px-6 py-4 bg-white border-2 border-blue-400 rounded-lg mb-8 shadow-sm">
              <MdStorage className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-blue-800 text-lg">SGBDR</span>
            </div>

            {/* Bases de données SGBDR */}
            <div className="space-y-4 w-full max-w-[240px]">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                <SiMysql className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="font-semibold text-gray-900">MySQL</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                <SiPostgresql className="w-5 h-5 text-blue-700 flex-shrink-0" />
                <span className="font-semibold text-gray-900">PostgreSQL</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                <SiSqlite className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="font-semibold text-gray-900">SQLite</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
                <MdStorage className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="font-semibold text-gray-900">SQL Server</span>
              </div>
            </div>
          </div>

          {/* NoSQL */}
          <div className="flex flex-col items-center">
            {/* Nœud catégorie NoSQL */}
            <div className="flex items-center space-x-3 px-6 py-4 bg-white border-2 border-emerald-400 rounded-lg mb-8 shadow-sm">
              <MdAccountTree className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-emerald-800 text-lg">NoSQL</span>
            </div>

            {/* Bases de données NoSQL */}
            <div className="space-y-4 w-full max-w-[240px]">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-emerald-200 shadow-sm">
                <SiMongodb className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900">MongoDB</div>
                  <div className="text-xs text-emerald-600">Documents JSON</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-emerald-200 shadow-sm">
                <SiRedis className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900">Redis</div>
                  <div className="text-xs text-emerald-600">Clé-Valeur</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-emerald-200 shadow-sm">
                <MdDataObject className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900">
                    Cassandra
                  </div>
                  <div className="text-xs text-emerald-600">Colonnes</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-emerald-200 shadow-sm">
                <MdHub className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900">Neo4j</div>
                  <div className="text-xs text-emerald-600">Graphes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
