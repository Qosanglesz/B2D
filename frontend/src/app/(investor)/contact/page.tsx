// src/app/(investor)/contact/page.tsx
import Contact from '@/components/campaignComponents/Contact'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with B2DVenture team',
}

export default function ContactPage() {
  return <Contact />
}