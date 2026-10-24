"use client";

import { motion } from "motion/react";

export default function SectionDivider() {
	return (
		<motion.div
			className="dark:bg-opacity-20 my-24 hidden h-16 w-1 rounded-full bg-gray-200 sm:block"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.125 }}
		/>
	);
}
