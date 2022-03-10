/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import clsx from 'clsx';

// Interfaces
import { Bill, Icons, Shipping_States, User } from 'interfaces';

// Local components
import { Divider } from 'components/divider';

// Antd
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

interface PaymentBilling_Props {
	user: User;

	venezuela_states: Shipping_States[];

	// Detail order
	subtotal?: number;
	shippingCost?: number;

	// State
	setCurrent_State: React.Dispatch<React.SetStateAction<string | undefined>>;

	// onFinish
	onFinish_Billing: (values: Bill) => void;
}

export const PaymentBilling: React.FC<PaymentBilling_Props> = ({
	venezuela_states,

	subtotal,
	shippingCost,
	setCurrent_State,

	onFinish_Billing,
}) => {
	const [form] = Form.useForm();

	// Functions
	// onChange state
	const onChange = (value: any) => {
		console.log(`-- Billing page, value selected -- ${value}`);
		setCurrent_State(value);
	};

	return (
		<div className="billing flex flex-row flex-wrap w-full gap-8 px-[110px]">
			{/* Nav icons bar */}
			<div className="iconsBar flex flex-wrap justify-center items-baseline w-full gap-4">
				{/* Checkout */}
				<div className="flex flex-col">
					<img src={Icons.checkoutGreen} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-teal-501">1. Checkout</h1>
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
					<img src={Icons.confirmgray} className="w-[48px] self-center" />
					<h1 className="text-xl font-semibold text-gray-201">
						3. Confirmation
					</h1>
				</div>
			</div>

			{/*Left side*/}
			<div
				className={clsx('flex flex-col bg-white rounded-lg w-[45%] h-fit p-10')}
			>
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
						{shippingCost
							? Math.round((shippingCost + Number.EPSILON) * 100) / 100
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
						{subtotal && shippingCost
							? Math.round((subtotal + shippingCost + Number.EPSILON) * 100) /
							  100
							: ''}
					</h3>
				</div>
			</div>

			{/*Right side*/}
			<div className="w-[50%]">
				<div className="flex flex-col bg-white rounded-lg w-full p-10 mb-8">
					<h1 className="text-3xl text-black font-bold pb-12">
						Billing Address
					</h1>

					<Form
						id="billing-form"
						form={form}
						onFinish={onFinish_Billing}
						layout="vertical"
						autoComplete="off"
					>
						{/* Fullname */}
						<Form.Item
							name="fullName"
							label="Fullname"
							rules={[
								{ required: true, message: 'Please input your full name!' },
							]}
							className="pb-6"
						>
							<Input
								placeholder="Ex: Rasyidin Arsyad Nasution"
								className="input-billing"
							/>
						</Form.Item>

						{/* Email Address */}
						<Form.Item
							name="email"
							label="Email Address"
							rules={[
								{ required: true, message: 'Please input your email address!' },
							]}
							className="pb-6"
						>
							<Input
								placeholder="Ex: rasyid.arsyad@gmail.com"
								className="input-billing"
							/>
						</Form.Item>

						{/* Phone Number */}
						<Form.Item
							name="phoneNumber"
							label="Phone Number"
							rules={[
								{ required: true, message: 'Please input your phone number!' },
							]}
							className="pb-3"
						>
							<Input placeholder="Ex: 089111888999" className="input-billing" />
						</Form.Item>

						{/* Shipping Address */}
						<Form.Item
							name="street"
							label="Shipping Address"
							rules={[
								{
									required: true,
									message: 'Please input your shipping address!',
								},
							]}
							className="pb-6"
						>
							<Input
								placeholder="Ex: Patriot Street Number 666, Ngaklik, Sleman"
								className="input-billing"
							/>
						</Form.Item>

						{/* State/Province */}
						<Form.Item
							name="state"
							label="State/Province"
							className="pb-6"
							rules={[{ required: true }]}
						>
							<Select
								showSearch
								placeholder="Ex: Distrito Capital"
								className="input-billing"
								onChange={onChange}
								// Config props
								optionFilterProp="children"
								filterOption={(input, option) =>
									option?.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
							>
								{venezuela_states.map((state, key: number) => {
									return (
										<Option key={key} value={state.name}>
											{state.name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>

						{/* City + Zip Code */}
						<div className="flex flex-row gap-4">
							<Form.Item
								name="city"
								label="City"
								className="pb-6 w-7/12"
								rules={[{ required: true }]}
							>
								<Input placeholder="Ex: Caracas" className="input-billing" />
							</Form.Item>

							<Form.Item
								name="zip_code"
								label="Zip Code"
								className="pb-6 w-5/12"
								rules={[{ required: true }]}
							>
								<Input placeholder="Ex: 1212" className="input-billing" />
							</Form.Item>
						</div>

						{/* Courier */}
						<Form.Item
							name="courier"
							label="Choose Courier"
							rules={[{ required: true }]}
						>
							<Select
								showSearch
								placeholder="Ex: Domesa"
								className="input-billing"
								// Config props
								optionFilterProp="children"
								filterOption={(input, option) =>
									option?.props.children
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0 ||
									option?.props.value
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
							>
								<Option value="arcane">Arcane</Option>
							</Select>
						</Form.Item>
					</Form>
				</div>

				<div className="flex flex-row justify-between gap-4 mb-4">
					<Link href={'/'}>
						<Button ghost className="w-full py-8">
							Continue Shopping
						</Button>
					</Link>

					<Button form="billing-form" htmlType="submit" className="w-full py-8">
						Place My Order
					</Button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default PaymentBilling;
