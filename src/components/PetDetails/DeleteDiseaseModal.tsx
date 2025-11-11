import { useDeletePetDisease } from "@/hooks/PetDisease/useDeletePetDiseases";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

type DeleteDiseaseModalProps = {
    selectedDisease: PetDisease,
    handleOpen: (open: boolean) => void
}

const DeleteDiseaseModal = ({selectedDisease, handleOpen}: DeleteDiseaseModalProps) => {
    
    const queryClient = useQueryClient();

    const customBadgeColorForDiseaseStatus = (diseaseStatus: string) => {
        switch (diseaseStatus){
        case "confirmed":
            return "bg-red-500"
        case "suspected":
            return "bg-indigo-500"
        case "resolved": 
            return "bg-green-500"
        case "monitoring":
            return "bg-gray-400"
        }
    }

    const {
        mutateAsync: deleteDisease,
        isError: deleteIsError,
        error: deleteError
    } = useDeletePetDisease();

    const handleDeleteDisease = () => {
        deleteDisease(selectedDisease.id);
        handleOpen(false);
    }

    return(
        <>
            <DialogHeader>
                <DialogTitle>Delete disease</DialogTitle>
                <DialogDescription>Are you sure that you wanna delete this disease? this action is permanent!</DialogDescription> 
            </DialogHeader>
             <div className="flex items-center border p-3 rounded-md dark:bg-neutral-900/40 dark:border-neutral-700">
                    <div className="flex">
                      <span className="font-semibold">{selectedDisease.name}</span>
                      <Badge className={`mx-2 ${customBadgeColorForDiseaseStatus(selectedDisease.diagnosis_status)}`}>{selectedDisease.diagnosis_status}</Badge>
                    </div>
                    <p className="flex-1 text-center text-sm"><span className="font-semibold">Type:</span> {selectedDisease.is_chronic ? "Chronic" : "Normal"}</p>
                    <p className="flex-1 text-center text-sm"><span className="font-semibold">Diagnosed at:</span> {selectedDisease.diagnosis_date.toString()}</p>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
                <Button variant={"destructive"} onClick={handleDeleteDisease}>Delete</Button>
            </DialogFooter>
        </>
    );
}

export default DeleteDiseaseModal