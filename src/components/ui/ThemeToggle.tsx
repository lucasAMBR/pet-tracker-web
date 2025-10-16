"use client";

import { useTheme } from "../../providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="fixed right-0 bottom-0 m-6 p-4 cursor-pointer rounded-md 
                bg-neutral-900 dark:bg-white hover:bg-neutral-700 dark:hover:bg-gray-300 transition-all duration-300"
			aria-label="Alternar tema"
		>
			{isDark ? (
				<Sun className="w-4 h-4 text-neutral-900" />
			) : (
				<Moon className="w-4 h-4 text-white" />
			)}
		</button>
	);
}
