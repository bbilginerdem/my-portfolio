// components/Navbar.tsx
"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";
import { Link } from "@/i18n/navigation";
import { links } from "@/lib/data";

type HeaderProps = {
	hasNewBlogContent?: boolean;
	recentPostCount?: number;
};

export default function Header({
	hasNewBlogContent = false,
	recentPostCount = 0,
}: HeaderProps) {
	const { activeSection, setActiveSection } = useActiveSectionContext();
	const t = useTranslations("Navigation");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="relative z-999">
			<motion.div
				className="fixed top-0 left-1/2 h-14 w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-black/3 shadow-lg backdrop-blur-sm sm:top-6 sm:h-13 sm:w-lg sm:rounded-full dark:border-black/40 dark:bg-gray-900 dark:bg-opacity-75"
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}
			/>

			{/* Mobile Icon */}
			<motion.div
				className="fixed top-0 left-1/2 flex h-14 w-full -translate-x-1/2 items-center justify-end px-4 sm:hidden"
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}
			>
				<button
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</motion.div>

			<nav className="fixed top-[0.15rem] left-1/2 hidden h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:flex sm:h-initial sm:py-0">
				<ul className="flex w-initial flex-nowrap items-center justify-center gap-5 font-medium text-[0.9rem] text-gray-500">
					{links.map((link) => (
						<li key={link.name}>
							<Link
								href={link.hash}
								onClick={() => {
									setActiveSection(link.name);
								}}
								className={clsx(
									"flex items-center justify-center rounded-full px-3 py-2 text-sm transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-200",
									{
										"text-gray-950 dark:text-gray-100":
											activeSection === link.name,
									},
									link.name === "Blog" &&
										"font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
								)}
							>
								{t(
									link.name as
										| "Home"
										| "Projects"
										| "Skills"
										| "Contact"
										| "Blog",
								)}

								{link.name === "Blog" && hasNewBlogContent && (
									<span
										className="ml-1.5 flex h-2 w-2 items-center justify-center"
										role="status"
										aria-label={
											recentPostCount > 0
												? `${recentPostCount} new blog post${recentPostCount > 1 ? "s" : ""} available`
												: "New content available"
										}
									>
										<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-purple-500 opacity-75" />
										<span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* Mobile Dropdown Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20, transition: { duration: 0.15 } }}
						className="fixed top-14 left-0 w-full rounded-b-2xl border-black/10 border-b bg-white/95 px-4 py-6 shadow-xl backdrop-blur-md sm:hidden dark:border-white/10 dark:bg-gray-900/95"
					>
						<ul className="flex flex-col items-center justify-center gap-6 font-medium text-[1.1rem] text-gray-500">
							{links.map((link) => (
								<li key={link.name}>
									<Link
										href={link.hash}
										onClick={() => {
											setActiveSection(link.name);
											setIsOpen(false);
										}}
										className={clsx(
											"flex w-full items-center justify-center px-4 py-2 transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-200",
											{
												"font-bold text-gray-950 dark:text-gray-100":
													activeSection === link.name,
											},
											link.name === "Blog" &&
												"font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
										)}
									>
										{t(
											link.name as
												| "Home"
												| "Projects"
												| "Skills"
												| "Contact"
												| "Blog",
										)}

										{link.name === "Blog" && hasNewBlogContent && (
											<span
												className="ml-2 flex h-2 w-2 items-center justify-center"
												role="status"
											>
												<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-purple-500 opacity-75" />
												<span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
											</span>
										)}
									</Link>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
