import { type NextRequest, NextResponse } from "next/server"
import { projectStore } from "@/lib/data-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const project = await projectStore.findUnique(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const project = await projectStore.update(id, {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      tags: data.tags,
      liveUrl: data.liveUrl,
      figmaUrl: data.figmaUrl,
      category: data.category,
      status: data.status,
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Error updating project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await projectStore.delete(id)

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting project" }, { status: 500 })
  }
}
