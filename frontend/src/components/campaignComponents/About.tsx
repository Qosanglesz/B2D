// app/components/About.tsx
'use client'

import { useState } from 'react'
import { Card, CardBody, Avatar, Chip, Link } from "@nextui-org/react"
import { FaGithub } from "react-icons/fa"

interface TeamMember {
  name: string
  position: string
  role: string
  description: string
  imageSrc: string
  github: string
}

interface AboutProps {
  teamMembers?: TeamMember[]
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Wisarut Kanasub",
    position: "Leader",
    role: "Full Stack Developer",
    description: "Full Stack Developer proficient in backend technologies and database management.",
    imageSrc: "/images/peach.jpeg",
    github: "https://github.com/Qosanglesz"
  },
  {
    name: "Chaiyawut Thengket",
    position: "Crew",
    role: "Full Stack Developer",
    description: "Full Stack Developer specializing in creating intuitive user interfaces for investment platforms.",
    imageSrc: "/images/tar.jpeg",
    github: "https://github.com/ChaiyawutTar"
  },
  {
    name: "Sukprachoke Leelapisuth",
    position: "Crew",
    role: "Testing and Document worker",
    description: "Testing and Document worker of experience in investment website development.",
    imageSrc: "/images/meng.jpeg",
    github: "https://github.com/MeHappyLucky"
  }
]

const About = ({ teamMembers = defaultTeamMembers }: AboutProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const getPositionColor = (position: string) => {
    return position.toLowerCase() === 'leader' ? 'warning' : 'success'
  }

  return (
    <section className="py-16 px-4 min-h-screen">
      <Card className="max-w-7xl mx-auto bg-background/60 dark:bg-default-100/50 backdrop-blur-lg">
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Left Side - Active Member Display */}
            <div className="relative flex items-center justify-center">
              <div className="animate-[fadeIn_300ms_ease-in-out] flex flex-col items-center gap-6">
                <Avatar 
                  src={teamMembers[activeTab].imageSrc}
                  className="w-64 h-64 text-large"
                  isBordered
                  color="primary"
                  showFallback
                  name={teamMembers[activeTab].name.split(' ').map(n => n[0]).join('')}
                />
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {teamMembers[activeTab].name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <Chip 
                      color={getPositionColor(teamMembers[activeTab].position)}
                      variant="flat"
                    >
                      {teamMembers[activeTab].position}
                    </Chip>
                    <Link
                      isExternal
                      href={teamMembers[activeTab].github}
                      className="text-foreground/90 hover:text-primary transition-colors"
                    >
                      <FaGithub size={24} />
                    </Link>
                  </div>
                  <p className="text-sm text-foreground/60">
                    {teamMembers[activeTab].role}
                  </p>
                  <p className="text-sm text-foreground/80 mt-4">
                    {teamMembers[activeTab].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Team Members List */}
            <div className="flex flex-col gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  isPressable
                  onPress={() => setActiveTab(index)}
                  className={`border-none ${
                    activeTab === index
                      ? 'bg-primary/10 dark:bg-primary/20'
                      : 'bg-transparent hover:bg-default-100'
                  }`}
                >
                  <CardBody className="flex flex-row gap-8">
                    <div className="flex items-stretch">
                      {activeTab === index && (
                        <div className="w-0.5 bg-primary"></div>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={member.imageSrc}
                          size="sm"
                          isBordered={activeTab === index}
                          color="primary"
                          showFallback
                          name={member.name.split(' ').map(n => n[0]).join('')}
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h2 className="text-xl font-bold text-foreground">
                                {member.name}
                              </h2>
                              <Chip 
                                size="sm" 
                                color={getPositionColor(member.position)}
                                variant="flat"
                              >
                                {member.position}
                              </Chip>
                            </div>
                            <Link
                              isExternal
                              href={member.github}
                              className="text-foreground/90 hover:text-primary transition-colors"
                            >
                              <FaGithub size={20} />
                            </Link>
                          </div>
                          <p className="text-sm text-foreground/60">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">
                        {member.description}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  )
}

export default About