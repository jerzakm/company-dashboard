import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function get(req) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	console.log(req);

	const article = { test: 'test' };

	//https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

	if (article) {
		return {
			body: {
				article
			}
		};
	}
}
