import type { ReturnSender } from '@prisma/client';
import { prisma } from '../_prisma';

export const getReturnsList = async () => {
	try {
		return await prisma.returnEntry.findMany({
			include: {
				events: true,
				images: true,
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
				events: {
					include: {
						user: {
							select: {
								id: true,
								name: true
							}
						}
					}
				},
				images: true,
				notes: {
					include: {
						user: {
							select: {
								id: true,
								name: true
							}
						}
					}
				},
				products: {
					include: {
						location: {
							include: {
								locationInfo: true,
								product: true,
								user: true
							}
						}
					}
				},
				returnReason: true,
				sender: true,
				saleSource: true
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};
