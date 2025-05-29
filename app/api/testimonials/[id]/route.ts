import { type NextRequest, NextResponse } from "next/server"
import { testimonialStore } from "@/lib/data-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const testimonial = await testimonialStore.findUnique(id)

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching testimonial" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const testimonial = await testimonialStore.update(id, {
      name: data.name,
      role: data.role,
      content: data.content,
      rating: data.rating,
      avatarUrl: data.avatarUrl,
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: "Error updating testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await testimonialStore.delete(id)

    return NextResponse.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting testimonial" }, { status: 500 })
  }
}
