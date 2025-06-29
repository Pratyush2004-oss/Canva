import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// creating the new data
export const CreateNewDesign = mutation({
  args: {
    name: v.string(),
    width: v.number(),
    height: v.number(),
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("designs", {
      name: args.name,
      width: args.width,
      height: args.height,
      uid: args.uid,
    });

    return result;
  },
});

// getting the design data from the convex by design id
export const GetDesign = query({
  args: {
    id: v.id("designs"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});

// saving the design data to the convex
export const SaveDesign = mutation({
  args: {
    id: v.id("designs"),
    jsonDesign: v.any(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, {
      jsonTemplate: args.jsonDesign,
      imagePreview: args.imageUrl || "",
    });
    return result;
  },
});

// getting the design data from the convex by user id
export const GetDesignsByUser = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const designs = await ctx.db
      .query("designs")
      .filter((q) => q.eq(q.field("uid"), args.id))
      .collect();
    return designs;
  },
});

export const GetDesignsByUserForTemplate = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const designs = await ctx.db
      .query("designs")
      .filter((q) => q.eq(q.field("uid"), args.id))
      .filter((q) => q.neq(q.field("imagePreview"), undefined))
      .collect();
    return designs;
  },
});

// getting design by selecting template
export const CrateDesignFromTemplate = mutation({
  args: {
    name: v.string(),
    imagePreview: v.optional(v.string()),
    JSONTemplate: v.any(),
    uid: v.id("users"),
    height: v.number(),
    width: v.number(),
  },
  handler: async (ctx, args) => {
    // check if the design is already there in the table
    const existingDesign = await ctx.db
    .query("designs")
    .filter((q => q.eq(q.field("uid"), args.uid)))
    .filter((q => q.eq(q.field("name"), args.name)))
    .collect();
    if (existingDesign?.length > 0) {
      return existingDesign[0]._id;
    }

    const result = await ctx.db.insert("designs", {
      name: args.name,
      uid: args.uid,
      height: args.height,
      width: args.width,
      imagePreview: args.imagePreview,
      jsonTemplate: args.JSONTemplate,
    });
    return result;
  },
});
