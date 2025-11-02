"use client";

import { type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Droplets,
	Dumbbell,
	Utensils,
	CalendarClock,
	Syringe,
	MapPin,
} from "lucide-react";

type TipTone = "blue" | "green" | "orange";
type TipProps = {
	title: string;
	description: string;
	icon: ReactNode;
	tone?: TipTone;
};

function Tip({ title, description, icon, tone = "blue" }: TipProps) {
	const light =
		tone === "blue"
			? "bg-blue-50"
			: tone === "green"
				? "bg-emerald-50"
				: "bg-orange-50";
	const dark =
		tone === "blue"
			? "dark:bg-blue-900/20"
			: tone === "green"
				? "dark:bg-emerald-900/20"
				: "dark:bg-orange-900/20";

	return (
		<div className={`rounded-2xl p-5 ${light} ${dark}`}>
			<div className="flex items-center gap-3">
				{icon}
				<h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
					{title}
				</h4>
			</div>
			<p className="mt-3 text-sm text-slate-700 leading-relaxed dark:text-slate-300">
				{description}
			</p>
		</div>
	);
}

const PillBtn = ({
	children,
	color = "blue",
}: {
	children: ReactNode;
	color?: "blue" | "green" | "orange";
}) => {
	const light = {
		blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
		green: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
		orange: "bg-orange-50 text-orange-700 hover:bg-orange-100",
	} as const;
	const dark = {
		blue: "dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/40",
		green:
			"dark:bg-emerald-900/30 dark:text-emerald-200 dark:hover:bg-emerald-900/40",
		orange:
			"dark:bg-orange-900/30 dark:text-orange-200 dark:hover:bg-orange-900/40",
	} as const;

	return (
		<button
			type="button"
			className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${light[color]} ${dark[color]}`}
		>
			{children}
		</button>
	);
};

export default function CareTips() {
	return (
		<Card className="rounded-2xl bg-white shadow-md dark:bg-neutral-800 dark:shadow-black/10">
			<CardHeader>
				<CardTitle className="text-xl text-slate-900 dark:text-slate-100">
					Dicas de Cuidado
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-3">
					<Tip
						title="Hidratação"
						description="Mantenha sempre água fresca disponível, especialmente em dias quentes."
						icon={
							<Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
						}
						tone="blue"
					/>
					<Tip
						title="Exercícios"
						description="Passeios diários são essenciais para a saúde física e mental do seu pet."
						icon={
							<Dumbbell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
						}
						tone="green"
					/>
					<Tip
						title="Alimentação"
						description="Forneça uma dieta balanceada e apropriada para idade e porte."
						icon={
							<Utensils className="h-5 w-5 text-orange-600 dark:text-orange-400" />
						}
						tone="orange"
					/>
				</div>

				<div className="flex flex-wrap gap-3 pt-2">
					<PillBtn color="blue">
						<span className="inline-flex items-center gap-2">
							<CalendarClock className="h-4 w-4" />
							Agendar consulta
						</span>
					</PillBtn>

					<PillBtn color="green">
						<span className="inline-flex items-center gap-2">
							<Syringe className="h-4 w-4" />
							Carteira de vacinação
						</span>
					</PillBtn>

					<PillBtn color="orange">
						<span className="inline-flex items-center gap-2">
							<MapPin className="h-4 w-4" />
							Monitorar localização
						</span>
					</PillBtn>
				</div>
			</CardContent>
		</Card>
	);
}
