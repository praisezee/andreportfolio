const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
	try {
		console.log("🌱 Starting database seed...\n");

		// Read data from data.json
		const dataPath = path.join(__dirname, "data.json");
		const rawData = fs.readFileSync(dataPath, "utf-8");
		const data = JSON.parse(rawData);

		console.log("📖 Data loaded from data.json");

		// Clear existing data (optional - comment out if you want to keep existing data)
		console.log("\n🗑️  Clearing existing data...");
		await prisma.$connect();
		console.log("Connected to mongoDb");
		await prisma.skill.deleteMany({});
		await prisma.skillCategory.deleteMany({});
		await prisma.project.deleteMany({});
		await prisma.testimonial.deleteMany({});
		await prisma.user.deleteMany({});
		console.log("✅ Existing data cleared");

		// Seed Skill Categories
		console.log("\n📂 Seeding skill categories...");
		const categoryMap = new Map(); // Map old IDs to new ObjectIds

		for (const category of data.skill_categories) {
			const created = await prisma.skillCategory.create({
				data: {
					category: category.category,
					icon: category.icon,
					createdAt: new Date(category.created_at),
					updatedAt: new Date(category.updated_at),
				},
			});
			categoryMap.set(category.id, created.id);
			console.log(`  ✓ Created category: ${category.category}`);
		}
		console.log(`✅ Seeded ${data.skill_categories.length} skill categories`);

		// Seed Skills
		console.log("\n🎯 Seeding skills...");
		for (const skill of data.skills) {
			const categoryId = categoryMap.get(skill.category_id);
			if (!categoryId) {
				console.warn(
					`  ⚠️  Warning: Category ID ${skill.category_id} not found for skill: ${skill.name}`
				);
				continue;
			}

			await prisma.skill.create({
				data: {
					name: skill.name,
					level: skill.level,
					categoryId: categoryId,
					createdAt: new Date(skill.created_at),
					updatedAt: new Date(skill.updated_at),
				},
			});
			console.log(`  ✓ Created skill: ${skill.name} (${skill.level}%)`);
		}
		console.log(`✅ Seeded ${data.skills.length} skills`);

		// Seed Users
		console.log("\n👤 Seeding users...");
		for (const user of data.users) {
			await prisma.user.create({
				data: {
					username: user.username,
					password: user.password, // Already hashed in data.json
					createdAt: new Date(user.created_at),
					updatedAt: new Date(user.updated_at),
				},
			});
			console.log(`  ✓ Created user: ${user.username}`);
		}
		console.log(`✅ Seeded ${data.users.length} users`);

		// Seed Projects
		console.log("\n🚀 Seeding projects...");
		for (const project of data.projects) {
			await prisma.project.create({
				data: {
					title: project.title,
					description: project.description,
					imageUrl: project.image_url,
					tags: project.tags,
					liveUrl: project.live_url,
					figmaUrl: project.figma_url,
					category: project.category,
					status: project.status,
					createdAt: new Date(project.created_at),
					updatedAt: new Date(project.updated_at),
				},
			});
			console.log(`  ✓ Created project: ${project.title}`);
		}
		console.log(`✅ Seeded ${data.projects.length} projects`);

		// Seed Testimonials
		console.log("\n💬 Seeding testimonials...");
		for (const testimonial of data.testimonials) {
			await prisma.testimonial.create({
				data: {
					name: testimonial.name,
					role: testimonial.role,
					content: testimonial.content,
					rating: testimonial.rating,
					avatarUrl: testimonial.avatar_url,
					createdAt: new Date(testimonial.created_at),
					updatedAt: new Date(testimonial.updated_at),
				},
			});
			console.log(`  ✓ Created testimonial from: ${testimonial.name}`);
		}
		console.log(`✅ Seeded ${data.testimonials.length} testimonials`);

		console.log("\n🎉 Database seeding completed successfully!\n");
		console.log("📊 Summary:");
		console.log(`   - Skill Categories: ${data.skill_categories.length}`);
		console.log(`   - Skills: ${data.skills.length}`);
		console.log(`   - Users: ${data.users.length}`);
		console.log(`   - Projects: ${data.projects.length}`);
		console.log(`   - Testimonials: ${data.testimonials.length}`);
		console.log("");
	} catch (error) {
		console.error("\n❌ Error during seeding:");
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
