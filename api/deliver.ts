import axios from 'axios';
import { Post_Shipment_data, Shipping_States } from 'interfaces';

// Make shipment order on Arcane team
export const post_create_shipmentOrder = async (
	data: Post_Shipment_data
): Promise<any> => {
	const add_response = await axios.post(
		`http://distribuidor-dj.herokuapp.com/api/shipments/`,
		data
	);
	return add_response;
};

// Get all states and pricing
export const get_all_statesPricing = async (): Promise<Shipping_States[]> => {
	const all_responses = await axios.get<Shipping_States[]>(
		`http://distribuidor-dj.herokuapp.com/api/address_state/`
	);
	return all_responses.data;
};
