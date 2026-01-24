"use client";

import SectionHeader from "../ui/SectionHeader";
import { blogPosts } from "@/lib/blog-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSectionInView } from "@/lib/hooks";

export default function Blogs() {
	const { ref } = useSectionInView("Blog", 0.5);

	return (
		<section
			ref={ref}
			id="blog"
			className="mb-28 max-w-200 scroll-mt-28 text-center sm:mb-40"
		>
			<SectionHeader mb="mb8">Latest Blogs</SectionHeader>
			<div className="mt-4 flex flex-wrap justify-center gap-8">
				{blogPosts.map((post, index) => (
					<motion.div
						key={post.slug}
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="group overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 sm:max-w-[18rem] dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
					>
						<Link href={`/blog/${post.slug}`} className="cursor-pointer">
							<div className="flex h-full flex-col px-5 pt-4 pb-7 text-left">
								<span className="mb-2 text-gray-500 text-xs uppercase tracking-wider dark:text-white/50">
									{new Date(post.publishDate).toLocaleDateString()}
								</span>
								<h3 className="mb-2 font-semibold text-xl transition-colors group-hover:text-pink-500">
									{post.title}
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed dark:text-white/70">
									{post.excerpt}
								</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{post.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className="rounded-full bg-black/70 px-2 py-1 text-[0.6rem] text-white uppercase tracking-wider"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</Link>
					</motion.div>
				))}
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				className="mt-10"
			>
				<Link
					href="/blog"
					className="group mx-auto flex w-fit items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 dark:bg-white/10"
				>
					View All Blogs
				</Link>
			</motion.div>
		</section>
	);
}
