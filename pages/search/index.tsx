import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

// API
import {
	get_products_byTag_or_Name,
	get_products_related,
	get_shoppingCart_byID,
} from 'api';

// Local components
import { Layout } from 'components/layout';
import { Items_Displayer } from 'components/items';
import { useRouter } from 'next/router';
import { Product } from 'interfaces';
import { useQuery } from 'react-query';
import { Divider } from 'components/divider';
import { Button } from 'antd';

const Home: React.FC<any> = ({ session, user }) => {
	const router = useRouter();
	const { search_text } = router.query;

	// Data
	const [search_products, setSearch_Products] = React.useState<Product[]>([]);

	// Get shopping cart info
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', session?.userData, user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	// Utils
	// Show Rows on tabs
	const [show_rows, setShow_Rows] = React.useState<number>(4);

	// useEffects
	// Get search
	React.useEffect(() => {
		get_products_byTag_or_Name(search_text as string).then((response) => {
			setSearch_Products(response.data);
		});
	}, [search_text]);
	return (
		<Layout
			withHeader
			withFooter
			className="layout flex flex-col items-center px-[100px]"
			// Session
			session={session}
			user={user}
			// Shopping cart
			shoppingCart_data={shoppingCart_data}
			shoppingCart_refetch={shoppingCart_refetch}
			shoppingCart_isLoading={shoppingCart_isLoading}
		>
			<div className="w-full">
				<h1 className="text-center text-gray-701 font-bold text-2xl mb-16">
					Results
				</h1>
			</div>

			<Items_Displayer
				product_type="type1"
				orientation="horizontal"
				products_list={search_products}
				show_rows={show_rows}
				user={user}
				// Shopping cart
				shoppingCart_data={shoppingCart_data}
				shoppingCart_refetch={shoppingCart_refetch}
				shoppingCart_isLoading={shoppingCart_isLoading}
				className="justify-evenly gap-y-16 gap-3 w-full mb-10"
			/>

			{/* Show more button */}
			{show_rows * 4 < search_products.length && (
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
			)}
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
