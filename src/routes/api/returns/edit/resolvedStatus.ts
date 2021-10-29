import { AppLogStatus, createAppLogEntry } from '../../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { createReturnEvent, updateResolvedStatus } from '../_returnEntry';

export async function post(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.EDIT_RETURN);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		const res = await updateResolvedStatus(request.body);
		if (res) {
			await createReturnEvent(res.id, permission.userId, 'Edit', 'Zmieniono status zwrotu', JSON.stringify(request.body));
		}
		body = res;
		status = 200;
	} catch (e) {
		createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}