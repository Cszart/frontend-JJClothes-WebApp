import axios, { AxiosError, AxiosResponse } from 'axios';
import { Product } from 'interfaces';

export const get_products_all = async (): Promise<any> => {
	const all_products_response = await axios.get<Product[]>(
		`https://jjc-api.herokuapp.com/product/get_all_products`
	);
	return all_products_response;
};
