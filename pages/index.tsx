import * as React from 'react';

// API
import {
	get_products_all,
	get_products_byCategory,
	get_products_new,
} from 'api';

// Local components
import { Layout } from 'components/layout';
import { Items_Displayer } from 'components/items';
import { Divider } from 'components/divider';
import Home_banner from 'components/home/banner';

// Interfaces
import { Category_Values, Product } from 'interfaces';

// Headless ui
import { Tab } from '@headlessui/react';

// Antd
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Home: React.FC<any> = ({ session, user }) => {
	// Data
	const [all_products, setAll_Products] = React.useState<Product[]>([]);
	const [new_products, setNew_Products] = React.useState<Product[]>([]);
	const [women_products, setWomen_Products] = React.useState<Product[]>([]);
	const [men_products, setMen_Products] = React.useState<Product[]>([]);

	// Show Rows on tabs
	const [show_rows, setShow_Rows] = React.useState<number>(1);

	// Show items in carousel
	const [inf_limit, setInf_limit] = React.useState<number>(0);
	const [sup_limit, setSup_limit] = React.useState<number>(3);

	// Utils
	// Next carousel
	const next_carousel = () => {
		if (sup_limit + 3 <= new_products.length) {
			setInf_limit(inf_limit + 3);
			setSup_limit(sup_limit + 3);
		} else {
			setInf_limit(0);
			setSup_limit(3);
		}
	};
	// Back carousel
	const back_carousel = () => {
		if (inf_limit - 3 >= 0) {
			setInf_limit(inf_limit - 3);
			setSup_limit(sup_limit - 3);
		} else {
			setInf_limit(new_products.length - 3);
			setSup_limit(new_products.length);
		}
	};

	// UseEffects
	// When loading
	React.useEffect(() => {
		// Get all products
		get_products_all().then((response) => {
			setAll_Products(response.data);
		});

		// Get new products
		get_products_new().then((response) => {
			setNew_Products(response.data);
		});

		// Get women products
		get_products_byCategory(Category_Values.WOMEN).then((response) => {
			setWomen_Products(response.data);
		});

		// Get men products
		get_products_byCategory(Category_Values.MEN).then((response) => {
			setMen_Products(response.data);
		});

		console.log('-- HOME page, session --', session);
	}, []);

	return (
		<Layout
			withHeader
			withFooter
			session={session}
			user={user}
			className="layout flex flex-col items-center px-[100px]"
		>
			{/* Banner highlight */}
			{new_products.length > 0 && <Home_banner product={new_products[0]} />}

			{/* Best Seller */}
			<Items_Displayer
				title="Best Seller"
				product_type="inline"
				orientation="horizontal"
				products_list={all_products.slice(0, 3)}
				className="w-full mb-20 gap-8"
			/>

			{/* Tabs */}
			<Tab.Group as="div" className="tabs w-full mb-14">
				{/* Tabs options */}
				<Tab.List as="div" className="flex gap-6 mb-14">
					<Tab>
						{({ selected }) => (
							<button
								className={
									selected
										? 'text-2xl font-bold border-b-[1px] border-b-teal-501'
										: 'text-2xl font-normal'
								}
							>
								All
							</button>
						)}
					</Tab>
					<Tab>
						{({ selected }) => (
							<button
								className={
									selected
										? 'text-2xl font-bold border-b-[1px] border-b-teal-501'
										: 'text-2xl font-normal'
								}
							>
								New
							</button>
						)}
					</Tab>
					<Tab>
						{({ selected }) => (
							<button
								className={
									selected
										? 'text-2xl font-bold border-b-[1px] border-b-teal-501'
										: 'text-2xl font-normal'
								}
							>
								Women
							</button>
						)}
					</Tab>
					<Tab>
						{({ selected }) => (
							<button
								className={
									selected
										? 'text-2xl font-bold border-b-[1px] border-b-teal-501'
										: 'text-2xl font-normal'
								}
							>
								Men
							</button>
						)}
					</Tab>
				</Tab.List>

				{/* Tabs Content (Products) */}
				<Tab.Panels>
					{/* All content */}
					<Tab.Panel>
						<Items_Displayer
							product_type="type2"
							orientation="horizontal"
							products_list={all_products}
							show_rows={show_rows}
							className="justify-evenly gap-4 w-full mb-10"
						/>
					</Tab.Panel>

					{/* New content */}
					<Tab.Panel>
						<Items_Displayer
							product_type="type2"
							orientation="horizontal"
							products_list={new_products}
							show_rows={show_rows}
							className="justify-evenly gap-y-16 gap-3 w-full mb-10"
						/>
					</Tab.Panel>

					{/* Women content */}
					<Tab.Panel>
						<Items_Displayer
							product_type="type2"
							orientation="horizontal"
							products_list={women_products}
							className="justify-evenly gap-y-16 gap-3 w-full mb-10"
						/>
					</Tab.Panel>

					{/* Men content */}
					<Tab.Panel>
						<Items_Displayer
							product_type="type2"
							orientation="horizontal"
							products_list={men_products}
							className="justify-evenly gap-y-16 gap-3 w-full mb-10"
						/>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>

			{/* Show more button */}
			<div className="flex items-center w-full gap-8 mb-14">
				<Divider className="w-full" custom_divider_color="#a3e4db" />
				<Button
					ghost
					onClick={() => {
						setShow_Rows(show_rows + 1);
					}}
					className="text-2xl text-center w-full h-[66px]"
				>
					See more
				</Button>
				<Divider className="w-full" custom_divider_color="#a3e4db" />
			</div>

			{/* Highlight collection */}
			<div className="highlight_collection flex bg-white rounded-lg w-full mb-6">
				{/* Text */}
				<div className="flex flex-col w-2/6 p-16">
					<h1 className="text-4xl text-center font-bold mb-10">
						New Collection
					</h1>
					<h3 className="text-2xl text-center mb-[70px]">
						Looking for something new and wild? We got what you need
					</h3>
					<a className="text-2xl text-center font-bold">Shop Now</a>
				</div>

				{/* Carousel */}
				<div className="relative flex flex-wrap items-center w-4/6 py-14">
					{/* Left button */}
					<Button
						ghost
						icon={<LeftOutlined />}
						onClick={back_carousel}
						className="absolute flex justify-center items-center left-0 w-10 h-10"
					/>

					{/* Items */}
					<Items_Displayer
						product_type="type3"
						orientation="horizontal"
						products_list={new_products.slice(inf_limit, sup_limit)}
						className="justify-evenly w-full"
					/>

					{/* Right button */}
					<Button
						ghost
						icon={<RightOutlined />}
						onClick={next_carousel}
						className="absolute justify-center items-center right-0 w-10 h-10"
					/>
				</div>
			</div>
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

export default Home;
