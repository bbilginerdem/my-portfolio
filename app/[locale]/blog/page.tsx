import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import BlogTagFilter from "@/components/blog/BlogTagFilter";
import PostTags from "@/components/blog/PostTags";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

type Props = {
	params: Promise<{ locale: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props) {
	const { locale } = await props.params;
	const t = await getTranslations({ locale, namespace: "Blog" });
	return {
		title: `${t("title")} | Behzat Bilgin Erdem`,
		description: t("description"),
	};
}

export default async function BlogPage(props: Readonly<Props>) {
	const { locale } = await props.params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const t = await getTranslations("Blog");

	const searchParams = await props.searchParams;
	const tag = typeof searchParams?.tag === "string" ? searchParams.tag : undefined;

	const allPosts = await getAllPosts(locale);
	const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;
	const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));

	return (
		<main className="relative flex flex-col items-center px-4 py-20 pb-40">
			<section className="relative w-full max-w-5xl scroll-mt-28">
				<div className="text-center">
					<SectionHeader mb="mb8">{t("title")}</SectionHeader>
					<p className="mt-4 text-gray-600 dark:text-gray-400">{t("description")}</p>
				</div>

				<BlogTagFilter tags={allTags} selectedTag={tag} allLabel={t("all")} />

				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-gray-50 transition-all hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
						>
							<div className="flex flex-1 flex-col p-6 sm:p-8">
								<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
									<time dateTime={post.publishDate}>
										{new Date(post.publishDate).toLocaleDateString(
											locale === "tr" ? "tr-TR" : "en-US",
											{
												month: "short",
												day: "numeric",
												year: "numeric",
											},
										)}
									</time>
									<span>&bull;</span>
									<span>
										{post.readingTime} {t("minRead")}
									</span>
								</div>
								<h3 className="mt-4 text-xl leading-tight font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
									{post.title}
								</h3>
								<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
									{post.excerpt}
								</p>
								<PostTags tags={post.tags} variant="card" maxVisible={5} />
							</div>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
