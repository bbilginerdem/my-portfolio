import { useTranslations } from "next-intl";

function Footer() {
	const t = useTranslations("Footer");
	return (
		<footer className="mb-10 px-4 text-center text-gray-500">
			<small className="mb-2 block text-xs">{t("rights")}</small>
			<p className="text-xs">
				{t.rich("aboutStr", {
					b: (chunks) => <span className="font-semibold">{chunks}</span>,
				})}
			</p>
		</footer>
	);
}

export default Footer;
