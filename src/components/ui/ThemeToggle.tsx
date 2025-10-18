"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { setTheme } = useTheme()

	return (
		<div
			className="fixed right-0 bottom-0 m-6 cursor-pointer rounded-md bg-cyan-950 dark:bg-cyan-700 text-white"
			aria-label="Alternar tema"
		>
			<div className="hidden dark:flex w-full h-full p-4" onClick={() => setTheme('light')}>
				<Sun />
			</div>
			<div className="flex dark:hidden w-full h-full p-4" onClick={() => setTheme('dark')}>
				<Moon />
			</div>
		</div>
	);
}
