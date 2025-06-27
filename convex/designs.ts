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
  args:{
    id: v.id("designs")
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  }
})

// saving the design data to the convex
export const SaveDesign = mutation({
  args : {
    id: v.id("designs"),
    jsonDesign: v.any(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, {
      jsonTemplate: args.jsonDesign,
      imagePreview: args.imageUrl || "",
    })
    return result;
  }
})