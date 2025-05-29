import Database from "better-sqlite3"
import { hash } from "bcrypt"
import path from "path"
import fs from "fs"

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, "portfolio.db")
const db = new Database(dbPath)

// Enable foreign keys
db.pragma("foreign_keys = ON")

console.log("Setting up database...")

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create projects table
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    tags TEXT NOT NULL,
    live_url TEXT,
    figma_url TEXT,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create testimonials table
db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create skills table
db.exec(`
  CREATE TABLE IF NOT EXISTS skill_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE CASCADE
  )
`)

// Check if admin user exists
const adminUser = db.prepare("SELECT * FROM users WHERE username = ?").get("admin")

if (!adminUser) {
  // Create default admin user
  const hashedPassword = await hash("admin123", 12)
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", hashedPassword)
  console.log("Created default admin user (username: admin, password: admin123)")
}

// Insert sample data if tables are empty
const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get().count

if (projectCount === 0) {
  console.log("Inserting sample projects...")

  const sampleProjects = [
    {
      title: "E-Commerce Redesign",
      description:
        "Complete UI overhaul for a fashion e-commerce platform with improved user experience and conversion optimization.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "UI Design,E-commerce,Mobile Design,User Flows",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Finance App UI",
      description: "Modern mobile banking application with intuitive navigation and clean visual design.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "UI/UX Design,Mobile App,Fintech,Figma",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "mobile",
      status: "published",
    },
    {
      title: "Brand Identity System",
      description:
        "Complete brand identity package including logo, color palette, typography and comprehensive guidelines.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Branding,Logo Design,Visual Identity,Guidelines",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "branding",
      status: "published",
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization dashboard with intuitive interface for complex data interpretation.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "UI Design,Dashboard,Data Visualization,Wireframing",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Fitness App UX Research",
      description: "In-depth user research and experience design for health tracking application.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "UX Research,User Flows,Prototyping,UI Design",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ux",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    // 
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
    {
      title: "Restaurant Website Design",
      description: "Elegant website design for a high-end restaurant with online reservation system.",
      image_url: "/placeholder.svg?height=300&width=400",
      tags: "Web Design,UI/UX,Responsive,Food & Beverage",
      live_url: "https://example.com",
      figma_url: "https://figma.com/file/example",
      category: "ui",
      status: "published",
    },
  ]

  const insertProject = db.prepare(`
    INSERT INTO projects (title, description, image_url, tags, live_url, figma_url, category, status)
    VALUES (@title, @description, @image_url, @tags, @live_url, @figma_url, @category, @status)
  `)

  for (const project of sampleProjects) {
    insertProject.run(project)
  }
}

const testimonialCount = db.prepare("SELECT COUNT(*) as count FROM testimonials").get().count

if (testimonialCount === 0) {
  console.log("Inserting sample testimonials...")

  const sampleTestimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "André's design work exceeded our expectations. His attention to detail and creative approach transformed our digital presence completely.",
      rating: 5,
      avatar_url: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Product Manager, InnovateCorp",
      content:
        "Working with André was a game-changer for our project. His design expertise and user-centered approach are truly exceptional.",
      rating: 5,
      avatar_url: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, BrandFlow",
      content:
        "André delivered a stunning brand identity that perfectly captured our vision. The design system is comprehensive and beautiful.",
      rating: 5,
      avatar_url: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Thompson",
      role: "Founder, StartupHub",
      content:
        "The mobile app design André created for us has received incredible feedback from our users. Highly recommended!",
      rating: 5,
      avatar_url: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Wang",
      role: "CTO, DataFlow Solutions",
      content:
        "André's UI/UX design skills are impressive. He delivered a complex dashboard design that's both beautiful and functional.",
      rating: 5,
      avatar_url: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "James Miller",
      role: "Creative Director, DesignStudio",
      content:
        "André's design sensibility is outstanding. He created a visual identity that perfectly represents our company.",
      rating: 5,
      avatar_url: "/placeholder.svg?height=60&width=60",
    },
  ]

  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (name, role, content, rating, avatar_url)
    VALUES (@name, @role, @content, @rating, @avatar_url)
  `)

  for (const testimonial of sampleTestimonials) {
    insertTestimonial.run(testimonial)
  }
}

const skillCategoryCount = db.prepare("SELECT COUNT(*) as count FROM skill_categories").get().count

if (skillCategoryCount === 0) {
  console.log("Inserting sample skills...")

  const skillCategoryNames = [
    "UI Design",
    "UX Design",
    "Design Tools",
    "Visual Design",
    "Graphics & Media",
    "Specialized Design",
  ] as const
  type SkillCategoryName = typeof skillCategoryNames[number]

  const sampleSkillCategories: { category: SkillCategoryName; icon: string }[] = [
    { category: "UI Design", icon: "Layout" },
    { category: "UX Design", icon: "UserCheck" },
    { category: "Design Tools", icon: "Figma" },
    { category: "Visual Design", icon: "Palette" },
    { category: "Graphics & Media", icon: "ImageIcon" },
    { category: "Specialized Design", icon: "Lightbulb" },
  ]

  const insertSkillCategory = db.prepare(`
    INSERT INTO skill_categories (category, icon)
    VALUES (@category, @icon)
  `)

  const insertSkill = db.prepare(`
    INSERT INTO skills (category_id, name, level)
    VALUES (@category_id, @name, @level)
  `)

  const skillsByCategory: Record<SkillCategoryName, { name: string; level: number }[]> = {
    "UI Design": [
      { name: "Wireframing", level: 95 },
      { name: "Visual Design", level: 95 },
      { name: "Prototyping", level: 90 },
      { name: "Component Systems", level: 92 },
    ],
    "UX Design": [
      { name: "User Research", level: 88 },
      { name: "Usability Testing", level: 85 },
      { name: "Information Architecture", level: 90 },
      { name: "User Flows", level: 92 },
    ],
    "Design Tools": [
      { name: "Figma", level: 95 },
      { name: "Canva", level: 95 },
      { name: "Adobe Photoshop", level: 90 },
      { name: "Adobe Illustrator", level: 85 },
    ],
    "Visual Design": [
      { name: "Typography", level: 92 },
      { name: "Color Theory", level: 95 },
      { name: "Layout & Composition", level: 90 },
      { name: "Iconography", level: 88 },
    ],
    "Graphics & Media": [
      { name: "Digital Illustration", level: 85 },
      { name: "Photo Editing", level: 90 },
      { name: "Logo Design", level: 92 },
      { name: "Social Media Graphics", level: 95 },
    ],
    "Specialized Design": [
      { name: "Dark Mode Design", level: 90 },
      { name: "Responsive Design", level: 95 },
      { name: "Design Systems", level: 88 },
      { name: "Accessibility Design", level: 85 },
    ],
  }

  for (const category of sampleSkillCategories) {
    const result = insertSkillCategory.run(category)
    const categoryId = result.lastInsertRowid

    for (const skill of skillsByCategory[category.category]) {
      insertSkill.run({
        category_id: categoryId,
        name: skill.name,
        level: skill.level,
      })
    }
  }
}

console.log("Database setup complete!")
db.close()
