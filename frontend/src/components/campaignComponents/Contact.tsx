// app/components/Contact.tsx
'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Copy, PhoneCall } from "lucide-react" 
import { FaGithub } from 'react-icons/fa' // Using react-icons for GitHub
import { Button, Tooltip } from "@nextui-org/react"

interface ContactProps {
  content2?: string
  email1?: string
  address1?: string
  content3?: string
  content1?: string
  content4?: string
  heading1?: string
  content5?: string
  phone1?: string
  githubUrl?: string
  githubContent?: string
}

const Contact: React.FC<ContactProps> = ({
  content2 = 'Get in touch with us today!',
  email1 = 'b2dventure@gmail.com',
  address1 = 'Kasetsart University, 50 Ngam Wong Wan Rd, Lat Yao, Chatuchak, Bangkok 10900',
  content3 = 'Feel free to reach out to us via email.',
  content1 = 'We\'re here to help and answer any question you might have.',
  content4 = 'Call us for immediate assistance.',
  heading1 = 'Contact us',
  content5 = 'Visit us at our office.',
  phone1 = '+66-123-456-7890',
  githubUrl = 'https://github.com/Qosanglesz/B2D',
  githubContent = 'Check out our project repository and contribute to our open-source development.',
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleEmailClick = () => {
    window.location.href = `mailto:${email1}`
  }

  const handleMapClick = () => {
    window.open('https://maps.google.com/?q=Kasetsart+University+Bangkok', '_blank')
  }

  const handlePhoneClick = () => {
    if (isMobile) {
      window.location.href = `tel:${phone1}`
    } else {
      navigator.clipboard.writeText(phone1)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleGithubClick = () => {
    window.open(githubUrl, '_blank')
  }

  return (
    <section className="py-16 px-4 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Section Title */}
        <div className="max-w-2xl w-full flex flex-col items-center gap-4">
          <span className="text-sm text-foreground/70">{content2}</span>
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-foreground">{heading1}</h2>
            <p className="text-lg text-center text-foreground/80">{content1}</p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Email Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-semibold text-foreground">Email</h3>
                <p className="text-center text-foreground/70">{content3}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-primary">{email1}</span>
                <Button
                  color="primary"
                  variant="ghost"
                  size="sm"
                  onClick={handleEmailClick}
                  startContent={<Mail className="w-4 h-4" />}
                >
                  Send Email
                </Button>
              </div>
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-semibold text-foreground">Phone</h3>
                <p className="text-center text-foreground/70">{content4}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-primary">{phone1}</span>
                <Tooltip
                  content={copied ? "Copied!" : isMobile ? "Call Now" : "Copy to Clipboard"}
                  placement="bottom"
                >
                  <Button
                    color="primary"
                    variant="ghost"
                    size="sm"
                    onClick={handlePhoneClick}
                    startContent={
                      isMobile ? 
                        <PhoneCall className="w-4 h-4" /> : 
                        <Copy className="w-4 h-4" />
                    }
                  >
                    {isMobile ? "Call Now" : "Copy Number"}
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Office Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-semibold text-foreground">Office</h3>
                <p className="text-center text-foreground/70">{content5}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-primary text-center">{address1}</span>
                <Button
                  color="primary"
                  variant="ghost"
                  size="sm"
                  onClick={handleMapClick}
                  startContent={<MapPin className="w-4 h-4" />}
                >
                  View on Map
                </Button>
              </div>
            </div>
          </div>

          {/* GitHub Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
              <FaGithub className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-semibold text-foreground">GitHub</h3>
                <p className="text-center text-foreground/70">{githubContent}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-primary text-center">B2D Repository</span>
                <Button
                  color="primary"
                  variant="ghost"
                  size="sm"
                  onClick={handleGithubClick}
                  startContent={<FaGithub className="w-4 h-4" />}
                >
                  View Repository
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional GitHub Stats Section */}
        <div className="w-full mt-12 flex flex-col items-center gap-8">
          <div className="w-full max-w-3xl bg-default-100 rounded-lg p-6">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-semibold text-foreground">Project Repository</h3>
              <p className="text-center text-foreground/70">
                B2D is an open-source project focused on creating a comprehensive investment platform.
                We welcome contributions from the community!
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onClick={handleGithubClick}
                  startContent={<FaGithub className="w-4 h-4" />}
                >
                  Star on GitHub
                </Button>
                <Button
                  color="primary"
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`${githubUrl}/issues`, '_blank')}
                  startContent={<Mail className="w-4 h-4" />}
                >
                  Report Issues
                </Button>
                <Button
                  color="primary"
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`${githubUrl}/wiki`, '_blank')}
                  startContent={<FaGithub className="w-4 h-4" />}
                >
                  Github Wiki
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact