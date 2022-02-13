import * as React from 'react';

// Local components
import { Items_Displayer } from 'components/items';
import { Layout } from 'components/layout';

// Dummy data
import { dummy_products, dummy_shoppingCart } from 'dummy_data';
import ShoppingCart_Item from 'components/shopping_cart/shopping_cart_item';
import { Button } from 'antd';
import ShoppingCart_Modal from 'components/shopping_cart/shopping_cart_modal';

const Guide_Styles = () => {
	const [show_shoppingCart, setShow_ShoppingCart] =
		React.useState<boolean>(false);

	return (
		<Layout withHeader withFooter className="bg-orange-100 px-[100px]">
			{/* Items */}
			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items type 1
			</h1>
			<Items_Displayer
				product_type="type1"
				products_list={dummy_products.slice(0, 4)}
				className="type1 w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items type 2
			</h1>
			<Items_Displayer
				product_type="type2"
				products_list={dummy_products.slice(0, 4)}
				className="type2 w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items type 3
			</h1>
			<Items_Displayer
				product_type="type3"
				products_list={dummy_products.slice(0, 4)}
				className="type3 w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items inline vertical oriented
			</h1>
			<Items_Displayer
				title="Title 1"
				product_type="inline"
				orientation="vertical"
				products_list={dummy_products.slice(0, 3)}
				className="mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items inline horizontal oriented
			</h1>
			<Items_Displayer
				title="Title"
				product_type="inline"
				orientation="horizontal"
				products_list={dummy_products.slice(0, 3)}
				className="w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Shopping cart item
			</h1>
			<ShoppingCart_Item
				quantity={1}
				product={dummy_products[2]}
				_id={'Dummy-Item-1'}
				__v={1}
			/>

			<h1 className="text-2xl font-bold bg-black text-white mt-8 mb-8">
				Shopping cart modal
			</h1>
			<Button
				onClick={() => {
					setShow_ShoppingCart(true);
				}}
				className="w-full h-[60px] mb-10"
			>
				Show shopping cart
			</Button>

			<ShoppingCart_Modal
				isOpen={show_shoppingCart}
				setIsOpen={setShow_ShoppingCart}
				shoppingCart_data={dummy_shoppingCart}
			/>
		</Layout>
	);
};

export default Guide_Styles;
