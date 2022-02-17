import * as React from 'react';
import { Layout } from 'components/layout';
import { Form, Input, Select, Button } from 'antd';
import { Divider } from 'components/divider';
import { Images } from 'interfaces';
import Link from 'next/link';

const PaymentBilling = () => {
	
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout withHeader withFooter className="flex flex-row">


			{/*Left side*/}
			<div className="flex flex-col w-1/2 p-10">
				<div className="flex flex-col items-center justify-center bg-white p-10">
					<img src={Images.order_confirmed_picture}/>
					<h1 className="text-2xl text-black pb-12 text-modified mt-10">Order Confirmed</h1>
					<h3 className="text-base text-black pb-12 text-modified">Your order have been confirmed, please wait and track your order</h3>
					<Link href={'/'}>
						<Button className="px-5 py-3" htmlType="submit">Go to track page</Button>
					</Link>
				</div>
			</div>

			{/*Right side*/}
			<div className="w-1/2 p-10 flex flex-col">
				<div className="p-10 bg-white">
					<div className="flex flex-row">
						<h3 className="text-2xl text-black pb-6 w-1/2">10 days delivery</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">DHL Express</h3>
					</div>
					<div className="flex flex-row">
						<div className="flex flex-col w-8/12">
							<h3 className="text-base text-black">Way Kambas Mini Ebony</h3>
							<h3 className="text-base text-gray-400 pb-2">2 x IDR 1.024.000</h3>
							<h3 className="text-base text-black">Sikka (Ebony & Mapple)</h3>
							<h3 className="text-base text-gray-400 pb-6">1 x IDR 1.264.000</h3>
						</div>
						<div className="w-4/12"></div>
					</div>
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
					<Divider custom_divider_color="#FF6C00" className="bottom-[10px] w-full"/>
					<div className="flex flex-row mt-6">
						<h3 className="text-2xl text-black pb-6 w-1/2">Grand Total</h3>
						<h3 className="text-3xl text-black pb-6 w-1/2">Rp 2.702.000</h3>
					</div>
					<Divider custom_divider_color="#FF6C00" className="bottom-[10px] w-full"/>
					<div className="flex flex-row mt-6">
						<h3 className="text-2xl text-black pb-6 w-1/2">Shipping Address</h3>
						<h3 className="text-2xl text-black pb-6 w-1/2">18 Richardson Drive Fountain Valley, CA 92708</h3>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PaymentBilling;