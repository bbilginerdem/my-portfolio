'use client';

import SectionHeading from './SectionHeader';
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './SubmitBtn';

export default function Contact() {
  const { ref } = useSectionInView('Contact');

  return (
    <motion.section
      ref={ref}
      id='contact'
      className='w-[min(100% ,38rem)] mb-20 text-center sm:mb-28'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SectionHeading mb='mb8'>Contact Me</SectionHeading>

      <p className='text-gray-700'>
        If you have any questions or would like to chat, please feel free to{' '}
        <a className='underline' href='mailto:bbilgin.erdem@gmail.com'>
          reach out!
        </a>
      </p>

      <form
        className='mt-10 flex flex-col'
        action={async (formData) => {
          await sendEmail(formData);
        }}
      >
        <input
          className='borderBlack h-14 rounded-lg px-4'
          name='senderEmail'
          type='email'
          required
          maxLength={500}
          placeholder='Your email'
        />
        <textarea
          className='borderBlack my-3 h-52 rounded-lg p-4'
          name='message'
          required
          maxLength={500}
          placeholder='Your message'
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
