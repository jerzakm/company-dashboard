import { ApiPermission } from '$lib/core/auth';
import { prisma, tokenHasPermission } from '../../_prisma';
import { addReturnEvent, updateReturnReason } from './_helpers';

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
		const { returnProductId, locationId, returnId } = await request.json();

		const currentLocation = await prisma.returnLocation.findFirst({
			where: {
				productId: returnProductId
			},
			include: { locationInfo: true }
		});

		if (currentLocation) {
			await prisma.returnLocation.delete({
				where: {
					id: currentLocation.id
				}
			});
		}

		const newLocation = await prisma.returnProduct.update({
			where: {
				id: returnProductId
			},
			data: {
				location: {
					create: {
						description: '',
						locationId: locationId,
						userId: permission.userId
					}
				}
			},
			include: { location: { include: { locationInfo: true } } }
		});

		console.log(returnId);

		if (currentLocation.locationId != newLocation.location.locationId) {
			const event = await addReturnEvent(
				returnId,
				permission.userId,
				`retunEvents.product.location.change`,
				JSON.stringify({
					from: currentLocation.locationInfo,
					to: newLocation.location.locationInfo
				}),
				''
			);
		}

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
		const { returnProductId, returnId } = await request.json();

		const currentLocation = await prisma.returnLocation.findFirst({
			where: {
				productId: returnProductId
			},
			include: { locationInfo: true }
		});

		if (currentLocation) {
			await prisma.returnLocation.delete({
				where: {
					id: currentLocation.id
				}
			});

			console.log(returnId);

			const event = await addReturnEvent(
				returnId,
				permission.userId,
				`retunEvents.product.location.delete`,
				JSON.stringify({
					from: currentLocation.locationInfo,
					to: null
				}),
				''
			);
		}

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
