"use client";

import TopSearch from "../../../components/dashboard/topsearch";
import ProfileSidebar from "../../../components/dashboard/ProfileSidebar";
import PetGrid from "../../../components/dashboard/PetGrid";
import CareTips from "../../../components/dashboard/CareTips";

export type PillTone = "blue" | "green" | "pink";
export type Pet = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  status: "Localizado" | "Alerta";
  vaccineStatus: string;
  vaccineLast: string;
  microchip: string;
  lastWalk: string;
  headerImage: string;
  pills: { label: string; tone: PillTone }[];
  nextVaccine?: {
    dateISO: string;      
    windowDays?: number;   //Calcular o progresso da barra da vacina EM DIAS!
  };
};

export default function Page() {
  const petBase: Pet = {
    id: "1",
    name: "Dogan",
    breed: "Molestador Frances",
    gender: "Macho",
    age: "3 anos",
    status: "Alerta",
    vaccineStatus: "Localizado",
    vaccineLast: "02/03/2023",
    microchip: "#12345678",
    lastWalk: "Hoje, 14:30",
    headerImage: "/images/Dogan.png", 
    pills: [
      { label: "Macho", tone: "blue" },
      { label: "3 anos", tone: "green" },
    ],
    nextVaccine: {
      dateISO: "2025-10-15", 
      windowDays: 10,
    },
  };

  
const pets: Pet[] = [];

for (let i = 0; i < 6; i++) {
  const newPet = {
    ...petBase,
    id: String(i + 1),
  };

  pets.push(newPet);
}


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-neutral-950 dark:text-slate-100 transition-colors duration-300">
      <TopSearch />

      <div className="mx-auto max-w-[1200px] gap-6 px-4 py-8 grid grid-cols-1 md:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="md:sticky md:top-20 self-start">
          <ProfileSidebar />
        </aside>

        {/* Conteúdo principal */}
        <main className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Meus Cachorros</h1>
          <PetGrid pets={pets} />
          <CareTips />
        </main>
      </div>
    </div>
  );
}