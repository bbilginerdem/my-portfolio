"use client"

import SectionHeading from './SectionHeader'
import { FaPaperPlane } from 'react-icons/fa'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'

export default function Contact() {
  const { ref } = useSectionInView('Contact')

  return (
    <motion.section ref={ref} id="contact" className="mb-20 sm:mb-28 w-[min(100% ,38rem)] text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
      <SectionHeading mb='mb8'>Contact Me</SectionHeading>

      <p className="text-gray-700">If you have any questions or would like to chat, please feel free to{" "}
        <a className="underline" href="mailto:bbilgin.erdem@gmail.com">
          reach out!
        </a>
      </p>

      <form className="mt-10 flex flex-col">
        <input className="h-14 px-4 rounded-lg borderBlack" type="email" placeholder="Your email" />
        <textarea className="h-52 my-3 rounded-lg borderBlack p-4" placeholder="Your message" />
        <button type="submit" className="group flex h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all items-center justify-center gap-2 focus:scale-110 hover:scale-110 active:scale-105 hover:bg-gray-950">Submit <FaPaperPlane className="text-sx opacity-80 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-y-0 group-active:translate-x-1" /></button>{" "}
      </form>
    </motion.section>
  )
}
