import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";

import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
	const { ref, inView } = useInView({ threshold });
	const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

	useEffect(() => {
		if (inView && Date.now() - timeOfLastClick > 1000) {
			setActiveSection(sectionName);
		}
	}, [inView, setActiveSection, timeOfLastClick, sectionName]);

	return { ref };
}

export function useNavigationProgress(onStart: () => void, onComplete: () => void) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const onStartRef = useRef(onStart);
	const onCompleteRef = useRef(onComplete);

	// Consolidate route identifiers into a single key to detect navigation changes
	const routeKey = `${pathname}?${searchParams.toString()}`;

	useEffect(() => {
		onStartRef.current = onStart;
		onCompleteRef.current = onComplete;
	}, [onStart, onComplete]);

	useEffect(() => {
		if (routeKey !== undefined) {
			onCompleteRef.current();
		}
	}, [routeKey]);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest("a");
			if (!anchor?.href) return;

			const currentUrl = new URL(window.location.href);
			const targetUrl = new URL(anchor.href, window.location.origin);

			const isExternal =
				anchor.target === "_blank" ||
				anchor.rel?.includes("external") ||
				anchor.rel?.includes("noopener");

			const isDownload = anchor.hasAttribute("download");

			const isHashOnlyChange =
				currentUrl.pathname === targetUrl.pathname &&
				currentUrl.search === targetUrl.search &&
				targetUrl.hash !== "";

			const isSameUrl = window.location.href === anchor.href;

			if (
				targetUrl.origin === currentUrl.origin &&
				!isExternal &&
				!isDownload &&
				!isHashOnlyChange &&
				!isSameUrl &&
				!e.ctrlKey &&
				!e.metaKey &&
				!e.shiftKey &&
				!e.altKey &&
				!e.defaultPrevented
			) {
				onStartRef.current();
			}
		};

		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, []);
}
