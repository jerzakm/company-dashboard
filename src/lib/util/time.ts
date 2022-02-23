import dayjs from 'dayjs';

export const formatDate = (dateString: string, format: string) => {
	const parsedDate = dayjs(dateString).format(format);
	return parsedDate;
};

export const formatToDate = (dateString: string) => {
	return formatDate(dateString, 'DD-MM-YYYY');
};

export const formatToDateHour = (dateString: string) => {
	return formatDate(dateString, 'DD-MM-YYYY hh:mm:ss');
};

export const minutesSince = (timestamp: number) => {
	return (Date.now() - timestamp) / 1000 / 60;
};
