import * as React from 'react';
import { Product, Product_Item, ShoppingCart } from 'interfaces';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';
import ShoppingCart_Item from './shopping_cart_item';
import { Divider } from 'components/divider';
import { Button } from 'antd';

interface ShoppingCartModal_props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

	shoppingCart_data: ShoppingCart;
}

export const ShoppingCart_Modal: React.FC<ShoppingCartModal_props> = ({
	isOpen,
	setIsOpen,
	shoppingCart_data,
}) => {
	const { subtotal, items } = shoppingCart_data;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto w-full h-full"
				onClose={() => setIsOpen(false)}
			>
				<div className="flex justify-center w-full h-full pt-[80px]">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>

					{/* Transition of content */}
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{/* Container of the modal */}
						<div
							className={clsx(
								'transform transition-all overflow-auto ',
								'flex flex-col',
								'bg-white shadow-xl rounded-2xl w-[1120px]'
							)}
						>
							{/* Items */}
							{items.map((product_item: Product_Item, key: number) => {
								return (
									<div key={key} className="w-full">
										<ShoppingCart_Item {...product_item} />
										<Divider
											className="self-center w-[1020px]"
											custom_divider_color="#000000"
										/>
									</div>
								);
							})}

							{/* Subtotal */}
							<div className="flex justify-end items-center gap-6 mt-10 mb-10 px-14">
								<h3 className="text-xl text-gray-701">Subtotal</h3>
								<h1 className="text-2xl font-semibold">{subtotal}</h1>
							</div>

							{/* Button */}
							<Button className="self-center text-center rounded-lg w-[80%] mb-10 py-4">
								Checkout
							</Button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ShoppingCart_Modal;
