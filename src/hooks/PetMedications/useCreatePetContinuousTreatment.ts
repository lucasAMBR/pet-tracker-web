import { PetMedicationService } from "@/services/PetMedicationService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreatePetTreatment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetMedicationService.registerNewMedication,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['treatments']})
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}