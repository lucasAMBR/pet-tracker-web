import { PetObservationService } from "@/services/PetObservationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdatePetObservation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetObservationService.updatePetObservation,
        onSuccess: () => {
            toast.success("Observation updated!")
            queryClient.invalidateQueries({queryKey: ['petObservation']});        
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}