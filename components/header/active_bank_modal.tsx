import * as React from 'react';
import { Fragment } from 'react';
import clsx from 'clsx';

// Headless UI
import { Dialog, Transition } from '@headlessui/react';

// Antd
import { Select } from 'antd';
import { get_active_bank, post_change_active_bank } from 'api';
import { useQuery } from 'react-query';
import { CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

interface ShoppingCartModal_props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectActiveBank_Modal: React.FC<ShoppingCartModal_props> = ({
	isOpen,
	setIsOpen,
}) => {
	// Get active bank info
	const {
		data: activeBank_data,
		refetch: activeBank_refetch,
		isFetching: activeBank_isLoading,
	} = useQuery(['activeBank', isOpen], () => get_active_bank());

	// On change select
	const handleChange = async (value: string) => {
		console.log(`-- Header, onChange active bank value --`, value);

		// Call the backend
		const change_response = await post_change_active_bank(value);

		setIsOpen(false);
		activeBank_refetch();

		console.log(`-- Header, onChange active bank response --`, change_response);
	};

	// UseEffect
	// React.useEffect(() => {
	// 	console.log(`-- Header, useEffect active bank value --`, activeBank_data);
	// }, [activeBank_data]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto w-full h-full"
				onClose={() => false}
			>
				<div className="flex justify-end pt-[70px]">
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
						{/* CONTENT of the modal */}
						<div
							className={clsx(
								'transform transition-all overflow-auto ',
								'bg-white shadow-xl rounded-2xl',
								'relative h-full min-w-[380px] right-[8%] px-8 py-4'
							)}
						>
							<div className="flex flex-col gap-4">
								{!activeBank_isLoading && (
									<>
										<div className="flex justify-between">
											<h1 className="text-lg font-bold">Select a bank</h1>

											<CloseOutlined onClick={() => setIsOpen(false)} />
										</div>

										{activeBank_data && (
											<div className="container-antd">
												<Select
													defaultValue={activeBank_data.name}
													onChange={handleChange}
												>
													<Option value="degva">DEGVA bank</Option>
													<Option value="dakiti">Dakiti bank</Option>
												</Select>
											</div>
										)}
									</>
								)}

								{activeBank_isLoading && (
									<h1 className="text-lg font-medium text-center">
										Loading ...
									</h1>
								)}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SelectActiveBank_Modal;
