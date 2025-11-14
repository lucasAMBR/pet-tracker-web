import { PetObservationService } from "@/services/PetObservationService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreatePetObservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetObservationService.createPetObservation,
        onSuccess: () => {
            toast.success("Observation created!")
            queryClient.invalidateQueries({queryKey: ['petObservation']});        
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}