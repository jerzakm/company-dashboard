import prismaPckg from '@prisma/client';
import fs from 'fs';
import dayjs from 'dayjs';
import { ENETRESET } from 'constants';

const { Prisma, PrismaClient } = prismaPckg;
const prisma = new PrismaClient();

async function start() {
	const file = fs.readFileSync('oldData.json');
	const data = JSON.parse(file);

	await deleteAll();

	for (let i = 0; i < data.length; i++) {
		await upsertEntry(data[i]);
		// await updateProducts(data[i]);
	}
}

async function deleteAll() {
	await prisma.returnEvent.deleteMany({});
	await prisma.returnImage.deleteMany({});
	await prisma.returnLocation.deleteMany({});
	await prisma.returnNote.deleteMany({});
	await prisma.returnProduct.deleteMany({});
	await prisma.returnReason.deleteMany({});
	await prisma.returnSender.deleteMany({});
	await prisma.returnEntry.deleteMany({});
}

async function upsertEntry(entry) {
	console.log(`updating ${entry.returnId}`);
	const date = `${dayjs(entry.timestamp).format('YYYY-MM-DDTHH:mm:ss')}.500Z`;

	const foundProducts = [];

	for (const productEntry of entry.productEntryList) {
		if (!productEntry || !productEntry.product) {
			return;
		}

		const foundProduct = await prisma.product.findFirst({
			where: {
				symbol: productEntry.product.symbol
			}
		});

		if (foundProduct) {
			foundProducts.push({
				description: JSON.stringify(productEntry.productStateId),
				group: foundProduct.group,
				name: productEntry.product.name,
				price: productEntry.product.value,
				quantity: productEntry.quantity,
				symbol: productEntry.product.symbol
			});
		}
	}

	const e = await prisma.returnEntry.upsert({
		where: {
			id: entry.returnId
		},
		create: {
			id: entry.returnId,
			created_at: date,
			resolved: entry.resolved,
			sender: {
				create: {
					name: entry.sender.name,
					city: entry.sender.city,
					country: 'PL',
					phone: '',
					postCode: entry.sender.postCode,
					street: entry.sender.street
				}
			},
			products: {
				create: foundProducts
			}
		},
		update: {
			created_at: date,
			resolved: entry.resolved,
			sender: {
				create: {
					name: entry.sender.name,
					city: entry.sender.city,
					country: 'PL',
					phone: '',
					postCode: entry.sender.postCode,
					street: entry.sender.street
				}
			},
			products: {
				create: foundProducts
			}
		}
	});

	console.log(e);
}

async function updateProducts(entry) {
	console.log(`updating ${entry.returnId}`);

	for (const productEntry of entry.productEntryList) {
		if (!productEntry || !productEntry.product) {
			return;
		}

		const foundProduct = await prisma.product.findFirst({
			where: {
				symbol: productEntry.product.symbol
			}
		});

		if (foundProduct) {
			const e = await prisma.returnEntry.update({
				where: {
					id: entry.returnId
				},
				data: {
					products: {
						create: {
							description: JSON.stringify(productEntry.productStateId),
							group: foundProduct.group,
							name: productEntry.product.name,
							price: productEntry.product.value,
							quantity: productEntry.quantity,
							symbol: productEntry.product.symbol
						}
					}
				}
			});
		}
	}
}

start();
