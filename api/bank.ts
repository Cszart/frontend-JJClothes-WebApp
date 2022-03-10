import axios from 'axios';
import { Bank_Data_Dates } from 'interfaces';

export const get_bank_all_responses = async (): Promise<Bank_Data_Dates[]> => {
	const all_responses = await axios.get<Bank_Data_Dates[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/bank/get_all_responses`
	);
	return all_responses.data;
};
