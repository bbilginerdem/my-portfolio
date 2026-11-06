import rehypeShiki from "@shikijs/rehype";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostTags from "@/components/blog/PostTags";
import ShareButton from "@/components/blog/ShareButton";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { getPostBySlug } from "@/lib/blog";

type Props = Readonly<{
	params: Promise<{ slug: string; locale: string }>;
}>;

export async function generateMetadata({ params }: Props) {
	const { slug, locale } = await params;

	if (!routing.locales.includes(locale as Locale)) {
		return {
			title: "Post Not Found",
		};
	}

	const post = await getPostBySlug(slug, locale);

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
	const { slug, locale } = await params;

	if (!routing.locales.includes(locale as Locale)) {
		notFound();
	}

	const post = await getPostBySlug(slug, locale);
	const t = await getTranslations("Blog");

	if (!post) {
		notFound();
	}

	return (
		<main className="relative flex flex-col items-center px-4 py-20">
			<article className="glass-container relative mb-28 w-full max-w-5xl overflow-hidden rounded-3xl p-8 text-left shadow-2xl backdrop-blur-xl sm:p-14 dark:bg-black/20">
				<Link
					href="/blog"
					className="group mb-12 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
				>
					<span className="transition-transform group-hover:-translate-x-1">&larr;</span>{" "}
					{t("backToBlogs")}
				</Link>
				<header className="mb-12 text-pretty">
					<PostTags tags={post.metadata.tags} variant="header" maxVisible={5} />
					<h1 className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
						{post.metadata.title}
					</h1>
					<div className="flex items-center gap-4 border-y border-black/5 py-6 text-sm text-gray-500 dark:border-white/5">
						<div className="flex flex-col">
							<span className="mb-0.5 text-xs font-semibold tracking-tighter text-gray-400 uppercase dark:text-gray-500">
								{t("published")}
							</span>
							<time
								className="font-medium text-gray-900 dark:text-gray-200"
								dateTime={post.metadata.publishDate}
							>
								{new Date(post.metadata.publishDate).toLocaleDateString(
									locale === "tr" ? "tr-TR" : "en-US",
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
							<span className="mb-0.5 text-xs font-semibold tracking-tighter text-gray-400 uppercase dark:text-gray-500">
								{t("readTime")}
							</span>
							<span className="font-medium text-gray-900 dark:text-gray-200">
								{post.metadata.readingTime} {t("minRead")}
							</span>
						</div>
						<div className="ml-auto flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-blue-500 to-purple-500 text-[10px] font-bold text-white">
								BE
							</div>
							<span className="hidden font-semibold text-gray-900 sm:inline dark:text-gray-200">
								{post.metadata.author}
							</span>
						</div>
					</div>
				</header>

				<div className="prose prose-slate dark:prose-invert prose-lg prose-img:rounded-2xl prose-pre:bg-transparent prose-pre:p-0 prose-headings:font-bold prose-a:text-blue-600 prose-code:text-blue-600 prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-p:leading-relaxed prose-headings:tracking-tight prose-a:no-underline prose-img:shadow-xl prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline dark:prose-a:text-blue-400 dark:prose-code:text-blue-400 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white max-w-none">
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

				<div className="mt-20 flex items-center justify-between border-t border-black/5 pt-10 dark:border-white/5">
					<PostTags tags={post.metadata.tags} variant="footer" maxVisible={5} />
					<ShareButton title={post.metadata.title} />
				</div>
			</article>
		</main>
	);
}
