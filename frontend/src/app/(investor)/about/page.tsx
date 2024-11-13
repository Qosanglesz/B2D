// src/app/(investor)/about/page.tsx
import About from '@/components/campaignComponents/About'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet our team of developers and professionals',
}

export default function AboutPage() {
  return <About />
}