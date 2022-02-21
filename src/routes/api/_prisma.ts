import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const dbAuthCheck = async (login, password) => {
	const user = await prisma.user.findFirst({
		where: {
			login
		}
	});

	return user;
};

export const tokenHasPermission = async (token: string, requiredPermission: string) => {
	console.log(token);
	const login = token.split(':')[0];
	const password = token.split(':')[1];
	let granted = false;

	const user = await prisma.user.findFirst({
		where: {
			login,
			password
		},
		include: { permissions: true }
	});

	if (user && user.permissions) {
		for (const permission of user.permissions) {
			if (permission.name == requiredPermission) {
				granted = true;
			}
		}
	}

	return {
		userId: user.id ? user.id : undefined,
		granted
	};
};
