/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from 'react';
import { Form, Button } from 'antd';
import { Divider } from 'components/divider';
import { Bill, Icons, Images, Product_Item, User } from 'interfaces';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

interface PaymentConfirmation_Props {
	user: User;

	items?: Product_Item[];

	// Billing data
	billing_data?: Bill;

	// Detail order
	subtotal?: number;
	shipping_cost?: number;

	delivery_time?: string;
	track_number?: string;
}

export const PaymentConfirmation: React.FC<PaymentConfirmation_Props> = ({
	items,
	billing_data,

	subtotal,
	shipping_cost,

	delivery_time,
	track_number,
}) => {
	return (
		<div className="flex flex-row">
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
					<img src={Icons.paymentgray} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-gray-201">2. Payment</h1>
				</div>

				<Divider custom_divider_color="#333333" className="w-[100px]" />

				{/* Confirm */}
				<div className="flex flex-col">
					<img src={Icons.confirmgreen} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-teal-501">
						3. Confirmation
					</h1>
				</div>
			</div>

			{/*Left side*/}
			<div className="flex flex-col w-1/2 p-10">
				<div className="flex flex-col items-center justify-center bg-white p-10">
					<img src={Images.order_confirmed_picture} />

					<h1 className="text-2xl text-black pb-12 text-modified mt-10">
						Order Confirmed
					</h1>

					<h3 className="text-base text-black pb-12 text-modified">
						Your order have been confirmed, please wait and save your order id
					</h3>

					<Link href={'/'}>
						<Button className="px-5 py-8" htmlType="submit">
							Go to home page
						</Button>
					</Link>
				</div>
			</div>

			{/*Right side*/}
			<div className="flex flex-col w-1/2 p-10">
				<div className="p-10 bg-white w-full">
					<div className="flex flex-row w-full">
						<h3 className="text-2xl text-black pb-6 w-1/2">
							{delivery_time} days delivery
						</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">
							{billing_data?.courier}
						</h3>
					</div>

					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Track number</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">{track_number}</h3>
					</div>

					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Items</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">{items?.length}</h3>
					</div>

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
						<h3 className="text-3xl text-black pb-6 w-1/2"> Total</h3>
						<h3 className="text-3xl text-black pb-6 w-1/2">
							$
							{subtotal && shipping_cost
								? Math.round(
										(subtotal + shipping_cost + Number.EPSILON) * 100
								  ) / 100
								: ''}
						</h3>
					</div>

					<Divider
						custom_divider_color="#FF6C00"
						className="bottom-[10px] w-full"
					/>

					<div className="flex flex-row mt-6">
						<h3 className="text-2xl text-black pb-6 w-1/2">Shipping Address</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">
							{billing_data?.street}
						</h3>
					</div>
				</div>
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

export default PaymentConfirmation;
