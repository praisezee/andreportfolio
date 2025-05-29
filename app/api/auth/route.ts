import { type NextRequest, NextResponse } from "next/server"
import { userStore } from "@/lib/data-store"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const isValid = await userStore.verifyPassword(username, password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = await userStore.findUnique(username)

    // Generate JWT token
    const token = sign({ id: user!.id, username: user!.username }, JWT_SECRET, { expiresIn: "7d" })

    // Set cookie with token
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    })

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
