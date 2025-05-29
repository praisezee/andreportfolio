"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Palette, Layout, Figma, ImageIcon, UserCheck, Lightbulb } from "lucide-react"
import type { SkillCategoryWithSkills } from "@/lib/data-store"

const iconMap = {
  Palette,
  Layout,
  Figma,
  ImageIcon,
  UserCheck,
  Lightbulb,
}

export function Skills() {
  const [skills, setSkills] = useState<SkillCategoryWithSkills[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills")
      if (response.ok) {
        const data = await response.json()
        setSkills(data)
      }
    } catch (error) {
      console.error("Error fetching skills:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section id="skills" className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4C78DD] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Design tools and expertise I use to create compelling visual experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon as keyof typeof iconMap] || Layout
            return (
              <Card
                key={skill.id}
                className="group bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-[#A3BFFA] to-[#4C78DD] mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{skill.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {skill.skills.map((skillItem, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skillItem.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skillItem.level}%</span>
                        </div>
                        <Progress value={skillItem.level} className="h-2 bg-gray-200 dark:bg-gray-700" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
