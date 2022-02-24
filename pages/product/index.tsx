import * as React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import clsx from 'clsx';

// API
import {
	get_products_byID,
	get_shoppingCart_byID,
	patch_shoppingCart_add_product,
} from 'api';

// Local components
import { Layout } from 'components/layout';
import { Divider } from 'components/divider';
import { Items_Displayer } from 'components/items';

// Interfaces
import { Product, Tags, User } from 'interfaces';

// Headless ui
import { Tab } from '@headlessui/react';

// Antd
import { Breadcrumb, Button, Tag } from 'antd';
import {
	MinusOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { dummy_products } from 'dummy_data';

interface Product_Detail_Props {
	user: User;
}
const Product_Detail: React.FC<Product_Detail_Props> = ({ user }) => {
	const router = useRouter();

	// Data
	const [product, setProduct] = React.useState<Product>();

	// Get shopping cart info
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	// Utils
	const [current_photo, setCurrent_Photo] = React.useState<string>();
	const [current_discount, setCurrent_Discount] = React.useState<number>(0);
	const [current_quantity, setCurrent_Quantity] = React.useState<number>(1);

	// FUNCTIONS
	// Add to cart
	const add_to_shoppingCart = async () => {
		if (user && user.access_token && product) {
			const product_data = { quantity: current_quantity, product: product._id };
			const add_response = await patch_shoppingCart_add_product(
				user.access_token,
				user.shoppingCart._id,
				product_data
			);

			if (shoppingCart_refetch) {
				shoppingCart_refetch();
			}

			if (add_response.status != 200) {
				console.log(
					'-- Product page, add to shopping cart response --',
					add_response
				);
			}
		}
	};

	// UseEffects
	// GET and SET product details
	React.useEffect(() => {
		if (router.query.product_id) {
			get_products_byID(router.query.product_id as string).then((response) => {
				console.log('<- Detail, product ->', response);
				setProduct(response.data);
			});
		}
	}, [router]);

	// SET current photo
	React.useEffect(() => {
		if (product) {
			setCurrent_Photo(product.gallery[0]);
			console.log('<- Detail, current photo ->', product.gallery[0]);
		}
	}, [product]);

	// SET discount
	React.useEffect(() => {
		if (product) {
			setCurrent_Discount((product.price * product.discount) / 100);
			console.log(
				'<- Detail, discount ->',
				(product.price * product.discount) / 100
			);
		}
	}, [product]);

	return (
		<Layout
			withHeader
			user={user}
			className="layout flex flex-col"
			// Shopping cart
			shoppingCart_data={shoppingCart_data}
			shoppingCart_refetch={shoppingCart_refetch}
			shoppingCart_isLoading={shoppingCart_isLoading}
		>
			{/* Breadcrumbs */}
			<div className="w-full px-[165px] mb-10">
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link href="/">
							<a>Home </a>
						</Link>
					</Breadcrumb.Item>

					<Breadcrumb.Item>
						<a href="#"> Product </a>
					</Breadcrumb.Item>

					<Breadcrumb.Item>
						<a href="#"> {product?.category.name} </a>
					</Breadcrumb.Item>

					<Breadcrumb.Item>
						<a href="#" className="text-teal-501">{`${product?.title} `}</a>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>

			{/* Image and details */}
			<div className="flex flex-wrap gap-10 w-full mb-20">
				{/* Images section */}
				<div className="flex flex-wrap bg-orange-101 w-[45%] gap-14 pt-6 pb-10 pl-[105px] pr-4">
					{/* Thumbnails photos */}
					<div className="thumbnail_photo flex flex-col gap-4">
						{product?.gallery
							.slice(0, 4)
							.map((image_url: string, key: number) => {
								return (
									<img
										key={key}
										src={image_url}
										onClick={() => setCurrent_Photo(image_url)}
										className={clsx(
											'w-[100px] h-[100px] rounded-md',
											{ 'opacity-50': current_photo != image_url },
											{ 'opacity-100': current_photo == image_url }
										)}
									/>
								);
							})}
					</div>

					{/* Current photo */}
					<div className="current_photo w-[45%]">
						<img
							src={current_photo}
							className="object-cover rounded-md w-full h-full"
						/>
					</div>
				</div>

				{/* Details section */}
				<div className="flex flex-col gap-4 w-[45%]">
					{/* title */}
					<h1 className="text-[60px] leading-[80px] text-semibold text-gray-701">
						{product?.title}
					</h1>

					{/* Discount */}
					{product && product.discount > 0 && (
						<div className="flex flex-col relative mb-2">
							<p className="text-xl text-gray-400">{`${product.price} $`}</p>
							<Divider
								custom_divider_color="#D93F3F"
								className="absolute bottom-[10px] w-[40px]"
							/>
						</div>
					)}

					{/* Price */}
					<h1 className="text-2xl font-semibold text-gray-701 mb-8">
						{product && `${product.price - current_discount} $`}
					</h1>

					<div className="flex flex-wrap gap-6 w-full">
						{product?.tags.map((tag_item: Tags, key: number) => {
							return (
								<Tag
									key={key}
									className={clsx(
										'tag text-base text-center font-semibold',
										'bg-purple-301 border rounded-full',
										'px-2 py-1'
									)}
								>
									{tag_item.name}
								</Tag>
							);
						})}
					</div>

					{/* Buttons */}
					<div className="flex flex-wrap justify-evenly items-baseline w-full mt-auto">
						<div className="flex flex-wrap gap-4">
							<Button
								ghost
								icon={<MinusOutlined />}
								onClick={() => setCurrent_Quantity(current_quantity - 1)}
								className="flex justify-center items-center w-[40px] h-[40px]"
							/>

							<h1 className="text-4xl">{current_quantity}</h1>

							<Button
								ghost
								icon={<PlusOutlined />}
								onClick={() => setCurrent_Quantity(current_quantity + 1)}
								className="flex justify-center items-center w-[40px] h-[40px]"
							/>
						</div>

						<Button
							onClick={add_to_shoppingCart}
							icon={<ShoppingCartOutlined />}
							className={clsx(
								'flex justify-center items-center gap-2',
								'text-xl text-white text-bold',
								'p-4'
							)}
						>
							Add to Cart
						</Button>

						<Button
							ghost
							className="text-xl text-bold text-center py-4 px-[52px]"
						>
							Buy
						</Button>
					</div>
				</div>
			</div>

			{/* Description tabs */}
			<Tab.Group as="div" className="tabs px-[105px] w-full mb-14">
				{/* Tabs options */}
				<Tab.List as="div" className="flex gap-6 mb-8">
					<Tab>
						{({ selected }) => (
							<button
								className={
									selected
										? 'text-2xl text-teal-501 font-bold border-b-[1px] border-b-teal-501'
										: 'text-2xl font-normal'
								}
							>
								Detail
							</button>
						)}
					</Tab>
					<Tab>
						{({ selected }) => (
							<button
								className={
									selected
										? 'text-2xl text-teal-501 font-bold border-b-[1px] border-b-teal-501'
										: 'text-2xl font-normal'
								}
							>
								Gallery
							</button>
						)}
					</Tab>
				</Tab.List>

				{/* Tabs Content */}
				<Tab.Panels>
					{/* Description and compounts */}
					<Tab.Panel>
						<p className="text-base text-gray-500 mb-8">
							{product?.description}
						</p>

						<h2 className="text-xl text-gray-701 mb-4">Composition</h2>

						<div className="flex flex-wrap gap-8 w-full">
							{product?.composition.map((compount: string, key: number) => {
								return (
									<p key={key} className="text-base text-gray-500">
										{compount}
									</p>
								);
							})}
						</div>
					</Tab.Panel>

					{/* Images Gallery */}
					<Tab.Panel>
						<div className="flex flex-wrap justify-evenly gap-4">
							{product &&
								product.gallery.map((image_url: string, key: number) => {
									return (
										<img
											key={key}
											src={image_url}
											className="object-cover rounded-lg"
										/>
									);
								})}
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>

			{/* Related products */}
			<Items_Displayer
				product_type="type1"
				title="Related Products"
				orientation="horizontal"
				products_list={dummy_products.slice(0, 4)}
				show_rows={1}
				className="justify-center gap-4 w-full mb-10 px-[105px]"
			/>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

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

export default Product_Detail;
