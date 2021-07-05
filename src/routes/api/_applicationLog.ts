import { prisma } from './_prisma';

export const createAppLogEntry = async (status: AppLogStatus, description: string, userId: string) => {
	console.log('creating log entry');
	await prisma.applicationLog.create({
		data: {
			status: status,
			description,
			user: {
				connect: {
					id: userId
				}
			}
		}
	});
};

export enum AppLogStatus {
	INFO = 'INFO',
	OK = 'OK',
	WARN = 'WARN',
	CRITICAL = 'CRITICAL'
}
