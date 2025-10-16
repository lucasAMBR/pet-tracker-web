"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function UserCard() {
	const user = {
		name: "Kauã",
		email: "kaua@gmail.com",
		memberSince: "2024",
		lastAccess: "13/10/2025",
		stats: { pets: 3, collars: 2, alerts: 1 },
	};

	return (
		<Card className="rounded-3xl border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,6,23,0.08)] ring-1 ring-sky-200/30 transition-all hover:shadow-[0_25px_60px_rgba(2,6,23,0.12)]">
			<CardHeader className="flex flex-col items-center text-center">
				<Avatar className="h-24 w-24 ring-2 ring-white shadow-md">
					<AvatarImage src="/images/user.png" alt={user.name} />
					<AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
				</Avatar>
				<CardTitle className="mt-2 text-xl">{user.name}</CardTitle>
				<p className="text-sm text-slate-500">{user.email}</p>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-3 gap-3">
					<Stat label="Pets" value={user.stats.pets} />
					<Stat label="Coleiras" value={user.stats.collars} />
					<Stat label="Alertas" value={user.stats.alerts} />
				</div>

				<Separator className="my-5" />
				<div className="space-y-1 text-sm text-slate-600">
					<p>Membro desde: {user.memberSince}</p>
					<p>Último acesso: {user.lastAccess}</p>
				</div>
			</CardContent>
		</Card>
	);
}

function Stat({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-2xl border bg-white/80 p-4 text-center shadow-sm hover:-translate-y-0.5 transition">
			<p className="text-lg font-semibold">{value}</p>
			<p className="text-xs text-slate-500">{label}</p>
		</div>
	);
}
