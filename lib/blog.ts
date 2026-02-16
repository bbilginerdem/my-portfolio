import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogMetadata } from "./types";

const BLOG_DIRECTORY = path.resolve(process.cwd(), "content/blog");

export async function getPostBySlug(slug: string) {
	try {
		const realSlug = slug.replace(/\.mdx$/, "");
		const filePath = path.resolve(BLOG_DIRECTORY, `${realSlug}.mdx`);

		if (!fs.existsSync(filePath)) {
			console.warn(`File not found: ${filePath}`);
			return null;
		}

		const fileContent = fs.readFileSync(filePath, "utf-8");
		const { data, content } = matter(fileContent);

		return {
			metadata: {
				...data,
				slug: realSlug,
			} as BlogMetadata,
			content,
		};
	} catch (error) {
		console.error(`Error getting post by slug: ${slug}`, error);
		return null;
	}
}

export async function getAllPosts() {
	try {
		if (!fs.existsSync(BLOG_DIRECTORY)) {
			console.warn(`Blog directory not found: ${BLOG_DIRECTORY}`);
			return [];
		}

		const files = fs.readdirSync(BLOG_DIRECTORY);
		const posts = files
			.filter((file) => file.endsWith(".mdx"))
			.map((file) => {
				const filePath = path.resolve(BLOG_DIRECTORY, file);
				const fileContent = fs.readFileSync(filePath, "utf-8");
				const { data } = matter(fileContent);
				return {
					...data,
					slug: file.replace(/\.mdx$/, ""),
				} as BlogMetadata;
			})
			.filter((post) => post.publishDate) // Ensure date exists
			.sort((a, b) => {
				const dateA = new Date(a.publishDate).getTime();
				const dateB = new Date(b.publishDate).getTime();
				return dateB - dateA;
			});

		return posts;
	} catch (error) {
		console.error("Error getting all posts:", error);
		return [];
	}
}
