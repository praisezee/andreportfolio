"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, Palette, Figma, ImageIcon, BookOpen, Award } from "lucide-react"

export function AboutContent() {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              I'm Andre Pascal, a passionate UI/UX designer with over 5 years of experience as a graphic designer. My
              career started with creating stunning visuals using Photoshop and Canva, but I've since transitioned into
              designing user-centered digital experiences with Figma. At Andre's Creation, I combine my graphic design
              expertise with modern UI/UX practices to craft intuitive and impactful solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm driven by a love for solving user problems and a commitment to staying ahead of design trends. My goal
              is to join innovative teams and shape the future of design.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Skills & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#A3BFFA]/20">
                      <UserCheck className="h-5 w-5 text-[#4C78DD]" />
                    </div>
                    <h3 className="font-semibold text-xl">UI/UX Design</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    User research, wireframing, prototyping, usability testing
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#A3BFFA]/20">
                      <Palette className="h-5 w-5 text-[#4C78DD]" />
                    </div>
                    <h3 className="font-semibold text-xl">Graphic Design</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Expertise in visual communication, branding, and layout design from over a decade in graphic design
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#A3BFFA]/20">
                      <Figma className="h-5 w-5 text-[#4C78DD]" />
                    </div>
                    <h3 className="font-semibold text-xl">Tools</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Proficient in Figma, Photoshop, and Canva</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#A3BFFA]/20">
                      <ImageIcon className="h-5 w-5 text-[#4C78DD]" />
                    </div>
                    <h3 className="font-semibold text-xl">Future-Ready Skills</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Familiar with modern design trends, responsive layouts, and digital brand experiences
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Why Hire Me?</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The UI/UX field is rapidly evolving, and I'm prepared to lead the charge. My knowledge of modern design
              principles and digital experiences, paired with my strong graphic design foundation, makes me a versatile
              asset. I'm ready to create designs that are both visually compelling and functionally excellent for
              today's digital landscape.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Research First",
                  description: "Understanding users and business needs before starting the design process",
                },
                {
                  icon: Palette,
                  title: "Design Excellence",
                  description: "Creating visually compelling interfaces with strong graphic design principles",
                },
                {
                  icon: Award,
                  title: "Continuous Growth",
                  description: "Always learning and adapting to new design trends and methodologies",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#A3BFFA]/20 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-[#4C78DD]" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
