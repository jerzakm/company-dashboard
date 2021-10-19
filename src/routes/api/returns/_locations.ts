import { prisma } from '../_prisma';

export const getPhysicalLocations = async () => {
	try {
		return await prisma.physicalLocation.findMany({
			include: {
				products: {
					include: {
						product: true
					}
				}
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const setProductLocation = async (id, locationId, userId, description = '') => {
	try {
		const loc = await prisma.returnLocation.findFirst({
			where: {
				productId: id
			}
		});

		if (loc) {
			await prisma.returnLocation.delete({
				where: {
					id: loc.id
				}
			});
		}

		return await prisma.returnProduct.update({
			where: {
				id
			},
			data: {
				location: {
					create: {
						id,
						locationId,
						userId,
						description
					}
				}
			},
			include: {
				location: {
					include: {
						locationInfo: true
					}
				}
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};
