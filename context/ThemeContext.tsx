"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
	children: React.ReactNode;
};

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
	children,
}: Readonly<ThemeContextProviderProps>) {
	const [theme, setTheme] = useState<Theme>("dark");

	// to not generate toggleTheme in every render
	const toggleTheme = useCallback(() => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		globalThis.localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark");
	}, [theme]);

	useEffect(() => {
		const localTheme = globalThis.localStorage.getItem("theme") as Theme | null;

		if (localTheme) {
			setTheme(localTheme);
			document.documentElement.classList.add(localTheme);
		} else if (globalThis.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	// The object passed as the value prop to the Context provider changes every render to prevent this added useMemo
	const value = useMemo(
		() => ({
			theme,
			toggleTheme,
		}),
		[theme, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (context === null) {
		throw new Error("useTheme must be used within a ThemeContextProvider");
	}

	return context;
}
