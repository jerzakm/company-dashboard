import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function post(request) {
	const article = { test: 'test' };

	const res = await prisma.user.findUnique({
		where: {
			login: request.body.login
		}
	});

	console.log(res);

	if (article) {
		return {
			body: {
				k: 'k'
			}
		};
	}
}
