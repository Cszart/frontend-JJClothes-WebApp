import * as React from 'react';

// API
import { get_products_all } from 'api';

// Local components
import { Layout } from 'components/layout';

// Interfaces
import { Images, Product } from 'interfaces';
import { Items_Displayer } from 'components/items';

// Headless ui
import { Tab } from '@headlessui/react';
import { Divider } from 'components/divider';
import { Button } from 'antd';

const Home = () => {
	const [all_products, setAll_Products] = React.useState<Product[]>([]);

	// UseEffects
	React.useEffect(() => {
		// GET all products
		get_products_all().then((response) => {
			setAll_Products(response.data);
		});
	}, []);

	return (
		<Layout
			withHeader
			withFooter
			className="flex flex-col items-center px-[100px]"
		>
			{/* Banner highlight */}
			<img src={Images.highligthBanner} className="mb-16" />

			{/* Best Seller */}
			<Items_Displayer
				title="Best Seller"
				product_type="inline"
				orientation="horizontal"
				products_list={all_products.slice(0, 3)}
				className="w-full mb-20"
			/>

			{/* Tabs */}
			<Tab.Group as="div" className="w-full mb-14">
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
							className="w-full mb-10"
						/>
					</Tab.Panel>
					<Tab.Panel>
						<Items_Displayer
							product_type="type2"
							orientation="horizontal"
							products_list={all_products}
							className="w-full mb-10"
						/>
					</Tab.Panel>
					<Tab.Panel>
						<Items_Displayer
							product_type="type3"
							orientation="horizontal"
							products_list={all_products}
							className="w-full mb-10"
						/>
					</Tab.Panel>
					<Tab.Panel>Content 4</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>

			{/* Show more button */}
			<div className="container-antd flex items-center w-full gap-8 mb-14">
				<Divider className="w-full" custom_divider_color="#a3e4db" />
				<Button ghost className="text-2xl text-center w-full h-[66px]">
					See more
				</Button>
				<Divider className="w-full" custom_divider_color="#a3e4db" />
			</div>

			{/* Carousel */}
			<img src={Images.collection_carousel} className="mb-14" />
		</Layout>
	);
};

export default Home;
