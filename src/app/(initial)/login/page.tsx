"use client";

import FormErrorMessage from "@/components/global/error-advertise";
import CarrouselBanner from "@/components/register/carrousel-banner";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/Authentication/useLogin";
import { useAuth } from "@/providers/UserProvider";
import {
	LoginFormSchema,
	LoginFormSchemaType,
} from "@/schemas/login/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
	const searchParams = useSearchParams();
	
	const router = useRouter();

	const { login } = useAuth();

	const {
		mutateAsync: doLogin,
		isPending: loginIsPending,
		error: loginError,
	} = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isLoading },
		reset,
	} = useForm<LoginFormSchemaType>({ resolver: zodResolver(LoginFormSchema) });

	const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
		try {
			const apiResponse = await doLogin(data);

			if (!apiResponse.success) {
				throw new Error(apiResponse.message);
			}

			toast.success(apiResponse.message + "!");

			const loggedUser = apiResponse.data.user;

			login(apiResponse.data);

			if(!loggedUser.has_address || !loggedUser.has_phone){
				router.push("/missing-data")
			}else{
				router.push("/dashboard");
			}
		} catch (errors: any) {
			if (axios.isAxiosError<ApiError>(errors)) {
				const errorMessage = errors.response?.data?.message || errors.message;
				toast.error(errorMessage);
			} else {
				toast.error(errors.message);
			}
		}
	};

	const [ notification, setNotification ] = useState<boolean>(false);

	useEffect(() => {
		const reason = searchParams.get('reason');

		if(reason === 'session-expired'){
			setNotification(true);
		}
	}, [])

	return (
		<div className="w-screen h-screen flex p-6 bg-neutral-100 dark:bg-neutral-900">
			<BackButton fallbackPath="/" isFixed={true} />
			<div className="h-full flex-1 flex flex-col items-center justify-center">
				<div className="flex flex-col items-center">
					<Image
						src={"/images/logo_2.png"}
						alt="logo"
						width={100}
						height={100}
					/>
					<h2 className="text-3xl text-cyan-600 font-bold my-2">Pet Tracker</h2>
					<p className="my-6 font-bold text-xl">Welcome back!</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-3 w-[450px]"
				>
					<FormErrorMessage errors={errors} />
					<div className="">
						<Label className="mb-2">Email</Label>
						<Input
							{...register("email")}
							type="email"
							id="email"
							placeholder="example@email.com"
							className="w-full"
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
					<p className="text-xs my-1">
						Forgot your password? No problems,{" "}
						<span
							onClick={() => toast.error("toast")}
							className="text-cyan-700 font-bold cursor-pointer hover:underline"
						>
							click here
						</span>
					</p>
					<Button type="submit" className="cursor-pointer">
						{isSubmitting ? <Spinner /> : "Enter"}
					</Button>
					<p className="text-xs text-center">
						Doesn't have an account?{" "}
						<span
							className="text-cyan-700 font-bold cursor-pointer hover:underline"
							onClick={() => router.push("/register")}
						>
							click here
						</span>
					</p>
				</form>
			</div>
			<CarrouselBanner />
		</div>
	);
};

export default LoginPage;
