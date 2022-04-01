import { ApiPermission } from '$lib/core/auth';
import { tokenHasPermission } from '../../_prisma';
import { updateEntryStatus } from './_helpers';

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
		const { entryStatus, returnId } = await request.json();

		const returnReasonUpdate = await updateEntryStatus(returnId, entryStatus);

		body.data = returnReasonUpdate;

		status = 200;
	} catch (e) {
		return { status: 500 };
	}

	return {
		status,
		body
	};
}
