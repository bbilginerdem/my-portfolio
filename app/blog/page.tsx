import clsx from "clsx";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
	title: "Blog | Behzat Bilgin Erdem",
	description: "Insights and tutorials on frontend development.",
};

export default async function BlogPage(props: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const searchParams = await props.searchParams;
	const tag =
		typeof searchParams?.tag === "string" ? searchParams.tag : undefined;

	const allPosts = await getAllPosts();
	const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;
	const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));

	return (
		<main className="flex flex-col items-center px-4 py-20 pb-40">
			<section className="w-full max-w-5xl scroll-mt-28">
				<div className="text-center">
					<SectionHeader mb="mb8">My Blog</SectionHeader>
					<p className="mt-4 text-gray-600 dark:text-gray-400">
						Sharing my thoughts on frontend development, mobile apps, and more.
					</p>
				</div>

				<div className="mt-10 flex flex-wrap justify-center gap-2">
					<Link
						href="/blog"
						className={clsx(
							"rounded-full px-4 py-2 font-semibold text-sm transition-colors",
							!tag
								? "bg-blue-600 text-white dark:bg-blue-500"
								: "bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10",
						)}
					>
						All
					</Link>
					{allTags.map((t) => (
						<Link
							key={t}
							href={`/blog?tag=${t}`}
							className={clsx(
								"rounded-full px-4 py-2 font-semibold text-sm transition-colors",
								tag === t
									? "bg-blue-600 text-white dark:bg-blue-500"
									: "bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10",
							)}
						>
							{t}
						</Link>
					))}
				</div>

				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-gray-50 transition-all hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
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
									{post.tags.slice(0, 3).map((tag) => (
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
					))}
				</div>
			</section>
		</main>
	);
}
