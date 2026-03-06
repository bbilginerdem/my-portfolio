"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ShareButton({ title }: { title?: string }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleShare = async () => {
		const url = window.location.href;

		if (navigator.share) {
			try {
				await navigator.share({
					title: title || "Check out this post",
					url: url,
				});
				return;
			} catch (error) {
				// Fallback if sharing is canceled or fails
				if ((error as Error).name !== "AbortError") {
					console.error("Error sharing:", error);
				}
			}
		}

		try {
			await navigator.clipboard.writeText(url);
			toast.success("Link copied to clipboard!");
		} catch (error) {
			console.error("Error copying to clipboard:", error);
			toast.error("Failed to copy link");
		}
	};

	if (!mounted) {
		return (
			<button
				className="font-bold text-blue-600 text-sm hover:underline dark:text-blue-400"
				type="button"
			>
				Share Post
			</button>
		);
	}

	return (
		<button
			className="font-bold text-blue-600 text-sm hover:underline dark:text-blue-400"
			type="button"
			onClick={handleShare}
		>
			Share Post
		</button>
	);
}
