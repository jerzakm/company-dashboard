import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function post(request) {
	const userQuery = await prisma.user.findUnique({
		where: {
			login: request.body.login
		}
	});

	let user: null | AuthUser = null;

	if (userQuery && userQuery.password == request.body.password) {
		user = {
			login: userQuery.login,
			name: userQuery.name,
			password: userQuery.password,
			active: userQuery.active
		};
	}

	return {
		body: {
			user
		}
	};
}

export interface AuthUser {
	login: string;
	name: string;
	password: string;
	active: boolean;
}
