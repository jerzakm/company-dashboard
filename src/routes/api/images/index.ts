import { ApiPermission } from '$lib/core/auth';
import fs from 'fs';
import { prisma, tokenHasPermission } from '../_prisma';
import sharp from 'sharp';
import { addReturnEvent } from '../returns/edit/_helpers';

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
		const imageBuffer = Buffer.from(base64Data, 'base64');

		// MINI
		const miniatureSize = 400;
		const miniatureImageBuffer = await sharp(imageBuffer)
			.resize(miniatureSize, miniatureSize, { fit: 'inside' })
			.toBuffer();
		const miniatureImageData = miniatureImageBuffer.toString('base64');

		// NORMAL
		const imageSize = 2500;
		const normalImageBuffer = await sharp(imageBuffer)
			.resize(imageSize, imageSize, { fit: 'inside' })
			.toBuffer();
		const normalImageData = normalImageBuffer.toString('base64');

		// SAVE FILES
		fs.writeFileSync(`data/images/${returnImage.id}.${extension}`, normalImageData, 'base64');
		fs.writeFileSync(
			`data/images/${returnImage.id}_${miniatureSize}.${extension}`,
			miniatureImageData,
			'base64'
		);

		try {
			await addReturnEvent(
				returnImage.returnId,
				returnImage.userId,
				`retunEvents.image.added`,
				JSON.stringify(returnImage),
				''
			);
		} catch (e) {
			console.log('error creating an event');
		}
	} catch (e) {
		await prisma.returnImage.delete({ where: { id: returnImage.id } });
		return { status: 500 };
	}

	return {
		status: 200
		// body
	};
}
