import prismaPckg from '@prisma/client';
import fs from 'fs';
import dayjs from 'dayjs';
import { ENETRESET } from 'constants';

const { Prisma, PrismaClient } = prismaPckg;
const prisma = new PrismaClient();

async function start() {
	const file = fs.readFileSync('oldData.json');
	const data = JSON.parse(file);

	for (let i = 0; i < data.length; i++) {		
		upsertEntry(data[i]);
	}
}

async function upsertEntry(entry) {
	const date = `${dayjs(entry.timestamp).format('YYYY-MM-DDTHH:mm:ss')}.500Z`;

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
			}
		}
	});

	console.log(e);
}

start();
