"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { Link } from "@/i18n/navigation";

type PostTagVariant = "card" | "header" | "footer";

interface PostTagsProps {
	tags: string[];
	variant?: PostTagVariant;
	maxVisible?: number;
}

interface ExpandButtonProps {
	isExpanded: boolean;
	onToggle: () => void;
	variant: PostTagVariant;
}

function ExpandButton({ isExpanded, onToggle, variant }: Readonly<ExpandButtonProps>) {
	const isCard = variant === "card";
	const isFooter = variant === "footer";

	let containerClasses: string;
	if (isCard) {
		containerClasses =
			"bg-black/5 text-gray-600 hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 p-1";
	} else if (isFooter) {
		containerClasses =
			"bg-black/5 text-gray-500 hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 px-2.5 py-1.5";
	} else {
		containerClasses =
			"bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/20 p-1";
	}

	const iconClasses = isCard ? "h-3 w-3" : "h-3.5 w-3.5";

	const handleClick = (e: MouseEvent) => {
		if (isCard) {
			e.preventDefault();
			e.stopPropagation();
		}
		onToggle();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`inline-flex cursor-pointer items-center justify-center rounded-full transition-colors ${containerClasses}`}
			aria-label={isExpanded ? "Collapse tags" : "Expand tags"}
			title={isExpanded ? "Collapse tags" : "Expand tags"}
		>
			{isExpanded ? <ChevronUp className={iconClasses} /> : <ChevronDown className={iconClasses} />}
		</button>
	);
}

function TagLink({ tag, variant }: Readonly<{ tag: string; variant: PostTagVariant }>) {
	if (variant === "card") {
		return (
			<span className="rounded-full bg-black/5 px-2.5 py-1 text-[0.65rem] font-medium tracking-wider text-gray-600 uppercase dark:bg-white/5 dark:text-gray-400">
				{tag}
			</span>
		);
	}

	if (variant === "header") {
		return (
			<Link
				href={`/blog?tag=${tag}`}
				className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-600 uppercase transition-colors hover:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/20"
			>
				{tag}
			</Link>
		);
	}

	return (
		<Link
			href={`/blog?tag=${tag}`}
			className="rounded-full bg-black/5 px-4 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-black/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
		>
			#{tag}
		</Link>
	);
}

export default function PostTags({
	tags,
	variant = "card",
	maxVisible = 5,
}: Readonly<PostTagsProps>) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!tags || tags.length === 0) {
		return null;
	}

	const hasOverflow = tags.length > maxVisible;
	const visibleTags = hasOverflow && !isExpanded ? tags.slice(0, maxVisible) : tags;

	const containerClassesMap: Record<PostTagVariant, string> = {
		card: "mt-auto flex flex-wrap items-center gap-2 pt-6",
		header: "mb-6 flex flex-wrap items-center gap-3",
		footer: "flex flex-wrap items-center gap-2",
	};

	return (
		<div className={containerClassesMap[variant]}>
			{visibleTags.map((tag) => (
				<TagLink key={tag} tag={tag} variant={variant} />
			))}
			{hasOverflow && (
				<ExpandButton
					isExpanded={isExpanded}
					onToggle={() => setIsExpanded((prev) => !prev)}
					variant={variant}
				/>
			)}
		</div>
	);
}
