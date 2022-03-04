import { ApiPermission } from '$lib/core/auth';
import fs from 'fs';
import { prisma, tokenHasPermission } from '../_prisma';

export async function post({ request }) {
	const status = 200;

	const authorization = await request.headers.get('authorization');

	if (!authorization) {
		return {
			status: 401
		};
	}

	const permission = await tokenHasPermission(authorization, ApiPermission.returns.edit);

	const { data, returnId } = await request.json();

	const base64Data = data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
	const [, type] = data.split(';')[0].split('/');

	const returnImage = await prisma.returnImage.create({
		data: {
			description: type,
			imgSrc: '',
			returnId,
			userId: permission.userId
		}
	});

	fs.writeFileSync(`data/images/${returnImage.id}.${type}`, base64Data, 'base64');

	return {
		status
		// body
	};
}
