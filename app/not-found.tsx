"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
	return (
		<main className="flex h-[60vh] flex-col items-center justify-center px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center"
			>
				<h1 className="font-bold text-9xl text-gray-200 dark:text-gray-800">
					404
				</h1>
				<div className="-mt-8">
					<h2 className="font-bold text-3xl">Page Not Found</h2>
					<p className="mt-4 text-gray-600 dark:text-gray-400">
						Sorry, we couldn't find the page you're looking for.
					</p>
					<Link
						href="/"
						className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white/10"
					>
						Go back home
					</Link>
				</div>
			</motion.div>
		</main>
	);
}
