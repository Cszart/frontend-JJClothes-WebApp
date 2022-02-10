import * as React from 'react';
import Link from 'next/link';

// Local components
import { Layout } from 'components/layout';

// Interfaces
import { Images } from 'interfaces';

// Antd library
import { Button, Form, Input } from 'antd';

const Login = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout className="flex flex-row">
			{/* Side image halfscreen */}
			<div className="w-1/2">
				<img
					src={Images.login_collage}
					className="w-full max-h-[100vh] object-cover"
				/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col p-36 w-1/2">
				{/* text */}
				<h3 className="text-base text-gray-800">Welcome back</h3>
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					Login to your account
				</h1>

				{/* Form */}
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					autoComplete="off"
					className="container-antd"
				>
					{/* Email */}
					<Form.Item
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="mb-6"
					>
						<Input className="w-[95%] h-[50px]" />
					</Form.Item>
					{/* Password */}
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please input your password' }]}
						className="mb-10"
					>
						<Input.Password className="w-95-percent h-50px" />
					</Form.Item>

					<Form.Item className="w-full">
						<Button
							type="primary"
							htmlType="submit"
							className="w-full py-3 mb-4"
						>
							Login now
						</Button>
					</Form.Item>
				</Form>

				{/* Forgot password */}
				<Link href={'/auth/forgot_password'}>
					<a className="text-sm text-blue-800 text-center mb-4">
						Forgot your password?
					</a>
				</Link>

				{/* Register */}
				<p className="text-base text-center mt-auto">
					Don&apos;t have an acoount?{' '}
					<Link href={'/auth/register'}>
						<a className="font-medium text-blue-800">Join Free Today!</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
};

export default Login;
