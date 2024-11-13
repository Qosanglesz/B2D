// app/loading.tsx
'use client'

import { motion } from "framer-motion"
import { Card } from "@nextui-org/react"

const RootLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 z-[9999]">
      <div className="relative flex flex-col items-center justify-center gap-8 w-full max-h-screen py-8">
        {/* Video Container */}
        <div className="w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-full"
          >
            <source src="/videos/loading.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Loading Text and Spinner */}
        <Card className="bg-background/40 backdrop-blur-sm w-full max-w-md mx-auto">
          <div className="flex flex-col items-center gap-4 p-6">
            {/* Animated Loading Text */}
            <motion.div
              className="flex items-center justify-center gap-1 text-3xl font-bold text-default-900 dark:text-default-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span>Loading</span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={`dot-${i}`}
                  className="inline-block"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  .
                </motion.span>
              ))}
            </motion.div>

            {/* Loading Message */}
            <motion.p
              className="text-default-700 dark:text-default-300 text-center text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Preparing your global experience...
            </motion.p>

            {/* Progress Bar */}
            <motion.div 
              className="w-full h-2 bg-default-200 dark:bg-default-700 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-primary"
                animate={{
                  width: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </Card>
      </div>

      {/* Optional: Add a subtle gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  )
}

export default RootLoading