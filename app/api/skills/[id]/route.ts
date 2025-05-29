import { type NextRequest, NextResponse } from "next/server"
import { skillStore } from "@/lib/data-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const skill = await skillStore.findUnique(id)

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching skill" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const skill = await skillStore.update(id, {
      category: data.category,
      icon: data.icon,
      skills: data.skills,
    })

    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: "Error updating skill" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await skillStore.delete(id)

    return NextResponse.json({ message: "Skill deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting skill" }, { status: 500 })
  }
}
