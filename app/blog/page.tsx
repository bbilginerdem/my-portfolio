import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
	title: "Blog | Behzat Bilgin Erdem",
	description: "Insights and tutorials on frontend development.",
};

export default function BlogPage() {
	return (
		<main className="flex flex-col items-center px-4">
			<section className="mb-28 max-w-200 scroll-mt-28 text-center">
				<SectionHeader mb="mb8">My Blog</SectionHeader>
				<div className="mt-10 flex flex-wrap justify-center gap-10">
					{blogPosts.map((post) => (
						<div
							key={post.slug}
							className="group overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 sm:max-w-[20rem] dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
						>
							<Link href={`/blog/${post.slug}`} className="cursor-pointer">
								<div className="flex h-full flex-col px-5 pt-4 pb-7 sm:pt-10 sm:pr-2 sm:pl-10">
									<h3 className="font-semibold text-2xl">{post.title}</h3>
									<p className="mt-2 text-gray-700 leading-relaxed dark:text-white/70">
										{post.excerpt}
									</p>
									<ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
										{post.tags.map((tag) => (
											<li
												className="rounded-full bg-black/70 px-3 py-1 text-[0.7rem] text-white uppercase tracking-wider dark:text-white/70"
												key={tag}
											>
												{tag}
											</li>
										))}
									</ul>
								</div>
							</Link>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
