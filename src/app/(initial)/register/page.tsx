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

const RegisterPage = () => {

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

    const date = watch("birthdate");

    const onSubmit: SubmitHandler<RegisterFormSchemaType> = async(data) => {
        console.log(data);
    }

    return (
        <div className="w-screen h-screen flex p-6 bg-neutral-100 dark:bg-neutral-900">
            <div className="h-full flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <Image src={"/images/logo_2.png"} alt="logo" width={100} height={100} />
                    <h2 className="text-3xl text-cyan-600 font-bold my-2">Pet Tracker</h2>
                    <p className="my-6 font-bold text-xl" onClick={() => console.log(errors)}>Welcome!</p>
                </div>
                <div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-auto">
                    <FormErrorMessage errors={errors} />
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
                    <input type="hidden" {...register("birthdate")} />
                    <DatepickerInput value={date} onChange={(date) => setValue('birthdate', date as Date)}/>
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
                </form>
            </div>
            <CarrouselBanner />
        </div>
    );
}

export default RegisterPage;