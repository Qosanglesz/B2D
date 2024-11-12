'use client'

import { useEffect } from 'react'

export default function TestErrorPage() {
  useEffect(() => {
    throw new Error('This is a test error')
  }, [])

  return null
}
