import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const hashedPassword = await hash("admin123",12)

  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  })

  console.log("👤 Created admin user:", adminUser.username)

  // Create sample projects
  const sampleProjects = [
    {
      title: "E-Commerce Redesign",
      description:
        "Complete UI overhaul for a fashion e-commerce platform with improved user experience and conversion optimization.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "UI Design,E-commerce,Mobile Design,User Flows",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Finance App UI",
      description: "Modern mobile banking application with intuitive navigation and clean visual design.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "UI/UX Design,Mobile App,Fintech,Figma",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "mobile",
      status: "published",
    },
    {
      title: "Brand Identity System",
      description:
        "Complete brand identity package including logo, color palette, typography and comprehensive guidelines.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Branding,Logo Design,Visual Identity,Guidelines",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "branding",
      status: "published",
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard with intuitive interface for complex data interpretation.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "UI Design,Dashboard,Data Visualization,Wireframing",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Fitness App UX Research",
      description: "In-depth user research and experience design for health tracking application.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "UX Research,User Flows,Prototyping,UI Design",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ux",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },{
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
  ]

  for (const project of sampleProjects) {
    // Find the project by title first (assuming title is not unique in schema)
    const existingProject = await prisma.project.findFirst({
      where: { title: project.title },
    });

    if (existingProject) {
      await prisma.project.update({
        where: { id: existingProject.id },
        data: project,
      });
    } else {
      await prisma.project.create({
        data: project,
      });
    }
  }

  console.log("📁 Created sample projects")

  // Create sample testimonials
  const sampleTestimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "André's design work exceeded our expectations. His attention to detail and creative approach transformed our digital presence completely.",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Product Manager, InnovateCorp",
      content:
        "Working with André was a game-changer for our project. His design expertise and user-centered approach are truly exceptional.",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, BrandFlow",
      content:
        "André delivered a stunning brand identity that perfectly captured our vision. The design system is comprehensive and beautiful.",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Thompson",
      role: "Founder, StartupHub",
      content:
        "The mobile app design André created for us has received incredible feedback from our users. Highly recommended!",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Wang",
      role: "CTO, DataFlow Solutions",
      content:
        "André's UI/UX design skills are impressive. He delivered a complex dashboard design that's both beautiful and functional.",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "James Miller",
      role: "Creative Director, DesignStudio",
      content:
        "André's design sensibility is outstanding. He created a visual identity that perfectly represents our company.",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=60&width=60",
    },
  ]

  for (const testimonial of sampleTestimonials) {
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { name: testimonial.name },
    });

    if (existingTestimonial) {
      await prisma.testimonial.update({
        where: { id: existingTestimonial.id },
        data: testimonial,
      });
    } else {
      await prisma.testimonial.create({
        data: testimonial,
      });
    }
  }

  console.log("💬 Created sample testimonials")

  // Create skill categories and skills
  const skillCategories = [
    {
      category: "UI Design",
      icon: "Layout",
      skills: [
        { name: "Wireframing", level: 95 },
        { name: "Visual Design", level: 95 },
        { name: "Prototyping", level: 90 },
        { name: "Component Systems", level: 92 },
      ],
    },
    {
      category: "UX Design",
      icon: "UserCheck",
      skills: [
        { name: "User Research", level: 88 },
        { name: "Usability Testing", level: 85 },
        { name: "Information Architecture", level: 90 },
        { name: "User Flows", level: 92 },
      ],
    },
    {
      category: "Design Tools",
      icon: "Figma",
      skills: [
        { name: "Figma", level: 95 },
        { name: "Canva", level: 95 },
        { name: "Adobe Photoshop", level: 90 },
        { name: "Adobe Illustrator", level: 85 },
      ],
    },
    {
      category: "Graphic Design",
      icon: "Palette",
      skills: [
        { name: "Typography", level: 92 },
        { name: "Color Theory", level: 95 },
        { name: "Layout & Composition", level: 90 },
        { name: "Brand Identity", level: 88 },
      ],
    },
    {
      category: "Graphics & Media",
      icon: "ImageIcon",
      skills: [
        { name: "Digital Illustration", level: 85 },
        { name: "Photo Editing", level: 90 },
        { name: "Logo Design", level: 92 },
        { name: "Print Design", level: 88 },
      ],
    },
    {
      category: "Digital Design",
      icon: "Lightbulb",
      skills: [
        { name: "Web Graphics", level: 90 },
        { name: "Responsive Design", level: 95 },
        { name: "Design Systems", level: 88 },
        { name: "Social Media Design", level: 92 },
      ],
    },
  ]

  for (const categoryData of skillCategories) {
    // Find existing category by category name
    let skillCategory = await prisma.skillCategory.findFirst({
      where: { category: categoryData.category },
    });

    if (!skillCategory) {
      skillCategory = await prisma.skillCategory.create({
        data: {
          category: categoryData.category,
          icon: categoryData.icon,
        },
      });
    }

    for (const skillData of categoryData.skills) {
      let skillDatas = await prisma.skill.findFirst({
        where: { categoryId: skillCategory.id },
      });
      if (!skillDatas) {
        await prisma.skill.create({
          data: {
            categoryId: skillCategory.id,
            name: skillData.name,
            level: skillData.level,
          }
        })
      }
    }
  }

  console.log("🎯 Created skill categories and skills")
  console.log("✅ Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
