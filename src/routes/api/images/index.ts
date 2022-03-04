import { ApiPermission } from '$lib/core/auth';
import fs from 'fs';
import { prisma, tokenHasPermission } from '../_prisma';

export async function post({ request }) {
	const authorization = await request.headers.get('authorization');

	if (!authorization) {
		return {
			status: 401
		};
	}

	const permission = await tokenHasPermission(authorization, ApiPermission.returns.edit);

	if (!permission.granted) {
		return { status: 403 };
	}

	const { data, returnId } = await request.json();

	const base64Data = data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
	const [, extension] = data.split(';')[0].split('/');

	const returnImage = await prisma.returnImage.create({
		data: {
			extension,
			description: '',
			imgSrc: '',
			returnId,
			userId: permission.userId
		}
	});

	if (!returnImage) {
		return { status: 500 };
	}

	// if saving file fails, remove DB entry
	try {
		fs.writeFileSync(`data/images/${returnImage.id}.${extension}`, base64Data, 'base64');
	} catch (e) {
		await prisma.returnImage.delete({ where: { id: returnImage.id } });
		return { status: 500 };
	}

	return {
		status: 200
		// body
	};
}
