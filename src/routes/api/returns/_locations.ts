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
