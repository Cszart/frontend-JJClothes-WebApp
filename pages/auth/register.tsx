import * as React from 'react';
import Router from 'next/router';

// Local components

// Interfaces
import { Images } from 'interfaces';

// Antd
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Register = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<div className="flex flex-row">
			{/* Side image halfscreen */}
			<div className="w-1/2">
				<img
					src={Images.register_picture}
					className="w-full max-h-[100vh] object-cover"
				/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col px-36 py-8 w-1/2">
				{/* Back icon */}
				<ArrowLeftOutlined
					onClick={() => Router.back()}
					className="w-10 h-10"
				/>

				{/* text */}
				<div className="text-modified w-[95%] pb-6">
					<h3 className="text-base text-gray-800">Welcome</h3>
					<h1 className="text-3xl text-gray-800 font-bold">
						Register your new account
					</h1>
				</div>

				{/* Form */}
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					autoComplete="off"
				>
					{/* Name */}
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: 'Please input your name!' }]}
						className="pb-3"
					>
						<Input className="input-modified" />
					</Form.Item>
					{/* Lastname */}
					<Form.Item
						name="lastname"
						label="Lastname"
						rules={[{ required: true, message: 'Please input your lastname!' }]}
						className="pb-3"
					>
						<Input className="input-modified" />
					</Form.Item>
					{/* Email */}
					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified" />
					</Form.Item>
					{/* Repeat email */}
					<Form.Item
						name="repeat email"
						label="Repeat email"
						rules={[{ required: true, message: 'Please repeat your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified" />
					</Form.Item>
					{/* Password */}
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please set your password' }]}
						className="pb-6"
					>
						<Input type="password" className="input-modified" />
					</Form.Item>
					{/* Repeat password */}
					<Form.Item
						name="repeat password"
						label="Repeat password"
						rules={[{ required: true, message: 'Please repeat your password' }]}
						className="pb-6"
					>
						<Input type="password" className="input-modified" />
					</Form.Item>
					{/* Date of birth */}
					<Form.Item
						name="date of birth"
						label="Date of birth"
						rules={[
							{ required: true, message: 'Please set the date of your birth' },
						]}
						className="pb-6"
					>
						<Input name="date" type="date" className="input-modified" />
					</Form.Item>
					<Form.Item className="w-full pb-3">
						<Button htmlType="submit" type="primary" className="btn-modified">
							Register now
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

export default Register;
