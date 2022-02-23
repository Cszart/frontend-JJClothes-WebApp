import * as React from 'react';
import clsx from 'clsx';
import Router from 'next/router';

// Local component
import { Images } from 'interfaces';

import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Forgot_password = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<div className="flex flex-row">
			{/* Side image halfscreen */}
			<div className="w-1/2 h-[100vh]">
				<img
					src={Images.forgot_password_picture}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col p-36 w-1/2 h-[100vh]">
				{/* Back icon */}
				<ArrowLeftOutlined
					onClick={() => Router.back()}
					className="w-10 h-10"
				/>

				{/* text */}
				<div className="text-modified  w-[95%] pb-6">
					<h1 className="text-3xl text-gray-900 font-bold">
						Forgot your password?
					</h1>
					<h3 className="text-base text-gray-800">
						Write your email so we can send you an email with steps to recover
						your password
					</h3>
				</div>

				{/* Form */}
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					autoComplete="off"
				>
					{/* Email */}
					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified" />
					</Form.Item>

					{/* Button */}
					<Form.Item className="w-full pb-3">
						<Button htmlType="submit" className={clsx('btn-modified')}>
							Recover password
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session && session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
};

export default Forgot_password;
