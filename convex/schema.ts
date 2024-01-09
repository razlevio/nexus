import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"


/**
 * Defines the schema for the Convex database.
 * This schema defines a single table named 'documents' with various fields and indexes.
 * 
 * @returns {Object} The schema definition for the Convex database.
 */
export default defineSchema({
    // Define the 'documents' table with its structure and types.
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
  .index("by_user", ["userId"])
  .index("by_user_parent", ["userId", "parentDocument"])
})