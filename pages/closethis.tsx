import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useQuery } from 'react-query';

// API
import { get_shoppingCart_byID } from 'api';

// Local components
import { Layout } from 'components/layout';

const CloseThis: React.FC<any> = ({ session, user }) => {
	// Get shopping cart info
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', session?.userData, user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	return (
		<Layout
			className="layout flex items-center align-center justify-center"
			// Session
			session={session}
			user={user}
			// Shopping cart
			shoppingCart_data={shoppingCart_data}
			shoppingCart_refetch={shoppingCart_refetch}
			shoppingCart_isLoading={shoppingCart_isLoading}
		>
			<h1 className="text-4xl font-bold text-center mt-8">
				Transaction succeeded, please close this window
			</h1>
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

export default CloseThis;
