import Header from "@/components/layout/Header";

import "./globals.css";

import { DM_Sans } from "next/font/google";
import type { Metadata } from "next/types";
import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import ActiveSectionContextProvider from "@/context/ActiveSectionContextProvider";
import ThemeContextProvider from "@/context/ThemeContext";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Behzat Bilgin Erdem | Frontend Developer",
	description:
		"Behzat Bilgin is a frontend developer based in Ankara, Turkey with +5 years of experience.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth!">
			<body
				className={`${dmSans.className} relative bg-gray-50 pt-28 text-gray-950 sm:pt-36 dark:bg-gray-900 dark:text-gray-50/90`}
			>
				<div className="absolute -top-24 right-44 -z-10 h-125 w-125 rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-275 dark:bg-[#946263]" />
				<div className="absolute -top-4 -left-140 -z-10 h-200 w-125 rounded-full bg-[#dbd7fb] blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20 dark:bg-[#676394]" />
				<ThemeContextProvider>
					<ActiveSectionContextProvider>
						<Header />
						{children}
						<Footer />
						<Toaster position="top-right" richColors closeButton />
					</ActiveSectionContextProvider>
					<ThemeSwitch />
				</ThemeContextProvider>
			</body>
		</html>
	);
}
