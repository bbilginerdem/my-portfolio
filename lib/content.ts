// lib/content.ts
import { getAllPosts } from "@/lib/blog";
import { isNewContent } from "@/lib/utils";

/**
 * Check if any blog posts were published within the last 7 days
 */
export async function hasRecentPosts(days = 7): Promise<boolean> {
	try {
		const posts = await getAllPosts();
		return posts.some((post) => isNewContent(post.publishDate));
	} catch {
		return false;
	}
}

/**
 * Get count of posts published within the last N days
 */
export async function getRecentPostCount(days = 7): Promise<number> {
	try {
		const posts = await getAllPosts();
		return posts.filter((post) => isNewContent(post.publishDate)).length;
	} catch {
		return 0;
	}
}

/**
 * Get both flag and count in one call (more efficient)
 */
export async function getRecentPostsInfo(days = 7): Promise<{
	hasRecent: boolean;
	count: number;
}> {
	try {
		const posts = await getAllPosts();
		const recentPosts = posts.filter((post) => isNewContent(post.publishDate));

		return {
			hasRecent: recentPosts.length > 0,
			count: recentPosts.length,
		};
	} catch {
		return {
			hasRecent: false,
			count: 0,
		};
	}
}
