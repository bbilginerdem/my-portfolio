import type React from "react";
import type { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type BlogMetadata = {
	id?: number;
	title: string;
	slug: string;
	publishDate: string;
	author: string;
	excerpt: string;
	readingTime: number;
	tags: string[];
	category: string;
	image?: string;
	imageAlt?: string;
	seo?: {
		metaDescription?: string;
		keywords?: string[];
		canonicalUrl?: string;
	};
	lastModified?: string;
	Content?: React.ComponentType;
};
