import { Product_Item } from 'interfaces';
import { User } from './user';

export type Bill = {
	// User data
	fullName: string;
	email: string;
	phoneNumber: string;

	// direction
	state: string;
	city: string;
	street: string;
	zip_code: string;
};

export type Payment = {
	card_number: string;
	security_digits: string;
	expiring_date: string;
};

export type Order = {
	purchase_date: Date;
	shipping_cost: number;
	subtotal: number;

	// Relations
	user: User;
	bill_info: Bill;
	payment_info: Payment;
	items: Product_Item[];
};
