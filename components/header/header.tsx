import * as React from 'react';

// Interfaces
import { Images } from 'interfaces';

// Antd library
import { Button } from 'antd';
import {
	SearchOutlined,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Divider } from 'components/divider';

interface Header_Props {
	custom_header_color?: string;
}

export const Header: React.FC<Header_Props> = ({
	custom_header_color = '#F8EAFF',
}) => {
	return (
		<div
			className="header w-full flex flex-wrap justify-between items-center mb-14 px-25"
			style={{ background: custom_header_color }}
		>
			{/* Logo */}
			<img src={Images.logo_letters} className="logo w-[100px] h-[70px]" />

			{/* Categories */}
			<div className="categories flex flex-wrap justify-between items-center gap-2">
				<h5 className="text-lg font-extrabold">News</h5>

				<Divider className="w-4" />

				<h5 className="text-lg font-extrabold">Woman</h5>

				<Divider className="w-4" />

				<h5 className="text-lg font-extrabold">Men</h5>
			</div>

			{/* Icons and button */}
			<div className="flex flex-wrap items-center gap-14">
				<div className="icons flex justify-between gap-8">
					<SearchOutlined className="w-6 h-6" />
					<ShoppingOutlined className="w-6 h-6" />
					<UserOutlined className="w-6 h-6" />
				</div>

				<Button
					type="primary"
					className="w-[100px] h-[50px] text-xl font-bold px-4 py-3"
				>
					Log in
				</Button>
			</div>
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

export default Header;
