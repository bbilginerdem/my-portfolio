"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import MyButton from "../ui/MyButton";

export default function ThemeSwitch() {
	const { theme, toggleTheme } = useTheme();

	return (
		<MyButton
			className="group fixed right-5 bottom-5 flex h-12 w-12 items-center justify-center rounded-full border border-black/40 border-opacity-20 bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.4rem] transition-all hover:scale-[1.15] active:scale-105 dark:border-white/40 dark:bg-gray-950"
			onClick={toggleTheme}
			type={"button"}
			aria-label="Toggle theme"
		>
			<SunMoon className="absolute group-hover:opacity-0" />
			<span className="absolute opacity-0 transition-opacity duration-500 group-hover:opacity-100">
				{theme === "light" ? <Sun /> : <Moon />}
			</span>
		</MyButton>
	);
}

// SunMoon
