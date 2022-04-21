import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { addProduct, addReturnEvent } from './_helpers';

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
		const { productId, returnId } = await request.json();

		const addedProduct = await addProduct(productId, permission.userId, returnId);

		body.data = addedProduct;

		if (addedProduct) {
			await addReturnEvent(
				returnId,
				permission.userId,
				`returnEvents.productAdded`,
				JSON.stringify(addedProduct),
				''
			);
		}

		status = 200;
	} catch (e) {
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}

export async function del({ request }) {
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
		const { returnProductId } = await request.json();

		const returnProduct = await prisma.returnProduct.findFirst({
			where: { id: returnProductId },
			include: {
				location: true,
				returnEntry: {
					select: { id: true }
				}
			}
		});

		if (returnProduct.location?.id) {
			await prisma.returnLocation.delete({
				where: {
					id: returnProduct.location.id
				}
			});
		}

		await prisma.returnProduct.delete({
			where: { id: returnProduct.id }
		});

		const event = await addReturnEvent(
			returnProduct.returnEntry.id,
			permission.userId,
			`returnEvents.productRemoved`,
			JSON.stringify(returnProduct),
			''
		);

		status = 200;
	} catch (e) {
		console.log(e);
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
