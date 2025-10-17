"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Syringe, BadgeInfo, Footprints } from "lucide-react";
import Image from "next/image";
import type { Pet } from "@/app/(initial)/dashboard/page";

// Fubncao para verificar quantas horas falta para uma data
const daysUntil = (iso: string) => {
  const target = new Date(iso);
  const today = new Date();
  // zera tudo
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const ms = target.getTime() - today.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

const formatPtBR = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { timeZone: "UTC" });

export default function PetCard({ pet }: { pet: Pet }) {
  const online = pet.status === "Localizado";

  // vacina (opcional)
  const d = pet.nextVaccine ? daysUntil(pet.nextVaccine.dateISO) : undefined;
  const overdue = typeof d === "number" ? d < 0 : false;

  // progresso se atrasado -> 100% vermelho; se ok -> avança conforme aproxima (0% longe, 100% na data)
  const windowDays = pet.nextVaccine?.windowDays ?? 60;
  const progress =
    typeof d === "number"
      ? overdue
        ? 100
        : Math.min(100, Math.max(0, Math.round(((windowDays - d) / windowDays) * 100)))
      : 0;
  return (
    <Card className="rounded-2xl bg-white shadow-md hover:shadow-lg transition overflow-hidden dark:bg-neutral-800 dark:shadow-black/10">
      {/* Capa */}
      <div className="relative w-full h-40">
        <Image src={pet.headerImage} alt={pet.name} fill className="object-cover" priority />
        <Badge
          className={`absolute top-3 right-3 text-xs text-white ${
            online
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {pet.status}
        </Badge>
      </div>

      {/* Conteúdo */}
      <CardContent className="p-4">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {pet.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{pet.breed}</p>
          </div>

          <div className="flex gap-2">
            {pet.pills.map((p) => (
              <span
                key={`${pet.id}-${p.label}`}
                className={`text-xs px-2 py-1 rounded-full ${
                  p.tone === "blue"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                    : p.tone === "green"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200"
                    : "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-200"
                }`}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* infos */}
        <div className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Syringe className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>{pet.vaccineStatus}</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">
              Última: {pet.vaccineLast}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <BadgeInfo className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>Microchip</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">{pet.microchip}</span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Footprints className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span>Último passeio</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">{pet.lastWalk}</span>
          </div>
        </div>

        {/* Próxima vacina */}
        {pet.nextVaccine && (
          <div className="mt-4 border-t pt-3 border-slate-200 dark:border-neutral-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
              Próxima vacina{overdue ? ":" : " em:"}
            </p>

            <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-neutral-700">
              <div
                className={`h-2 rounded-full ${
                  overdue ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className={`mt-1 text-xs ${overdue ? "text-red-600" : "text-slate-600 dark:text-slate-300"}`}>
              {typeof d === "number" &&
                (overdue
                  ? `Atrasada há ${Math.abs(d)} dia${Math.abs(d) === 1 ? "" : "s"}`
                  : `${formatPtBR(pet.nextVaccine.dateISO)} (${d} dia${d === 1 ? "" : "s"})`)}
            </p>

            <button
              type="button"
              className={`mt-3 w-full rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
                overdue
                  ? "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/40"
              }`}
            >
              {overdue ? "Agendamento urgente" : "Ver detalhes completos"}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
