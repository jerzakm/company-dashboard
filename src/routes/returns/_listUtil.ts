import dayjs from 'dayjs';

export const formatListDate = (dateString: string) => {
	const parsedDate = dayjs(dateString).format('DD-MM-YYYY');
	return parsedDate;
};
