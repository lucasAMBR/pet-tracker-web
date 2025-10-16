"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TopSearch() {
	return (
		<div className="sticky top-0 z-50 border-b border-white/40 bg-[rgba(207,238,254,0.65)] backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-4 py-4">
				<div className="relative">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
					<Input
						type="search"
						placeholder="Buscar por pet, ID da coleira, localização…"
						className="h-12 rounded-2xl pl-12 pr-4 shadow-[0_10px_30px_rgba(2,6,23,0.07)] ring-2 ring-sky-400/60 focus:ring-4 focus:ring-sky-500 bg-white/90"
					/>
				</div>
			</div>
		</div>
	);
}
