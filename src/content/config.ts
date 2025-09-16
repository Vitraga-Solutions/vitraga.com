import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: ({image}) => z.object({
		title: z.string(),
		coverImage: image(),
		tags: z.array(z.string()),
		featured: z.boolean().default(false),
		excerpt: z.string().optional(),
		publishedDate: z.date().transform((date) => date
			.toLocaleDateString(undefined, {
				year: "numeric",
				month: "short",
				day: "numeric",
		})),
	}),
});

const serviceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
	blogs: postsCollection,
	service: serviceCollection,
};