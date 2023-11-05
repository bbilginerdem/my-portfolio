import React from 'react'
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

type ContactFormEmailProps = {
  message: string
  senderEmail: string
}

const contactFormEmail = ({ message, senderEmail }: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from your website</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Heading>You received the following message from the contact form from Behzat Bilgin Erdem</Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>The sender's email is: {senderEmail}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default contactFormEmail