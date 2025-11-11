import { UpdatePetDiseaseSchemaType } from "@/schemas/PetDiseases/UpdatePetDiseaseSchema"
import { PetDiseasesService } from "@/services/PetDiseasesService"
import { diseaseUpdatePayload } from "@/types/payloads/UpdateDiseasePayload"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdatePetDisease = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (payload: diseaseUpdatePayload) => PetDiseasesService.updatePetDiseasesById(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['petDisease']})
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}