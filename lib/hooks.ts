import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";

import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
	const { ref, inView } = useInView({ threshold: threshold });
	const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

	useEffect(() => {
		if (inView && Date.now() - timeOfLastClick > 1000) {
			setActiveSection(sectionName);
		}
	}, [inView, setActiveSection, timeOfLastClick, sectionName]);

	return { ref };
}

export function useNavigationProgress(
	onStart: () => void,
	onComplete: () => void,
) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const onStartRef = useRef(onStart);
	const onCompleteRef = useRef(onComplete);

	useEffect(() => {
		onStartRef.current = onStart;
		onCompleteRef.current = onComplete;
	}, [onStart, onComplete]);

	useEffect(() => {
		onCompleteRef.current();

		if (process.env.NODE_ENV === "development") {
			console.log("[Navigation Complete]", pathname, searchParams?.toString());
		}
	}, [pathname, searchParams]);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest("a");
			if (!anchor || !anchor.href) return;

			const currentUrl = new URL(window.location.href);
			const targetUrl = new URL(anchor.href, window.location.origin);

			const isExternal =
				anchor.target === "_blank" ||
				anchor.rel?.includes("external") ||
				anchor.rel?.includes("noopener");

			const isDownload = anchor.hasAttribute("download");

			// Hash links shouldn't trigger loading unless it's a different page
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
				// Prevent triggering if cmd/ctrl/shift/alt is pressed (opening in new tab)
				!e.ctrlKey &&
				!e.metaKey &&
				!e.shiftKey &&
				!e.altKey &&
				// Do not trigger if the event's default is already prevented
				!e.defaultPrevented
			) {
				onStartRef.current();
			}
		};

		// Use capture phase to ensure we catch clicks before they might be prevented
		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, []);
}
