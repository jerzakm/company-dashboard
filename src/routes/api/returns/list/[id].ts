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

	const id = parseInt(params.id);

	try {
		data = await prisma.returnEntry.findUnique({
			where: {
				id
			},
			include: {
				images: {
					select: {
						user: {
							select: {
								name: true
							}
						},
						created_at: true,
						extension: true,
						id: true
					}
				},
				notes: true,
				products: {
					select: {
						description: true,
						group: true,
						id: true,
						location: {
							include: { locationInfo: true }
						},
						name: true,
						price: true,
						quantity: true,
						symbol: true
					}
				},
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
