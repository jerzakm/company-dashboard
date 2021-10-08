import type { ReturnEntry } from '@prisma/client';
import dayjs from 'dayjs';

export const formatListDate = (dateString: string) => {
	const parsedDate = dayjs(dateString).format('DD-MM-YYYY');
	return parsedDate;
};

export const sortById = (list: ReturnEntry[], ascending: boolean = false) => {
	function compare(a: ReturnEntry, b: ReturnEntry) {
		if (a.id < b.id) {
			return ascending ? -1 : 1;
		}
		if (a.id > b.id) {
			return ascending ? 1 : -1;
		}
		return 0;
	}
	const sorted = list.sort(compare);
	return sorted;
};
