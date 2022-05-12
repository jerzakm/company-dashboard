import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { addReturnEvent } from './_helpers';

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
		const { shippingCompanyId, returnId } = await request.json();

		const shippingUpdate = await prisma.returnEntry.update({
			where: {
				id: returnId
			},
			data: {
				shippingCompanyId
			},
			select: {
				ShippingCompany: true
			}
		});

		body.data = shippingUpdate;

		if (shippingUpdate) {
			await addReturnEvent(
				returnId,
				permission.userId,
				`returnEvents.shippingCompanyUpdate`,
				JSON.stringify(shippingUpdate),
				''
			);
		}

		status = 200;
	} catch (e) {
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
