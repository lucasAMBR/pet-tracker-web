"use client";

import { useState } from "react";
import { Cat, CircleQuestionMark, Dog, Info, Mars, Plus, Venus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatepickerInput } from "@/components/ui/date-input";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Switch } from "../ui/switch";
import { useRegisterPet } from "@/hooks/Pets/useRegisterPet";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterPetSchema, RegisterPetSchemaType } from "@/schemas/pets/RegisterPetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorBox from "../global/error-advertise";
import { toast } from "sonner";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useQueryClient } from "@tanstack/react-query";

export function AddPetModal() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const [apiValidationErrors, setApiValidationErrors] =
    useState<ValidationErrors | null>();

  const {
    mutateAsync: registerPet,
    isPending: registerPetAsync,
    error: registerPetApiErrors
  } = useRegisterPet();

  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
    reset
  } = useForm<RegisterPetSchemaType>({
      resolver: zodResolver(RegisterPetSchema),
      defaultValues: {
        is_neutred: false
      }
    })

  const date = watch("birthday");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      reset({
        is_neutred: false
      });
    }
  };

  const sendNewPetToApi: SubmitHandler<RegisterPetSchemaType> = async(data) => {
    setApiValidationErrors(null);
    try {
      const apiResponse = await registerPet(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['userPetList']
          })
        }
      });

      if (!apiResponse.success) {
        throw new Error(apiResponse.message);
      }

      toast.success(apiResponse.message + "!");

      setIsOpen(false);
    } catch (errors: any) {
      if (axios.isAxiosError<ApiResponse<ValidationErrors>>(errors)) {
        const errorMessage = errors.response?.data?.message || errors.message;
        if (errors.status == 422) {
          setApiValidationErrors(errors.response?.data.data);
        }

        toast.error(errorMessage);
      } else {
        toast.error(errors.message);
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Register new Pet
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Pet</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo pet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(sendNewPetToApi)}>
          <ErrorBox errors={errors} apiErrors={apiValidationErrors}/>
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                  {...register('name')}
                  type="text"
                  id="name" 
                  placeholder="Ex: Rex" 
                />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="specie">Specie</Label>
                <Controller control={control} name="specie" render={({field}) => (
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="specie" className="w-full">
                      <SelectValue placeholder="Select the pet specie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog"><Dog /> Dog</SelectItem>
                      <SelectItem value="cat"><Cat /> Cat</SelectItem>
                      <SelectItem value="other"><CircleQuestionMark /> Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}/>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="sex">Sex</Label>
                <Controller control={control} name="sex" render={({field}) => (
                  <Select                     
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="sex" className="w-full">
                      <SelectValue placeholder="Select the pet sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male"><Mars /> Male</SelectItem>
                      <SelectItem value="female"><Venus />Female</SelectItem>
                    </SelectContent>
                </Select>
                )} />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="breed">Breed</Label>
                <Input 
                {...register('breed')}
                  id="color" 
                  placeholder="Golden Retirever, Siamese, SRD" 
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="size">Size</Label>
                <Controller control={control} name="size" render={({field}) => (
                  <Select                     
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="specie" className="w-full">
                      <SelectValue placeholder="Select the pet size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <div className='w-full max-w-xs space-y-3'>
                  <Label>Weight</Label>
                  <div className='flex rounded-md shadow-xs'>
                    <Input 
                      {...register('weight', {valueAsNumber: true})}
                      type='number'  
                      placeholder='ex: 20.5' 
                      className='-me-px rounded-r-none shadow-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                    <span className='border-input bg-background text-muted-foreground -z-1 inline-flex items-center rounded-r-md border px-3 text-sm'>
                      KG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">Color</Label>
                <Input 
                  {...register('color')}
                  type="text"
                  id="name" 
                  placeholder="Ex: black and white" 
                />
              </div>
              <Input 
                {...register('birthday')}
                className="hidden"
                type="date"
              />
              <div className="flex flex-col gap-3 flex-1">
                <DatepickerInput
						      value={date}
						      onChange={(date) => {setValue('birthday', date as Date)}}
					      />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">
                  Pet picture 
                  <Tooltip>
                    <TooltipTrigger>
                      <Info width={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">A photo is not mandatory, However in case your pet goes missing, a photo helps identification, facilitating the rescue process</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input 
                  {...register('image')}
                  type="file" 
                  placeholder="Ex: black and white" 
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Controller control={control} name="is_neutred" render={({field}) => (
                <Switch 
                  id="is_neutred"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}/>
              <Label>Is neutred</Label>
            </div>
          </div>
          <DialogFooter className="flex gap-3 mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" className="flex items-center gap-2">Salvar Pet</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
