import { PetService } from "@/services/PetService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const usefindPetDetails = () => {
    const searchParams = useSearchParams();

    const pet_id = searchParams.get('pet_id');
    const collar_id = searchParams.get('collar_id');

    const queryKey = ['petProfile', {pet_id, collar_id}];

    const queryFn = () => {
        if(pet_id){
            return PetService.showPetDetailsByPetId(parseInt(pet_id as string));
        }

        if(collar_id){
            return PetService.showPetDetailsByCollarId(collar_id as string);
        }

        return Promise.reject(new Error("No id provided!"));
    }

    const isEnabled = (!!pet_id || !!collar_id);

    return useQuery({
        queryKey: queryKey,
        queryFn: queryFn,
        enabled: isEnabled,

        staleTime: 1000 * 60 * 5, 
        retry: (failureCount, error) => {
        if (error.message.includes('não encontrado')) {
            return false;
        }
        return failureCount < 3;
        },
    })
}