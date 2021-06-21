export const minutesSince = (timestamp: number) => {
	return (Date.now() - timestamp) / 1000 / 60;
};
