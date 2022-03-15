import axios from 'axios';
import {
	CategoryByAmount_response,
	OrdersByDate_response,
	OrdersByUser_response,
	ProductsByCategory_response,
} from 'interfaces/report';

// Get orders number by users
export const get_orders_by_users = async (
	startDate: string,
	endDate: string
): Promise<OrdersByUser_response[]> => {
	const response = await axios.get<OrdersByUser_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_orders_by_users/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};

// Get Categories by billing amount
export const get_orders_by_date = async (
	startDate: string,
	endDate: string
): Promise<OrdersByDate_response[]> => {
	const response = await axios.get<OrdersByDate_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_orders_by_date/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};

// Get Categories by billing amount
export const get_category_by_amount = async (
	startDate: string,
	endDate: string
): Promise<CategoryByAmount_response[]> => {
	const response = await axios.get<CategoryByAmount_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_category_by_amount/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};

// Get top ten best sell products by category
export const get_topTen_products = async (
	startDate: string,
	endDate: string
): Promise<ProductsByCategory_response[]> => {
	const response = await axios.get<ProductsByCategory_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_topTen_products/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};

// Get bottom ten best sell products by category
export const get_bottomTen_products = async (
	startDate: string,
	endDate: string
): Promise<ProductsByCategory_response[]> => {
	const response = await axios.get<ProductsByCategory_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_bottomTen_products/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};

// Get top ten best sell products by tags
export const get_topTen_tags_products = async (
	startDate: string,
	endDate: string
): Promise<ProductsByCategory_response[]> => {
	const response = await axios.get<ProductsByCategory_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_topTen_tags_products/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};

// Get bottom ten best sell products by tags
export const get_bottomTen_tags_products = async (
	startDate: string,
	endDate: string
): Promise<ProductsByCategory_response[]> => {
	const response = await axios.get<ProductsByCategory_response[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/report/get_bottomTen_tags_products/${startDate}/${endDate}`
	);

	if (response.status == 200) return response.data;

	return [];
};
