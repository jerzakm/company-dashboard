import { prisma } from '../_prisma';

export const getSaleSources = async () => {
	try {
		return await prisma.saleSource.findMany({});
	} catch (e) {
		console.log(e);
		return null;
	}
};
