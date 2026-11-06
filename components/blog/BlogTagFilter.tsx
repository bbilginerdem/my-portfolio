"use client";

import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

interface BlogTagFilterProps {
	tags: string[];
	selectedTag?: string;
	allLabel: string;
}

export default function BlogTagFilter({
	tags,
	selectedTag,
	allLabel,
}: Readonly<BlogTagFilterProps>) {
	const selectedIndex = selectedTag ? tags.indexOf(selectedTag) : -1;
	const isSelectedBeyondLimit = selectedIndex >= 5;
	const [isExpanded, setIsExpanded] = useState(isSelectedBeyondLimit);

	const visibleTags = tags.length <= 5 || isExpanded ? tags : tags.slice(0, 5);

	return (
		<div className="mt-10 flex flex-wrap justify-center gap-2">
			<Link
				href="/blog"
				className={clsx(
					"rounded-full px-4 py-2 text-sm font-semibold transition-colors",
					!selectedTag
						? "bg-blue-600 text-white dark:bg-blue-500"
						: "bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10",
				)}
			>
				{allLabel}
			</Link>
			{visibleTags.map((tagItem) => (
				<Link
					key={tagItem}
					href={`/blog?tag=${tagItem}`}
					className={clsx(
						"rounded-full px-4 py-2 text-sm font-semibold transition-colors",
						selectedTag === tagItem
							? "bg-blue-600 text-white dark:bg-blue-500"
							: "bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10",
					)}
				>
					{tagItem}
				</Link>
			))}
			{tags.length > 5 && (
				<button
					type="button"
					onClick={() => setIsExpanded((prev) => !prev)}
					aria-label={isExpanded ? "Collapse tags" : "Expand tags"}
					title={isExpanded ? "Collapse tags" : "Expand tags"}
					className="inline-flex cursor-pointer items-center justify-center rounded-full bg-black/5 px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
				>
					{isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
				</button>
			)}
		</div>
	);
}
