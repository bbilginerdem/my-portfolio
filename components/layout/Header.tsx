"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";
import { links } from "@/lib/data";

function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();

	return (
		<header className="relative z-999">
			<motion.div
				className="fixed top-0 left-1/2 h-14 w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-black/3 shadow-lg backdrop-blur-sm sm:top-6 sm:h-13 sm:w-lg sm:rounded-full dark:border-black/40 dark:bg-gray-900 dark:bg-opacity-75"
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}
			/>
			<nav className="fixed top-[0.15rem] left-1/2 flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-initial sm:py-0">
				<ul className="flex w-88 flex-wrap items-center justify-center gap-y-1 font-medium text-[0.9rem] text-gray-500 sm:w-initial sm:flex-nowrap sm:gap-5">
					{links.map((link) => (
						<React.Fragment key={link.hash}>
							{link.name === "Blog" && (
								<motion.div
									className="hidden h-5 w-1 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 opacity-50 sm:block dark:from-blue-400 dark:to-purple-400"
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
								/>
							)}
							<motion.li
								className="relative flex h-3/4 items-center justify-center"
								initial={{ y: -100, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
							>
								<Link
									className={clsx(
										"flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 hover:shadow-[0_20px_40px_-10px_rgba(100,20,400,0.2)] dark:text-gray-300 dark:hover:text-gray-200",
										{
											"text-gray-950 dark:text-gray-100":
												activeSection === link.name,
										},
										link.name === "Blog" &&
											"font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
									)}
									href={`/${link.hash}`}
									onClick={() => {
										setActiveSection(link.name);
										setTimeOfLastClick(Date.now());
									}}
								>
									{link.name}
									{link.name === activeSection && (
										<motion.span
											className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-700"
											layoutId="activeSection"
											transition={{
												type: "spring",
												stiffness: 360,
												damping: 40,
											}}
										/>
									)}
								</Link>
							</motion.li>
						</React.Fragment>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
