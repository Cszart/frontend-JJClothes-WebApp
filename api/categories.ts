import axios from 'axios';
import { Category } from 'interfaces';

export const post_categories_add = async (data: Category): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/category/add_category`,
		data
	);
	return add_response;
};

export const get_categories_all = async (): Promise<any> => {
	const all_categories_response = await axios.get<Category[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/category/get_all_categories`
	);
	return all_categories_response;
};

export const get_categories_byID = async (id: string): Promise<any> => {
	const category_byID_response = await axios.get<Category>(
		`${process.env.NEXT_PUBLIC_API_URL}/category/get_category_byID/${id}`
	);
	return category_byID_response;
};
