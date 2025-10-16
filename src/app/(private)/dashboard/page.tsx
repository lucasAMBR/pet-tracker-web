"use client";

import TopSearch from "../../../components/dashboard/topsearch";
import UserCard from "../../../components/dashboard/UserCard";
import PetCard from "../../../components/dashboard/PetCard";
import MapPlaceholder from "../../../components/dashboard/MapPlaceholder";

export default function Page() {
	const pets = [
		{
			id: "1",
			name: "Thor",
			species: "Cachorro",
			sex: "M",
			age: "3 anos",
			lastVaccine: "20/08/2025",
			lastSeen: "Último visto há 4 min — Rua das Flores, 125",
			trackerStatus: "online",
		},
		{
			id: "2",
			name: "Mia",
			species: "Gato",
			sex: "F",
			age: "1 ano",
			lastVaccine: "04/06/2025",
			lastSeen: "Último visto há 2 h — Casa (Sala)",
			trackerStatus: "offline",
		},
		{
			id: "3",
			name: "Lua",
			species: "Cachorro",
			sex: "F",
			age: "5 anos",
			lastVaccine: "12/07/2025",
			lastSeen: "Último visto há 10 min — Praça Central",
			trackerStatus: "online",
		},
	];

	return (
		<div className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_0%,#cffafe80,transparent_60%),linear-gradient(#cffafe,#ecfeff)] text-slate-900">
			<TopSearch />

			<main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
				<aside className="md:sticky md:top-24 self-start">
					<UserCard />
				</aside>

				<section className="space-y-6">
					{/* Card de lista dos pets */}
					<div className="rounded-3xl border border-white/40 bg-white/70 dark:bg-black backdrop-blur-xl shadow-[0_20px_50px_rgba(2,6,23,0.08)] ring-1 ring-sky-200/30">
						<div className="flex items-center justify-between p-5 border-b border-slate-200/60">
							<h3 className="text-lg font-semibold tracking-tight">
								Animais cadastrados
							</h3>
							<span className="text-xs rounded-full border px-2 py-1 bg-white/80">
								Total: {pets.length}
							</span>
						</div>
						<div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{pets.map((p) => (
								<PetCard key={p.id} pet={p} />
							))}
						</div>
					</div>

					<MapPlaceholder />
				</section>
			</main>
		</div>
	);
}
