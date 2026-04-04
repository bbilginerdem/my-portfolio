"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import MyButton from "../ui/MyButton";

export default function LanguageSwitch() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const switchLocale = () => {
		const nextLocale = locale === "en" ? "tr" : "en";
		router.replace(pathname, { locale: nextLocale });
	};

	return (
		<MyButton
			className="fixed right-5 bottom-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/40 border-opacity-20 bg-white bg-opacity-80 font-bold text-sm uppercase tracking-wider shadow-2xl backdrop-blur-[0.4rem] transition-all hover:scale-[1.15] active:scale-105 dark:border-white/40 dark:bg-gray-950"
			onClick={switchLocale}
			type={"button"}
		>
			{locale}
		</MyButton>
	);
}
