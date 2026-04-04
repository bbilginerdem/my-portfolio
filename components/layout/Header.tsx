// components/Navbar.tsx
"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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

	return (
		<header className="relative z-999">
			<motion.div
				className="fixed top-0 left-1/2 h-14 w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-black/3 shadow-lg backdrop-blur-sm sm:top-6 sm:h-13 sm:w-lg sm:rounded-full dark:border-black/40 dark:bg-gray-900 dark:bg-opacity-75"
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}
			/>
			<nav className="fixed top-[0.15rem] left-1/2 flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-initial sm:py-0">
				<ul className="flex w-full flex-wrap items-center justify-center gap-y-1 font-medium text-[0.9rem] text-gray-500 sm:w-initial sm:flex-nowrap sm:gap-5">
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
		</header>
	);
}
