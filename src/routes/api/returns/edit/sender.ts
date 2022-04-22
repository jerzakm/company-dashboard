import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { addReturnEvent, updateSender } from './_helpers';

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

		for (const key in originalSender) {
			if (sender[key] != originalSender[key]) {
				const change = {
					from: originalSender[key],
					to: sender[key]
				};

				const event = await addReturnEvent(
					originalSender.returnId,
					permission.userId,
					`retunEvents.sender.changed.${key}`,
					JSON.stringify(change),
					''
				);
			}
		}

		status = 200;
		// body = updatedSender;
	} catch (e) {
		console.log(e);
	}

	return {
		status,
		body
	};
}
