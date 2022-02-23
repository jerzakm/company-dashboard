import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';

export async function get({ params, request }) {
	let data;
	const authorization = await request.headers.get('authorization');

	if (!authorization) {
		return {
			status: 401
		};
	}

	const permission = await tokenHasPermission(authorization, ApiPermission.returns.get);

	try {
		data = await prisma.returnEntry.findMany({
			include: {
				images: true,
				notes: true,
				products: true,
				returnReason: true,
				sender: true
			}
		});
	} catch (e) {
		console.log(e);
	}

	return {
		status: permission.granted ? 200 : 401,
		body: { data }
	};
}
