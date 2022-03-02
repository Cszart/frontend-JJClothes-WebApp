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
	courier: string;
};

export type Payment = {
	bank: number;
	card_number: string;
	security_digits: string;
	expiring_date: string;
};

export type Order = {
	_id?: string;
	__v?: number;

	purchase_date?: Date;
	shipping_cost: number;
	subtotal?: number;

	// Relations
	user: string;
	bill_info: Bill;
	payment_info: Payment;
	items: { quantity: number; product: string }[];
};
