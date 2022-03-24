export const calculate_PriceDiscount = (
	price: number,
	discount: number
): number => {
	const real_discount = discount / 100;
	const price_discount = price * real_discount;

	return price - price_discount;
};

export const calculate_roundUp = (nro: number): number => {
	const round = Math.round((nro + Number.EPSILON) * 100);
	const response = round / 100;
	return response;
};
