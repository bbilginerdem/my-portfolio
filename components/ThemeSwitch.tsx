"use client";

import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className="fixed bottom-5 right-5 flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-black/40 border-opacity-20 bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.4rem] transition-all hover:scale-[1.15] active:scale-105 dark:border-white/40 dark:bg-gray-950"
			aria-label="To send a form to directly to me!"
			onClick={toggleTheme}
		>
			{theme === "light" ? <BsSun /> : <BsMoon />}
		</button>
	);
}
