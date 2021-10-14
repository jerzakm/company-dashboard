import { AppLogStatus, createAppLogEntry } from '../../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { addProduct, createReturnEvent, delProduct } from '../_returnEntry';

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
		console.log(request.body);
		const res = await addProduct(request.body, permission.userId, request.body.returnId);
		if (res) {
			await createReturnEvent(res.returnId, permission.userId, 'Add', 'Dodano produkt', JSON.stringify(res));
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

export async function del(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.EDIT_RETURN);

	console.log(permission);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		const res = await delProduct(request.body);
		if (res) {
			await createReturnEvent(res.returnId, permission.userId, 'Remove', 'Usunięto produkt', JSON.stringify(res));
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
