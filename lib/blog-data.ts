import type { BlogMetadata } from "./types";

export const blogPosts: BlogMetadata[] = [
	{
		id: 1,
		title: "Starting my Portfolio with Next.js 16",
		slug: "starting-portfolio-nextjs-16",
		publishDate: "2026-01-24T10:00:00Z",
		author: "Behzat Bilgin Erdem",
		excerpt:
			"How I built this portfolio using the latest Next.js 16 features and React 19.",
		readingTime: 5,
		tags: ["Next.js", "React", "Portfolio"],
		category: "Development",
		seo: {
			metaDescription: "A guide on starting a portfolio with Next.js 16.",
			keywords: ["Next.js 16", "React 19", "Portfolio"],
		},
	},
	{
		id: 2,
		title: "Mastering Tailwind CSS v4",
		slug: "mastering-tailwind-v4",
		publishDate: "2026-01-20T12:00:00Z",
		author: "Behzat Bilgin Erdem",
		excerpt: "Tips and tricks for the new Tailwind CSS v4 engine.",
		readingTime: 3,
		tags: ["Tailwind CSS", "CSS", "Frontend"],
		category: "Design",
		seo: {
			metaDescription: "Master the new features of Tailwind CSS v4.",
			keywords: ["Tailwind CSS v4", "CSS", "Frontend"],
		},
	},
];
