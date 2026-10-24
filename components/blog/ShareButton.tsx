"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

type ShareButtonProps = {
	title?: string;
	onShareSuccess?: () => void;
	onShareError?: (error: Error) => void;
	messages?: {
		successShared?: string;
		successCopied?: string;
		errorFallback?: string;
	};
};

const isAbortError = (error: unknown): error is DOMException => {
	return error instanceof DOMException && error.name === "AbortError";
};

const showManualCopyDialog = (url: string, onDismiss: () => void) => {
	const dialog = document.createElement("div");
	dialog.setAttribute("role", "dialog");
	dialog.setAttribute("aria-modal", "true");
	dialog.setAttribute("aria-labelledby", "share-dialog-title");
	dialog.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
	dialog.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 id="share-dialog-title" class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Copy Link Manually
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Your browser does not support automatic sharing or copying. Please select and copy the link below:
      </p>
      <div class="relative mb-4">
        <code id="share-url-text" class="block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm break-all pr-16 text-gray-800 dark:text-gray-200">
          ${url}
        </code>
        <button
          id="manual-copy-btn"
          class="absolute right-2 top-2 py-1 px-2 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400"
          aria-label="Copy to clipboard"
        >
          Copy
        </button>
      </div>
      <button id="close-dialog-btn"
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
      >
        Understood
      </button>
    </div>
  `;

	const closeButton = dialog.querySelector("#close-dialog-btn");
	const copyButton = dialog.querySelector("#manual-copy-btn");
	const urlText = dialog.querySelector("#share-url-text");

	copyButton?.addEventListener("click", async () => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(url);
				toast.success("Link copied to clipboard.");
			} else if (urlText) {
				const range = document.createRange();
				range.selectNode(urlText);
				window.getSelection()?.removeAllRanges();
				window.getSelection()?.addRange(range);
			}
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.warn("Manual copy interaction failed:", error);
			}
		}
	});

	closeButton?.addEventListener("click", () => {
		dialog.remove();
		onDismiss();
	});

	dialog.addEventListener("click", (e) => {
		if (e.target === dialog) {
			dialog.remove();
			onDismiss();
		}
	});

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			dialog.remove();
			document.removeEventListener("keydown", handleEscape);
			onDismiss();
		}
	};
	document.addEventListener("keydown", handleEscape);

	document.body.appendChild(dialog);
	(closeButton as HTMLElement)?.focus();
};

export default function ShareButton({
	title,
	onShareSuccess,
	onShareError,
	messages,
}: Readonly<ShareButtonProps>) {
	const [isSharing, setIsSharing] = useState(false);

	const defaultMessages = {
		successShared: "Shared successfully.",
		successCopied: "Link copied to clipboard.",
		errorFallback: "Please copy the link manually.",
	};

	const msg = { ...defaultMessages, ...messages };

	const handleShare = useCallback(async () => {
		if (isSharing) return;
		setIsSharing(true);

		const url = window.location.href;
		const shareTitle = title || "Check out this post";

		try {
			if (navigator.share) {
				await navigator.share({ title: shareTitle, url });
				onShareSuccess?.();
				toast.success(msg.successShared);
				return;
			}
		} catch (error) {
			if (isAbortError(error)) {
				setIsSharing(false);
				return;
			}
			onShareError?.(error as Error);
		}

		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(url);
				toast.success(msg.successCopied);
				onShareSuccess?.();
				return;
			}

			showManualCopyDialog(url, () => {
				onShareError?.(new Error("User prompted to copy manually"));
			});
			toast.info(msg.errorFallback, { duration: 5000 });
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.warn("Clipboard API failed, executing manual fallback:", error);
			}

			showManualCopyDialog(url, () => {
				onShareError?.(new Error("User prompted to copy manually"));
			});
			toast.info(msg.errorFallback, { duration: 5000 });
		} finally {
			setIsSharing(false);
		}
	}, [
		isSharing,
		title,
		onShareSuccess,
		onShareError,
		msg.successShared,
		msg.successCopied,
		msg.errorFallback,
	]);

	const ariaLabel = title ? `Share post: ${title}` : "Share this post";

	return (
		<button
			type="button"
			onClick={handleShare}
			disabled={isSharing}
			aria-label={ariaLabel}
			aria-busy={isSharing}
			className="text-sm font-bold text-blue-600 transition hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:focus:ring-offset-gray-900"
		>
			<span className="sr-only" aria-live="polite">
				{isSharing ? "Sharing in progress" : ""}
			</span>

			<span aria-hidden="true">{isSharing ? "Sharing..." : "Share Post"}</span>
		</button>
	);
}
