import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { updateReturnReason } from './_helpers';

export async function post({ request }) {
	let status = 400;

	const authorization = await request.headers.get('authorization');
	if (!authorization) {
		return {
			status: 401
		};
	}
	const permission = await tokenHasPermission(authorization, ApiPermission.returns.edit);

	if (!permission.granted) {
		status = 401;
		return { status };
	}

	const body = {
		data: {},
		err: {}
	};

	try {
		const { returnProductId, locationId } = await request.json();

		const currentLocation = await prisma.returnLocation.findFirst({
			where: {
				productId: returnProductId
			}
		});

		if (currentLocation) {
			await prisma.returnLocation.delete({
				where: {
					id: currentLocation.id
				}
			});
		}

		await prisma.returnProduct.update({
			where: {
				id: returnProductId
			},
			data: {
				location: {
					create: {
						description: '',
						locationId: locationId,
						userId: permission.userId
					}
				}
			}
		});

		// const returnReasonUpdate = await updateReturnReason(returnId, returnReasonId);

		// body.data = returnReasonUpdate;

		status = 200;
	} catch (e) {
		console.log(e);
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
