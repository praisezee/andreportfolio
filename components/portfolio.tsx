"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Figma } from "lucide-react"
import Image from "next/image"
import type { ProjectWithDates } from "@/lib/data-store"

const categories = ["all", "ui", "ux", "mobile", "branding"]

export function Portfolio() {
  const [projects, setProjects] = useState<ProjectWithDates[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        // Only show published projects on the public portfolio
        setProjects(data.filter((project: ProjectWithDates) => project.status === "published"))
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4C78DD] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading portfolio...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent design work and creative projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`capitalize px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] text-white"
                  : "border-[#4C78DD] text-[#4C78DD] hover:bg-[#4C78DD] hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg?height=300&width=400"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.figmaUrl && (
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white" asChild>
                      <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                        <Figma className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.split(",").map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-[#A3BFFA]/20 text-[#1E3A8A] dark:bg-[#1E3A8A]/20 dark:text-[#A3BFFA] hover:bg-[#A3BFFA]/30"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
