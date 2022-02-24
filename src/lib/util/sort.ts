import dayjs from 'dayjs';

export const sortByCreatedAt = (list: any[], ascending = false) => {
	function compare(a, b) {
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
