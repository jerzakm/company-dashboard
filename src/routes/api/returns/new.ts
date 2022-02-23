import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../_prisma';

export async function post({ request }) {
	let data;
	const authorization = await request.headers.get('authorization');

	if (!authorization) {
		return {
			status: 401
		};
	}

	const permission = await tokenHasPermission(authorization, ApiPermission.returns.addNew);

	try {
		data = await prisma.returnEntry.create({
			data: {
				sender: {
					create: {
						city: '',
						country: 'PL',
						name: '',
						postCode: '',
						phone: '',
						street: ''
					}
				},
				resolved: false,
				events: {
					create: {
						description: '',
						userId: permission.userId,
						type: 'returns.entry.events.created'
					}
				}
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
