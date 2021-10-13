import type { ReturnSender } from '@prisma/client';
import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { updateSender } from '../_returnEntry';

export async function put(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.GET_RETURN_LIST);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	try {
		const sender: ReturnSender = request.body;
		const updatedSender = await updateSender(sender);

		status = 200;
		body = updatedSender;
	} catch (e) {
		console.log(e);
	}

	return {
		status,
		body
	};
}
