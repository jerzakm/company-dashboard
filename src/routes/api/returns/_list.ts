import type { ReturnSender } from '@prisma/client';
import { prisma } from '../_prisma';

export const getReturnsList = async () => {
	try {
		return await prisma.returnEntry.findMany({
			include: {
				events: true,
				images: true,
				location: true,
				notes: true,
				products: true,
				returnReason: true,
				sender: true
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const getReturn = async (id: string) => {
	try {
		return await prisma.returnEntry.findUnique({
			where: {
				id: parseInt(id)
			},
			include: {
				events: true,
				images: true,
				location: true,
				notes: true,
				products: true,
				returnReason: true,
				sender: true
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};
