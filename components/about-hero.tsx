"use client"

import { Palette, Figma, FileCheck } from "lucide-react"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A3BFFA]/10 via-white to-white dark:from-[#1E3A8A]/20 dark:via-black dark:to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-[#4C78DD] to-[#1E3A8A] bg-clip-text text-transparent">Me</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A3BFFA] to-[#4C78DD] rounded-xl animate-pulse transform rotate-6" />
              <Image
                src="/2b.jpg"
                alt="André Pascal"
                width={288}
                height={288}
                className="relative z-10 rounded-xl object-cover shadow-2xl border-4 border-white dark:border-gray-800 transform -rotate-3 w-full h-full"
              />
            </div>
          </div>

          <div className="md:w-2/3 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">UI/UX & Graphic Designer</h2>
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: Palette, text: "Graphic Design Expert" },
                  { icon: Figma, text: "Figma Specialist" },
                  { icon: FileCheck, text: "10+ Years Experience" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm"
                  >
                    <item.icon className="h-4 w-4 text-[#4C78DD]" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
