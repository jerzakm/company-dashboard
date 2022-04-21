import { ApiPermission } from '$lib/core/auth';
import { tokenHasPermission } from '../../_prisma';
import { addReturnEvent, updateReturnReason } from './_helpers';

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
		const { returnReasonId, returnId } = await request.json();

		const returnReasonUpdate = await updateReturnReason(returnId, returnReasonId);

		body.data = returnReasonUpdate;

		if (returnReasonUpdate) {
			await addReturnEvent(
				returnId,
				permission.userId,
				`returnEvents.returnReasonUpdate`,
				JSON.stringify(returnReasonUpdate),
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
