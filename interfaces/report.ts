import { Product } from './items';
import { User } from './user';

// Backend structure
export type OrdersByUser_response = {
	user: User;
	count: number;
};

export type OrdersByDate_response = {
	purchase_date: string;
	count: number;
};

export type CategoryByAmount_response = {
	category_id: string;
	category_name: string;
	category_amount: number;
	category_items: number;
};

export type ProductsByCategory_response = {
	category_name: string;
	category_products: Product[];
};

export type ProductsByTag_response = {
	category_name: string;
	category_products: Product[];
};
