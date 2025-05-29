import { type NextRequest, NextResponse } from "next/server"
import { testimonialStore } from "@/lib/data-store"

export async function GET(request: NextRequest) {
  try {
    const testimonials = await testimonialStore.findMany()
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching testimonials" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const testimonial = await testimonialStore.create({
      name: data.name,
      role: data.role,
      content: data.content,
      rating: data.rating,
      avatarUrl: data.avatarUrl,
    })
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: "Error creating testimonial" }, { status: 500 })
  }
}
