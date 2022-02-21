import { dbAuthCheck } from './_prisma';

export async function post({ request }) {
	let user;

	const body = await request.json();

	if (body.user && body.password) {
		const dbUser = await dbAuthCheck(body.user, body.password);

		if (dbUser.password == body.password) user = dbUser;
	}

	return {
		status: user ? 200 : 401,
		body: { user }
	};
}
