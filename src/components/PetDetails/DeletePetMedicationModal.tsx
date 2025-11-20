import { useDeletePetDisease } from "@/hooks/PetDisease/useDeletePetDiseases";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useDeletePetMedications } from "@/hooks/PetMedications/useDeletePetMedications";

type DeleteMedicationModalProps = {
    selectedMedication: PetMedication,
    handleOpen: (open: boolean) => void
}

const DeleteMedicationModal = ({selectedMedication, handleOpen}: DeleteMedicationModalProps) => {
    
    const queryClient = useQueryClient();

    const {
        mutateAsync: deleteMedication,
        isError: deleteIsError,
        error: deleteError
    } = useDeletePetMedications();

    const handleDeleteDisease = () => {
        deleteMedication(selectedMedication.id);
        handleOpen(false);
    }

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete medication</DialogTitle>
                <DialogDescription>Are you sure that you wanna delete this medicaton? this action is permanent!</DialogDescription> 
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
                <Button variant={"destructive"} onClick={handleDeleteDisease}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default DeleteMedicationModal