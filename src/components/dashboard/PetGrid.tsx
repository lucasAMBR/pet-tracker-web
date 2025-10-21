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
    <div className="flex flex-wrap -m-3">
      {pets.map((pet) => (
        <div key={pet.id} className="w-full sm:w-1/2 xl:w-1/3 p-3">
          <PetCard key={pet.id} pet={pet} />
        </div>
      ))}
    </div>
  );
}
