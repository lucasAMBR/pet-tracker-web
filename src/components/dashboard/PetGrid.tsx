"use client";

import PetCard from "./PetCard";
import type { Pet } from "@/app/(private)/dashboard/page";

interface PetGridProps {
  pets: Pet[];
}
//Verificar se o tutor tem algum animal
export default function PetGrid({ pets }: PetGridProps) {
  if (!pets || pets.length === 0) {
    return <p className="text-slate-600">Nenhum animal cadastrado.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
