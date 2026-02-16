"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSectionInView } from "@/lib/hooks";
import type { BlogMetadata } from "@/lib/types";
import SectionHeader from "../ui/SectionHeader";

interface BlogsProps {
	posts: BlogMetadata[];
}

export default function Blogs({ posts }: Readonly<BlogsProps>) {
	const { ref } = useSectionInView("Blog", 0.5);

	return (
		<section
			ref={ref}
			id="blog"
			className="mb-28 max-w-5xl scroll-mt-28 text-center sm:mb-40"
		>
			<SectionHeader mb="mb8">Latest Blogs</SectionHeader>
			<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post, index) => (
					<motion.div
						key={post.slug}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1, duration: 0.5 }}
					>
						<Link
							href={`/blog/${post.slug}`}
							className="group block h-full overflow-hidden rounded-2xl border border-black/5 bg-gray-50 text-left transition-all hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
						>
							<div className="flex flex-1 flex-col p-6 sm:p-8">
								<div className="flex items-center gap-3 text-gray-500 text-xs dark:text-gray-400">
									<time dateTime={post.publishDate}>
										{new Date(post.publishDate).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</time>
									<span>&bull;</span>
									<span>{post.readingTime} min read</span>
								</div>
								<h3 className="mt-4 font-bold text-xl leading-tight transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
									{post.title}
								</h3>
								<p className="mt-3 line-clamp-3 text-gray-600 text-sm leading-relaxed dark:text-gray-400">
									{post.excerpt}
								</p>
								<div className="mt-auto flex flex-wrap gap-2 pt-6">
									{post.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className="rounded-full bg-black/5 px-2.5 py-1 font-medium text-[0.65rem] text-gray-600 uppercase tracking-wider dark:bg-white/5 dark:text-gray-400"
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
				transition={{ delay: 0.3 }}
				className="mt-12"
			>
				<Link
					href="/blog"
					className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 font-medium text-white transition-all hover:scale-105 hover:bg-gray-950 active:scale-95 dark:bg-white/10 dark:hover:bg-white/20"
				>
					View All Blogs
				</Link>
			</motion.div>
		</section>
	);
}
