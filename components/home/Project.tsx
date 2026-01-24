"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import type { projectsData } from "@/lib/data";

type ProjectProps = (typeof projectsData)[number];

function Project({ title, description, tags, imageUrl, link }: ProjectProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		// ! second element of the array changed from 1.33 1 to 1 1. Check later.
		offset: ["0 1", "1 1"],
	});

	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

	return (
		<motion.div
			ref={ref}
			style={{ scale: scaleProgress, opacity: opacityProgress }}
			className="group mb-3 last:mb-0 sm:mb-8"
		>
			<a
				href={link}
				target="_blank"
				aria-label="View my GitHub profile"
				title="View my GitHub profile"
				rel="noreferrer"
			>
				<section className="relative max-w-2xl overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 sm:h-80 sm:pr-8 sm:group-even:pl-8 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
					<div className="flex h-full flex-col px-5 py-4 pb-7 sm:max-w-[50%] sm:pt-10 sm:pr-2 sm:pl-10 sm:group-even:ml-72">
						<h3>{title}</h3>
						<p className="mt-2 text-gray-800 leading-relaxed dark:text-white/90">
							{description}
						</p>
						<ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
							{tags.map((tag) => (
								<li
									className="rounded-full bg-black/80 px-3 py-1 text-[0.7rem] text-white uppercase tracking-wider dark:text-white/80"
									key={tag}
								>
									{tag}
								</li>
							))}
						</ul>
					</div>
					<Image
						src={imageUrl}
						alt={title}
						quality={95}
						className="absolute top-8 -right-40 hidden w-113 rounded-t-lg shadow-2xl transition group-even:right-[initial] group-even:-left-40 group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 sm:block"
					/>
				</section>
			</a>
		</motion.div>
	);
}

export default Project;
