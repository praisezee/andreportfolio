"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, BarChart3, FolderOpen, MessageSquare, Settings } from "lucide-react"
import { ProjectManager } from "./project-manager"
import { TestimonialManager } from "./testimonial-manager"
import { SkillManager } from "./skill-manager"
import { CredentialsManager } from "./credentials-manager"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2 this month",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Testimonials",
      value: "8",
      change: "+1 this week",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Skills",
      value: "24",
      change: "Updated recently",
      icon: BarChart3,
      color: "text-purple-600",
    },
    {
      title: "Page Views",
      value: "1,234",
      change: "+15% this month",
      icon: Eye,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Online
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Added new project", item: "E-Commerce Platform", time: "2 hours ago" },
                    { action: "Updated testimonial", item: "Sarah Johnson", time: "1 day ago" },
                    { action: "Modified skills", item: "React/Next.js", time: "3 days ago" },
                    { action: "Published project", item: "Mobile Banking App", time: "1 week ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.item}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillManager />
          </TabsContent>

          <TabsContent value="settings">
            <CredentialsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
