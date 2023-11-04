"use server"

import { Resend } from 'resend'
import { validateString } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY)

const getErrorMessage = (error: unknown) => {
  let message: string

  if (error instanceof Error) {
    return {
      error: error.message
    }
  } else if (error && typeof error === 'object' && 'message' in error) {
    return {
      error: error.message
    }
  }

  return message
}

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
      from: 'onboarding@resend.dev',
      to: 'bbilgin.erdem@gmail.com',
      subject: 'Hello World',
      reply_to: senderEmail as string,
      html: message as string
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error)
    }
  }
}
