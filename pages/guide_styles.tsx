import * as React from 'react';

// Local components
import { Items_Displayer } from 'components/items';
import { Layout } from 'components/layout';

// Dummy data
import { dummy_products } from 'dummy_data';

const Guide_Styles = () => {
	return (
		<Layout withHeader withFooter className="bg-orange-100 px-[100px]">
			{/* Items */}
			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items type 1
			</h1>
			<Items_Displayer
				product_type="type1"
				products_list={dummy_products}
				className="type1 w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items type 2
			</h1>
			<Items_Displayer
				product_type="type2"
				products_list={dummy_products}
				className="type2 w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items type 3
			</h1>
			<Items_Displayer
				product_type="type3"
				products_list={dummy_products}
				className="type3 w-full mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items inline vertical oriented
			</h1>
			<Items_Displayer
				title="Title 1"
				product_type="inline"
				orientation="vertical"
				products_list={dummy_products}
				className="mb-10"
			/>

			<h1 className="text-2xl font-bold bg-black text-white mb-8">
				Items inline horizontal oriented
			</h1>
			<Items_Displayer
				title="Title"
				product_type="inline"
				orientation="horizontal"
				products_list={dummy_products}
				className="w-full mb-10"
			/>
		</Layout>
	);
};

export default Guide_Styles;
