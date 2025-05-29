"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, ExternalLink, Figma } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  imageUrl?: string
  tags: string
  liveUrl?: string
  figmaUrl?: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    tags: "",
    liveUrl: "",
    figmaUrl: "",
    category: "ui",
    status: "draft",
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"
      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchProjects()
        setIsDialogOpen(false)
        setEditingProject(null)
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          tags: "",
          liveUrl: "",
          figmaUrl: "",
          category: "ui",
          status: "draft",
        })
      } else {
        alert("Error saving project")
      }
    } catch (error) {
      alert("Error saving project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || "",
      tags: project.tags,
      liveUrl: project.liveUrl || "",
      figmaUrl: project.figmaUrl || "",
      category: project.category,
      status: project.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await fetchProjects()
        } else {
          alert("Error deleting project")
        }
      } catch (error) {
        alert("Error deleting project")
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For now, we'll use a placeholder
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData({ ...formData, imageUrl: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A]">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui">UI Design</SelectItem>
                      <SelectItem value="ux">UX Design</SelectItem>
                      <SelectItem value="mobile">Mobile Design</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Image</label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4C78DD] file:text-white hover:file:bg-[#1E3A8A]"
                  />
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Or enter image URL"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={formData.imageUrl || "/placeholder.svg"}
                        alt="Preview"
                        width={200}
                        height={150}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="UI Design, Figma, Mobile App"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Live URL</label>
                  <Input
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Figma URL</label>
                  <Input
                    value={formData.figmaUrl}
                    onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                    placeholder="https://figma.com/file/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A]">
                  {isLoading ? "Saving..." : editingProject ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={project.imageUrl || "/placeholder.svg?height=200&width=300"}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${
                  project.status === "published" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {project.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags
                  .split(",")
                  .slice(0, 3)
                  .map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                {project.tags.split(",").length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.tags.split(",").length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {project.liveUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                  {project.figmaUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
                        <Figma className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
