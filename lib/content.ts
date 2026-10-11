import { getAllPosts } from "@/lib/blog";
import { isNewContent } from "@/lib/utils";

export async function hasRecentPosts(): Promise<boolean> {
	try {
		const posts = await getAllPosts();
		return posts.some((post) => isNewContent(post.publishDate));
	} catch {
		return false;
	}
}

export async function getRecentPostCount(): Promise<number> {
	try {
		const posts = await getAllPosts();
		return posts.filter((post) => isNewContent(post.publishDate)).length;
	} catch {
		return 0;
	}
}

export async function getRecentPostsInfo(): Promise<{
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
