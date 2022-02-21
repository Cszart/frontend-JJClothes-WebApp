import axios from 'axios';
import { Tags } from 'interfaces';

export const post_tags_add = async (data: Tags): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/tag/add_tag`,
		data
	);
	return add_response;
};

export const get_tags_all = async (): Promise<any> => {
	const all_tags_response = await axios.get<Tags[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/tag/get_all_tags`
	);
	return all_tags_response;
};

export const get_tags_byID = async (id: string): Promise<any> => {
	const tag_byID_response = await axios.get<Tags>(
		`${process.env.NEXT_PUBLIC_API_URL}/tag/get_tag_byID/${id}`
	);
	return tag_byID_response;
};

export const get_tags_Name = async (name: string): Promise<any> => {
	const tag_byName_response = await axios.get<Tags>(
		`${process.env.NEXT_PUBLIC_API_URL}/tag/get_tag_byName/${name}`
	);
	return tag_byName_response;
};
