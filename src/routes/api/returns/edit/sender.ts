import type { ReturnSender } from '@prisma/client';
import { diff } from 'deep-object-diff';
import { AppLogStatus, createAppLogEntry } from '../../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { prisma } from '../../_prisma';
import { getReturn } from '../_list';
import { createReturnEvent, updateSender } from '../_returnEntry';

export async function put(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.EDIT_RETURN);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	try {
		const sender: ReturnSender = request.body;
		const originalSender = await prisma.returnSender.findFirst({
			where: {
				id: sender.id
			}
		});
		const updatedSender = await updateSender(sender);

		if (updateSender) {
			const senderDiff = diff(originalSender, updatedSender);
			await createReturnEvent(sender.returnId, permission.userId, 'Edit', 'Nadawca', JSON.stringify(senderDiff));
		}

		status = 200;
		body = updatedSender;
	} catch (e) {
		createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
