import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding database...");

	// Create admin user
	const hashedPassword = await hash("admin123", 12);

	const adminUser = await prisma.user.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			username: "admin",
			password: hashedPassword,
		},
	});

	console.log("👤 Created admin user:", adminUser.username);

	// Create sample projects
	const sampleProjects = [
		{
			title: "Clothing Brand Storefront",
			description:
				"A clothing brand storefront UI design that blends style, elegance, and intuitive shopping experiences. This e-commerce website showcases a sleek interface with featured products, categorized shopping options, and a modern layout, enhancing user engagement and brand presentation.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/58ed0afd-5591-4438-a60e-b0d808478c7d/content",
			tags:
				"UI Design,E-commerce,Clothing Brand,Web Design,User Experience,Modern Interface,Shopping Platform,Brand Storefront,Intuitive Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Mobile Wallet App",
			description:
				"A sleek and user-friendly mobile wallet app design that simplifies financial management with an intuitive interface, featuring balance tracking, card management, and transaction history for a seamless payment experience.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/4c522213-a8ed-4802-9541-8ecdf218e7d0/content",
			tags:
				"Mobile Design,Wallet App,Financial Management,User Interface,Payment System,Card Management,Transaction Tracking,App Design,Intuitive Interface",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Food Delivery App",
			description:
				"A vibrant and intuitive food app design that offers a seamless ordering experience, featuring a diverse menu, customizable options, and real-time order tracking with customer support integration.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/f0341846-de14-4d79-9d85-82bfc97eae54/content",
			tags:
				"Food App,Mobile Design,User Interface,Order Tracking,Menu Customization,E-commerce,Food Delivery,Customer Support,App Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Fintech App",
			description:
				"A dynamic fintech app design that provides a streamlined financial management experience, featuring balance tracking, payment options, and a user-friendly interface for seamless transactions and account management.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/2c6f3fc6-03f2-4942-8dae-45586050e835/content",
			tags:
				"Fintech App,Mobile Design,Financial Management,User Interface,Payment Processing,Balance Tracking,Transaction Management,App Design,User Experience",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "E-commerce Analytics Dashboard",
			description:
				"A versatile desktop UI/UX analytics dashboard design for an e-commerce platform, featuring a modern interface with dark and light themes, offering insights into income, top clients, popular products, and statistical data for effective business monitoring.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/bd14ace8-7a8e-42d7-80e1-f283aa09b8c3/content",
			tags:
				"UI/UX Design,Analytics Dashboard,E-commerce,Desktop Design,Data Visualization,Theme Switch,Business Insights,User Interface,Dashboard Prototype",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Agro-Allied Mobile App",
			description:
				"A vibrant mobile UI/UX design for an agro-allied app, offering clear farm data visualizations, climate insights, top-selling products, and seamless ordering with delivery tracking, enhancing agricultural management and customer experience.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/5fb49e72-9ed5-4af0-9621-9f60a7a75bdc/content",
			tags:
				"Mobile UI/UX,Agro-Allied App,Farm Data,Climate Insights,Product Visualization,E-commerce,Delivery Tracking,Agricultural App,User Experience",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Messaging App UI/UX",
			description:
				"A sleek mobile UI/UX design for a messaging app, featuring light and dark themes, intuitive chat lists, status updates, call logs, and settings, optimized for seamless communication and user engagement.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/55730ec3-698d-4db8-83ba-83830056c688/content",
			tags:
				"Mobile UI/UX,Messaging App,Chat Design,Dark Theme,Light Theme,Communication App,User Interface,Status Updates,Call Logs",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Online Casino Social Media Designs",
			description:
				"A vibrant set of social media designs for an online casino, featuring engaging themes like motivation, trivia, jackpots, and interactive games, designed to attract and retain users with bold visuals and enticing calls to action.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/923d92cc-ffd0-470f-82f8-e8204b0f4d53/content",
			tags:
				"Social Media Design,Online Casino,Digital Marketing,Graphic Design,Engagement Strategy,Jackpot Promotion,Interactive Ads,Casino Branding,User Attraction",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Crypto Trading Social Media Bundle",
			description:
				"A dynamic social media design bundle package for a crypto trading brand, featuring engaging visuals for New Year greetings, secure trading promotions, and crypto exchange offers, designed to boost brand presence and attract users.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/0338a1e4-5f01-43f2-b069-e666c829a401/content",
			tags:
				"Social Media Design,Design Bundle,Crypto Trading,Digital Marketing,Brand Promotion,New Year Campaign,Secure Trading,Crypto Exchange,Graphic Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Product Promotion Social Media Posts",
			description:
				"A diverse set of social media post designs promoting various products and services, including food delivery, milkshakes, organic fruits, new product collections, and investment opportunities, crafted to engage audiences with vibrant visuals and clear calls to action.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/85d5f1f9-47b5-4373-a71f-f3f2ac912b4e/content",
			tags:
				"Social Media Design,Digital Marketing,Food Delivery,Product Promotion,Organic Food,Investment Ads,Graphic Design,Engagement Strategy,Brand Promotion",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Apus Industries Brand Identity",
			description:
				"A cohesive brand identity design for Apus Industries Limited, featuring a bold logo, versatile merchandise (water bottle, cap, and t-shirt), and a consistent color scheme with hex #4A8cdc and Montserrat typeface, reflecting a modern and professional aesthetic.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/2c978ea9-725b-40a6-91ac-a33b1cc69bcf/content",
			tags:
				"Brand Identity,Logo Design,Merchandise Design,Corporate Branding,Color Scheme,Typography,Professional Design,Apus Industries,Modern Aesthetic",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "branding",
			status: "published",
		},
		{
			title: "Polycarp Beauty Social Media Designs",
			description:
				"A captivating set of social media designs for Polycarp Beauty, showcasing bold makeup looks, empowering messages, and a portfolio highlight, designed to engage beauty enthusiasts with vibrant visuals and confident branding.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/747ed407-e294-4951-8b52-e5d7812467a1/content",
			tags:
				"Social Media Design,Beauty Brand,Makeup Promotion,Portfolio Showcase,Brand Engagement,Visual Marketing,Empowerment Ads,Cosmetic Branding,Graphic Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "ui",
			status: "published",
		},
		{
			title: "Polycarp Beauty Branding",
			description:
				"A sophisticated branding design for Polycarp Beauty, featuring a distinctive logo, a harmonious color palette (#6f4e37, #e8d4a2, #f0e6d2), the Gatwick typeface, and elegant product visuals, highlighting a premium skincare and beauty experience.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/b41dadf0-7b64-4dcc-89a1-7ad350fa5d2e/content",
			tags:
				"Social Media Design, Trenztech, Digital Transformation, Web Development, Mobile Development, Tech Promotion, Fun Facts, Expert Solutions, Graphic Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "branding",
			status: "published",
		},
		{
			title: "Social media designs for TrenzTech",
			description:
				"A vibrant collection of social media designs for Trenztech, highlighting digital transformation, innovative web and mobile development, fun facts about the World Wide Web, and expert solutions, designed to engage and attract tech enthusiasts.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/4eda9562-b62e-4d75-af52-6012b999b313/content",
			tags:
				"Social Media Design, Trenztech, Digital Transformation, Web Development, Mobile Development, Tech Promotion, Fun Facts, Expert Solutions, Graphic Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "branding",
			status: "published",
		},
		{
			title: "Branding for Holdbridge",
			description:
				"A modern and cohesive branding design for Holdbridge, featuring a distinctive logo, a vibrant color palette (#28949b, #00343d, #009499), Inter typeface, and versatile merchandise including a water bottle, cap, t-shirt, and digital assets, reflecting a dynamic and professional identity.",
			imageUrl:
				"https://assets.grok.com/users/53c811ce-fbaa-45c0-8272-c6dc0eb90e25/130e9e4e-9a23-4edb-b1bc-f0de6e6cc71a/content",
			tags:
				"Branding, Logo Design, Holdbridge, Color Palette, Typography, Merchandise Design, Professional Identity, Digital Branding, Modern Design",
			liveUrl: "https://example.com",
			figmaUrl: "https://figma.com/file/example",
			category: "branding",
			status: "published",
		},
	];

	for (const project of sampleProjects) {
		await prisma.project.create({
			data: project,
		});
	}

	console.log("📁 Created sample projects");

	// Create sample testimonials
	const sampleTestimonials = [
		{
			name: "Sarah Johnson",
			role: "CEO, TechStart Inc.",
			content:
				"André's design work exceeded our expectations. His attention to detail and creative approach transformed our digital presence completely.",
			rating: 5,
			avatarUrl: "/placeholder.svg?height=60&width=60",
		},
		{
			name: "Michael Chen",
			role: "Product Manager, InnovateCorp",
			content:
				"Working with André was a game-changer for our project. His design expertise and user-centered approach are truly exceptional.",
			rating: 5,
			avatarUrl: "/placeholder.svg?height=60&width=60",
		},
		{
			name: "Emily Rodriguez",
			role: "Marketing Director, BrandFlow",
			content:
				"André delivered a stunning brand identity that perfectly captured our vision. The design system is comprehensive and beautiful.",
			rating: 5,
			avatarUrl: "/placeholder.svg?height=60&width=60",
		},
		{
			name: "David Thompson",
			role: "Founder, StartupHub",
			content:
				"The mobile app design André created for us has received incredible feedback from our users. Highly recommended!",
			rating: 5,
			avatarUrl: "/placeholder.svg?height=60&width=60",
		},
		{
			name: "Lisa Wang",
			role: "CTO, DataFlow Solutions",
			content:
				"André's UI/UX design skills are impressive. He delivered a complex dashboard design that's both beautiful and functional.",
			rating: 5,
			avatarUrl: "/placeholder.svg?height=60&width=60",
		},
		{
			name: "James Miller",
			role: "Creative Director, DesignStudio",
			content:
				"André's design sensibility is outstanding. He created a visual identity that perfectly represents our company.",
			rating: 5,
			avatarUrl: "/placeholder.svg?height=60&width=60",
		},
	];

	for (const testimonial of sampleTestimonials) {
		await prisma.testimonial.create({
			data: testimonial,
		});
	}

	console.log("💬 Created sample testimonials");

	// Create skill categories and skills
	const skillCategories = [
		{
			category: "Graphics & Media",
			icon: "Image",
			skills: [
				{ name: "Digital Illustration", level: 85 },
				{ name: "Mockup Designs", level: 90 },
				{ name: "Logo Designs & Branding", level: 92 },
				{ name: "Social Media Graphics", level: 95 },
			],
		},
		{
			category: "UI/UX Design",
			icon: "Layout",
			skills: [
				{ name: "Wireframing", level: 88 },
				{ name: "Prototyping", level: 90 },
				{ name: "User Interface Design", level: 93 },
				{ name: "User Experience Research", level: 87 },
			],
		},
		{
			category: "Specialized Designs",
			icon: "Monitor",
			skills: [
				{ name: "Landing Page Design", level: 92 },
				{ name: "E-commerce Websites", level: 89 },
				{ name: "Fintech & Banking Apps", level: 91 },
				{ name: "Web3 & Crypto Payments", level: 87 },
			],
		},
		{
			category: "Brand Identity",
			icon: "Palette",
			skills: [
				{ name: "Brand Guidelines Creation", level: 91 },
				{ name: "Typography Selection", level: 89 },
				{ name: "Color Palette Development", level: 93 },
				{ name: "Visual Identity Systems", level: 90 },
			],
		},
		{
			category: "Digital Marketing Assets",
			icon: "Megaphone",
			skills: [
				{ name: "Banner Ad Design", level: 88 },
				{ name: "Email Campaign Graphics", level: 86 },
				{ name: "Infographic Design", level: 90 },
				{ name: "Presentation Design", level: 87 },
			],
		},
		{
			category: "Design Tools",
			icon: "Tool",
			skills: [
				{ name: "Canva", level: 92 },
				{ name: "Photoshop", level: 90 },
				{ name: "Figma", level: 95 },
				{ name: "Other AI Tools", level: 88 },
			],
		},
	];

	for (const categoryData of skillCategories) {
		const skillCategory = await prisma.skillCategory.create({
			data: {
				category: categoryData.category,
				icon: categoryData.icon,
				skills: {
					createMany: {
						data: categoryData.skills,
					},
				},
			},
		});
	}

	console.log("🎯 Created skill categories and skills");
	console.log("✅ Database seeded successfully!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
