import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../_prisma';

export async function get({ request }) {
	let data;
	const authorization = await request.headers.get('authorization');

	if (!authorization) {
		return {
			status: 401
		};
	}

	const permission = await tokenHasPermission(authorization, ApiPermission.returns.get);

	try {
		const saleSources = await prisma.saleSource.findMany({});
		const returnReasons = await prisma.returnReason.findMany({});
		const locations = await prisma.physicalLocation.findMany({
			select: {
				name: true,
				subName: true,
				id: true
			}
		});
		const shippingCompanies = await prisma.shippingCompany.findMany();

		const locationGroups = [
			...new Set(
				locations.map((l) => {
					return l.subName;
				})
			)
		];

		const locationsByGroup = locationGroups.map((group) => {
			return {
				name: group,
				locations: locations.filter((r) => {
					return r.subName == group;
				})
			};
		});

		data = { saleSources, returnReasons, locations, locationsByGroup, shippingCompanies };
	} catch (e) {
		console.log(e);
	}

	return {
		status: permission.granted ? 200 : 401,
		body: { data }
	};
}
