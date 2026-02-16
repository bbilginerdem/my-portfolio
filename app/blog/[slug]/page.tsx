import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "@/lib/blog";

type Props = Readonly<{
	params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: `${post.metadata.title} | Behzat Bilgin Erdem`,
		description: post.metadata.seo?.metaDescription || post.metadata.excerpt,
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<main className="flex flex-col items-center px-4 py-20">
			<article className="glass-container mb-28 w-full max-w-3xl overflow-hidden rounded-3xl p-8 text-left shadow-2xl backdrop-blur-xl sm:p-14 dark:bg-black/20">
				<Link
					href="/blog"
					className="group mb-12 flex items-center gap-2 text-gray-500 text-sm transition-colors hover:text-gray-900 dark:hover:text-white"
				>
					<span className="transition-transform group-hover:-translate-x-1">
						&larr;
					</span>{" "}
					Back to all blogs
				</Link>
				<header className="mb-12 text-pretty">
					<div className="mb-6 flex flex-wrap items-center gap-3">
						{post.metadata.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-blue-500/10 px-3 py-1 font-bold text-[10px] text-blue-600 uppercase tracking-widest dark:text-blue-400"
							>
								{tag}
							</span>
						))}
					</div>
					<h1 className="mb-8 font-extrabold text-4xl text-gray-900 leading-[1.1] tracking-tight sm:text-6xl dark:text-white">
						{post.metadata.title}
					</h1>
					<div className="flex items-center gap-4 border-black/5 border-y py-6 text-gray-500 text-sm dark:border-white/5">
						<div className="flex flex-col">
							<span className="mb-0.5 font-semibold text-gray-400 text-xs uppercase tracking-tighter dark:text-gray-500">
								Published
							</span>
							<time
								className="font-medium text-gray-900 dark:text-gray-200"
								dateTime={post.metadata.publishDate}
							>
								{new Date(post.metadata.publishDate).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									},
								)}
							</time>
						</div>
						<div className="hidden h-8 w-px bg-black/10 sm:block dark:bg-white/10" />
						<div className="flex flex-col">
							<span className="mb-0.5 font-semibold text-gray-400 text-xs uppercase tracking-tighter dark:text-gray-500">
								Read Time
							</span>
							<span className="font-medium text-gray-900 dark:text-gray-200">
								{post.metadata.readingTime} min read
							</span>
						</div>
						<div className="ml-auto flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-blue-500 to-purple-500 font-bold text-[10px] text-white">
								BE
							</div>
							<span className="hidden font-semibold text-gray-900 sm:inline dark:text-gray-200">
								{post.metadata.author}
							</span>
						</div>
					</div>
				</header>

				<div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-img:rounded-2xl prose-pre:bg-transparent prose-pre:p-0 prose-headings:font-bold prose-a:text-blue-600 prose-code:text-blue-600 prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-p:leading-relaxed prose-headings:tracking-tight prose-a:no-underline prose-img:shadow-xl prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline dark:prose-a:text-blue-400 dark:prose-code:text-blue-400 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white">
					{/* @ts-ignore */}
					<MDXRemote
						source={post.content}
						options={{
							mdxOptions: {
								rehypePlugins: [[rehypeShiki, { theme: "github-dark-dimmed" }]],
							},
						}}
					/>
				</div>

				<div className="mt-20 flex items-center justify-between border-black/5 border-t pt-10 dark:border-white/5">
					<div className="flex gap-2">
						{post.metadata.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-black/5 px-4 py-2 font-semibold text-gray-500 text-xs transition-colors hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
							>
								#{tag}
							</span>
						))}
					</div>
					<button
						className="font-bold text-blue-600 text-sm hover:underline dark:text-blue-400"
						type="button"
					>
						Share Post
					</button>
				</div>
			</article>
		</main>
	);
}
