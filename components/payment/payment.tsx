/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

// antd
import { Form, Button, Radio, Input, DatePicker } from 'antd';

// Local components
import { Divider } from 'components/divider';

// interfaces
import { Bill, Icons, Payment, Product_Item, User } from 'interfaces';
import { ShoppingCart_Item } from 'components/shopping_cart';

interface PaymentPage_Props {
	user: User;
	// data
	billing_data?: Bill;

	current_items?: Product_Item[];
	setCurrent_Items: React.Dispatch<React.SetStateAction<Product_Item[]>>;

	// Detail order
	subtotal?: number;
	shipping_cost?: number;

	// onFinish
	onFinish_Payment: (values: Payment, bank_selected: number) => void;
}
export const PaymentPage: React.FC<PaymentPage_Props> = ({
	billing_data,

	current_items,
	setCurrent_Items,

	subtotal,
	shipping_cost,

	onFinish_Payment,
}) => {
	const [form] = Form.useForm();

	// Control vars
	const [show_items, setShow_Items] = React.useState<boolean>(true);

	// Data
	const [bank_selected, setBank_Selected] = React.useState<number>(1);

	// FUNCTIONS
	// Remove item from order
	const remove_from_items_list = async (product_id: string) => {
		// Filter items matching id
		const items_filtered = current_items?.filter((item: Product_Item) => {
			return item.product._id != product_id;
		});

		if (items_filtered && items_filtered.length > 0) {
			setCurrent_Items(items_filtered);
		}
	};

	// Add another product
	const add_quantity_to_items_list = async (product_id: string) => {
		// Filter items matching id
		const items_add = current_items?.map((item: Product_Item) => {
			if (product_id === item.product._id) {
				return { ...item, quantity: item.quantity + 1 };
			} else {
				return item;
			}
		});

		if (items_add && items_add.length > 0) setCurrent_Items(items_add);
	};

	// Remove another product
	const substract_quantity_to_items_list = async (product_id: string) => {
		// Filter items matching id
		const items_minus = current_items?.map((item: Product_Item) => {
			if (product_id === item.product._id) {
				return { ...item, quantity: item.quantity - 1 };
			} else {
				return item;
			}
		});

		if (items_minus && items_minus.length > 0) setCurrent_Items(items_minus);
	};

	// on Change radio button
	const onChange_radioBank = (event: any) => {
		setBank_Selected(event.target.value);
	};

	// On finish form (this function only accepts one parameter so cannot pass directly from parent)
	const onFinish = (values: any) => {
		onFinish_Payment(values, bank_selected);
	};

	return (
		<div className="payment flex flex-row flex-wrap w-full gap-8 px-[110px]">
			{/* Nav icons bar */}
			<div className="iconsBar flex flex-wrap justify-center items-baseline w-full gap-4">
				{/* Checkout */}
				<div className="flex flex-col">
					<img src={Icons.checkoutgray} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-gray-201">1. Checkout</h1>
				</div>

				<Divider custom_divider_color="#333333" className="w-[100px]" />

				{/* Payment */}
				<div className="flex flex-col">
					<img src={Icons.paymentgreen} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-teal-501">2. Payment</h1>
				</div>

				<Divider custom_divider_color="#333333" className="w-[100px]" />

				{/* Confirm */}
				<div className="flex flex-col">
					<img src={Icons.confirmgray} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-gray-201">
						3. Confirmation
					</h1>
				</div>
			</div>

			{/* Information row */}
			<div className="flex flex-row justify-between w-full gap-4">
				{/*Left side*/}
				<div className={clsx('flex flex-col bg-white rounded-lg w-[45%] p-10')}>
					<h1 className="text-3xl text-black pb-12 font-bold">Detail Order</h1>

					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Subtotal</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">
							${' '}
							{subtotal
								? Math.round((subtotal + Number.EPSILON) * 100) / 100
								: ''}
						</h3>
					</div>

					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Shipping Cost</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">
							${' '}
							{shipping_cost
								? Math.round((shipping_cost + Number.EPSILON) * 100) / 100
								: ''}
						</h3>
					</div>

					<Divider
						custom_divider_color="#FF6C00"
						className="bottom-[10px] w-full"
					/>

					<div className="flex flex-row mt-6">
						<h3 className="text-2xl text-black pb-6 w-1/2">Grand Total</h3>
						<h3 className="text-3xl text-black pb-6 w-1/2">
							$
							{subtotal && shipping_cost
								? Math.round(
										(subtotal + shipping_cost + Number.EPSILON) * 100
								  ) / 100
								: ''}
						</h3>
					</div>
				</div>

				{/*Right side*/}
				<div
					className={clsx(
						'flex flex-col bg-white rounded-lg w-[45%] gap-4 p-10'
					)}
				>
					<h1 className="text-3xl text-black pb-12 font-bold">
						Billing Detail
					</h1>

					<div className="flex flex-row justify-between">
						<h3 className="text-base text-black">Purchase Date</h3>
						<h3 className="text-base text-black">
							{moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
						</h3>
					</div>

					<div
						onClick={() => setShow_Items(!show_items)}
						className="flex flex-row justify-between cursor-pointer"
					>
						<h3 className="text-base text-black">Items</h3>
						<h3 className="text-base text-black">x {current_items?.length}</h3>
					</div>

					<div className="flex flex-row justify-between">
						<h3 className="text-base text-black">Name</h3>
						<h3 className="text-base text-black">{billing_data?.fullName}</h3>
					</div>

					<div className="flex flex-row justify-between">
						<h3 className="text-base text-black">Phone Number</h3>
						<h3 className="text-base text-black">
							{billing_data?.phoneNumber}
						</h3>
					</div>

					<div className="flex flex-row justify-between">
						<h3 className="text-base text-black">Email</h3>
						<h3 className="text-base text-black">{billing_data?.email}</h3>
					</div>

					<div className="flex flex-row justify-between">
						<h3 className="text-base text-black">Street Address</h3>
						<h3 className="text-base text-black">{billing_data?.street}</h3>
					</div>
				</div>
			</div>

			{/* Show items to buy */}
			{show_items && (
				<div className="flex flex-col w-full">
					{/* Items */}
					{current_items?.map((product_item: Product_Item, key: number) => {
						return (
							<div key={key} className="w-full">
								<ShoppingCart_Item
									product_item={product_item}
									remove_from_shoppingCart={remove_from_items_list}
									add_quantity={add_quantity_to_items_list}
									substract_quantity={substract_quantity_to_items_list}
								/>
								<Divider
									className="self-center w-[1020px]"
									custom_divider_color="#000000"
								/>
							</div>
						);
					})}
				</div>
			)}

			{/* Payment info */}
			<Form
				id="payment-form"
				form={form}
				onFinish={onFinish}
				layout="vertical"
				autoComplete="off"
				className="bg-white rounded-lg w-full p-8"
			>
				{/* Payment Method */}
				<Form.Item name="bank" className="mb-8">
					<h1 className="text-4xl font-semibold mb-4">Payment Method</h1>
					<Radio.Group
						onChange={onChange_radioBank}
						className="flex gap-[100px]"
					>
						<Radio value={1}>
							<h3 className="text-xl">Bank 1</h3>
						</Radio>
						<Radio value={2}>
							<h3 className="text-xl">Bank 2</h3>
						</Radio>
					</Radio.Group>
				</Form.Item>

				{/* Card info */}
				{bank_selected === 1 && (
					<div className="flex flex-wrap">
						{/* Card number */}
						<Form.Item
							name="card_number"
							label="Card number"
							rules={[
								{ required: true, message: 'Please input a card number' },
							]}
							className="mr-8"
						>
							<Input placeholder="0212313242" className="input-billing" />
						</Form.Item>

						{/* Security numbers */}
						<Form.Item
							name="security_digits"
							label="Security digits"
							rules={[
								{ required: true, message: 'Please input a card number' },
							]}
							className="mr-8"
						>
							<Input placeholder="123" className="input-billing" />
						</Form.Item>

						{/* Expiring date */}
						<Form.Item
							name="expiring_date"
							label="Expiring date"
							rules={[
								{ required: true, message: 'Please input a card number' },
							]}
						>
							<DatePicker className="input-billing" />
						</Form.Item>
					</div>
				)}
			</Form>

			<div className="flex flex-row justify-end w-full gap-6 mb-8">
				<Link href={'/'}>
					<Button ghost className="w-2/12 py-8">
						Continue Shopping
					</Button>
				</Link>

				<Button form="payment-form" htmlType="submit" className="w-2/12 py-8">
					Place My Order
				</Button>
			</div>
		</div>
	);
};

const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session == null) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

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

export default PaymentPage;
