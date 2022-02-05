// Tag
export type Tags = {
	_id: string;
	name: string;
	__v: number;
};

// Category
export type Category = {
	_id: string;
	name: string;
	__v: number;
};

// Product
export type Product = {
	_id: string;
	title: string;
	price: number;
	discount: number;
	new_item?: boolean;
	description: string;
	gallery: string[];
	stock: number;
	category: Category;
	tags: Tags[];
	__v: 0;
};

// Item Props
export interface Item_Props {
	id: number;
	className?: string;
	product_item: Product;
}
