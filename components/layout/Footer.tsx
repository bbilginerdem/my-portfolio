import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const formatSemibold = (chunks: ReactNode) => <span className="font-semibold">{chunks}</span>;

function Footer() {
	const t = useTranslations("Footer");
	return (
		<footer className="mb-10 px-4 text-center text-gray-500">
			<small className="mb-2 block text-xs">{t("rights")}</small>
			<p className="text-xs">
				{t.rich("aboutStr", {
					b: formatSemibold,
				})}
			</p>
		</footer>
	);
}

export default Footer;
