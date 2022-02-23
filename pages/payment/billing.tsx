import * as React from 'react';
import { Layout } from 'components/layout';
import { Form, Input, Button } from 'antd';
import { Divider } from 'components/divider';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { User } from 'interfaces';

interface PaymentBilling_Props {
	user: User;
}
const PaymentBilling: React.FC<PaymentBilling_Props> = ({ user }) => {
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout withHeader withFooter user={user} className="flex flex-row">
			{/*Left side*/}
			<div className="w-1/2 p-10 flex flex-col">
				<div className="p-10 bg-white">
					<h1 className="text-3xl text-black pb-12 font-bold">Detail Order</h1>
					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Subtotal</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">Rp 2.152.000</h3>
					</div>
					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Shipping Cost</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">Rp 500.000</h3>
					</div>
					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">Packaging</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">Rp 50.000</h3>
					</div>
					<Divider
						custom_divider_color="#FF6C00"
						className="bottom-[10px] w-full"
					/>
					<div className="flex flex-row mt-6">
						<h3 className="text-2xl text-black pb-6 w-1/2">Grand Total</h3>
						<h3 className="text-3xl text-black pb-6 w-1/2">Rp 2.702.000</h3>
					</div>
				</div>
			</div>

			{/*Right side*/}
			<div className="w-1/2 p-10 flex flex-col">
				<div className="p-10 bg-white">
					<h1 className="text-3xl text-black font-bold pb-12">
						Billing Address
					</h1>
					<Form
						form={form}
						onFinish={onFinish}
						layout="vertical"
						autoComplete="off"
					>
						{/* Fullname */}
						<Form.Item
							name="name"
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
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
						{/* Email Address */}
						<Form.Item
							name="emailaddress"
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
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
						{/* Phone Number */}
						<Form.Item
							name="phonenumber"
							label="Phone Number"
							rules={[
								{ required: true, message: 'Please input your phone number!' },
							]}
							className="pb-3"
						>
							<Input placeholder="Ex: 089111888999" className="input-billing" />
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
						{/* Shipping Address */}
						<Form.Item
							name="shippingaddress"
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
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
						{/* Country */}
						<Form.Item name="country" label="Country" className="pb-6">
							<Input
								placeholder="Ex: United States of America (USA)"
								className="input-billing"
							/>
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
						{/* State/Province */}
						<Form.Item
							name="stateprovince"
							label="State/Province"
							className="pb-6"
						>
							<Input placeholder="Ex: California" className="input-billing" />
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
						{/* City + Zip Code */}
						<div className="flex flex-row">
							<Form.Item name="city" label="City" className="pb-6 w-7/12">
								<Input
									placeholder="Ex: San Francisco"
									className="input-billing"
								/>
								<Divider
									custom_divider_color="#6B7280"
									className="bottom-[10px] w-[90%]"
								/>
							</Form.Item>
							<Form.Item
								name="zipcode"
								label="Zip Code"
								className="pb-6 w-5/12"
							>
								<Input placeholder="Ex: 94024" className="input-billing" />
								<Divider
									custom_divider_color="#6B7280"
									className="bottom-[10px] w-full"
								/>
							</Form.Item>
						</div>
						{/* Courier */}
						<Form.Item name="courier" label="Choose Courier" className="pb-6">
							<Input placeholder="Ex: DHL" className="input-billing" />
							<Divider
								custom_divider_color="#6B7280"
								className="bottom-[10px] w-full"
							/>
						</Form.Item>
					</Form>
				</div>

				<div className="flex flex-row pt-10">
					<Link href={'/'}>
						<Button ghost className="w-5/12 py-3" htmlType="submit">
							Continue Shopping
						</Button>
					</Link>
					<div className="w-2/12"></div>
					<Link href={'/payment/payment'}>
						<Button className="w-5/12 py-3" htmlType="submit">
							Place My Order
						</Button>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	console.log('\n\n\n\n\n session', session);

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
