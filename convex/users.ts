import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args:{
        name:v.string(),
        email: v.string(),
        picture: v.string(),
    },
    handler: async (ctx, args) => {
        // if user already exists
        const userData = await ctx.db.query("users")

        // If not, then we eill insert the user



    }
})