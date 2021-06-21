import { getSubiektConnection, subiektDbName } from './_connection';
import knex from 'knex';

export const getProductList = async () => {
	const subiektConnection = getSubiektConnection();

	const sqlQuery = `SELECT tw_Id, tw_Symbol, tw_Nazwa, tw_Rodzaj, tw_Objetosc, tw_Masa, grt_Nazwa, tc_CenaNetto5
	FROM
		 ${subiektDbName}.dbo.tw__Towar,
		 ${subiektDbName}.dbo.tw_Cena,
		 ${subiektDbName}.dbo.sl_GrupaTw
    WHERE
		${subiektDbName}.dbo.tw__Towar.tw_IdGrupa = ${subiektDbName}.dbo.sl_GrupaTw.grt_Id AND
		${subiektDbName}.dbo.tw__Towar.tw_Id = ${subiektDbName}.dbo.tw_Cena.tc_IdTowar`;

	let res: any;

	await subiektConnection
		.raw(sqlQuery)
		.on('query', function (data) {
			// console.log(data.sql);
		})
		.then(function (response) {
			res = response;
		});

	return res;
};
