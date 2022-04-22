import { ApiPermission } from '$lib/core/auth';
import { tokenHasPermission } from '../../_prisma';
import { addNote, addReturnEvent } from './_helpers';

export async function post({ request }) {
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
		const { content, returnId } = await request.json();

		const note = await addNote(content, permission.userId, returnId);

		const event = await addReturnEvent(
			returnId,
			permission.userId,
			`retunEvents.note.add`,
			JSON.stringify(note),
			''
		);

		body.data = note;

		status = 200;
	} catch (e) {
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
