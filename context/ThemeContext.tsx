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

	useEffect(() => {
		const isValidTheme = (value: string | null): value is Theme => {
			return value === "light" || value === "dark";
		};
		const storedTheme = localStorage.getItem("theme");
		if (isValidTheme(storedTheme)) {
			setTheme(storedTheme);
			if (storedTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		} else if (globalThis.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			document.documentElement.classList.remove("dark");
		}

		const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e: MediaQueryListEvent) => {
			const systemTheme = e.matches ? "dark" : "light";
			if (!globalThis.localStorage.getItem("theme")) {
				setTheme(systemTheme);
				if (systemTheme === "dark") {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			}
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => {
			const newTheme = prev === "light" ? "dark" : "light";
			globalThis.localStorage.setItem("theme", newTheme);
			if (newTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			return newTheme;
		});
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
