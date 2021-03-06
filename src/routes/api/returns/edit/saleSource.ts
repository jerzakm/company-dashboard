import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { addReturnEvent, updateSaleSource } from './_helpers';

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
		const { saleSourceId, returnId } = await request.json();

		const saleSourceUpdate = await updateSaleSource(returnId, saleSourceId);

		body.data = saleSourceUpdate;

		if (saleSourceUpdate) {
			await addReturnEvent(
				returnId,
				permission.userId,
				`returnEvents.saleSourceUpdated`,
				JSON.stringify(saleSourceUpdate),
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
