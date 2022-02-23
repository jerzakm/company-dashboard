export const debounce = (_function, timeout = 1000) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			_function.apply(this, args);
		}, timeout);
	};
};
