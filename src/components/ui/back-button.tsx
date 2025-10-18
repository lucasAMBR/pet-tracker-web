// components/BackButton.tsx (Versão Final e Simplificada)
"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
	fallbackPath?: string;
	isFixed?: boolean;
};

const BackButton = ({
	fallbackPath = "/",
	isFixed = false,
}: BackButtonProps) => {
	const router = useRouter();

	const handleBack = () => {

		if (window.history.length > 2) {
			router.back();
		} else {
			router.replace(fallbackPath);
		}
	};

	return (
		<div
			className={`rounded-md flex items-center justify-center
                bg-cyan-950 hover:bg-cyan-900 text-white 
                dark:bg-cyan-700 dark:hover:bg-cyan-600
                ${isFixed ? "fixed top-0 left-0 m-6" : ""} p-2 cursor-pointer`}
			onClick={handleBack}
		>
			<ChevronLeft />
		</div>
	);
};

export default BackButton;
