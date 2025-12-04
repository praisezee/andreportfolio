import { prisma } from "./prisma";
import { hash, compare } from "bcryptjs";
import type {
	Project,
	Testimonial,
	SkillCategory,
	Skill,
	User,
} from "@prisma/client";

// Extended types for better frontend usage
export type ProjectWithDates = Omit<Project, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
};

export type TestimonialWithDates = Omit<
	Testimonial,
	"createdAt" | "updatedAt"
> & {
	createdAt: string;
	updatedAt: string;
};

export interface SkillCategoryWithSkills
	extends Omit<SkillCategory, "createdAt" | "updatedAt"> {
	skills: Array<{ name: string; level: number }>;
	createdAt: string;
	updatedAt: string;
}

export type UserWithDates = Omit<User, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
};

// Helper function to convert dates to strings
function convertDates<T extends { createdAt: Date; updatedAt: Date }>(
	item: T
): Omit<T, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
} {
	return {
		...item,
		createdAt: item.createdAt.toISOString(),
		updatedAt: item.updatedAt.toISOString(),
	};
}

// Project operations
export const projectStore = {
	findMany: async (): Promise<ProjectWithDates[]> => {
		await prisma.$connect();
		console.log("connected");
		const projects = await prisma.project.findMany({
			orderBy: { createdAt: "desc" },
		});
		await prisma.$disconnect();
		return projects.map(convertDates);
	},

	findUnique: async (id: string): Promise<ProjectWithDates | null> => {
		await prisma.$connect();
		const project = await prisma.project.findUnique({
			where: { id },
		});
		await prisma.$disconnect();
		return project ? convertDates(project) : null;
	},

	create: async (
		data: Omit<Project, "id" | "createdAt" | "updatedAt">
	): Promise<ProjectWithDates> => {
		await prisma.$connect();
		const project = await prisma.project.create({
			data,
		});
		await prisma.$disconnect();
		return convertDates(project);
	},

	update: async (
		id: string,
		data: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>
	): Promise<ProjectWithDates> => {
		await prisma.$connect();
		const project = await prisma.project.update({
			where: { id },
			data,
		});
		await prisma.$disconnect();
		return convertDates(project);
	},

	delete: async (id: string): Promise<ProjectWithDates> => {
		await prisma.$connect();
		const project = await prisma.project.delete({
			where: { id },
		});
		await prisma.$disconnect();
		return convertDates(project);
	},
};

// Testimonial operations
export const testimonialStore = {
	findMany: async (): Promise<TestimonialWithDates[]> => {
		await prisma.$connect();
		const testimonials = await prisma.testimonial.findMany({
			orderBy: { createdAt: "desc" },
		});
		await prisma.$disconnect();
		return testimonials.map(convertDates);
	},

	findUnique: async (id: string): Promise<TestimonialWithDates | null> => {
		await prisma.$connect();
		const testimonial = await prisma.testimonial.findUnique({
			where: { id },
		});
		await prisma.$disconnect();
		return testimonial ? convertDates(testimonial) : null;
	},

	create: async (
		data: Omit<Testimonial, "id" | "createdAt" | "updatedAt">
	): Promise<TestimonialWithDates> => {
		await prisma.$connect();
		const testimonial = await prisma.testimonial.create({
			data,
		});
		await prisma.$disconnect();
		return convertDates(testimonial);
	},

	update: async (
		id: string,
		data: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>
	): Promise<TestimonialWithDates> => {
		await prisma.$connect();
		const testimonial = await prisma.testimonial.update({
			where: { id },
			data,
		});
		await prisma.$disconnect();
		return convertDates(testimonial);
	},

	delete: async (id: string): Promise<TestimonialWithDates> => {
		await prisma.$connect();
		const testimonial = await prisma.testimonial.delete({
			where: { id },
		});
		await prisma.$disconnect();
		return convertDates(testimonial);
	},
};

