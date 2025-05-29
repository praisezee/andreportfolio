import { prisma } from "./prisma"
import { hash, compare } from "bcrypt"
import type { Project, Testimonial, SkillCategory, Skill, User } from "@prisma/client"

// Extended types for better frontend usage
export interface ProjectWithDates extends Project {
  createdAt: string
  updatedAt: string
}

export interface TestimonialWithDates extends Testimonial {
  createdAt: string
  updatedAt: string
}

export interface SkillCategoryWithSkills extends SkillCategory {
  skills: Array<{ name: string; level: number }>
  createdAt: string
  updatedAt: string
}

export interface UserWithDates extends User {
  createdAt: string
  updatedAt: string
}

// Helper function to convert dates to strings
function convertDates<T extends { createdAt: Date; updatedAt: Date }>(
  item: T,
): Omit<T, "createdAt" | "updatedAt"> & { createdAt: string; updatedAt: string } {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }
}

// Project operations
export const projectStore = {
  findMany: async (): Promise<ProjectWithDates[]> => {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })
    return projects.map(convertDates)
  },

  findUnique: async (id: number): Promise<ProjectWithDates | null> => {
    const project = await prisma.project.findUnique({
      where: { id },
    })
    return project ? convertDates(project) : null
  },

  create: async (data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<ProjectWithDates> => {
    const project = await prisma.project.create({
      data,
    })
    return convertDates(project)
  },

  update: async (
    id: number,
    data: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>,
  ): Promise<ProjectWithDates> => {
    const project = await prisma.project.update({
      where: { id },
      data,
    })
    return convertDates(project)
  },

  delete: async (id: number): Promise<ProjectWithDates> => {
    const project = await prisma.project.delete({
      where: { id },
    })
    return convertDates(project)
  },
}

// Testimonial operations
export const testimonialStore = {
  findMany: async (): Promise<TestimonialWithDates[]> => {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    })
    return testimonials.map(convertDates)
  },

  findUnique: async (id: number): Promise<TestimonialWithDates | null> => {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    })
    return testimonial ? convertDates(testimonial) : null
  },

  create: async (data: Omit<Testimonial, "id" | "createdAt" | "updatedAt">): Promise<TestimonialWithDates> => {
    const testimonial = await prisma.testimonial.create({
      data,
    })
    return convertDates(testimonial)
  },

  update: async (
    id: number,
    data: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>,
  ): Promise<TestimonialWithDates> => {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    })
    return convertDates(testimonial)
  },

  delete: async (id: number): Promise<TestimonialWithDates> => {
    const testimonial = await prisma.testimonial.delete({
      where: { id },
    })
    return convertDates(testimonial)
  },
}

// Skill operations
export const skillStore = {
  findMany: async (): Promise<SkillCategoryWithSkills[]> => {
    const categories = await prisma.skillCategory.findMany({
      include: {
        skills: {
          select: {
            name: true,
            level: true,
          },
          orderBy: { id: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return categories.map((category) => ({
      ...convertDates(category),
      skills: category.skills,
    }))
  },

  findUnique: async (id: number): Promise<SkillCategoryWithSkills | null> => {
    const category = await prisma.skillCategory.findUnique({
      where: { id },
      include: {
        skills: {
          select: {
            name: true,
            level: true,
          },
          orderBy: { id: "asc" },
        },
      },
    })

    return category
      ? {
          ...convertDates(category),
          skills: category.skills,
        }
      : null
  },

  create: async (data: {
    category: string
    icon: string
    skills: Array<{ name: string; level: number }>
  }): Promise<SkillCategoryWithSkills> => {
    const category = await prisma.skillCategory.create({
      data: {
        category: data.category,
        icon: data.icon,
        skills: {
          create: data.skills,
        },
      },
      include: {
        skills: {
          select: {
            name: true,
            level: true,
          },
          orderBy: { id: "asc" },
        },
      },
    })

    return {
      ...convertDates(category),
      skills: category.skills,
    }
  },

  update: async (
    id: number,
    data: {
      category?: string
      icon?: string
      skills?: Array<{ name: string; level: number }>
    },
  ): Promise<SkillCategoryWithSkills> => {
    // If skills are being updated, delete existing ones first
    if (data.skills) {
      await prisma.skill.deleteMany({
        where: { categoryId: id },
      })
    }

    const category = await prisma.skillCategory.update({
      where: { id },
      data: {
        category: data.category,
        icon: data.icon,
        skills: data.skills
          ? {
              create: data.skills,
            }
          : undefined,
      },
      include: {
        skills: {
          select: {
            name: true,
            level: true,
          },
          orderBy: { id: "asc" },
        },
      },
    })

    return {
      ...convertDates(category),
      skills: category.skills,
    }
  },

  delete: async (id: number): Promise<SkillCategoryWithSkills> => {
    const category = await prisma.skillCategory.delete({
      where: { id },
      include: {
        skills: {
          select: {
            name: true,
            level: true,
          },
        },
      },
    })

    return {
      ...convertDates(category),
      skills: category.skills,
    }
  },
}

// User operations
export const userStore = {
  findUnique: async (username: string): Promise<UserWithDates | null> => {
    const user = await prisma.user.findUnique({
      where: { username },
    })
    return user ? convertDates(user) : null
  },

  updateCredentials: async (id: number, data: { username?: string; password?: string }): Promise<UserWithDates> => {
    const updateData: { username?: string; password?: string } = {}

    if (data.username) {
      updateData.username = data.username
    }

    if (data.password) {
      updateData.password = await hash(data.password, 12)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    })

    return convertDates(user)
  },

  verifyPassword: async (username: string, password: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return false
    }

    return compare(password, user.password)
  },
}

// Export Prisma types for use in components
export type { Project, Testimonial, SkillCategory, Skill, User }
