import { PetMedication } from "@/types/petMedications/PetMedications";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePetMedicationsSchema, UpdatePetMedicationsSchemaType } from "@/schemas/petMedications/UpdatePetMedicationSchema";
import { useEffect, useState } from "react";
import ErrorBox from "../global/error-advertise";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { medicationTypeEnum } from "@/types/enums/MedicationTypeEnum";
import { DatepickerInput } from "../ui/date-input";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { set } from "zod";
import { useUpdatePetMedications } from "@/hooks/PetMedications/useUpdatePetMedications";

type UpdatePetMedicationsModalProps = {
    petId: number,
    selectedMedication: PetMedication,
    handleOpen: (open: boolean) => void
}

const UpdatePetMedicationsModal = ({selectedMedication, handleOpen}: UpdatePetMedicationsModalProps) => {

    const {
        mutate,
        error,
        isPending
    } = useUpdatePetMedications();

    const {
        register: continuousRegister,
        watch: continuousWatch,
        setValue: continuousSetValue,
        control: continuousControl,
        handleSubmit: continuousHandleSubmit,
        formState: {isSubmitting: continuousIsSubmitting, errors: continuousError},
        reset: continuousReset
    } = useForm({
        resolver: zodResolver(UpdatePetMedicationsSchema)
    });

     const {
        register: periodicRegister,
        watch: periodicWatch,
        setValue: periodicSetValue,
        control: periodicControl,
        handleSubmit: periodicHandleSubmit,
        formState: {isSubmitting: periodicIsSubmitting, errors: periodicError},
        reset: periodicReset
    } = useForm({
        resolver: zodResolver(UpdatePetMedicationsSchema),
    });

    const periodicStartDate = periodicWatch('start_date');
    const periodicEndDate = periodicWatch('end_date');
    
     const {
        register: uniqueRegister,
        watch: uniqueWatch,
        setValue: uniqueSetValue,
        control: uniqueControl,
        handleSubmit: uniqueHandleSubmit,
        formState: {isSubmitting: uniqueIsSubmitting, errors: uniqueError},
        reset: uniqueReset
    } = useForm({
        resolver: zodResolver(UpdatePetMedicationsSchema),
    });

    const uniqueStartDate = uniqueWatch('start_date');
    const uniqueEndDate = uniqueWatch('end_date');

    useEffect(() => {
        if (!selectedMedication) return;
        
        if(selectedMedication.treatment_type == 'continuous'){
            continuousReset({
                name: selectedMedication.name,
                type: selectedMedication.type,
                start_date: selectedMedication.start_date
                ? new Date(selectedMedication.start_date)
                : undefined,
                end_date: selectedMedication.end_date
                ? new Date(selectedMedication.end_date)
                : undefined,
                treatment_type: 'continuous',
                dosage_form: selectedMedication.dosage_form,
                dosing_interval: Number(selectedMedication.dosing_interval),
                description: selectedMedication.description ?? ""
            });
        }

        if(selectedMedication.treatment_type == 'periodic'){
            periodicReset({
                name: selectedMedication.name,
                type: selectedMedication.type,
                start_date: selectedMedication.start_date
                ? new Date(selectedMedication.start_date)
                : undefined,
                end_date: selectedMedication.end_date
                ? new Date(selectedMedication.end_date)
                : undefined,
                treatment_type: 'periodic',
                dosage_form: selectedMedication.dosage_form,
                dosing_interval: Number(selectedMedication.dosing_interval),
                description: selectedMedication.description ?? ""
            });
        }
        if(selectedMedication.treatment_type == 'unique'){
            uniqueReset({
                name: selectedMedication.name,
                type: selectedMedication.type,
                start_date: selectedMedication.start_date
                ? new Date(selectedMedication.start_date)
                : undefined,
                end_date: selectedMedication.end_date
                ? new Date(selectedMedication.end_date)
                : undefined,
                treatment_type: 'unique',
                dosage_form: selectedMedication.dosage_form,
                dosing_interval: undefined,
                description: selectedMedication.description ?? ""
            });
        }
    }, [selectedMedication, continuousReset]);

    const continuousStartDate = continuousWatch('start_date');
    const continuousEndDate = continuousWatch('end_date');

    const [continuousTreatmentIsConcluded, setContinuousTreatmentIsConcluded] = useState<boolean>(
        !!selectedMedication?.end_date
    );

    const handleContinuousConcludedChange = (isConcluded: boolean) => {
        if(!isConcluded){
            continuousSetValue('end_date', undefined);
        }

        setContinuousTreatmentIsConcluded(isConcluded);
    }

    const sendUpdateToApi: SubmitHandler<UpdatePetMedicationsSchemaType> = (data) => {
        try{
            mutate({medication_id: selectedMedication.id, medication_data: data});
            handleOpen(false);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Treatment</DialogTitle>
                <DialogDescription>Here you can update a item the history of your pet's medical treatments.</DialogDescription> 
            </DialogHeader>
            {selectedMedication.treatment_type === 'continuous' &&
                <form onSubmit={continuousHandleSubmit(sendUpdateToApi)}>
                    <ErrorBox errors={continuousError} />
                    <input {...continuousRegister('treatment_type')} className="hidden" />
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Medication name</Label>
                        <Input
                            {...continuousRegister('name')} 
                            placeholder="Insert the medication name" 
                        />
                    </div>
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Medication Type</Label>
                        <Controller control={continuousControl} name='type' render={({field}) => (
                        <Select                   
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select the medication type" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicationTypeEnum.map(type => (
                                    <SelectItem value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        )} />
                    </div>
                    <div className="flex gap-3">
                        <input {...continuousRegister('start_date', {valueAsDate: true})} type='date' className="hidden"/>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <DatepickerInput 
                                label="Treatment start date"
                                value={continuousStartDate} 
                                    onChange={(value) => {
                                    const date = value ? new Date(value) : undefined;
                                    continuousSetValue("start_date", date as Date);
                                }}
                            />
                        </div>
                        <input {...continuousRegister('end_date')} type='date' className="hidden"/>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <DatepickerInput 
                                label="Treatment end date"
                                disabled={!continuousTreatmentIsConcluded}
                                value={continuousEndDate as Date} 
                                    onChange={(value) => {
                                    const date = value ? new Date(value) : undefined;
                                    continuousSetValue("end_date", date);
                                }}
                            />
                        </div> 
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3 my-3 flex-1">
                        <Label htmlFor="size">Dosage Form</Label>
                        <Controller control={continuousControl} name='dosage_form' render={({field}) => (
                        <Select                    
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger id="specie" className="w-full">
                                <SelectValue placeholder="Select the dosage form" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pills">Pills</SelectItem>
                                <SelectItem value="liquid">Liquid</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        )} />
                        </div>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <Label>Dosing interval</Label>
                            <div className='flex rounded-md shadow-xs'>
                                <Input 
                                {...continuousRegister('dosing_interval', {valueAsNumber: true})}
                                type='number'  
                                placeholder='ex: 8' 
                                className='-me-px rounded-r-none shadow-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                                <span className='border-input bg-background text-muted-foreground -z-1 inline-flex items-center rounded-r-md border px-3 text-sm'>
                                Hours
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Description</Label>
                        <Textarea
                            {...continuousRegister('description')}
                            placeholder="Insert the name" 
                        />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-3 mt-3 w-fit">
                                <Switch checked={continuousTreatmentIsConcluded} onCheckedChange={() => handleContinuousConcludedChange(!continuousTreatmentIsConcluded)} /> <Label>Treatment is concluded</Label>
                            </div>  
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to library</p>
                        </TooltipContent>
                    </Tooltip>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Register</Button>
                    </DialogFooter>
                </form>
            }
            {selectedMedication.treatment_type === 'periodic' && (
                <form onSubmit={periodicHandleSubmit(sendUpdateToApi)}>
                    <ErrorBox errors={periodicError} />
                    <input {...periodicRegister('treatment_type')} className="hidden" />
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Medication name</Label>
                        <Input
                            {...periodicRegister('name')} 
                            placeholder="Insert the medication name" 
                        />
                    </div>
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Medication Type</Label>
                        <Controller control={periodicControl} name='type' render={({field}) => (
                        <Select                    
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select the medication type" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicationTypeEnum.map(type => (
                                    <SelectItem value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        )} />
                    </div>
                    <div className="flex gap-3">
                        <input {...periodicRegister('start_date', {valueAsDate: true})} type='date' className="hidden"/>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <DatepickerInput 
                                label="Treatment start date"
                                value={periodicStartDate} 
                                    onChange={(value) => {
                                    const date = value ? new Date(value) : undefined;
                                    periodicSetValue("start_date", date as Date);
                                }}
                            />
                        </div>
                        <input {...periodicRegister('end_date')} type='date' className="hidden"/>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <DatepickerInput 
                                label="Treatment end date"
                                value={periodicEndDate as Date} 
                                    onChange={(value) => {
                                    const date = value ? new Date(value) : undefined;
                                    periodicSetValue("end_date", date);
                                }}
                            />
                        </div> 
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3 my-3 flex-1">
                        <Label htmlFor="size">Dosage Form</Label>
                        <Controller control={periodicControl} name='dosage_form' render={({field}) => (
                        <Select                    
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger id="specie" className="w-full">
                                <SelectValue placeholder="Select the dosage form" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pills">Pills</SelectItem>
                                <SelectItem value="liquid">Liquid</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        )} />
                        </div>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <Label>Dosing interval</Label>
                            <div className='flex rounded-md shadow-xs'>
                                <Input 
                                {...periodicRegister('dosing_interval', {valueAsNumber: true})}
                                type='number'  
                                placeholder='ex: 8' 
                                className='-me-px rounded-r-none shadow-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                                <span className='border-input bg-background text-muted-foreground -z-1 inline-flex items-center rounded-r-md border px-3 text-sm'>
                                Hours
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Description</Label>
                        <Textarea 
                            {...periodicRegister('description')}
                            placeholder="Insert the name" 
                        />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-neutral-500 my-2">In this case, the treatment conclusion is calculated automatically based on the estimated end date and today</p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Register</Button>
                    </DialogFooter>
                </form>
            )}
            {selectedMedication.treatment_type === 'unique' && (
                <form onSubmit={uniqueHandleSubmit(sendUpdateToApi)}>
                    <ErrorBox errors={uniqueError} />
                    <input {...uniqueRegister('treatment_type')} className="hidden" />
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Medication name</Label>
                        <Input
                            {...uniqueRegister('name')} 
                            placeholder="Insert the medication name" 
                        />
                    </div>
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Medication Type</Label>
                        <Controller control={uniqueControl} name='type' render={({field}) => (
                        <Select                    
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select the medication type" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicationTypeEnum.map(type => (
                                    <SelectItem value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        )} />
                    </div>
                    <div className="flex gap-3">
                        <input {...uniqueRegister('start_date', {valueAsDate: true})} type='date' className="hidden"/>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <DatepickerInput 
                                label="Treatment start date"
                                value={uniqueStartDate} 
                                    onChange={(value) => {
                                    const date = value ? new Date(value) : undefined;
                                    uniqueSetValue("start_date", date as Date);
                                }}
                            />
                        </div>
                        <input {...uniqueRegister('end_date')} type='date' className="hidden"/>
                        <div className="flex flex-col gap-3 my-3 flex-1">
                            <DatepickerInput 
                                label="Expiry date"
                                value={uniqueEndDate as Date} 
                                    onChange={(value) => {
                                    const date = value ? new Date(value) : undefined;
                                    uniqueSetValue("end_date", date);
                                }}
                            />
                        </div> 
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3 my-3 flex-1">
                        <Label htmlFor="size">Dosage Form</Label>
                        <Controller control={uniqueControl} name='dosage_form' render={({field}) => (
                        <Select                    
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger id="specie" className="w-full">
                                <SelectValue placeholder="Select the dosage form" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pills">Pills</SelectItem>
                                <SelectItem value="liquid">Liquid</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        )} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 my-3">
                        <Label>Description</Label>
                        <Textarea 
                            {...uniqueRegister('description')}
                            placeholder="Insert the name" 
                        />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-neutral-500 my-2">Single dose medication treatments doesn't have end date, they have an expiration time for the effect</p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Register</Button>
                    </DialogFooter>
                </form>
            )}
        </DialogContent>
    );
}

export default UpdatePetMedicationsModal;