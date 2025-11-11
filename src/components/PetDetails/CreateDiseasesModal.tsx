import { Check, CircleQuestionMark, HeartPlus, Search } from "lucide-react"
import { Button } from "../ui/button"
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { DatepickerInput } from "../ui/date-input"
import { Textarea } from "../ui/textarea"
import { useCreatePetDisease } from "@/hooks/PetDisease/useCreatePetDisease"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreatePetDiseaseSchema, CreatePetDiseaseSchemaType } from "@/schemas/PetDiseases/CreatePetDiseaseSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Pet } from "@/types/Pets/Pet"

type CreateDiseaseModalProps = {
    handleOpen: (open: boolean) => void,
    pet: Pet
}

export const CreateDiseaseModal = ({ handleOpen, pet }: CreateDiseaseModalProps) => {

    const {
        mutateAsync: createPetDisease,
        isPending: creationIsPending,
        error: creationIsError
    } = useCreatePetDisease();

    const {
        register: registerChronicDisease,
        watch: watchChronic,
        setValue: setChronicValue,
        reset: chronicReset,
        control: chronicControl,
        handleSubmit: handleSubmitChronicDisease,
        formState: { isSubmitting: chronicIsSubmitting, errors: chronicErrors}
    } = useForm<CreatePetDiseaseSchemaType>({
        resolver: zodResolver(CreatePetDiseaseSchema),
        defaultValues: {
            'is_chronic': true,
            'diagnosis_date': new Date(),
            'diagnosis_status': "confirmed",
            'pet_id': pet.id
        }
    })

    const {
        register: registerNormalDisease,
        watch: watchNormal,
        setValue: setNormalValue,
        reset: normalReset,
        control: normalControl,
        handleSubmit: handleSubmitNormalDisease,
        formState: { isSubmitting: normalIsSubmitting, errors: normalErrors}
    } = useForm<CreatePetDiseaseSchemaType>({
        resolver: zodResolver(CreatePetDiseaseSchema),
        defaultValues: {
            'is_chronic': false,
            'diagnosis_status': "confirmed",
            'pet_id': pet.id
        }
    })

    const chronic_disease_diagnosis_date = watchChronic('diagnosis_date');

    const normal_disease_diagnosis_date = watchNormal('diagnosis_date');
    const normal_disease_resolved_date = watchNormal('resolved_date');

    const sendDiseaseToApi: SubmitHandler<CreatePetDiseaseSchemaType> = async(data) => {
        console.log(data);
        try{
            const response = await createPetDisease(data);

            toast.success(response.message);
            chronicReset();
            handleOpen(false);
        }catch(errors){

        }
    }

    return(
        <>
            <DialogHeader>
                <DialogTitle>Register new disease</DialogTitle>
                <DialogDescription>Here you can register your pet diseases, the diagnosis status and the resolving date in normal cases.</DialogDescription> 
            </DialogHeader>
            <Tabs defaultValue="chronic">
                <TabsList>
                    <TabsTrigger value="chronic">Chronic</TabsTrigger>
                    <TabsTrigger value="normal">Normal</TabsTrigger>
                </TabsList>
                <TabsContent value="chronic">
                    <form onSubmit={handleSubmitChronicDisease(sendDiseaseToApi)} className="my-2">
                        <input className="hidden" {...registerChronicDisease('pet_id')}/>
                        <div className="flex flex-col gap-2 my-3">
                            <Label>Name</Label>
                            <Input 
                                {...registerChronicDisease('name')}
                                type="text" 
                                placeholder="Disease Name" 
                            />
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <Label>Status</Label>
                            <Controller control={chronicControl} name='diagnosis_status' render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
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
                        <div className="flex flex-col gap-2 my-3">
                            <input 
                                {...registerChronicDisease('diagnosis_date')}
                                type="date" 
                                className="hidden" 
                            />
                            <DatepickerInput 
                                onChange={(date) => setChronicValue('diagnosis_date', date as Date)} 
                                value={chronic_disease_diagnosis_date} 
                                label="Diagnosis Date"
                            />
                        </div>
                        <div className="flex flex-col gap-2 my-3">
                            <Label>Clinical Notes (Optional)</Label>
                            <Textarea 
                                {...registerChronicDisease('clinical_notes')}
                                placeholder="Insert here informations about your pet disease" 
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'outline'}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Register</Button>
                        </DialogFooter>
                    </form>
                </TabsContent>
                <TabsContent value="normal">
                    <p>If resolved date is setted the disease status will be automatically resolved</p>
                    <form onSubmit={handleSubmitNormalDisease(sendDiseaseToApi)} className="my-2">
                        <input className="hidden" {...registerNormalDisease('pet_id')}/>
                        <div className="flex flex-col gap-2 my-3">
                            <Label>Name</Label>
                            <Input 
                                {...registerNormalDisease('name')}
                                type="text" 
                                placeholder="Disease Name" 
                            />
                        </div>
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
                                <Button variant={'outline'}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Register</Button>
                        </DialogFooter>
                    </form>
                </TabsContent>
            </Tabs>
        </>
    )
}