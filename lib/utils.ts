import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const validateString = (value: unknown, maxLength: number) => {
	if (!value || typeof value !== "string" || value.length > maxLength) {
		return false;
	}

	return true;
};

export const getErrorMessage = (error: unknown) => {
	let message: string;

	if (error instanceof Error) {
		message = error.message;
	} else if (error && typeof error === "object" && "message" in error) {
		message = String(error.message);
	} else if (typeof error === "string") {
		message = error;
	} else {
		message = "Something went wrong";
	}

	return message;
};

/**
 * Checks if content is new (published within last 7 days)
 * @param dateString - ISO date string or Date object
 * @returns true if content is new, false otherwise
 */
export function isNewContent(dateString: string | Date): boolean {
	try {
		const date = new Date(dateString);

		// Check if date is valid
		if (Number.isNaN(date.getTime())) {
			return false;
		}

		const now = new Date();
		const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
		const timeDiff = now.getTime() - date.getTime();

		return timeDiff >= 0 && timeDiff <= sevenDaysInMs;
	} catch {
		return false;
	}
}
