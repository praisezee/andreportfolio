import { type NextRequest, NextResponse } from "next/server"
import { skillStore } from "@/lib/data-store"

export async function GET(request: NextRequest) {
  try {
    const skills = await skillStore.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching skills" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const skill = await skillStore.create({
      category: data.category,
      icon: data.icon,
      skills: data.skills,
    })
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: "Error creating skill" }, { status: 500 })
  }
}
