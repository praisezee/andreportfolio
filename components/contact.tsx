"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Send, MessageSquare } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to start your next design project? Let's discuss how we can work together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                I'm always excited to work on new projects and collaborate with amazing people. Whether you have a
                design project in mind or just want to chat about possibilities, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "andrescreation1@gmail.com",
                  href: "mailto:andrescreation1@gmail.com",
                },
                {
                  icon: MessageSquare,
                  title: "WhatsApp",
                  content: "Message me on WhatsApp",
                  href: "https://wa.me/message/TU2B43Q7UVSBA1",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "Lagos, Nigeria",
                  href: "#",
                },
              ].map((item) => (
                <Card key={item.title} className="bg-gray-50 dark:bg-gray-800 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-[#A3BFFA] to-[#4C78DD] mr-4">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                        <a
                          href={item.href}
                          className="text-gray-600 dark:text-gray-300 hover:text-[#4C78DD] dark:hover:text-[#A3BFFA] transition-colors duration-300"
                          target={item.title === "WhatsApp" ? "_blank" : undefined}
                          rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                        >
                          {item.content}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#4C78DD] dark:focus:border-[#A3BFFA]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#4C78DD] dark:focus:border-[#A3BFFA]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#4C78DD] dark:focus:border-[#A3BFFA]"
                    placeholder="Design project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#4C78DD] dark:focus:border-[#A3BFFA] resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#4C78DD] text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
