import * as React from 'react';

// API
import { get_products_all } from 'api';

// Local components
import { Layout } from 'components/layout';
import { Items_Displayer } from 'components/items';
import { Divider } from 'components/divider';
import Home_banner from 'components/home/banner';

// Interfaces
import { Product } from 'interfaces';
// Headless ui
import { Tab } from '@headlessui/react';

// Antd
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Home = () => {
	const [all_products, setAll_Products] = React.useState<Product[]>([]);

	// Show Rows on tabs
	const [show_rows, setShow_Rows] = React.useState<number>(1);

	// Show items in carousel
	const [inf_limit, setInf_limit] = React.useState<number>(0);
	const [sup_limit, setSup_limit] = React.useState<number>(3);

	// Utils
	const next_carousel = () => {
		if (sup_limit + 3 <= all_products.length) {
			setInf_limit(inf_limit + 3);
			setSup_limit(sup_limit + 3);
		} else {
			setInf_limit(0);
			setSup_limit(3);
		}
	};

	const back_carousel = () => {
		if (inf_limit - 3 >= 0) {
			setInf_limit(inf_limit - 3);
			setSup_limit(sup_limit - 3);
		} else {
			setInf_limit(all_products.length - 3);
			setSup_limit(all_products.length);
		}
	};

	// UseEffects
	React.useEffect(() => {
		console.log('<- Home, inf limit ->', inf_limit);
		console.log('<- Home, sup limit ->', sup_limit);
	}, [inf_limit, sup_limit]);

	React.useEffect(() => {
		// GET all products
		get_products_all().then((response) => {
			setAll_Products(response.data);
		});

		// setAll_Products(dummy_products);
		// console.log('<- Home, products ->', dummy_products);
	}, []);

	return (
		<Layout
			withHeader
			withFooter
			className="layout flex flex-col items-center px-[100px]"
		>
			{/* Banner highlight */}
			{all_products.length > 0 && <Home_banner product={all_products[0]} />}

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
							product_type="type1"
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
							products_list={all_products}
							show_rows={show_rows}
							className="justify-evenly gap-y-16 gap-3 w-full mb-10"
						/>
					</Tab.Panel>

					{/* Women content */}
					<Tab.Panel>
						<Items_Displayer
							product_type="type3"
							orientation="horizontal"
							products_list={all_products.slice(0, 3)}
							className="w-full mb-10"
						/>
					</Tab.Panel>

					{/* Men content */}
					<Tab.Panel>Content 4</Tab.Panel>
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
						products_list={all_products.slice(inf_limit, sup_limit)}
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

export default Home;
