import { dbAuthCheck } from './_prisma';

export async function post(request) {
	let user;
	if (request.body.user && request.body.password) {
		const dbUser = await dbAuthCheck(request.body.user, request.body.password);
		if (dbUser.password == request.body.password) user = dbUser;
	}

	return {
		status: user ? 200 : 401,
		body: { user }
	};
}
