import { type NextRequest, NextResponse } from "next/server"
import { projectStore } from "@/lib/data-store"

export async function GET(request: NextRequest) {
  try {
    const projects = await projectStore.findMany()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const project = await projectStore.create({
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      tags: data.tags,
      liveUrl: data.liveUrl,
      figmaUrl: data.figmaUrl,
      category: data.category,
      status: data.status || "draft",
    })
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Error creating project" }, { status: 500 })
  }
}
