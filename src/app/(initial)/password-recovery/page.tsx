import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const PasswordRecoveryPage = () => {
	return (
		<div className="w-screen h-screen flex p-6 bg-neutral-100 dark:bg-neutral-900 items-center justify-center flex-col">
			<BackButton isFixed={true} fallbackPath="/login" />
			<div className="flex flex-col items-center">
				<Image src={"/images/logo_2.png"} alt="logo" width={100} height={100} />
				<h2 className="text-3xl text-cyan-600 font-bold my-2">Pet Tracker</h2>
				<p className="my-6 font-bold text-xl">Password recovery</p>
				<p className="max-w-[450px] mb-6 text-center">
					We will send a password reset link to your email, please do not share
					it with anyone.
				</p>
			</div>
			<form className="flex flex-col gap-3 w-[450px]">
				<Input
					type="email"
					id="email"
					placeholder="example@email.com"
					className="w-full"
				/>
				<Button type="submit" className="cursor-pointer">
					Send recovery code
				</Button>
			</form>
		</div>
	);
};

export default PasswordRecoveryPage;
