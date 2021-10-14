import { AppLogStatus, createAppLogEntry } from '../../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { addImage, createReturnEvent } from '../_returnEntry';

export async function post(request) {
	// console.log('req');
	let status = 400;
	let body: any = {};

	// console.log(request);

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.EDIT_RETURN);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		const res = await addImage(request.body.imgSrc, permission.userId, request.body.returnId);
		if (res) {
			await createReturnEvent(res.returnId, permission.userId, 'Add', 'Dodano zdjęcie', '');
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
