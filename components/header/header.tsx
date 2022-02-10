import * as React from 'react';
import Link from 'next/link';

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
			className="header flex flex-wrap justify-between items-center sticky top-0 z-50 w-full mb-14 px-25"
			style={{ background: custom_header_color }}
		>
			{/* Logo */}
			<Link href={'/'}>
				<a>
					<img src={Images.logo_letters} className="logo w-[100px] h-[70px]" />
				</a>
			</Link>

			{/* Categories */}
			<div className="categories flex flex-wrap justify-between items-center gap-2">
				<Link href={'#News'}>
					<h5 className="text-lg font-extrabold">News</h5>
				</Link>

				<Divider className="w-4" />

				<Link href={'#Women'}>
					<h5 className="text-lg font-extrabold">Women</h5>
				</Link>

				<Divider className="w-4" />

				<Link href={'#Men'}>
					<h5 className="text-lg font-extrabold">Men</h5>
				</Link>
			</div>

			{/* Icons and button */}
			<div className="flex flex-wrap items-center gap-14">
				<div className="icons flex justify-between gap-8">
					<SearchOutlined className="w-6 h-6" />
					<ShoppingOutlined className="w-6 h-6" />
					<UserOutlined className="w-6 h-6" />
				</div>

				<Link href={'/auth/login'}>
					<Button
						type="primary"
						className="w-[100px] h-[50px] text-xl font-bold px-4 py-3"
					>
						Log in
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Header;
