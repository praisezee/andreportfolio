import Database from "better-sqlite3"
import path from "path"

let db: Database.Database

export function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data", "portfolio.db")
    db = new Database(dbPath)
    db.pragma("foreign_keys = ON")
  }
  return db
}

export function closeDb() {
  if (db) {
    db.close()
    db = undefined as any
  }
}

// Helper function to convert snake_case database columns to camelCase
export function snakeToCamel(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      result[camelKey] = obj[key]
    }
  }

  return result
}
