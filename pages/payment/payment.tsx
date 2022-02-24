import * as React from 'react';
import { Layout } from 'components/layout';
import { Form, Button } from 'antd';
import { Divider } from 'components/divider';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { User } from 'interfaces';

interface PaymentPage_Props {
	user: User;
}
const PaymentPage: React.FC<PaymentPage_Props> = ({ user }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [form] = Form.useForm();

	React.useEffect(() => {
		const value = localStorage.getItem('Random_name');
		console.log('asdasdasd', value);
	}, []);

	return (
		<Layout withHeader withFooter user={user} className="flex flex-col">
			<div className="flex flex-row">
				{/*Left side*/}
				<div className="w-1/2 p-10 flex flex-col">
					{/*Detail Order*/}
					<div className="p-10 bg-white mb-10">
						<h1 className="text-3xl text-black pb-12 font-bold">
							Detail Order
						</h1>
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
						<div className="flex flex-row">
							<h3 className="text-2xl text-black pb-6 w-1/2">Grand Total</h3>
							<h3 className="text-3xl text-black pb-6 w-1/2 font-bold">
								Rp 2.702.000
							</h3>
						</div>
					</div>
					{/*Payment Detail*/}
					<div className="p-10 bg-white">
						<div className="flex flex-row">
							<h1 className="text-3xl text-black pb-12 w-8/12 font-bold">
								Payment Detail
							</h1>
							<h1 className="text-3xl text-red-500 pb-12 w-4/12 font-bold">
								11:55:55
							</h1>
						</div>
						<div className="flex flex-row">
							<h3 className="text-3x1 text-black pb-6 text-modified">
								Please make a payment according with the limit time specified,
								starting from now
							</h3>
						</div>
					</div>
				</div>
				{/*Right side*/}
				<div className="w-1/2 p-10 flex flex-col">
					<div className="p-10 bg-white">
						<h1 className="text-3xl text-black pb-12 font-bold">
							Order Detail
						</h1>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">Order Number</h3>
							<h3 className="text-base text-black pb-6 w-4/12">
								MTAWEB-3A86D4DB
							</h3>
							<h3 className="text-base text-red-500 pb-6 w-2/12 font-bold">
								COPY
							</h3>
						</div>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">Purchase Date</h3>
							<h3 className="text-base text-black pb-6 w-1/2">
								2019-11-07 14:01:48
							</h3>
						</div>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">Items</h3>
							<div className="flex flex-col w-1/2">
								<h3 className="text-base text-black">Way Kambas Mini Ebony</h3>
								<h3 className="text-base text-gray-400 pb-2">
									2 x IDR 1.024.000
								</h3>
								<h3 className="text-base text-black">Sikka (Ebony & Mapple)</h3>
								<h3 className="text-base text-gray-400 pb-6">
									1 x IDR 1.264.000
								</h3>
							</div>
						</div>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">Name</h3>
							<h3 className="text-base text-black pb-6 w-1/2">
								Rasyidin Arsyad Nasution
							</h3>
						</div>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">Phone</h3>
							<h3 className="text-base text-black pb-6 w-1/2">+18911188899</h3>
						</div>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">Email</h3>
							<h3 className="text-base text-black pb-6 w-1/2">
								rasyid.arsyad@gmail.com
							</h3>
						</div>
						<div className="flex flex-row">
							<h3 className="text-base text-black pb-6 w-1/2">
								Shipping Address
							</h3>
							<h3 className="text-base text-black pb-6 w-1/2">
								18 Richardson Drive Fountain Valley, CA 92708
							</h3>
						</div>
					</div>
				</div>
			</div>

			<div className="px-10">
				<div className="bg-white p-10">
					<h1 className="text-3xl text-black pb-12 font-bold">
						Payment Method
					</h1>
				</div>
			</div>

			<div className="flex flex-row px-10 py-5">
				<div className="w-5/12"></div>
				<Link href={'/'}>
					<Button ghost className="w-3/12 py-3" htmlType="submit">
						Continue Shopping
					</Button>
				</Link>
				<div className="w-1/12"></div>
				<Button className="w-3/12 py-3" htmlType="submit">
					Place My Order
				</Button>
			</div>
		</Layout>
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

export default PaymentPage;
