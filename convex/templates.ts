import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const fetchAllTemplates = query({
  args: {},
  handler: async (ctx) => {
    const templates = await ctx.db.query("templates").collect();
    return templates;
  },
});

export const SaveTemplate = mutation({
  args: {
    name: v.string(),
    ImagePreview: v.string(),
    JSONData: v.any(),
    width: v.number(),
    height: v.number(),
  },
  handler: async (ctx, args) => {
    // check if the template is already there in the table
    const existingTemplate = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("imagePreview"), args.ImagePreview))
      .collect();
    if (existingTemplate && existingTemplate.length > 0) {
      return existingTemplate[0]._id;
    }

    const result = await ctx.db.insert("templates", {
      name: args.name,
      width: args.width,
      height: args.height,
      imagePreview: args.ImagePreview,
      jsonData: args.JSONData,
      active: true, // default to active
    });
    return result;
  },
});
