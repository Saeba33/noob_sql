import {
	MdKey,
	MdLink,
	MdStorage,
	MdTableChart,
	MdTableRows,
	MdViewColumn,
} from "react-icons/md";
import ScrollableTable from "../../ScrollableTable";

export default function DatabaseArchitecture() {
	// Table configurations
	const usersColumns = [
		{
			label: "id",
			icon: <MdKey className="w-4 h-4 text-yellow-600" />,
			className: "text-yellow-900",
		},
		{
			label: "prenom",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{
			label: "nom",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{
			label: "email",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{
			label: "date_inscription",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
	];

	const usersData = [
		[1, "Marie", "Dubois", "marie.dubois@email.com", "2024-01-15"],
		[2, "Pierre", "Martin", "pierre.martin@email.com", "2024-02-20"],
		[3, "Sophie", "Leroy", "sophie.leroy@email.com", "2024-03-10"],
	];

	const booksColumns = [
		{
			label: "id",
			icon: <MdKey className="w-4 h-4 text-yellow-600" />,
			className: "text-yellow-900",
		},
		{
			label: "titre",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{
			label: "auteur",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{ label: "isbn", icon: <MdViewColumn className="w-4 h-4 text-gray-600" /> },
		{
			label: "annee",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
	];

	const booksData = [
		[1, "Le Petit Prince", "Antoine de Saint-Exupéry", "978-2070408504", 1943],
		[2, "1984", "George Orwell", "978-0451524935", 1949],
		[3, "L'Étranger", "Albert Camus", "978-2070360024", 1942],
	];

	const borrowingColumns = [
		{
			label: "id",
			icon: <MdKey className="w-4 h-4 text-yellow-600" />,
			className: "text-yellow-900",
		},
		{
			label: "utilisateur_id",
			icon: <MdLink className="w-4 h-4 text-red-600 opacity-80" />,
			className: "text-red-900",
		},
		{
			label: "livre_id",
			icon: <MdLink className="w-4 h-4 text-red-600 opacity-80" />,
			className: "text-red-900",
		},
		{
			label: "date_emprunt",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{
			label: "date_retour",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
		{
			label: "statut",
			icon: <MdViewColumn className="w-4 h-4 text-gray-600" />,
		},
	];

	const borrowingData = [
		[201, 1, 1, "2025-01-10", "2025-01-24", "Rendu"],
		[202, 2, 2, "2025-01-12", null, "En cours"],
		[203, 3, 1, "2025-01-15", null, "En cours"],
	];

	const renderUsersCell = (cell, cellIndex) => {
		if (cellIndex === 0) {
			return (
				<div className="flex items-center justify-center space-x-1 bg-yellow-100 py-1 px-2 rounded">
					<MdKey className="w-3 h-3 text-yellow-600" />
					<span className="font-semibold text-yellow-900">{cell}</span>
				</div>
			);
		}
		return <span className="text-gray-900 text-sm">{cell}</span>;
	};

	const renderBorrowingsCell = (cell, cellIndex) => {
		if (cellIndex === 0) {
			return (
				<div className="flex items-center justify-center space-x-1 bg-yellow-100 py-1 px-2 rounded">
					<MdKey className="w-3 h-3 text-yellow-600" />
					<span className="font-semibold text-yellow-900">{cell}</span>
				</div>
			);
		}
		if (cellIndex === 1 || cellIndex === 2) {
						return (
							<div className="flex items-center justify-center space-x-1 bg-red-100 py-1 px-2 rounded">
								<MdLink className="w-3 h-3 text-red-600 opacity-80" />
								<span className="font-semibold text-red-900">{cell}</span>
							</div>
						);
		}
		return <span className="text-gray-900 text-sm">{cell || "—"}</span>;
	};

	return (
		<div>
			{/* Introductory section */}
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
					Chaque table contient des <strong>colonnes</strong> (les types
					d'informations) et des <strong>lignes</strong> (les données réelles).
					Une bibliothèque peut même contenir des livres liés entre eux (séries
					ou collections), comme les <strong>clés étrangères</strong> relient
					des tables entre elles.
				</p>
			</div>

			{/* Visual representation - Database */}
			<div className="mx-auto">
				{/* Tables */}
				<div className="space-y-8">
					{/* Users table */}
					<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
						<div className="flex items-center space-x-3 mb-4">
							<MdTableChart className="w-5 h-5 text-gray-600" />
							<h3 className="text-lg font-bold text-gray-800">
								Table "utilisateurs"
							</h3>
						</div>

						<ScrollableTable
							columns={usersColumns}
							data={usersData}
							minWidth="600px"
							renderCell={renderUsersCell}
						/>

						<div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
							<MdTableRows className="w-4 h-4" />
							<span>3 lignes dans cette table (utilisateurs)</span>
						</div>
					</div>

					{/* Books table */}
					<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
						<div className="flex items-center space-x-3 mb-4">
							<MdTableChart className="w-5 h-5 text-gray-600" />
							<h3 className="text-lg font-bold text-gray-800">
								Table "livres"
							</h3>
						</div>

						<ScrollableTable
							columns={booksColumns}
							data={booksData}
							minWidth="800px"
							renderCell={renderUsersCell}
						/>

						<div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
							<MdTableRows className="w-4 h-4" />
							<span>3 lignes dans cette table (livres)</span>
						</div>
					</div>

					{/* Borrowings table */}
					<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
						<div className="flex items-center space-x-3 mb-4">
							<MdTableChart className="w-5 h-5 text-gray-600" />
							<h3 className="text-lg font-bold text-gray-800">
								Table "emprunts"
							</h3>
						</div>

						<ScrollableTable
							columns={borrowingColumns}
							data={borrowingData}
							minWidth="900px"
							renderCell={renderBorrowingsCell}
						/>

						<div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
							<MdTableRows className="w-4 h-4" />
							<span>3 lignes dans cette table (emprunts)</span>
						</div>
					</div>
				</div>

				{/* Legend */}
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
							<MdLink className="w-4 h-4 mr-2 text-red-600 opacity-80" />
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
