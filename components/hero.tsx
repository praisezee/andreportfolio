"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Linkedin, Mail, Figma } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A3BFFA] via-[#4C78DD] to-[#1E3A8A] dark:from-[#1E3A8A] dark:via-[#4C78DD] dark:to-black opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center space-y-8">
          {/* Profile Image */}
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#A3BFFA] to-[#4C78DD] rounded-full animate-pulse" />
            <Image
              src="/1b.jpg"
              alt="André"
              width={160}
              height={160}
              className="relative z-10 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover w-full h-full"
            />
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] bg-clip-text text-transparent">André</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              UI/UX & Graphic Designer
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I craft beautiful digital experiences that blend graphic design expertise with user-centered design.
              Specializing in creating intuitive interfaces and compelling visual communications.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#4C78DD] text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <Link href="/portfolio">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#4C78DD] text-[#4C78DD] hover:bg-[#4C78DD] hover:text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => {
                const element = document.querySelector("#contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-8">
            {[
              { icon: Figma, href: "https://figma.com", label: "Figma" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:andrescreation1@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#A3BFFA] dark:hover:bg-[#1E3A8A] group"
                aria-label={label}
              >
                <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
