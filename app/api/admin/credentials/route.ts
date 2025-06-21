import { type NextRequest, NextResponse } from "next/server";
import { userStore } from "@/lib/data-store";
import { hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export async function PUT(request: NextRequest) {
	try {
		// Verify authentication
		const token = request.cookies.get("auth_token")?.value;
		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const decoded = verify(token, JWT_SECRET) as { id: number; username: string };
		const { username, password } = await request.json();

		const updateData: { username?: string; password?: string } = {};

		if (username) {
			updateData.username = username;
		}

		if (password) {
			updateData.password = await hash(password, 12);
		}

		const updatedUser = await userStore.updateCredentials(decoded.id, updateData);

		return NextResponse.json({
			success: true,
			message: "Credentials updated successfully",
			username: updatedUser.username,
		});
	} catch (error) {
		console.error("Credentials update error:", error);
		return NextResponse.json(
			{ error: "Failed to update credentials" },
			{ status: 500 }
		);
	}
}
