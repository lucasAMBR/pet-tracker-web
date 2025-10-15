"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, PawPrint } from "lucide-react";

export default function PetCard({ pet }) {
  const online = pet.trackerStatus === "online";

  return (
    <Card className="group rounded-2xl border-slate-200/70 bg-white/90 hover:bg-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5">
      <CardContent className="grid grid-cols-[72px_1fr] items-center gap-4 p-4">
        {/* mini foto */}
        <div className="h-[72px] w-[72px] rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 ring-1 ring-white" />

        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h4 className="text-base font-semibold tracking-tight">{pet.name}</h4>
            <Badge
              className={`border ${
                online
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-rose-300 bg-rose-50 text-rose-700"
              }`}
            >
              {online ? "rastreador online" : "rastreador offline"}
            </Badge>
          </div>

          <ul className="grid gap-0.5 text-sm text-slate-700">
            <li className="flex items-center gap-1">
              <PawPrint className="h-4 w-4" /> Espécie: {pet.species}
            </li>
            <li>Sexo: {pet.sex}</li>
            <li>Idade: {pet.age}</li>
            <li>Última vacina: {pet.lastVaccine}</li>
          </ul>

          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {pet.lastSeen}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
