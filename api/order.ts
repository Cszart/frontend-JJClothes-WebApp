import axios from 'axios';
import { Order, Post_Shipment_data } from 'interfaces';

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

export const post_order_add = async (data: Order): Promise<any> => {
	const add_response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/order/create_order`,
		data
	);
	return add_response;
};

export const patch_order_update = async (data: Order): Promise<any> => {
	const add_response = await axios.patch(
		`${process.env.NEXT_PUBLIC_API_URL}/order/update_order/${data._id}`,
		data
	);
	return add_response;
};

export const get_order_all = async (): Promise<any> => {
	const all_order_response = await axios.get<Order[]>(
		`${process.env.NEXT_PUBLIC_API_URL}/order/get_all_orders`
	);
	return all_order_response;
};

export const get_order_byID = async (id: string): Promise<any> => {
	const order_byID_response = await axios.get<Order>(
		`${process.env.NEXT_PUBLIC_API_URL}/order/get_order_byID/${id}`
	);
	return order_byID_response;
};

export const get_order_byDateRange = async (
	startDate: string,
	endDate: string
): Promise<any> => {
	const order_byRange_response = await axios.get<Order>(
		`${process.env.NEXT_PUBLIC_API_URL}/order/get_order_byDateRange/${startDate}/${endDate}`
	);
	return order_byRange_response;
};
