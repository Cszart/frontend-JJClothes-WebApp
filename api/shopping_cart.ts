import axios from 'axios';
import { ShoppingCart } from 'interfaces';

export const post_shoppingCart_add = async (
	token: string,
	data: ShoppingCart
): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/shoppingCart/create_shoppingCart`,
		data,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return add_response;
};

export const patch_shoppingCart_update = async (
	token: string,
	data: ShoppingCart
): Promise<any> => {
	const patch_response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/shoppingCart/update_shoppingCart/${data._id}`,
		data,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return patch_response;
};

export const patch_shoppingCart_add_product = async (
	token: string,
	shoppingCart_id: string,
	data: { quantity: number; product: string }
): Promise<any> => {
	const patch_response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/shoppingCart/add_product_shoppingCart/${shoppingCart_id}`,
		data,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return patch_response;
};

export const get_shoppingCart_all = async (): Promise<any> => {
	const all_shoppingCart_response = await axios.get<ShoppingCart[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/shoppingCart/get_all_shoppingCarts`
	);
	return all_shoppingCart_response;
};

export const get_shoppingCart_byID = async (id: string): Promise<any> => {
	const shoppingCart_byID_response = await axios.get<ShoppingCart>(
		`${process.env.NEXT_PUBLIC_API_URL}/shoppingCart/get_shoppingCart_byID/${id}`
	);
	return shoppingCart_byID_response;
};
