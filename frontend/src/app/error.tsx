'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@nextui-org/react"

export default function Component({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [rotation, setRotation] = useState<number>(0)
  const [bgRotation, setBgRotation] = useState<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const middleX = window.innerWidth / 2
      const mouseXPercentage = (e.clientX - middleX) / middleX
      const newRotation = mouseXPercentage * 20
      const bgNewRotation = mouseXPercentage * 5
      setRotation(newRotation)
      setBgRotation(bgNewRotation)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-white text-black overflow-hidden">
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `rotate(${bgRotation}deg) scale(1.1)`
        }}
      >
        <Image 
          src="/images/errors/404-glitch.jpg"
          alt="404 Error Glitch Effect"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex-1" /> {/* This pushes the content down */}
        
        <div className="relative text-center mb-8"> {/* Added margin-bottom for spacing */}
          <div className="relative mx-auto h-0.5 w-32 overflow-hidden mb-8"> {/* Moved this above the buttons */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-slide" />
          </div>
          
          <div className="flex gap-6 justify-center p-6 rounded-lg bg-black/40 backdrop-blur-md">
            <Button
              onClick={reset}
              color="default"
              variant="bordered"
              radius="none"
              size="lg"
              className="text-sm font-medium text-white border-white hover:bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-300"
            >
              Try Again
            </Button>
            <Button
              as={Link}
              href="/"
              color="default"
              variant="bordered"
              radius="none"
              size="lg"
              className="text-sm font-medium text-white border-white hover:bg-white/20 backdrop-blur-sm shadow-lg transition-all duration-300"
            >
              GO BACK
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}