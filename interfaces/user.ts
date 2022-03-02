import { ShoppingCart } from './shopping_cart';

export enum User_Rol {
	NATURAL = 'natural',
	JURIDICO = 'juridico',
	ADMIN = 'admin',
}

// Backend structure
// User type
export type User = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	birth_date?: Date;
	rol: User_Rol;

	// Relations
	shoppingCart: ShoppingCart;

	access_token?: string;
	_id: string;
	__v: number;
};
