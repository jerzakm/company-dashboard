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

export const sortByDate = (list: ReturnEntry[], ascending: boolean = false) => {
	function compare(a: ReturnEntry, b: ReturnEntry) {
		if (dayjs(a.created_at).isAfter(dayjs(b.created_at))) {
			return ascending ? -1 : 1;
		}
		if (dayjs(a.created_at).isBefore(dayjs(b.created_at))) {
			return ascending ? 1 : -1;
		}
		return 0;
	}
	const sorted = list.sort(compare);
	return sorted;
};

export const boolToggle = (value: boolean) => {
	if (typeof value == 'undefined') return true;
	if (value) return false;
	if (!value) return true;
};

export const defaultCleanReturnEntry = () => {
	return {
		name: '',
		street: '',
		postCode: '',
		city: '',
		country: 'PL',
		products: [],
		phone: '',
		notes: ''
	};
};
