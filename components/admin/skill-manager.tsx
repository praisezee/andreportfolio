"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, Trash2, Palette, Layout, Figma, ImageIcon, UserCheck, Lightbulb } from "lucide-react"
import type { Skill } from "@/lib/data-store"

const iconMap = {
  Palette,
  Layout,
  Figma,
  ImageIcon, // Changed from Images to Image
  UserCheck,
  Lightbulb,
}

export function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    icon: "Layout",
    skills: [{ name: "", level: 50 }],
  })

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
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : "/api/skills"
      const method = editingSkill ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchSkills()
        setIsDialogOpen(false)
        setEditingSkill(null)
        setFormData({
          category: "",
          icon: "Layout",
          skills: [{ name: "", level: 50 }],
        })
      } else {
        alert("Error saving skill")
      }
    } catch (error) {
      alert("Error saving skill")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      category: skill.category,
      icon: skill.icon,
      skills: skill.skills,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this skill category?")) {
      try {
        const response = await fetch(`/api/skills/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await fetchSkills()
        } else {
          alert("Error deleting skill")
        }
      } catch (error) {
        alert("Error deleting skill")
      }
    }
  }

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", level: 50 }],
    })
  }

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    })
  }

  const updateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = formData.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill))
    setFormData({ ...formData, skills: updatedSkills })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A]">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill Category" : "Add New Skill Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category Name</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Icon</label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(iconMap).map((iconName) => (
                        <SelectItem key={iconName} value={iconName}>
                          {iconName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Skills</label>
                  <Button type="button" size="sm" onClick={addSkill}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Skill
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => updateSkill(index, "name", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Level"
                        value={skill.level}
                        onChange={(e) => updateSkill(index, "level", Number.parseInt(e.target.value))}
                        className="w-20"
                      />
                      {formData.skills.length > 1 && (
                        <Button type="button" size="sm" variant="outline" onClick={() => removeSkill(index)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A]">
                  {isLoading ? "Saving..." : editingSkill ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const IconComponent = iconMap[skill.icon as keyof typeof iconMap] || Layout
          return (
            <Card key={skill.id} className="relative">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-[#A3BFFA] to-[#4C78DD] mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{skill.category}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(skill.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {skill.skills.map((skillItem, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skillItem.name}</span>
                        <span className="text-sm text-gray-500">{skillItem.level}%</span>
                      </div>
                      <Progress value={skillItem.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
