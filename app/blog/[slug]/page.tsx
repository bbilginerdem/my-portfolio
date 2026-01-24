import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = Readonly<{
	params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: `${post.title} | Behzat Bilgin Erdem`,
		description: post.seo.metaDescription,
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	return (
		<main className="flex flex-col items-center px-4">
			<article className="mb-28 w-full max-w-200 scroll-mt-28 rounded-lg border border-black/5 bg-gray-50 p-8 text-left dark:bg-white/10">
				<Link
					href="/blog"
					className="mb-4 block text-gray-500 text-sm hover:underline"
				>
					&larr; Back to all blogs
				</Link>
				<header className="mb-10">
					<h1 className="mb-4 font-bold text-4xl">{post.title}</h1>
					<div className="flex gap-4 text-gray-600 text-sm dark:text-gray-400">
						<span>{new Date(post.publishDate).toLocaleDateString()}</span>
						<span>&bull;</span>
						<span>{post.readingTime} min read</span>
						<span>&bull;</span>
						<span>{post.author}</span>
					</div>
				</header>

				<div className="prose dark:prose-invert max-w-none">
					<p>{post.excerpt}</p>
					<p className="mt-8 text-lg">
						This is where the blog content would go. Currently, it's a
						placeholder to demonstrate the SSR and dynamic routing.
					</p>
					<div className="mt-12 rounded bg-gray-100 p-4 italic dark:bg-white/5">
						Stay tuned for more updates!
					</div>
				</div>

				<div className="mt-12 flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full bg-black/5 px-3 py-1 text-[0.8rem] dark:bg-white/10"
						>
							#{tag}
						</span>
					))}
				</div>
			</article>
		</main>
	);
}
