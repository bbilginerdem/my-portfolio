"use client"

import Image from "next/image"
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider"
import profilePic from "@/public/images/pp.jpg"
import { motion } from "framer-motion"
import { BsArrowRight, BsLinkedin } from "react-icons/bs"
import { FaGithubSquare } from "react-icons/fa"
import { HiDownload } from "react-icons/hi"

import { useSectionInView } from "@/lib/hooks"

function Intro() {
  const { ref } = useSectionInView("Home", 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

  return (
    <section
      ref={ref}
      className="mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0"
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
            className="absolute bottom-0 right-0 text-4xl"
          >
            👋
          </motion.span>
        </motion.div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Hello, I&apos;m Bilgin.</span> I&apos;m a{" "}
        <span className="font-bold">frontend developer</span> with{" "}
        <span className="font-bold">3 years</span> of experience. I enjoy
        building <span className="italic">sites & apps</span>. My focus is{" "}
        <span className="underline">React</span> (Next.js) and{" "}
        <span className="underline">React Native</span> (Expo).
      </motion.h1>

      <motion.div
        className="flex flex-col items-center justify-center gap-4 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <a
          href="#contact"
          className="group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
          onClick={() => {
            setActiveSection("Contact")
            setTimeOfLastClick(Date.now())
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
        </a>

        <a
          className="borderBlack group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10 active:dark:bg-white/20"
          href="/Behzat_Bilgin_Erdem_CV.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 transition group-hover:translate-y-1" />
        </a>

        <a
          className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 outline-none transition hover:scale-[1.15] hover:text-gray-950 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/80 active:dark:bg-white/20"
          href="https://www.linkedin.com/in/bbilginerdem/"
          target="_blank"
          aria-label="View my Linkedin profile"
          title="View my Linkedin profile"
        >
          <BsLinkedin />
        </a>

        <a
          className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 outline-none transition hover:scale-[1.15] hover:text-gray-950 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/80 active:dark:bg-white/20"
          href="https://github.com/bbilginerdem"
          target="_blank"
          aria-label="View my GitHub profile"
          title="View my GitHub profile"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  )
}

export default Intro
