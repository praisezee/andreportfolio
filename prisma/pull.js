import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchAllTablesAndData() {
	try {
		// Detect provider from your Prisma config
		const provider = process.env.DATABASE_PROVIDER || "postgres";

		let tablesQuery;

		if (provider === "postgres") {
			tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema='public';
      `;
		} else if (provider === "mysql") {
			tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE();
      `;
		} else if (provider === "sqlite") {
			tablesQuery = `
        SELECT name as table_name 
        FROM sqlite_master 
        WHERE type='table';
      `;
		} else {
			throw new Error(
				"Unsupported provider. Set DATABASE_PROVIDER=postgres|mysql|sqlite"
			);
		}

		// Get all table names
		const tables = await prisma.$queryRawUnsafe(tablesQuery);

		const result = {};

		for (const row of tables) {
			const tableName = row.table_name;

			// Skip Prisma internal migrations table
			if (tableName === "_prisma_migrations") continue;

			const data = await prisma.$queryRawUnsafe(`SELECT * FROM ${tableName};`);
			result[tableName] = data;
		}

		console.log(JSON.stringify(result, null, 2));
		return result;
	} catch (error) {
		console.error("Error fetching tables:", error);
	} finally {
		await prisma.$disconnect();
	}
}

fetchAllTablesAndData();
