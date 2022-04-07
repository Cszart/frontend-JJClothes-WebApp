import * as React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';

// Interfaces
import { Images, User, User_Rol } from 'interfaces';

// Antd library
import {
	BankOutlined,
	PieChartOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
import { Badge, Input } from 'antd';

import { Divider } from 'components/divider';
import { useRouter } from 'next/router';
import SelectActiveBank_Modal from './active_bank_modal';

const { Search } = Input;

interface Header_Props {
	className?: string;
	custom_header_color?: string;
	setShow_ShoppingCart: React.Dispatch<React.SetStateAction<boolean>>;

	shoppinCart_items_count?: number;
	user?: User;
}

export const Header: React.FC<Header_Props> = ({
	className,
	custom_header_color = '#F8EAFF',
	setShow_ShoppingCart,

	user,
	shoppinCart_items_count = 0,
}) => {
	const router = useRouter();

	// Show / Hide select active bank modal
	const [show_SelectActiveBank, setShow_SelectActiveBank] =
		React.useState<boolean>(false);

	const onSearch = (searchValue: string) => {
		router.push({
			pathname: '/search',
			query: { search_text: searchValue },
		});
	};

	return (
		<>
			<div
				className={clsx(
					'header flex flex-wrap justify-between items-center sticky top-0 z-50 w-full mb-14 px-25',
					className
				)}
				style={{ background: custom_header_color }}
			>
				{/* Logo */}
				<Link href={'/'}>
					<a>
						<img
							src={Images.logo_letters}
							className="logo w-[100px] h-[70px]"
						/>
					</a>
				</Link>

				{/* Categories */}
				<div className="categories flex flex-wrap justify-between items-center gap-2 xl:ml-[10%]">
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
				<div
					className={clsx(
						'flex justify-between items-center',
						{ 'gap-16': !user },
						{ 'gap-12': user }
					)}
				>
					{/* Search and icons */}
					<div className="container-antd flex justify-between gap-4">
						<Search
							placeholder="Search"
							onSearch={onSearch}
							className="w-[70%]"
						/>

						<div className="container-antd flex justify-between items-center gap-6">
							<Badge count={shoppinCart_items_count} overflowCount={8}>
								<ShoppingOutlined
									className=""
									onClick={() => {
										setShow_ShoppingCart(true);
									}}
								/>
							</Badge>

							{user && user.rol == User_Rol.ADMIN && (
								<Link href={'/reports'}>
									<PieChartOutlined />
								</Link>
							)}

							{user && user.rol == User_Rol.ADMIN && (
								<BankOutlined onClick={() => setShow_SelectActiveBank(true)} />
							)}
						</div>
					</div>

					{/* Login button */}
					{!user && (
						<Link href={'/auth/signin'}>
							<button
								className={clsx(
									'bg-black rounded-lg',
									'text-lg font-bold text-white',
									'w-[100px] h-[50px] px-4 py-3'
								)}
							>
								Log in
							</button>
						</Link>
					)}

					{/* Log out */}
					{user && (
						<button
							onClick={() => signOut({ callbackUrl: '/' })}
							className={clsx(
								'text-lg font-semibold text-gray-800',
								'rounded-lg px-4 py-3'
							)}
						>
							Log out
						</button>
					)}
				</div>
			</div>

			<SelectActiveBank_Modal
				isOpen={show_SelectActiveBank}
				setIsOpen={setShow_SelectActiveBank}
			/>
		</>
	);
};

export default Header;
