"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useNavigationProgress } from "@/lib/hooks";

const MIN_PROGRESS_WIDTH = 5; // Start small for a snappier feel
const COMPLETE_WIDTH = 100;

function ProgressBarInner() {
	const [progress, setProgress] = useState<number>(0);
	const [isComplete, setIsComplete] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleStart = useCallback(() => {
		setIsVisible(true);
		setProgress(MIN_PROGRESS_WIDTH);
		setIsComplete(false);
	}, []);

	const handleComplete = useCallback(() => {
		setProgress(COMPLETE_WIDTH);
		setIsComplete(true);

		// Smoothly fade out and reset
		setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				setProgress(0);
				setIsComplete(false);
			}, 300);
		}, 400);
	}, []);

	useNavigationProgress(handleStart, handleComplete);

	useEffect(() => {
		if (progress > 0 && progress < COMPLETE_WIDTH && !isComplete) {
			const timeout = setTimeout(() => {
				// Logarithmic easing: faster at start, slower as it nears the end
				setProgress((prev) => prev + (100 - prev) * 0.02);
			}, 100);
			return () => clearTimeout(timeout);
		}
	}, [progress, isComplete]);

	if (!isVisible) return null;

	return (
		<div
			role="progressbar"
			aria-valuenow={progress}
			aria-valuemin={0}
			aria-valuemax={100}
			className="fixed top-0 right-0 left-0 z-[9999] h-[2.5px] w-full"
			style={{
				opacity: isComplete ? 0 : 1,
				transition: "opacity 300ms ease-in-out",
			}}
		>
			{/* The Bar */}
			<div
				className={
					"h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-500 ease-out dark:from-indigo-400 dark:via-fuchsia-400 dark:to-rose-400"
				}
				style={{
					width: `${progress}%`,
				}}
			/>

			{/* Trailing Glow Effect */}
			<div
				className="absolute top-0 h-full w-[150px] opacity-100"
				style={{
					left: `${progress}%`,
					transform: "translateX(-100%)",
					background:
						"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
				}}
			/>
		</div>
	);
}

function ProgressBarFallback() {
	return null;
}

export default function NextProgressBar() {
	return (
		<Suspense fallback={<ProgressBarFallback />}>
			<ProgressBarInner />
		</Suspense>
	);
}
