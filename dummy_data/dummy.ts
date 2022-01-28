/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from 'interfaces';

export const dummy_products: Product[] = [
	{
		id: 'dummyID_1',
		title: 'Regular fit pocket cotton shirt',
		new_item: true,
		price: 1000,
		discount: 0,
		description:
			'Regular fit. Cotton fabric. Classic collar. Chest pocket. Long buttoned sleeve. Button up. The model is 187 cm tall and is wearing a size M.',
		warranty: 'No warranty',
		gallery: [
			'https://st.mngbcn.com/rcs/pics/static/T1/fotos/S20/17084048_37_B.jpg?ts=1626436117085&imwidth=247&imdensity=2',
			'https://st.mngbcn.com/rcs/pics/static/T1/fotos/outfit/S20/17084048_37-99999999_01.jpg?ts=1632305173954&imwidth=502&imdensity=2',
		],
		stock: 12,
		category: [{ id: 'categoryID_1', title: 'men' }],
		tags: [
			{ id: 'TagID_1', title: 'men' },
			{ id: 'TagID_2', title: 'shirt' },
			{ id: 'TagID_3', title: 'plain' },
		],
	},
	{
		id: 'dummyID_2',
		title: 'Textured overshirt with pockets',
		new_item: false,
		price: 2000,
		discount: 20,
		description:
			'Online Exclusive. Long sleeve. Light fabric. Front closure. Standard design. Regular neck. Slim fit. Textured fabric. Twin buttoned flap pockets at front. Classic collar. Long sleeve with buttoned cuffs. Button up. The model is 190 cm tall and is wearing a size M.',
		warranty: 'No warranty',
		gallery: [
			'https://st.mngbcn.com/rcs/pics/static/T2/fotos/S20/27000583_37_B.jpg?ts=1637676382488&imwidth=247&imdensity=2',
			'https://st.mngbcn.com/rcs/pics/static/T2/fotos/outfit/S20/27000583_37-99999999_01.jpg?ts=1637748499823&imwidth=502&imdensity=2',
		],
		stock: 12,
		category: [{ id: 'categoryID_1', title: 'men' }],
		tags: [
			{ id: 'TagID_1', title: 'men' },
			{ id: 'TagID_2', title: 'shirt' },
			{ id: 'TagID_3', title: 'plain' },
		],
	},
	{
		id: 'dummyID_3',
		title: 'Regular fit pocket cotton shirt',
		new_item: true,
		price: 1000,
		discount: 10,
		description:
			'Regular fit. Cotton fabric. Classic collar. Chest pocket. Long buttoned sleeve. Button up. The model is 187 cm tall and is wearing a size M.',
		warranty: 'No warranty',
		gallery: [
			'https://st.mngbcn.com/rcs/pics/static/T1/fotos/S20/17067713_08_B.jpg?ts=1629298245525&imwidth=247&imdensity=2',
			'https://st.mngbcn.com/rcs/pics/static/T1/fotos/S20/17067713_08.jpg?ts=1633337759841&imwidth=502&imdensity=2',
		],
		stock: 12,
		category: [{ id: 'categoryID_1', title: 'women' }],
		tags: [
			{ id: 'TagID_1', title: 'women' },
			{ id: 'TagID_2', title: 'coat' },
		],
	},
];
