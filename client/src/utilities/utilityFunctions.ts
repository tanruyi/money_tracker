/** @format */

export const intToCurrencyString = (int: any) => {
	const intFloat = Number(int).toFixed(2);

	const intStr = intFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return intStr;
};
