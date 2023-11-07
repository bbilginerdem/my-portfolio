"use client"

import SectionHeading from './SectionHeader'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'
import { sendEmail } from "@/actions/sendEmail"
import SubmitBtn from './submitBtn'

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

      <form className="mt-10 flex flex-col" action={async (formData) => {
        await sendEmail(formData)
      }}>
        <input className="h-14 px-4 rounded-lg borderBlack" name="senderEmail" type="email" required maxLength={500} placeholder="Your email" />
        <textarea className="h-52 my-3 rounded-lg borderBlack p-4" name="message" required maxLength={500} placeholder="Your message" />
        <SubmitBtn />
      </form>
    </motion.section>
  )
}
