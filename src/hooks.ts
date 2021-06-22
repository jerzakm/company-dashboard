import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const sessions: any = {};

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	const response = await resolve(request);

	//login
	if (request.path == '/api/auth' && request.method == 'POST') {
		if (request.body) {
			//@ts-ignore
			const login = request.body.login;
			//@ts-ignore
			const password = request.body.password;

			const userQuery = await prisma.user.findUnique({
				where: {
					login
				}
			});

			if (userQuery && userQuery.password == password) {
				sessions[`${request.locals.userid}`] = {
					userid: request.locals.userid,
					validUntil: Date.now() + 60 * 60 * 1000,
					user: userQuery
				};
				response.status = 200;
			} else {
				response.status = 401;
			}
		}
	}

	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};

interface ActiveUserSession {
	userid: string;
	validUntil: number;
	user: User;
}
