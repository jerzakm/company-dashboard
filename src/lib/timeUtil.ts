import dayjs from 'dayjs';

export const formatListDate = (dateString: string) => {
	const parsedDate = dayjs(dateString).format('DD-MM-YYYY');
	return parsedDate;
};

export const formatToDateHour = (dateString: string) => {
	const parsedDate = dayjs(dateString).format('DD-MM-YYYY hh:mm:ss');
	return parsedDate;
};

export const minutesSince = (timestamp: number) => {
	return (Date.now() - timestamp) / 1000 / 60;
};

export const daysSince = (timestamp: number) => {
	return (Date.now() - timestamp) / 1000 / 60 / 60 / 24;
};

export const dateToTimestamp = (date: string) => {
	return dayjs(date).unix() * 1000;
};
