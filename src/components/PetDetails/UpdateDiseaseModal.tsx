import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { DialogClose, DialogFooter, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DatepickerInput } from "../ui/date-input"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdatePetDiseaseSchema, UpdatePetDiseaseSchemaType } from "@/schemas/PetDiseases/UpdatePetDiseaseSchema"
import { watch } from "fs"
import { useUpdatePetDisease } from "@/hooks/PetDisease/useUpdatePetDisease"
import { format } from "date-fns"
import { Textarea } from "../ui/textarea"

type UpdateDiseaseModalProps = {
    petDisease: PetDisease,
    handleOpen: (close: boolean) => void
}

const UpdateDiseaseModal = ({petDisease, handleOpen}: UpdateDiseaseModalProps) => {

    const {
        register: chronicRegister,
        handleSubmit: handleChronicSubmit,
        formState: { errors: chronicDiseaseError, isSubmitting: chronicDiseasesIsSubmitting},
        watch: chronicDiseaseWatch,
        setValue: chronicDiseaseSetValue,
        control: chronicControl
    } = useForm({
        resolver: zodResolver(UpdatePetDiseaseSchema),
        defaultValues: {
            'name': petDisease.name,
            'diagnosis_status': petDisease.diagnosis_status,
            'diagnosis_date': new Date(petDisease.diagnosis_date + 'T00:00:00')
        }
    })

    const {
        register: registerNormalDisease,
        handleSubmit: handleNormalSubmit,
        formState: { errors: normalDiseaseError, isSubmitting: normalDiseasesIsSubmitting},
        watch: watchNormal,
        setValue: setNormalValue,
        control: normalControl
    } = useForm({
        resolver: zodResolver(UpdatePetDiseaseSchema),
        defaultValues: {
            'name': petDisease.name,
            'diagnosis_status': petDisease.diagnosis_status,
            'diagnosis_date': new Date(petDisease.diagnosis_date + 'T00:00:00'),
            'resolved_date': petDisease.resolved_date === null ? undefined : new Date(petDisease.resolved_date  + 'T00:00:00'),
            'clinical_notes': petDisease.clinical_notes
        }
    })

    const normal_disease_diagnosis_date = watchNormal('diagnosis_date');
    const normal_disease_resolved_date = watchNormal('resolved_date');

    const {
        mutate,
        error,
        isPending
    } = useUpdatePetDisease();

    const date = chronicDiseaseWatch('diagnosis_date');

    const updateChronicDisease: SubmitHandler<UpdatePetDiseaseSchemaType> = (data) => {
        console.log(data);
        mutate({disease_id: petDisease.id, new_disease_data: data});
        handleOpen(false)
    }


    if(petDisease.is_chronic){
        return(
            <>
                <DialogHeader>
                    <DialogTitle>Update disease data</DialogTitle>
                    <DialogDescription>Here you can update informations about your pet chronic diseases</DialogDescription> 
                </DialogHeader>
                <form onSubmit={handleChronicSubmit(updateChronicDisease)}>
                    <div className="mb-4">
                        <div className="flex w-full gap-2 mb-3">
                            <div className="flex-1">
                                <Label className="mb-2">Disease Name</Label>
                                <Input 
                                    {...chronicRegister('name')}
                                    placeholder="Ex: FIV, FELV" 
                                    className="w-full"    
                                />
                            </div>
                            <div className="flex-1">
                                <Label className="mb-2">Status</Label>
                                <Controller control={chronicControl} name='diagnosis_status' render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select the status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="suspected">Suspected</SelectItem>
                                            <SelectItem value="monitoring">Monitoring</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )} />
                            </div>
                        </div>
                        <input type="date" className="hidden" {...chronicRegister('diagnosis_date')}/>
                        <DatepickerInput label="Diagnosis date" onChange={(date) => chronicDiseaseSetValue('diagnosis_date', date as Date)} value={date}/>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"} className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Submit</Button>
                    </DialogFooter>                    
                </form>
            </>
        ) 
    }

    if(!petDisease.is_chronic){
        return(
            <>
                <DialogHeader>
                    <DialogTitle>Update disease data</DialogTitle>
                    <DialogDescription>Here you can update informations about your pet diseases</DialogDescription> 
                </DialogHeader>
                <form onSubmit={handleNormalSubmit(updateChronicDisease)}>
                    <div className="flex flex-col gap-2 my-3">
                        <Label>Status</Label>
                        <Controller control={normalControl} name='diagnosis_status' render={({field}) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!!normal_disease_resolved_date}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select the status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="resolved" disabled={!normal_disease_resolved_date}>Resolved</SelectItem>
                                    <SelectItem value="suspected">Suspected</SelectItem>
                                    <SelectItem value="monitoring">Monitoring</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                    </div>
                    <div className="flex flex-col gap-2 my-3">
                        <input 
                            {...registerNormalDisease('diagnosis_date')}
                            type="date" 
                            className="hidden" 
                        />
                        <DatepickerInput 
                            onChange={(date) => setNormalValue('diagnosis_date', date as Date)} 
                            value={normal_disease_diagnosis_date} 
                            label="Diagnosis Date"
                        />
                    </div>
                    <div className="flex flex-col gap-2 my-3">
                        <input 
                            {...registerNormalDisease('resolved_date')}
                            type="date" 
                            className="hidden" 
                        />
                        <DatepickerInput 
                            onChange={(date) => {
                                setNormalValue('resolved_date', date as Date)
                                if(date){
                                    setNormalValue('diagnosis_status', 'resolved')
                                }
                            }} 
                            value={normal_disease_resolved_date} 
                            label="Resolved Date"
                        />
                    </div>
                    <div className="flex flex-col gap-2 my-3">
                        <Label>Clinical Notes (Optional)</Label>
                        <Textarea 
                            {...registerNormalDisease('clinical_notes')}
                            placeholder="Insert here informations about your pet disease" 
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"} className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Submit</Button>
                    </DialogFooter>                    
                </form>
            </>
        )
    }
}

export default UpdateDiseaseModal;