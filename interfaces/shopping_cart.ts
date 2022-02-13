import { Product_Item } from './items';
import { User } from './user';

// Backend Structure
// Shopping cart
export type ShoppingCart = {
	subtotal: number;

	// Relations
	user?: User;
	items: Product_Item[];

	__v: number;
	_id: string;
};
