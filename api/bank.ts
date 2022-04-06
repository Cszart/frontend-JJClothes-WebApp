import axios from 'axios';
import { Bank_Dakiti_Pay_Data, Bank_Data_Dates } from 'interfaces';

export const get_bank_all_responses = async (): Promise<Bank_Data_Dates[]> => {
	const all_responses = await axios.get<Bank_Data_Dates[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/bank/get_all_responses`
	);
	return all_responses.data;
};

export const post_change_active_bank = async (
	name: string
): Promise<
	{
		statusCode?: number;
		error?: string;
		_id?: string;
		name?: string;
	}[]
> => {
	const change_response = await axios.post<
		{
			statusCode?: number;
			error?: string;
			_id?: string;
			name?: string;
		}[]
	>(`${process.env.NEXT_PUBLIC_API_URL}/bank/change_active_bank`, {
		name: name,
	});
	return change_response.data;
};

export const get_active_bank = async (): Promise<{
	_id: string;
	name: string;
}> => {
	const change_response = await axios.get<{
		_id: string;
		name: string;
	}>(`${process.env.NEXT_PUBLIC_API_URL}/bank/get_active_bank`);
	return change_response.data;
};

export const post_dakiti_payment = async (
	data: Bank_Dakiti_Pay_Data
): Promise<any> => {
	const payment_response = await axios.post(
		`${process.env.NEXT_PUBLIC_BANK_DAKITI_URL}/cardPayment`,
		data
	);

	return payment_response.data;
};
