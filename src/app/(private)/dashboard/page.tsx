"use client";

import TopSearch from "../../../components/dashboard/topsearch";
import ProfileSidebar from "../../../components/dashboard/ProfileSidebar";
import PetGrid from "../../../components/dashboard/PetGrid";
import CareTips from "../../../components/dashboard/CareTips";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/UserProvider";
import { api } from "@/lib/axios";
import { AddPetModal } from "@/components/dashboard/addpet";
import { EditPetButton } from "@/components/dashboard/editpet";



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
		windowDays?: number; //Calcular o progresso da barra da vacina EM DIAS!
	};
};

export default function Page() {

	return (
		<div className="min-h-screen ...">
			<TopSearch />
			<div className="mx-auto max-w-[1280px] w-full gap-6 py-8 flex flex-col md:flex-row">
				<aside className="md:sticky md:top-24 self-start md:w-[300px] md:flex-shrink-0">
					<h1 className="text-3xl font-bold tracking-tight mb-6">Profile</h1>
					<ProfileSidebar />
				</aside>

   <main className="space-y-6 md:flex-1">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Pets</h1>
            <AddPetModal />
          </div>

          <PetGrid />
          <CareTips />
        </main>
      </div>
    </div>
  );
}
