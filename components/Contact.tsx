'use client';

import SectionHeading from './SectionHeader';
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from '@/components/SubmitBtn';
import toast from 'react-hot-toast';

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

      <p className='-mt-6 text-gray-700 dark:text-white/80'>
        If you have any questions or would like to chat, please feel free to{' '}
        <a className='underline' href='mailto:bbilgin.erdem@gmail.com'>
          reach out!
        </a>
      </p>

      <form
        className='mt-10 flex flex-col dark:text-black'
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success('Email sent successfully!');
        }}
      >
        <input
          className='borderBlack h-14 rounded-lg px-4 transition-all dark:bg-white dark:bg-opacity-90 dark:outline-none dark:focus:bg-opacity-100'
          name='senderEmail'
          type='email'
          required
          maxLength={500}
          placeholder='Your email'
        />
        <textarea
          className='borderBlack my-3 h-52 rounded-lg p-4 text-black transition-all dark:bg-white dark:bg-opacity-90 dark:outline-none dark:focus:bg-opacity-100'
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
