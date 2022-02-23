import { Layout } from 'components/layout';
import { Images } from 'interfaces';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';

const Landing: React.FC<any> = ({ user }) => {
	return (
		<Layout withHeader user={user} className="flex flex-col items-center gap-8">
			<img src={Images.firstSection} />
			<img src={Images.secondSection} />
			<img src={Images.thirdSection} />
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

export default Landing;
