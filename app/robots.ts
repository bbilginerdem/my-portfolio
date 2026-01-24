import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://behzatbilgin.com"; // Replace with actual domain if known

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/private/",
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
