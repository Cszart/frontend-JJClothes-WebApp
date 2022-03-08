import axios from 'axios';
import { User } from 'interfaces';

export const post_user_add = async (data: any): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/user/create_user`,
		data
	);
	return add_response;
};

export const patch_user_update = async (data: User): Promise<any> => {
	const add_response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/user/update_user/${data._id}`,
		data
	);
	return add_response;
};

export const get_user_all = async (): Promise<any> => {
	const all_user_response = await axios.get<User[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/user/get_all_users`
	);
	return all_user_response;
};

export const get_user_byID = async (id: string): Promise<any> => {
	const user_byID_response = await axios.get<User>(
		`${process.env.NEXT_PUBLIC_API_URL}/user/get_user_byID/${id}`
	);
	return user_byID_response;
};

export const get_user_byEmail = async (email: string): Promise<any> => {
	const user_byID_response = await axios.get<User>(
		`${process.env.NEXT_PUBLIC_API_URL}/user/get_user_byEmail/${email}`
	);
	return user_byID_response;
};
