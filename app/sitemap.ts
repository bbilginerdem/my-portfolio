import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://behzatbilgin.com"; // Replace with actual domain

	const blogPosts = await getAllPosts();
	const posts = blogPosts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.publishDate),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...posts,
	];
}
