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
