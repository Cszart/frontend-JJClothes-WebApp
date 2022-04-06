export interface Bank_Data_Dates {
	_id: string;
	date: string;
	__v: number;
}

export interface Bank_Dakiti_Pay_Data {
	card: string;
	cvc: string;
	expirationDate: string;
	nombre: string;
	monto: number;
	descripcion: string;
	apiKey?: string;
}

export enum Banks_Options {
	DAKITI = 'dakiti',
	DEGVA = 'degva',
}
