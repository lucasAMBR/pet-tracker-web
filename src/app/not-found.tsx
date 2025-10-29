"use client";

import FuzzyText from "@/components/NotFound/FuzzyText";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center">
			<div className="dark:flex hidden">
				<FuzzyText
					baseIntensity={0.2}
					hoverIntensity={0.4}
					enableHover={true}
					color={"#FFF"}
				>
					404
				</FuzzyText>
			</div>
			<div className="flex dark:hidden">
				<FuzzyText
					baseIntensity={0.2}
					hoverIntensity={0.4}
					enableHover={true}
					color={"#000"}
				>
					404
				</FuzzyText>
			</div>
			<p className="text-4xl font-bold my-12 text-center">
				It looks like the page you are <br /> looking for does not exist.
			</p>
			<Button
				className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-300 text-white dark:text-black cursor-pointer"
				size={"lg"}
				onClick={() => router.push("/")}
			>
				Back to home
			</Button>
		</div>
	);
};

export default NotFoundPage;
