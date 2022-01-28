// Tag
export type Tags = {
	id: string;
	title: string;
};

// Category
export type Categories = {
	id: string;
	title: string;
};

// Product
export type Product = {
	id: string;
	title: string;
	new_item: boolean;
	price: number;
	discount: number;
	description: string;
	warranty: string;
	gallery: string[];
	stock: number;

	// relations
	category: Categories[];
	tags: Tags[];
};

// Item Props
export interface Item_Props {
	id: number;
	className?: string;
	product_item: Product;
}
