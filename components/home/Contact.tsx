"use client";

import { motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeader";

export default function Contact() {
	const { ref } = useSectionInView("Contact");
	const [copied, setCopied] = useState(false);
	const email = "bbilgin.erdem@gmail.com";

	const copyToClipboard = () => {
		globalThis.navigator.clipboard.writeText(email);
		setCopied(true);
		toast.success("Email copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			id="contact"
			ref={ref}
			className="mb-20 w-full max-w-152 text-center sm:mb-28"
		>
			<SectionHeading mb="mb8">Get in touch</SectionHeading>

			<motion.div
				className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-white/5"
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="p-8 sm:p-12">
					<p className="mb-10 text-gray-700 text-sm leading-relaxed sm:text-base dark:text-white/70">
						I&apos;m currently looking for new opportunities. Whether you have a
						question or just want to say hi, I&apos;ll try my best to get back
						to you!
					</p>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{/* Primary Action */}
						<a
							href={`mailto:${email}`}
							className="group flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-7 py-4 text-white transition hover:bg-gray-800 active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
						>
							<span className="font-semibold text-sm uppercase tracking-wide">
								Send Email
							</span>
							<Mail
								size={18}
								className="opacity-70 transition group-hover:translate-x-1"
							/>
						</a>

						{/* Copy Email */}
						<button
							onClick={copyToClipboard}
							type="button"
							className="group flex items-center justify-center gap-2 rounded-2xl border border-black/10 px-7 py-4 transition hover:bg-gray-50 active:scale-95 dark:border-white/10 dark:hover:bg-white/5"
						>
							{copied ? (
								<Check size={18} className="text-green-500" />
							) : (
								<Copy size={18} className="text-gray-500" />
							)}
							<span className="font-semibold text-gray-700 text-sm uppercase tracking-wide dark:text-white">
								Copy Address
							</span>
						</button>
					</div>
				</div>

				{/* Botton Info Bar */}
				<div className="bg-gray-50/50 px-8 py-4 dark:bg-white/5">
					<p className="text-[10px] text-gray-500 uppercase tracking-widest dark:text-white/30">
						Based in Ankara, Turkey &bull; Available Worldwide
					</p>
				</div>
			</motion.div>
		</section>
	);
}
