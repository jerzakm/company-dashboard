import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { updateSender } from './_helpers';

export async function put({ request }) {
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
		const sender = await request.json();

		const originalSender = await prisma.returnSender.findFirst({
			where: {
				id: sender.id
			}
		});

		if (JSON.stringify(originalSender) == JSON.stringify(sender)) {
			return { status: 200 };
		}

		const updatedSender = await updateSender(sender);
		body.data = updatedSender;

		// if (updateSender) {
		// 	const senderDiff = diff(originalSender, updatedSender);
		// 	await createReturnEvent(sender.returnId, permission.userId, 'Edit', 'Nadawca', JSON.stringify(senderDiff));
		// }

		status = 200;
		// body = updatedSender;
	} catch (e) {
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
