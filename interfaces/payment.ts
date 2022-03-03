export const venezuela_states = [
	{
		name: 'Amazonas',
		price: 7,
	},
	{
		name: 'Anzoátegui',
		price: 5,
	},
	{
		name: 'Apure',
		price: 6,
	},
	{
		name: 'Aragua',
		price: 2,
	},
	{
		name: 'Barinas',
		price: 5,
	},
	{
		name: 'Bolívar',
		price: 8,
	},
	{
		name: 'Carabobo',
		price: 2,
	},
	{
		name: 'Cojedes',
		price: 3,
	},
	{
		name: 'Delta Amacuro',
		price: 50,
	},
	{
		name: 'Distrito Capital',
		price: 2,
	},
	{
		name: 'Falcón',
		price: 5,
	},
	{
		name: 'Guarico',
		price: 4,
	},
	{
		name: 'Lara',
		price: 5,
	},
	{
		name: 'Mérida',
		price: 7,
	},
	{
		name: 'Miranda',
		price: 1,
	},
	{
		name: 'Monagas',
		price: 3,
	},
	{
		name: 'Nueva Esparta',
		price: 5,
	},
	{
		name: 'Portuguesa',
		price: 5,
	},
	{
		name: 'Sucre',
		price: 5,
	},
	{
		name: 'Táchira',
		price: 9,
	},
	{
		name: 'Trujillo',
		price: 5,
	},
	{
		name: 'Vargas',
		price: 2,
	},
	{
		name: 'Yaracuy',
		price: 4,
	},
	{
		name: 'Zulia',
		price: 20,
	},
];

// Data to send to distribuidor api
export interface Post_Shipment_data {
	productquantity_set: {
		quantity: number;
		name: string;
	}[];
	target_address: {
		state: string;
		city: string;
		street: string;
		zipcode: string;
	};
	commerce: string;
}

// Data recieved from Arcane api
export interface Post_Shipment_response {
	id: string;
	productquantity_set: {
		quantity: number;
		name: string;
	}[];
	target_address: {
		state: string;
		city: string;
		street: string;
		zipcode: string;
	};
	initial_address: {
		state: string;
		city: string;
		street: string;
		zipcode: string;
	};
	commerce: string;
	state: string;
	price: number;
}
