"use client";

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
			{/* Introductory text */}
			<div className="text-gray-700 leading-relaxed flex flex-col gap-6 ">
				<p className="text-body">
					Un
					<span className="font-semibold text-gray-900">
						{" "}
						Système de Gestion de Base de Données (SGBD){" "}
					</span>
					est une infrastructure logicielle permettant de créer, gérer et
					manipuler des bases de données. Il facilite le stockage, la
					modification, la sécurité et la récupération des données. Il existe
					deux grandes catégories de SGBD :
				</p>

				<p className="text-body">
					<span className="text-lg md:text-xl text-gray-800 mr-2">
						•
					</span>
					<span className="font-semibold text-blue-800">
						Systèmes de Gestion de Bases de Données Relationnelles (SGBDR){" "}
					</span>
					: ils organisent les données sous forme de tables liées entre elles.
					Ils utilisent le langage SQL (Structured Query Language), un standard
					pour interroger et manipuler les données. Exemples : MySQL,
					PostgreSQL, Oracle, SQL Server.
				</p>

				<p className="text-body">
					<span className="text-lg md:text-xl text-gray-800 mr-2">
						•
					</span>
					<span className="font-semibold text-emerald-800">
						Not Only SQL (NoSQL){" "}
					</span>
					: conçus pour des données moins structurées ou très volumineuses. Ils
					sont plus flexibles que les SGBDR. Chaque technologie NoSQL a son
					propre langage de requête. On en trouve plusieurs types : bases de
					documents (MongoDB), clés-valeurs (Redis), graphes (Neo4j), colonnes
					(Cassandra)…
				</p>

				<p className="text-body mb-6">
					En résumé, les SGBDR utilisent SQL comme langage standardisé, tandis
					que les bases NoSQL utilisent des langages ou des modèles de requête
					qui varient selon la technologie. Elles sont souvent choisies pour la
					performance et la scalabilité.
				</p>
			</div>

			{/* Diagram with SGBD parent */}
		<div className="mt-8">
			<span className="text-xs italic text-gray-500 block mb-2">
				Exemples de SGBD (liste non exhaustive)
			</span>
			
			{/* SGBD Parent Header spanning full width */}
			<div className="flex items-center gap-3 px-8 py-8 bg-gradient-to-r from-gray-700 to-gray-800 squircle shadow-lg mb-6 justify-center">
			
				<span className="text-2xl sm:text-[50px] font-bold text-white">SGBD</span>
			</div>
			
			<div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
				{/* SGBDR Section */}
				<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 sm:p-10 squircle border-2 border-blue-200 shadow-lg">
					{/* Header */}
					<div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-blue-200">
						<div className="p-3 bg-blue-200 squircle">
							<MdStorage className="w-8 h-8 sm:w-9 sm:h-9 text-blue-700" />
						</div>
						<div>
							<h3 className="font-bold text-blue-900 text-2xl sm:text-3xl">SGBDR</h3>
							<p className="text-sm text-blue-700 mt-1">Bases relationnelles</p>
						</div>
					</div>

					{/* Databases */}
					<div className="space-y-3">
						<div className="flex items-center gap-3 p-4 bg-white squircle shadow-md">
							<SiMysql className="w-6 h-6 text-orange-600 flex-shrink-0" />
							<span className="font-bold text-gray-900">MySQL</span>
						</div>
						<div className="flex items-center gap-3 p-4 bg-white squircle shadow-md">
							<SiPostgresql className="w-6 h-6 text-blue-700 flex-shrink-0" />
							<span className="font-bold text-gray-900">PostgreSQL</span>
						</div>
						<div className="flex items-center gap-3 p-4 bg-white squircle shadow-md">
							<SiSqlite className="w-6 h-6 text-blue-500 flex-shrink-0" />
							<span className="font-bold text-gray-900">SQLite</span>
						</div>
						<div className="flex items-center gap-3 p-4 bg-white squircle shadow-md">
							<MdStorage className="w-6 h-6 text-red-600 flex-shrink-0" />
							<span className="font-bold text-gray-900">SQL Server</span>
						</div>
					</div>
				</div>

				{/* NoSQL Section */}
				<div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 sm:p-10 squircle border-2 border-emerald-200 shadow-lg">
					{/* Header */}
					<div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-emerald-200">
						<div className="p-3 bg-emerald-200 squircle">
							<MdAccountTree className="w-8 h-8 sm:w-9 sm:h-9 text-emerald-700" />
						</div>
						<div>
							<h3 className="font-bold text-emerald-900 text-2xl sm:text-3xl">NoSQL</h3>
							<p className="text-sm text-emerald-700 mt-1">Bases non-relationnelles</p>
						</div>
					</div>

					{/* Databases */}
					<div className="space-y-3">
						<div className="flex items-start gap-3 p-4 bg-white squircle shadow-md">
							<SiMongodb className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
							<div className="min-w-0">
								<div className="font-bold text-gray-900">MongoDB</div>
								<div className="text-xs text-emerald-700 font-medium mt-0.5">Documents JSON</div>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 bg-white squircle shadow-md">
							<SiRedis className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
							<div className="min-w-0">
								<div className="font-bold text-gray-900">Redis</div>
								<div className="text-xs text-emerald-700 font-medium mt-0.5">Clé-Valeur</div>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 bg-white squircle shadow-md">
							<MdDataObject className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
							<div className="min-w-0">
								<div className="font-bold text-gray-900">Cassandra</div>
								<div className="text-xs text-emerald-700 font-medium mt-0.5">Colonnes</div>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 bg-white squircle shadow-md">
							<MdHub className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
							<div className="min-w-0">
								<div className="font-bold text-gray-900">Neo4j</div>
								<div className="text-xs text-emerald-700 font-medium mt-0.5">Graphes</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}
