"use client";

import { motion } from "framer-motion";

export default function Loading() {
	return (
		<div className="fixed inset-0 z-1000 flex items-center justify-center bg-white/40 backdrop-blur-sm dark:bg-gray-950/40">
			<div className="relative h-24 w-24">
				<motion.div
					className="absolute inset-0 rounded-full border-4 border-pink-500/10"
					animate={{
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute inset-0 rounded-full border-pink-500 border-t-4 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
					animate={{ rotate: 360 }}
					transition={{
						duration: 1.5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute inset-4 rounded-full border-indigo-500 border-b-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
					animate={{ rotate: -360 }}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			</div>
		</div>
	);
}
