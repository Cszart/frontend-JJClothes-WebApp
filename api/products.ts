import axios, { AxiosResponse } from 'axios';
import { Product } from 'interfaces';

export const get_products_all = async (): Promise<
	AxiosResponse<Product[], any>
> => {
	const all_products_response = await axios.get<Product[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_all_products`
	);

	return all_products_response;
};
