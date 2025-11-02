"use client";

import { useUserPetList } from "@/hooks/Pets/UseUserPetList";
import PetCard from "./PetCard";
import type { Pet } from "@/app/(private)/dashboard/page";
import { error } from "console";
import { Spinner } from "../ui/spinner";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { ArrowUpRightIcon, Dog } from "lucide-react";
import { Button } from "../ui/button";
import { AddPetModal } from "./addpet";
import { Card } from "../ui/card";

//Verificar se o tutor tem algum animal
export default function PetGrid() {

	const {
		data,
		isFetching,
		isError,
		error
	} = useUserPetList();

	if(isFetching){
		return <Spinner />
	}

	const petList = data?.data;

	if(petList?.length === 0){
		return(
			<Card className="shadow-md bg-white dark:bg-neutral-800">
			<Empty className="bg-white dark:bg-neutral-800">
				<EmptyHeader>
					<EmptyMedia variant="icon" className="bg-cyan-800 text-white">
					<Dog />
					</EmptyMedia>
					<EmptyTitle>No Pets Registered Yet</EmptyTitle>
					<EmptyDescription>
					You haven&apos;t registered any pets yet. Get started by registering
					your first pet to unlock all the features.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<AddPetModal />
					</div>
				</EmptyContent>
			</Empty>
		</Card>
		)
	}

	return (
		<div className="flex flex-wrap -m-3 mb-4 p-3">
			{data?.data.map((pet)=>(
				<PetCard key={pet.id} pet={pet} />
			))}
		</div>
	);
}
