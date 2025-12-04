const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

async function testConnection() {
	console.log("🔍 Testing MongoDB connection...\n");

	try {
		// Test connection
		await prisma.$connect();
		console.log("✅ Successfully connected to MongoDB!\n");

		// Try to count documents in each collection
		console.log("📊 Checking collections:");

		const userCount = await prisma.user.count();
		console.log(`  Users: ${userCount}`);

		const categoryCount = await prisma.skillCategory.count();
		console.log(`  Skill Categories: ${categoryCount}`);

		const skillCount = await prisma.skill.count();
		console.log(`  Skills: ${skillCount}`);

		const projectCount = await prisma.project.count();
		console.log(`  Projects: ${projectCount}`);

		const testimonialCount = await prisma.testimonial.count();
		console.log(`  Testimonials: ${testimonialCount}`);

		console.log("\n✅ Connection test successful!");
	} catch (error) {
		console.error("❌ Connection failed!\n");
		console.error("Error details:");
		console.error("  Code:", error.code);
		console.error("  Message:", error.message);

		if (error.message.includes("nodename nor servname provided")) {
			console.error("\n💡 Troubleshooting tips:");
			console.error("  1. Check your internet connection");
			console.error("  2. Verify the MongoDB connection string in .env");
			console.error("  3. Ensure your IP is whitelisted in MongoDB Atlas");
			console.error("  4. Try using 0.0.0.0/0 in Network Access (for testing)");
		}

		if (error.message.includes("InternalError")) {
			console.error("\n💡 SSL/TLS Error detected:");
			console.error("  1. Your MongoDB cluster might be having SSL issues");
			console.error("  2. Try adding &tls=true to your connection string");
			console.error("  3. Or try &ssl=false (not recommended for production)");
		}

		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

testConnection();
