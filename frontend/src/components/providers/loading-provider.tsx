// components/providers/loading-provider.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RootLoading from '@/app/loading'

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Minimum loading time

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <>
      {isLoading && <RootLoading />}
      {children}
    </>
  )
}