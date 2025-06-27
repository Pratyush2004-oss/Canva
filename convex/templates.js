import { query } from "./_generated/server";

export const fetchAllTemplates = query({
    args: {},
    handler: async (ctx) => {
        const templates = await ctx.db.query("templates").collect();
        return templates;
    },

})