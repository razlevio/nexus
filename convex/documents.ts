import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Mutation to archive a document.
 * It verifies user authentication and ownership before archiving the document.
 * @returns The archived document.
 */
export const archive = mutation({
  args: { id: v.id("documents") },
  // Authentication and authorization checks.
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Recursive function to archive the document and its children.
    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    // Archive the main document.
    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

/**
 * Query to get documents for the sidebar based on the parent document.
 * It verifies user authentication before returning the documents.
 * @returns An array of documents.
 */
export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    // Authentication check.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    // Fetch documents based on the parent document and user ID.
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

/**
 * Mutation to create a new document.
 * It verifies user authentication before inserting the new document.
 * @returns The newly created document.
 */
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    // Authentication check.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    // Insert the new document with given title and parent document.
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

/**
 * Query to get documents from the trash.
 * It verifies user authentication and returns only the documents owned by the user that are archived.
 * @returns An array of archived documents.
 */
export const getTrash = query({
  handler: async (ctx) => {
    // Authentication check.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    // Fetch archived documents owned by the user.
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

/**
 * Mutation to restore a document from the trash.
 * It verifies user authentication and ownership before restoring the document and its children.
 * @returns The restored document.
 */
export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    // Authentication and authorization checks.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) {
      throw new Error("Not found");
    }
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Recursive function to restore the document and its children.
    const recursiveRestore = async (documentId: Id<"documents">) => {
    const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    // Restore the main document and handle the parent document if it's archived.
    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  },
});


/**
 * Mutation to permanently remove a document.
 * It verifies user authentication and ownership before deleting the document.
 * @returns The deleted document.
 */
export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    // Authentication and authorization checks.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) {
      throw new Error("Not found");
    }
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Delete the document.
    const document = await ctx.db.delete(args.id);
    return document;
  },
});

/**
 * Query to get documents based on a search criteria.
 * It verifies user authentication and returns documents owned by the user that aren't archived.
 * @returns An array of documents matching the search criteria.
 */
export const getSearch = query({
  handler: async (ctx) => {
    // Authentication check.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    // Fetch non-archived documents owned by the user.
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

/**
 * Query to get a document by its ID.
 * It verifies user authentication and checks if the document is published and not archived or if the user is the owner.
 * @returns The requested document if found and authorized.
 */
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Not found");
    }

    // Check if the document is publicly accessible or owned by the user.
    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

/**
 * Mutation to update a document's details.
 * It verifies user authentication and ownership before applying the updates.
 * @returns The updated document.
 */
export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Update the document with the provided details.
    const document = await ctx.db.patch(args.id, {
      ...rest,
    });

    return document;
  },
});


/**
 * Mutation to remove an icon from a document.
 * It verifies user authentication and ownership before removing the icon.
 * @returns The document with the icon removed.
 */
export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Remove the icon from the document.
    const document = await ctx.db.patch(args.id, {
      icon: undefined,
    });

    return document;
  },
});

/**
 * Mutation to remove a cover image from a document.
 * It verifies user authentication and ownership before removing the cover image.
 * @returns The document with the cover image removed.
 */
export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Remove the cover image from the document.
    const document = await ctx.db.patch(args.id, {
      coverImage: undefined,
    });

    return document;
  },
});