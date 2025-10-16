"use client"

import FormErrorMessage from "@/components/global/error-advertise";
import CarrouselBanner from "@/components/register/carrousel-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/Authentication/useLogin";
import { LoginFormSchema, LoginFormSchemaType } from "@/schemas/login/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {

    const router = useRouter();

    const {
        mutateAsync: login,
        isPending: loginIsPending,
        error: loginError,
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<LoginFormSchemaType>({ resolver: zodResolver(LoginFormSchema)});

    const onSubmit: SubmitHandler<LoginFormSchemaType> = async(data) => {
        try{
            const apiResponse = await login(data);

            toast.success(apiResponse.message+"!");
        }catch (error){
            console.log(error);
        }
    }

    return(
        <div className="w-screen h-screen flex p-6 bg-neutral-100 dark:bg-neutral-900">
            <div className="h-full flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <Image src={"/images/logo_2.png"} alt="logo" width={100} height={100} />
                    <h2 className="text-3xl text-cyan-600 font-bold my-2">Pet Tracker</h2>
                    <p className="my-6 font-bold text-xl">Welcome back!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-3 w-[450px]">
                    <FormErrorMessage errors={errors} />
                    <div className="">
                        <Label className="mb-2">Email</Label>
                        <Input 
                            {...register('email')}
                            type="email"
                            id="email"
                            placeholder="example@email.com" 
                            className="w-full" 
                        />
                    </div>
                    <div className="">
                        <Label className="mb-2">Password</Label>
                        <Input
                            {...register('password')}
                            type="password"
                            id="password"
                            placeholder="Password" 
                            className="w-full" 
                        />
                    </div>
                    <p className="text-xs my-1">Forgot your password? No problems, <span onClick={() => toast.error("toast")} className="text-cyan-700 font-bold cursor-pointer hover:underline">click here</span></p>
                    <Button type="submit" className="cursor-pointer">Enter</Button>
                    <p className="text-xs text-center">Doesn't have an account? <span className="text-cyan-700 font-bold cursor-pointer hover:underline" onClick={() => router.push("/register")}>click here</span></p>
                </form>
            </div>
            <CarrouselBanner />
        </div>
    );
}

export default LoginPage;