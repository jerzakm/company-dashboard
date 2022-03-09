import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { updateSaleDocument, updateSaleSource } from './_helpers';

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
		const { saleDocument, returnId } = await request.json();

		const saleSourceUpdate = await updateSaleDocument(returnId, saleDocument);

		body.data = saleSourceUpdate;

		status = 200;
	} catch (e) {
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