// Skill operations
export const skillStore = {
	findMany: async (): Promise<SkillCategoryWithSkills[]> => {
		await prisma.$connect();
		const categories = await prisma.skillCategory.findMany({
			include: {
				skills: {
					select: {
						name: true,
						level: true,
					},
					orderBy: { id: "asc" },
				},
			},
			orderBy: { createdAt: "desc" },
		});
		await prisma.$disconnect();
		return categories.map((category) => ({
			...convertDates(category),
			skills: category.skills,
		}));
	},

	findUnique: async (id: string): Promise<SkillCategoryWithSkills | null> => {
		await prisma.$connect();
		const category = await prisma.skillCategory.findUnique({
			where: { id },
			include: {
				skills: {
					select: {
						name: true,
						level: true,
					},
					orderBy: { id: "asc" },
				},
			},
		});
		await prisma.$disconnect();
		return category
			? {
					...convertDates(category),
					skills: category.skills,
			  }
			: null;
	},

	create: async (data: {
		category: string;
		icon: string;
		skills: Array<{ name: string; level: number }>;
	}): Promise<SkillCategoryWithSkills> => {
		await prisma.$connect();
		const category = await prisma.skillCategory.create({
			data: {
				category: data.category,
				icon: data.icon,
				skills: {
					create: data.skills,
				},
			},
			include: {
				skills: {
					select: {
						name: true,
						level: true,
					},
					orderBy: { id: "asc" },
				},
			},
		});
		await prisma.$disconnect();

		return {
			...convertDates(category),
			skills: category.skills,
		};
	},

	update: async (
		id: string,
		data: {
			category?: string;
			icon?: string;
			skills?: Array<{ name: string; level: number }>;
		}
	): Promise<SkillCategoryWithSkills> => {
		await prisma.$connect();
		// If skills are being updated, delete existing ones first
		if (data.skills) {
			await prisma.skill.deleteMany({
				where: { categoryId: id },
			});
		}

		const category = await prisma.skillCategory.update({
			where: { id },
			data: {
				category: data.category,
				icon: data.icon,
				skills: data.skills
					? {
							create: data.skills,
					  }
					: undefined,
			},
			include: {
				skills: {
					select: {
						name: true,
						level: true,
					},
					orderBy: { id: "asc" },
				},
			},
		});
		await prisma.$disconnect();
		return {
			...convertDates(category),
			skills: category.skills,
		};
	},

	delete: async (id: string): Promise<SkillCategoryWithSkills> => {
		await prisma.$connect();
		const category = await prisma.skillCategory.delete({
			where: { id },
			include: {
				skills: {
					select: {
						name: true,
						level: true,
					},
				},
			},
		});
		await prisma.$disconnect();
		return {
			...convertDates(category),
			skills: category.skills,
		};
	},
};

// User operations
export const userStore = {
	findUnique: async (username: string): Promise<UserWithDates | null> => {
		await prisma.$connect();
		const user = await prisma.user.findUnique({
			where: { username },
		});
		await prisma.$disconnect();
		return user ? convertDates(user) : null;
	},

	updateCredentials: async (
		id: string,
		data: { username?: string; password?: string }
	): Promise<UserWithDates> => {
		await prisma.$connect();
		const updateData: { username?: string; password?: string } = {};

		if (data.username) {
			updateData.username = data.username;
		}

		if (data.password) {
			updateData.password = await hash(data.password, 12);
		}

		const user = await prisma.user.update({
			where: { id },
			data: updateData,
		});
		await prisma.$disconnect();
		return convertDates(user);
	},

	verifyPassword: async (
		username: string,
		password: string
	): Promise<boolean> => {
		await prisma.$connect();
		const user = await prisma.user.findUnique({
			where: { username },
		});
		await prisma.$disconnect();
		if (!user) {
			return false;
		}

		return compare(password, user.password);
	},
};

// Export Prisma types for use in components
export type { Project, Testimonial, SkillCategory, Skill, User };
