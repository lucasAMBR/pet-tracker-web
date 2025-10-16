"use client"

import CarrouselBanner from "@/components/register/carrousel-banner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatepickerInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormSchema, RegisterFormSchemaType } from "@/schemas/register/RegisterFormSchema";
import Image from "next/image";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import FormErrorMessage from "@/components/global/error-advertise";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/Authentication/useRegister";
import { format } from "date-fns";
import BackButton from "@/components/ui/back-button";
import { toast } from "sonner";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { api } from "@/lib/axios";

const RegisterPage = () => {

    const router = useRouter();

    const {
        mutateAsync: registerNewUser,
        isPending: registerIsPending,
        error: registerError,
    } = useRegister();

    // Isso aqui é o controle do formulario usando RHF
    const {
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        control,
        reset
    } = useForm<RegisterFormSchemaType>({resolver: zodResolver(RegisterFormSchema)});

    const date = watch("birthday");

    const [ apiValidationErrors, setApiValidationErrors ] = useState<ValidationErrors | null>()

    const onSubmit: SubmitHandler<RegisterFormSchemaType> = async(data) => {
        try{
            const apiResponse = await registerNewUser(data);

            if(!apiResponse.success){
                throw new Error(apiResponse.message)
            }

            toast.success(apiResponse.message+"!");
        }catch (errors: any){
            if (axios.isAxiosError<ApiResponse<ValidationErrors>>(errors)) {
                const errorMessage = errors.response?.data?.message || errors.message;
                if(errors.status == 422){
                    setApiValidationErrors(errors.response?.data.data);
                }   

                toast.error(errorMessage);
            } else{
                toast.error(errors.message);
            }
        }
    }

    return (
        <div className="w-screen h-screen flex p-6 bg-neutral-100 dark:bg-neutral-900">
            <BackButton fallbackPath="/" isFixed={true}/>
            <div className="h-full flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <Image src={"/images/logo_2.png"} alt="logo" width={100} height={100} />
                    <h2 className="text-3xl text-cyan-600 font-bold my-2">Pet Tracker</h2>
                    <p className="my-6 font-bold text-xl" onClick={() => console.log(errors)}>Welcome!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-auto max-w-[450px]">
                    <FormErrorMessage errors={errors} apiErrors={apiValidationErrors}/>
                    <div className="">
                        <Label className="mb-2">Name</Label>
                        <Input 
                            {...register("name")}
                            type="text"
                            id="name"
                            placeholder="Full name" 
                            className="w-full" 
                        />
                    </div>
                    <div className="">
                        <Label className="mb-2">Email</Label>
                        <Input 
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="Your E-mail" 
                            className="w-full" 
                        />
                    </div>
                    <div className="">
                        <Label className="mb-2">CPF</Label>
                        <Input 
                            {...register("cpf")}
                            type="text"
                            id="cpf"
                            placeholder="CPF" 
                            />
                    </div>
                    <div className="">
                        <Label className="mb-2">Password</Label>
                        <Input 
                            {...register("password")}
                            type="password"
                            id="password"
                            placeholder="Password" 
                            className="w-full" 
                        />
                    </div>
                    <input type="hidden" {...register("birthday")} />
                    <DatepickerInput value={date} onChange={(date) => setValue('birthday', date as Date)}/>
                    <div className="flex items-start gap-3 my-4">
                       <Controller
                            name="terms"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-start gap-3 my-4">
                                <Checkbox
                                    id="terms"
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                />
                                <div className="grid gap-2">
                                    <Label htmlFor="terms">Accept terms and conditions</Label>
                                    <p className="text-muted-foreground text-sm">
                                    By clicking this checkbox, you agree to the{" "}
                                    <span className="font-bold hover:underline hover:text-black cursor-pointer dark:hover:text-white">
                                        terms and conditions
                                    </span>.
                                    </p>
                                </div>
                                </div>
                            )}
                        />
                    </div>
                    <Button type="submit" className="cursor-pointer">Register</Button>
                    <p className="text-xs text-center">Already have an account? <span className="text-cyan-700 font-bold cursor-pointer hover:underline" onClick={() => router.push("/login")}>click here</span></p>
                </form>
            </div>
            <CarrouselBanner />
        </div>
    );
}

export default RegisterPage;