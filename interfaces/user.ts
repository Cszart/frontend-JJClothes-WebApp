import { ShoppingCart } from './shopping_cart';

// Backend structure
// User type
export type User = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	birth_date: Date;
	rol: 'natural' | 'juridico' | 'admin';

	// Relations
	shoppingCart: ShoppingCart;

	_id: string;
	__v: number;
};
