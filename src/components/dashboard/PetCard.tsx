"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Syringe, BadgeInfo, Footprints, EllipsisVertical, Edit, Trash, Dog, Palette, Weight, WeightIcon, RulerDimensionLine, MapPinned } from "lucide-react";
import Image from "next/image";
import { EditPetButton } from "@/components/dashboard/editpet";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Pet } from "@/types/Pets/Pet";
import { calculateAge } from "@/lib/Calculator";
import { capitalizeFirstLetter, formatReadableDate } from "@/lib/formatter";

type PetCardProps = {
	pet: Pet
}

export default function PetCard({ pet }: PetCardProps) {

	const age = calculateAge(pet.birthday.toString());

	return (
		<Card className="rounded-md bg-white shadow-md hover:shadow-lg transition overflow-hidden dark:bg-neutral-800 dark:shadow-black/10 py-0 w-[300px]">
		{/* Capa */}
		<div className="relative w-full h-52">
			<Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}storage/${pet.image}`} alt={pet.name} fill className="object-cover h-full w-full" priority />
			<div className="absolute top-3 right-3">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant={'secondary'} size={'sm'} className="cursor-pointer">
							<EllipsisVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Pet Option</DropdownMenuLabel>
						<DropdownMenuGroup>
							<EditPetButton />
							<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
								<Dog /> Edit pet status
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-700 hover:text-red-700 cursor-pointer"> 
								<Trash className="text-red-700"/> Remove pet
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				</div>

				</div>

				{/* Conteúdo */}
				<CardContent className="px-4 pb-4">
					{/* header */}
					<div className="flex items-center justify-between">
						<div className="w-full">
							<div className="flex justify-between items-center">
								<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
									{pet.name}
								</h3>
								<div className="flex gap-1">
									<Badge>{pet.is_neutred ? "Neutred" : "Not neutred"}</Badge>
									<Badge variant={'destructive'}>{age.years} Year{age.years > 1 ? "s" : ""} old</Badge>
								</div>
							</div>
							<p className="text-sm text-slate-600 dark:text-slate-300">
								{capitalizeFirstLetter(pet.sex)}{" "}
								{capitalizeFirstLetter(pet.specie)}
								{" - "}
								{capitalizeFirstLetter(pet.breed)}
							</p>
						</div>
					</div>

					{/* infos */}
					<div className="mt-3 flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-200">

						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<Palette className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
								<span>Color</span>
							</div>
							<span className="text-slate-500 dark:text-slate-400">
								{capitalizeFirstLetter(pet.color)}
							</span>
						</div>

						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<Weight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
								<span>Weight</span>
							</div>
							<span className="text-slate-500 dark:text-slate-400">
								{pet.weight}{" Kg"}
							</span>
						</div>

						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<RulerDimensionLine className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
								<span>Size</span>
							</div>
							<span className="text-slate-500 dark:text-slate-400">
								{capitalizeFirstLetter(pet.size)}
							</span>
						</div>

						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<MapPinned className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
								<span>Tracker Collar</span>
							</div>
							<span className="text-slate-500 dark:text-slate-400">
								Not have
							</span>
						</div>
						<div className="flex justify-between">
							<div className="flex gap-2 items-center">
								<MapPinned className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
								<span>Registered at</span>
							</div>
							<span className="text-slate-500 dark:text-slate-400">
								{formatReadableDate(pet.created_at.toString())}
							</span>
						</div>

						<Button>More details</Button>
					</div>
				</CardContent>
			</Card>
		);
}
