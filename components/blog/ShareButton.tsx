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
		errorFailed?: string;
		errorFallback?: string;
	};
};

const isAbortError = (error: unknown): error is DOMException => {
	return error instanceof DOMException && error.name === "AbortError";
};

const isSecureContext = (): boolean => {
	return window.isSecureContext || location.protocol === "https:";
};

const fallbackCopyToClipboard = (text: string): boolean => {
	try {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.style.position = "fixed";
		textarea.style.left = "-9999px";
		textarea.style.top = "0";
		textarea.setAttribute("aria-hidden", "true");
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();

		const success = document.execCommand("copy");
		document.body.removeChild(textarea);
		return success;
	} catch {
		return false;
	}
};

const showManualCopyDialog = (url: string, onDismiss: () => void) => {
	const dialog = document.createElement("div");
	dialog.setAttribute("role", "dialog");
	dialog.setAttribute("aria-modal", "true");
	dialog.setAttribute("aria-labelledby", "share-dialog-title");
	dialog.className =
		"fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
	dialog.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 id="share-dialog-title" class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Copy Link Manually
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Your browser doesn't support automatic sharing. Please copy the link below:
      </p>
      <div class="relative mb-4">
        <code class="block w-full p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm break-all pr-10 text-gray-800 dark:text-gray-200">
          ${url}
        </code>
        <button
          onclick="navigator.clipboard.writeText('${url.replace(/'/g, "\\'")}')"
          class="absolute right-2 top-2 p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
          aria-label="Copy to clipboard"
        >
          📋
        </button>
      </div>
      <button
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
      >
        Got it
      </button>
    </div>
  `;

	const closeButton = dialog.querySelector("button:last-child");
	closeButton?.addEventListener("click", () => {
		document.body.removeChild(dialog);
		onDismiss();
	});

	dialog.addEventListener("click", (e) => {
		if (e.target === dialog) {
			document.body.removeChild(dialog);
			onDismiss();
		}
	});

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			document.body.removeChild(dialog);
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
}: ShareButtonProps) {
	const [isSharing, setIsSharing] = useState(false);

	const defaultMessages = {
		successShared: "Shared successfully!",
		successCopied: "Link copied to clipboard!",
		errorFailed: "Failed to copy link",
		errorFallback: "Please copy the link manually",
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
			// User canceled share dialog - no fallback needed
			if (isAbortError(error)) {
				setIsSharing(false);
				return;
			}
			console.error("Share API error:", {
				name: (error as Error).name,
				message: (error as Error).message,
			});
			onShareError?.(error as Error);
		}

		try {
			if (navigator.clipboard && isSecureContext()) {
				await navigator.clipboard.writeText(url);
				toast.success(msg.successCopied);
				onShareSuccess?.();
				return;
			}

			if (fallbackCopyToClipboard(url)) {
				toast.success(msg.successCopied);
				onShareSuccess?.();
				return;
			}

			showManualCopyDialog(url, () => {
				onShareError?.(new Error("User prompted to copy manually"));
			});
			toast.info(msg.errorFallback, { duration: 5000 });
		} catch (error) {
			console.error("Clipboard fallback error:", error);
			toast.error(msg.errorFailed);
			onShareError?.(error as Error);
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
		msg.errorFailed,
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
			className="font-bold text-blue-600 text-sm transition hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:focus:ring-offset-gray-900"
		>
			<span className="sr-only" aria-live="polite">
				{isSharing ? "Sharing in progress" : ""}
			</span>

			<span aria-hidden="true">{isSharing ? "Sharing..." : "Share Post"}</span>
		</button>
	);
}
