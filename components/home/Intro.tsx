"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";
import { useSectionInView } from "@/lib/hooks";
import profilePic from "@/public/images/pp.jpg";
import MyButton from "../ui/MyButton";

function Intro() {
	const { ref } = useSectionInView("Home", 0.5);
	const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

	return (
		<section
			ref={ref}
			className="mb-28 max-w-200 scroll-mt-400 text-center sm:mb-0"
			id="home"
		>
			<div className="flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", duration: 0.2 }}
					className="relative"
				>
					<Image
						src={profilePic}
						alt="Profile Pictures"
						quality="95"
						priority={true}
						width={160}
						height={160}
						className="rounded-full border-[0.35rem] border-white object-contain shadow-xl"
					/>
					<motion.span
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 125,
							delay: 0.1,
							duration: 0.7,
						}}
						className="absolute right-0 bottom-0 text-4xl"
					>
						👋
					</motion.span>
				</motion.div>
			</div>

			<motion.h1
				className="mt-4 mb-10 px-4 font-medium text-2xl leading-normal! sm:text-4xl"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<span className="font-bold">Hello, I&apos;m Bilgin.</span> I&apos;m a{" "}
				<span className="font-bold">frontend developer</span> with{" "}
				<span className="font-bold">4 years</span> of experience. I enjoy
				building <span className="italic">sites & apps</span>. My focus is{" "}
				<span className="underline">React</span> (Next.js) and{" "}
				<span className="underline">React Native</span> (Expo).
			</motion.h1>

			<motion.div
				className="flex flex-col items-center justify-center gap-4 px-4 font-medium text-lg sm:flex-row"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<div>
					<a href="#contact">
						<MyButton
							className="group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
							onClick={() => {
								setActiveSection("Contact");
								setTimeOfLastClick(Date.now());
							}}
						>
							Contact me here{" "}
							<BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
						</MyButton>
					</a>
				</div>
				<div>
					<a
						className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 outline-none transition hover:scale-[1.15] hover:text-gray-950 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/80 active:dark:bg-white/20"
						href="https://www.linkedin.com/in/bbilginerdem/"
						target="_blank"
						aria-label="View my Linkedin profile"
						title="View my Linkedin profile"
						rel="noreferrer"
					>
						<BsLinkedin />
					</a>
				</div>
				<div>
					<a
						className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 outline-none transition hover:scale-[1.15] hover:text-gray-950 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/80 active:dark:bg-white/20"
						href="https://github.com/bbilginerdem"
						target="_blank"
						aria-label="View my GitHub profile"
						title="View my GitHub profile"
						rel="noreferrer"
					>
						<FaGithubSquare />
					</a>
				</div>
			</motion.div>
		</section>
	);
}

export default Intro;
