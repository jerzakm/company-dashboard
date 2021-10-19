import { AppLogStatus, createAppLogEntry } from '../../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { setProductLocation } from '../_locations';
import { addProduct, createReturnEvent, delProduct } from '../_returnEntry';

export async function post(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.EDIT_RETURN);

	console.log(request.body);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		const res = await setProductLocation(request.body.id, request.body.locationId, permission.userId, '');
		if (res) {
			await createReturnEvent(res.returnId, permission.userId, 'Edit', 'Przeniesiono produkt', JSON.stringify(res.location.locationInfo));
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
