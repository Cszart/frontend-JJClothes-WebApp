import * as React from 'react';
import clsx from 'clsx';
import { dummy_shoppingCart } from 'dummy_data';

// Interfaces
import { Images, Product_Item } from 'interfaces';

// Local component
import { Divider } from 'components/divider';

// Antd
import { Button } from 'antd';
import { Layout } from 'components/layout';
import { ShoppingCart_Item } from 'components/shopping_cart';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export const ShoppingCart_Modal: React.FC<any> = () => {
	const { subtotal, items } = dummy_shoppingCart;

	return (
		<Layout withHeader className="layout flex flex-col gap-7 px-[105px]">
			{/* First row */}
			<div className="flex flex-row flex-wrap justify-evenly w-full">
				{/* Shopping cart slang */}
				<div className="flex flex-col gap-6 bg-white w-[450px] p-10">
					<h1 className="text-3xl font-bold text-gray-701">
						Don’t worry about nothing, we got your Bag!
					</h1>

					<img
						src={Images.bag_logo}
						className="self-center w-[180px] h-[150px]"
					/>

					<Link href={'/'}>
						<Button ghost className="text-center bg-white w-full py-[18px]">
							Go back shopping
						</Button>
					</Link>
				</div>

				{/* Detail of shopping cart */}
				<div className="flex flex-col bg-white w-[540px] gap-8 p-8">
					<h1 className="text-4xl text-semibold text-gray-701 mb-2">
						Shopping Cart
					</h1>

					<div className="flex flex-wrap justify-between w-full">
						<h4 className="text-2xl text-medium text-gray-701">
							Number of items
						</h4>
						<h4 className="text-2xl text-medium text-gray-701">
							{items.length}
						</h4>
					</div>

					<div className="flex flex-wrap justify-between w-full">
						<h4 className="text-2xl text-medium text-gray-701">Subtotal</h4>
						<h4 className="text-2xl text-medium text-gray-701">{`$ ${subtotal}`}</h4>
					</div>

					<div className="flex flex-wrap justify-between w-full">
						<h4 className="text-2xl text-medium text-gray-701">
							Shipping Cost
						</h4>
						<h4 className="text-2xl text-medium text-gray-701">$ 666</h4>
					</div>

					<div className="flex flex-wrap justify-between w-full">
						<h4 className="text-2xl text-medium text-gray-701">Packaging</h4>
						<h4 className="text-2xl text-medium text-gray-701">$ 100</h4>
					</div>

					<Divider className="w-full mb-2" />

					<div className="flex flex-wrap justify-between w-full">
						<h1 className="text-2xl text-medium text-gray-701">Grand Total</h1>

						<h1 className="text-4xl text-semibold text-gray-701">
							{`$ ${subtotal + 666 + 100}`}
						</h1>
					</div>
				</div>
			</div>

			{/* Second Row */}
			{/* Products Items */}
			<div
				className={clsx(
					'flex flex-col',
					'bg-white shadow-xl rounded-2xl w-full'
				)}
			>
				{/* Items */}
				{items.map((product_item: Product_Item, key: number) => {
					return (
						<>
							<ShoppingCart_Item key={key} {...product_item} />
							<Divider
								className="self-center w-[1020px]"
								custom_divider_color="#000000"
							/>
						</>
					);
				})}

				{/* Subtotal */}
				<div className="flex justify-end items-center gap-6 mt-10 mb-10 px-14">
					<h3 className="text-xl text-gray-701">Subtotal</h3>
					<h1 className="text-2xl font-semibold">{`$ ${subtotal}`}</h1>
				</div>

				{/* Button */}
				<Button className="self-center text-center text-xl text-bold rounded-lg w-[80%] mb-10 py-4">
					Checkout
				</Button>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session && session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
};

export default ShoppingCart_Modal;
