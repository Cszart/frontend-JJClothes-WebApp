import axios from 'axios';
import { Product } from 'interfaces';

export const post_products_add = async (data: Product): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/product/add_product`,
		data
	);
	return add_response;
};

export const post_products_restock = async (restock: number): Promise<any> => {
	const restock_response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/product/restock_product/${restock}`
	);
	return restock_response;
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

export const get_products_byCategory = async (
	category_id: string
): Promise<any> => {
	const product_byCategory_response = await axios.get<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_product_byCategory/${category_id}`
	);
	return product_byCategory_response;
};

export const get_products_byTag = async (tag_name: string): Promise<any> => {
	const product_byTag_response = await axios.get<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_product_byTag/${tag_name}`
	);
	return product_byTag_response;
};

export const get_products_byName = async (name: string): Promise<any> => {
	const product_byName_response = await axios.get<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_product_byName/${name}`
	);
	return product_byName_response;
};

export const get_products_byTag_or_Name = async (
	name: string
): Promise<any> => {
	const product_filter_response = await axios.get<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_product_by_tag_or_name/${name}`
	);
	return product_filter_response;
};

export const get_products_new = async (): Promise<any> => {
	const product_new_response = await axios.get<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_new_products`
	);
	return product_new_response;
};

export const get_products_related = async (data: {
	category_id: string;
	tags_id: string[];
}): Promise<any> => {
	const product_byID_response = await axios.post<Product>(
		`${process.env.NEXT_PUBLIC_API_URL}/product/get_related_products`,
		data
	);
	return product_byID_response;
};
