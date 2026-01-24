"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import MyButton from "../ui/MyButton";

export default function ThemeSwitch() {
	const { theme, toggleTheme } = useTheme();

	return (
		<MyButton
			className="fixed right-5 bottom-5 flex h-12 w-12 items-center justify-center rounded-full border border-black/40 border-opacity-20 bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.4rem] transition-all hover:scale-[1.15] active:scale-105 dark:border-white/40 dark:bg-gray-950"
			ariaLabel="To send a form to directly to me!"
			onClick={toggleTheme}
			type={"button"}
		>
			{theme === "light" ? <Sun /> : <Moon />}
		</MyButton>
	);
}
