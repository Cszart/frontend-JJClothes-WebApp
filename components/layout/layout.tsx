import * as React from 'react';

// Interfaces
import { Layout_Props } from 'interfaces';
import clsx from 'clsx';
import { Header } from 'components/header';
import { Footer } from 'components/footer';

export const Layout: React.FC<Layout_Props> = ({
	children,

	className,
	isLoading,

	// Header
	withHeader = false,
	custom_header_color,

	// Footer
	withFooter = false,
	custom_footer_color,
}) => {
	if (isLoading) {
		return <div className="isLoading">loading ...</div>;
	}

	return (
		<div className="layout w-screen min-h-screen flex flex-col">
			{withHeader && <Header custom_header_color={custom_header_color} />}

			<div className={clsx('w-full', className)}>{children}</div>

			{withFooter && <Footer custom_footer_color={custom_footer_color} />}
		</div>
	);
};

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const token = session?.accessToken as string;

	if (!session) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	return {
		props: { session, equalizers, pageSectionsEquializers },
	};
};
*/

export default Layout;
