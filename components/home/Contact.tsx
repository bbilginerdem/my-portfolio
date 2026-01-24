"use client";

import { sendEmail } from "@/actions/sendEmail";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useSectionInView } from "@/lib/hooks";

import SectionHeading from "../ui/SectionHeader";
import SubmitBtn from "../ui/SubmitBtn";

export default function Contact() {
	const { ref } = useSectionInView("Contact");

	return (
		<motion.section
			id="contact"
			ref={ref}
			className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
			initial={{
				opacity: 0,
			}}
			whileInView={{
				opacity: 1,
			}}
			transition={{
				duration: 1,
			}}
			viewport={{
				once: true,
			}}
		>
			<SectionHeading mb="mb8">Contact me</SectionHeading>

			<p className="-mt-6 text-gray-700 dark:text-white/80">
				You can contact me through this from or directly at{" "}
				<a className="underline" href="mailto:bbilgin.erdem@gmail.com">
					my e-mail
				</a>
				.
			</p>

			<form
				className="mt-10 flex flex-col gap-1 dark:text-black"
				action={async (formData) => {
					const { error } = await sendEmail(formData);

					if (error) {
						toast.error(error);
						return;
					}

					toast.success("Email sent successfully!");
				}}
			>
				<input
					className="borderBlack h-14 rounded-lg px-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
					name="senderEmail"
					type="email"
					required
					maxLength={500}
					placeholder="Your email"
				/>
				<textarea
					className="borderBlack my-3 h-52 rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
					name="message"
					placeholder="Your message"
					required
					maxLength={5000}
				/>
				<div className="mx-auto">
					<SubmitBtn />
				</div>
			</form>
		</motion.section>
	);
}
