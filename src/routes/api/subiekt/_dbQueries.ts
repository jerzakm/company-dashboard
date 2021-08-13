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
		${subiektDbName}.dbo.tw__Towar.tw_Id = ${subiektDbName}.dbo.tw_Cena.tc_IdTowar AND tw_Zablokowany = 0;`;

	let res: any;

	await subiektConnection
		.raw(sqlQuery)
		.on('query', function (data) {})
		.then(function (response) {
			res = response;
		});

	return res;
};

export const getPackingLists = async () => {
	const subiektConnection = getSubiektConnection();
	const sqlQuery = `SELECT pl_Id, pl_Symbol, pl_CreationDate, pl_Printed,pl_Notes, dr_Name
  FROM [SELLO-SHOP].dbo.pc_SendingList, [SELLO-SHOP].dbo.sl_Deliverer
  WHERE pl_CreationDate >= '2021-08-01' AND [SELLO-SHOP].dbo.pc_SendingList.pl_DelivererId = [SELLO-SHOP].dbo.sl_Deliverer.dr_Id;`;

	let res: any;

	await subiektConnection
		.raw(sqlQuery)
		.on('query', function (data) {})
		.then(function (response) {
			res = response;
		});

	return res;
};
