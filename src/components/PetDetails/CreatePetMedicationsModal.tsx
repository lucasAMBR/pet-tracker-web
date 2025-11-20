import { useCreatePetTreatment } from "@/hooks/PetMedications/useCreatePetContinuousTreatment";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPetMedicationsSchema, RegisterPetMedicationsSchemaType } from "@/schemas/petMedications/RegisterPetMedicationsSchema";
import { Pet } from "@/types/Pets/Pet";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { register } from "module";
import { DatepickerInput } from "../ui/date-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { medicationTypeEnum } from "@/types/enums/MedicationTypeEnum";
import ErrorBox from "../global/error-advertise";

type CreatePetMedicationsModalProps = {
    pet: Pet,
    handleOpen: (open: boolean) => void
}

const CreatePetMedicationsModal = ({pet, handleOpen}: CreatePetMedicationsModalProps) => {
 
    const {
        mutate,
        isPending,
        error
    } = useCreatePetTreatment();

    const {
        register: continuousRegister,
        watch: continuousWatch,
        setValue: continuousSetValue,
        control: continuousControl,
        handleSubmit: continuousHandleSubmit,
        formState: {isSubmitting: continuousIsSubmitting, errors: continuousError}
    } = useForm({
        resolver: zodResolver(RegisterPetMedicationsSchema),
        defaultValues: {
            pet_id: pet.id,
            treatment_type: 'continuous',
            end_date: undefined
        }
    });

    const continuousStartDate = continuousWatch('start_date');
    const continuousEndDate = continuousWatch('end_date');

    const [continuousTreatmentIsConcluded, setContinuousTreatmentIsConcluded] = useState<boolean>(false);

    const handleContinuousConcludedChange = (isConcluded: boolean) => {
        if(!isConcluded){
            continuousSetValue('end_date', undefined);
        }

        setContinuousTreatmentIsConcluded(isConcluded);
    }

    const {
        register: periodicRegister,
        watch: periodicWatch,
        setValue: periodicSetValue,
        control: periodicControl,
        handleSubmit: periodicHandleSubmit,
        formState: {isSubmitting: periodicIsSubmitting, errors: periodicError}
    } = useForm({
        resolver: zodResolver(RegisterPetMedicationsSchema),
        defaultValues: {
            pet_id: pet.id,
            treatment_type: 'periodic',
            end_date: undefined
        }
    });

    const periodicStartDate = periodicWatch('start_date');
    const periodicEndDate = periodicWatch('end_date');

    const {
        register: uniqueRegister,
        watch: uniqueWatch,
        setValue: uniqueSetValue,
        control: uniqueControl,
        handleSubmit: uniqueHandleSubmit,
        formState: {isSubmitting: uniqueIsSubmitting, errors: uniqueError}
    } = useForm({
        resolver: zodResolver(RegisterPetMedicationsSchema),
        defaultValues: {
            pet_id: pet.id,
            treatment_type: 'unique',
            end_date: undefined,
            dosing_interval: undefined
        }
    });

    const uniqueStartDate = uniqueWatch('start_date');
    const uniqueEndDate = uniqueWatch('end_date');


    const sendContinuousTreatmentToApi: SubmitHandler<RegisterPetMedicationsSchemaType> = (data) => {
        console.log("entrou");
        try{
            mutate(data);
            handleOpen(false);
        }catch(error){
            console.log(error);
        }
    }

    const sendPeriodicTreatmentToApi: SubmitHandler<RegisterPetMedicationsSchemaType> = (data) => {
        console.log("entrou");
        try{
            mutate(data);
            handleOpen(false);
        }catch(error){
            console.log(error);
        }
    }

    const sendUniqueTreatmentToApi: SubmitHandler<RegisterPetMedicationsSchemaType> = (data) => {
        const payload = { ...data, treatment_type: "unique" }; 
    
        console.log(payload);
        try{
            mutate(payload as RegisterPetMedicationsSchemaType);
            handleOpen(false);
        }catch(error){
            console.log(error);
        }
    }

    return(
         <DialogContent>
            <DialogHeader>
                <DialogTitle>Register new medic treatment</DialogTitle>
                <DialogDescription>Here you can create a history of your pet's medical treatments.</DialogDescription> 
            </DialogHeader>
            <Tabs defaultValue="continuous">
                <TabsList>
                    <TabsTrigger value="continuous">Continuous</TabsTrigger>
                    <TabsTrigger value="periodic">Periodic</TabsTrigger>
                    <TabsTrigger value="unique">Single dose</TabsTrigger>
                </TabsList>
                <TabsContent value="continuous">
                    <form onSubmit={continuousHandleSubmit(sendContinuousTreatmentToApi)}>
                        <ErrorBox errors={continuousError} />
                        <input {...continuousRegister('pet_id')} className="hidden" />
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
                                    <SelectItem value="small">Pills</SelectItem>
                                    <SelectItem value="medium">Liquid</SelectItem>
                                    <SelectItem value="large">Other</SelectItem>
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
                </TabsContent>
                <TabsContent value="periodic">
                    <form onSubmit={periodicHandleSubmit(sendPeriodicTreatmentToApi)}>
                        <ErrorBox errors={periodicError} />
                        <input {...periodicRegister('pet_id')} className="hidden" />
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
                                    <SelectItem value="small">Pills</SelectItem>
                                    <SelectItem value="medium">Liquid</SelectItem>
                                    <SelectItem value="large">Other</SelectItem>
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
                </TabsContent>
                <TabsContent value="unique">
                    <form onSubmit={uniqueHandleSubmit(sendUniqueTreatmentToApi)}>
                        <ErrorBox errors={uniqueError} />
                        <input {...uniqueRegister('pet_id')} className="hidden" />
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
                                    <SelectItem value="small">Pills</SelectItem>
                                    <SelectItem value="medium">Liquid</SelectItem>
                                    <SelectItem value="large">Other</SelectItem>
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
                </TabsContent>
            </Tabs>
        </DialogContent>
    );
}

export default CreatePetMedicationsModal