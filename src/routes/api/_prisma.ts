import { Prisma, PrismaClient } from '@prisma/client';

export const prisma: PrismaClient<
	Prisma.PrismaClientOptions,
	never,
	Prisma.RejectOnNotFound | Prisma.RejectPerOperation
> = new PrismaClient();

export const dbAuthCheck = async (login, password) => {
	const user = await prisma.user.findFirst({
		where: {
			login
		}
	});

	return user;
};
