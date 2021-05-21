import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function get({ params }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	const article = { test: 'test' };

	if (article) {
		return {
			body: {
				article
			}
		};
	}
}
