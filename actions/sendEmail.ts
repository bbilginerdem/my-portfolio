import { Resend } from 'resend'
import { validateString, getErrorMessage } from '@/lib/utils'
import ContactFormEmail from '@/email/contactFormEmail'
import React from 'react'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail')
  const message = formData.get('message')

  console.log(senderEmail)

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email"
    }
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message"
    }
  }

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'bbilgin.erdem@gmail.com',
      subject: 'Hello World',
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string
      })
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error)
    }
  }
}
