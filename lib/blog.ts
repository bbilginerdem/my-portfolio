import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { BlogMetadata } from "./types";

const BLOG_DIRECTORY = path.resolve(process.cwd(), "content/blog");

export async function getPostBySlug(slug: string, locale = "en") {
	try {
		const realSlug = slug.replace(/\.mdx$/, "");
		const filePath = path.resolve(BLOG_DIRECTORY, locale, `${realSlug}.mdx`);

		try {
			await fs.access(filePath);
		} catch {
			return null;
		}

		const fileContent = await fs.readFile(filePath, "utf-8");
		const { data, content } = matter(fileContent);

		return {
			metadata: {
				...data,
				slug: realSlug,
			} as BlogMetadata,
			content,
		};
	} catch {
		return null;
	}
}

export async function getAllPosts(locale = "en") {
	try {
		const localeDir = path.resolve(BLOG_DIRECTORY, locale);

		try {
			await fs.access(localeDir);
		} catch {
			return [];
		}

		const files = await fs.readdir(localeDir);
		const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

		const postsPromises = mdxFiles.map(async (file) => {
			const filePath = path.resolve(localeDir, file);
			const fileContent = await fs.readFile(filePath, "utf-8");
			const { data } = matter(fileContent);
			return {
				...data,
				slug: file.replace(/\.mdx$/, ""),
			} as BlogMetadata;
		});

		const posts = (await Promise.all(postsPromises))
			.filter((post) => post.publishDate)
			.sort((a, b) => {
				const dateA = new Date(a.publishDate).getTime();
				const dateB = new Date(b.publishDate).getTime();
				return dateB - dateA;
			});

		return posts;
	} catch {
		return [];
	}
}
