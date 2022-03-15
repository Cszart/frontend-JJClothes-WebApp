import * as React from 'react';

//// Columns for record details on data //////
export const OrdersByUser_Columns = [
	{
		title: 'Fullname',
		dataIndex: 'fullname',
		key: 'fullname',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
	{
		title: 'Number of Orders',
		dataIndex: 'nrOrders',
		key: 'nrOrders',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
];

export const OrdersByDate_Columns = [
	{
		title: 'Purchase Date',
		dataIndex: 'purchaseDate',
		key: 'purchaseDate',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
	{
		title: 'Number of order',
		dataIndex: 'nrOrders',
		key: 'nrOrders',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
];

export const CategoryByAmount_Columns = [
	{
		title: 'Category name',
		dataIndex: 'category_name',
		key: 'category_name',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
	{
		title: 'Category amount',
		dataIndex: 'category_amount',
		key: 'category_amount',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
	{
		title: 'Category items',
		dataIndex: 'category_items',
		key: 'category_items',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
];

export const Products_Columns = [
	{
		title: 'Product Name',
		dataIndex: 'title',
		key: 'title',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
	{
		title: 'Quantity sold',
		dataIndex: 'sold',
		key: 'sold',
		render: (text: any) => <p className="text-base text-black">{text}</p>,
	},
];
