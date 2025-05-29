"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Lock, User, Edit } from "lucide-react"

export function CredentialsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const updateData: { username?: string; password?: string } = {}

      if (formData.username.trim()) {
        updateData.username = formData.username.trim()
      }

      if (formData.password.trim()) {
        updateData.password = formData.password.trim()
      }

      const response = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
        credentials: "include",
      })

      if (response.ok) {
        const result = await response.json()
        alert("Credentials updated successfully!")
        setIsDialogOpen(false)
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        const error = await response.json()
        alert(error.error || "Failed to update credentials")
      }
    } catch (error) {
      alert("Failed to update credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credentials Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Update your admin username and password for secure access to the dashboard.
            </p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A]">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Credentials
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Admin Credentials</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">New Username (optional)</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="pl-10"
                        placeholder="Leave empty to keep current username"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">New Password (optional)</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10"
                        placeholder="Leave empty to keep current password"
                      />
                    </div>
                  </div>

                  {formData.password && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="pl-10"
                          placeholder="Confirm your new password"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || (!formData.username.trim() && !formData.password.trim())}
                      className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A]"
                    >
                      {isLoading ? "Updating..." : "Update Credentials"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card>
          <CardHeader>
            <CardTitle>Security Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Session Duration</span>
                <Badge variant="secondary">7 days</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password Encryption</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Bcrypt
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Token Type</span>
                <Badge variant="secondary">JWT</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">
                Your credentials are securely encrypted and stored. Sessions automatically expire after 7 days for
                security.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
