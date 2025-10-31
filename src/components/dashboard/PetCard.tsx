"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Syringe, BadgeInfo, Footprints } from "lucide-react";
import Image from "next/image";
import type { Pet } from "@/app/(private)/dashboard/page";
import { EditPetButton } from "@/components/dashboard/editpet";

export default function PetCard({ pet }: { pet: Pet }) {
  const online = pet.status === "Localizado";

  return (
    <Card className="rounded-md bg-white shadow-md hover:shadow-lg transition overflow-hidden dark:bg-neutral-800 dark:shadow-black/10">
      
      {/* Capa */}
      <div className="relative w-full h-40">
        <Image
          src={pet.headerImage}
          alt={pet.name}
          fill
          className="object-cover h-full"
          priority
        />

        {/* Botão Editar Pet */}
        <div className="absolute top-3 right-3">
          <EditPetButton />
        </div>
      </div>

      {/* Conteúdo */}
      <CardContent className="p-4">
        
        {/* Nome + Tags */}
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {pet.name}
              </h3>

              <div className="flex gap-1">
                {pet.pills.map((p) => (
                  <span
                    key={`${pet.id}-${p.label}`}
                    className={`text-xs px-2 py-1 rounded-full flex items-center truncate ${
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

            <p className="text-sm text-slate-600 dark:text-slate-300">
              {pet.breed}
            </p>
          </div>
        </div>

        {/* Informações */}
        <div className="mt-3 flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
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
      </CardContent>
    </Card>
  );
}
