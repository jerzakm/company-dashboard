import knex from 'knex';

const insertDbHost: any = import.meta.env.VITE_INSERT_DB_SERVER;
const insertDbUser: any = import.meta.env.VITE_INSERT_DB_USER;
const insertDbPassword: any = import.meta.env.VITE_INSERT_DB_PASSWORD;
const insertDbName: any = import.meta.env.VITE_INSERT_DB_NAME;
export const subiektDbName: any = import.meta.env.VITE_SUBIEKT_DB_NAME;

const subiektConnection = knex({
	client: 'mssql',
	connection: {
		host: insertDbHost,
		database: insertDbName,
		user: insertDbUser,
		password: insertDbPassword,
		options: {
			instanceName: 'INSERTGT'
		}
	}
});

export const getSubiektConnection = () => {
	return subiektConnection;
};
