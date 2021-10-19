import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { getPhysicalLocations } from './_locations';

export async function get(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.GET_RETURN_LIST);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	try {
		const res = await getPhysicalLocations();
		body = res;
		status = 200;
	} catch (e) {}

	return {
		status,
		body
	};
}
