import { PetObservation } from "@/types/petObservations/PetObservations"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useDeletePetObservation } from "@/hooks/PetObservations/useDeletePetObservation"

type DeleteObservationModalProps = {
    observation: PetObservation,
    openChange: (isOpen: boolean) => void
}

const DeletePetObservationModal = ({observation, openChange}: DeleteObservationModalProps) => {
    
    const {
        mutate: deleteObservation,
        isPending: deleteIsPending,
        error: deleteError
    } = useDeletePetObservation();
    
    const onConfirm = () => {
        try{
            deleteObservation(observation.id);
            openChange(false);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete observation</DialogTitle>
                <DialogDescription>Are you sure that you wanna delete this observation? this action is permanent!</DialogDescription> 
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
                <Button variant={"destructive"} onClick={onConfirm}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default DeletePetObservationModal