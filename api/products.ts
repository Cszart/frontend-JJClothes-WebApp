import axios from 'axios';
import { Product } from 'interfaces';

export const post_products_add = async (data: Product): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/product/add_product`,
		data
	);
	return add_response;
};

export const get_products_all = async (): Promise<any> => {
	const all_products_response = await axios.get<Product[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_all_products`
	);
	return all_products_response;
};

export const get_products_byID = async (id: string): Promise<any> => {
	const product_byID_response = await axios.get<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_product_byID/${id}`
	);
	return product_byID_response;
};
