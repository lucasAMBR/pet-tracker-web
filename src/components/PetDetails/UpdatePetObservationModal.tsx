import { PetObservation } from "@/types/petObservations/PetObservations";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePetObservationSchema, CreatePetObservationSchemaType } from "@/schemas/petObservations/CreatePetObservationSchema";
import { useUpdatePetObservation } from "@/hooks/PetObservations/useUpdatePetObservations";
import { CreatePetDiseaseSchemaType } from "@/schemas/PetDiseases/CreatePetDiseaseSchema";

type UpdateObservationModalProps = {
    observation: PetObservation,
    openChange: (isOpen: boolean) => void
}

const UpdatePetObservationModal = ({observation, openChange}: UpdateObservationModalProps) => {

    const {
        register: registerObservation,
        formState: {errors, isSubmitting},
        handleSubmit
    } = useForm({
        resolver: zodResolver(CreatePetObservationSchema), 
        defaultValues: {
            description:  observation.description
        }
    })

    const {
        mutate,
        error
    } = useUpdatePetObservation();

    const sendUpdateToApi:SubmitHandler<CreatePetObservationSchemaType> = (data) => {
        try{
            mutate({observation_id: observation.id as number, observation_data: data});
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
            <form onSubmit={handleSubmit(sendUpdateToApi)} className="gap-2">
                <Textarea {...registerObservation('description')}/>
            <DialogFooter className="mt-3">
                <DialogClose asChild>
                    <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
                <Button type="submit" variant={"default"}>Update</Button>
            </DialogFooter>
            </form>
        </DialogContent>
    )
}

export default UpdatePetObservationModal;