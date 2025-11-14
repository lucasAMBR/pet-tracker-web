import { PetObservationService } from "@/services/PetObservationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePetObservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetObservationService.deletePetObservation,
        onSuccess: () => {
            toast.success("Observation deleted!")
            queryClient.invalidateQueries({queryKey: ['petObservation']});        
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}