import { prisma } from './_prisma';

export const users: any = {};

export const tokenHasPermission = async (token: string, requiredPermission: string) => {
	// console.log(`checking permission ${requiredPermission} for ${token}`);

	const login = token.split(':')[0];
	const password = token.split(':')[1];
	let granted = false;

	const user = await prisma.user.findFirst({
		where: {
			login,
			password
		},
		include: { permissions: true }
	});

	if (user && user.permissions) {
		for (const permission of user.permissions) {
			if (permission.name == requiredPermission) {
				granted = true;
			}
		}
	}

	return {
		userId: user.id ? user.id : undefined,
		granted
	};
};

export enum ApiPermission {
	PRODUCTS_GET = 'products:get',
	PRODUCTS_POST = 'products:post'
}
