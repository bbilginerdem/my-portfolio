"use client";

import { motion } from "framer-motion";

import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

import SectionHeading from "../ui/SectionHeader";

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.05 * index,
		},
	}),
};

export default function Skills() {
	const { ref } = useSectionInView("Skills");

	return (
		<section
			id="skills"
			ref={ref}
			className="mb-28 max-w-212 scroll-mt-28 text-center sm:mb-40"
		>
			<SectionHeading mb="mb8">My skills</SectionHeading>
			<ul className="flex flex-wrap justify-center gap-2 text-gray-800 text-sm sm:text-base">
				{skillsData.map((skill, index) => (
					<motion.li
						variants={fadeInAnimationVariants}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						custom={index}
						key={skill}
						className="borderBlack rounded-xl bg-white px-5 py-3 dark:bg-white/10 dark:text-white/80"
					>
						{skill}
					</motion.li>
				))}
			</ul>
		</section>
	);
}
