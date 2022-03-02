import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Images, Product_Item, ShoppingCart_Update, User } from 'interfaces';

// Local component
import { Divider } from 'components/divider';

// Antd
import { Button } from 'antd';
import { Layout } from 'components/layout';
import { ShoppingCart_Item } from 'components/shopping_cart';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { get_shoppingCart_byID, patch_shoppingCart_update } from 'api';
import { useQuery } from 'react-query';

interface ShoppingCart_Modal_Props {
	user: User;
}
export const ShoppingCart_Modal: React.FC<ShoppingCart_Modal_Props> = ({
	user,
}) => {
	// Get shopping cart info
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	const remove_from_shoppingCart = async (product_id: string) => {
		if (user && user.access_token && shoppingCart_data) {
			// Filter items matching id
			const items_filtered = shoppingCart_data.items.filter(
				(item: Product_Item) => {
					return item.product._id != product_id;
				}
			);

			const new_shoppingCart: ShoppingCart_Update = {
				items: items_filtered.map((item: Product_Item) => {
					return { quantity: item.quantity, product: item.product._id };
				}),
			};

			// Update shopping cart backend call
			const update_response = await patch_shoppingCart_update(
				user.access_token,
				user.shoppingCart._id,
				new_shoppingCart
			);

			if (shoppingCart_refetch) shoppingCart_refetch();

			if (update_response.status != 200) {
				console.log(
					'-- Shopping cart modal, remove item response --',
					update_response
				);
			}
		}
	};

	const add_quantity_from_shoppingCart = async (product_id: string) => {
		if (user && user.access_token && shoppingCart_data) {
			// Filter items matching id
			const items_add = shoppingCart_data.items.map((item: Product_Item) => {
				if (product_id === item.product._id) {
					return { ...item, quantity: item.quantity + 1 };
				} else {
					return item;
				}
			});

			const new_shoppingCart: ShoppingCart_Update = {
				items: items_add.map((item: Product_Item) => {
					return { quantity: item.quantity, product: item.product._id };
				}),
			};

			// Update shopping cart backend call
			const update_response = await patch_shoppingCart_update(
				user.access_token,
				user.shoppingCart._id,
				new_shoppingCart
			);

			if (shoppingCart_refetch) shoppingCart_refetch();

			if (update_response.status != 200) {
				console.log(
					'-- Shopping cart modal, remove item response --',
					update_response
				);
			}
		}
	};

	const substract_quantity_from_shoppingCart = async (product_id: string) => {
		if (user && user.access_token && shoppingCart_data) {
			// Filter items matching id
			const items_substract = shoppingCart_data.items.map(
				(item: Product_Item) => {
					if (product_id === item.product._id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				}
			);

			const new_shoppingCart: ShoppingCart_Update = {
				items: items_substract.map((item: Product_Item) => {
					return { quantity: item.quantity, product: item.product._id };
				}),
			};

			// Update shopping cart backend call
			const update_response = await patch_shoppingCart_update(
				user.access_token,
				user.shoppingCart._id,
				new_shoppingCart
			);

			if (shoppingCart_refetch) shoppingCart_refetch();

			if (update_response.status != 200) {
				console.log(
					'-- Shopping cart modal, remove item response --',
					update_response
				);
			}
		}
	};

	return (
		<Layout
			withHeader
			user={user}
			className="layout flex flex-col gap-7 px-[105px]"
			// Shopping cart
			shoppingCart_data={shoppingCart_data}
			shoppingCart_refetch={shoppingCart_refetch}
			shoppingCart_isLoading={shoppingCart_isLoading}
		>
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
							{shoppingCart_data && shoppingCart_data.items.length}
						</h4>
					</div>

					<div className="flex flex-wrap justify-between w-full">
						<h4 className="text-2xl text-medium text-gray-701">Subtotal</h4>
						<h4 className="text-2xl text-medium text-gray-701">
							{shoppingCart_data && `$ ${shoppingCart_data.subtotal}`}
						</h4>
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
							{shoppingCart_data &&
								`$ ${shoppingCart_data.subtotal + 666 + 100}`}
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
				{shoppingCart_data?.items.map(
					(product_item: Product_Item, key: number) => {
						return (
							<>
								<ShoppingCart_Item
									key={key}
									product_item={product_item}
									remove_from_shoppingCart={remove_from_shoppingCart}
									add_quantity={add_quantity_from_shoppingCart}
									substract_quantity={substract_quantity_from_shoppingCart}
								/>
								<Divider
									className="self-center w-[1020px]"
									custom_divider_color="#000000"
								/>
							</>
						);
					}
				)}

				{/* Subtotal */}
				<div className="flex justify-end items-center gap-6 mt-10 mb-10 px-14">
					<h3 className="text-xl text-gray-701">Subtotal</h3>
					<h1 className="text-2xl font-semibold">{`$ ${shoppingCart_data?.subtotal}`}</h1>
				</div>

				{/* Button */}
				<Link href={'/payment/billing'}>
					<Button className="self-center text-center text-xl text-bold rounded-lg w-[80%] mb-10 py-4">
						Checkout
					</Button>
				</Link>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session == null) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	if (session) {
		const user = session.userData;

		return {
			props: { session, user },
		};
	}

	return {
		props: { session },
	};
};

export default ShoppingCart_Modal;
