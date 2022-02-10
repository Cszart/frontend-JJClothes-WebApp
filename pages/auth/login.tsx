import * as React from 'react';
import Link from 'next/link';

// Local components
import { Layout } from 'components/layout';

// Interfaces
import { Images } from 'interfaces';

// Antd
import { Button, Form, Input } from 'antd';

const Login = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout className="flex flex-row">
			{/* Side image */}
			<div className="w-1/2">
				<img
					src={Images.login_collage}
					className="w-full h-full object-cover"
				/>
			</div>

			{}
			<div className="flex flex-col p-36 w-1/2">
				{/* text */}
				<h3 className="text-base text-gray-800">Welcome back</h3>
				<h1 className="text-3xl font-bold text-gray-900">
					Login to your account
				</h1>

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
					>
						<Input />
					</Form.Item>

					{/* Password */}
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please input your password' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item className="w-full">
						<Button type="primary" htmlType="submit" className="w-full">
							Login now
						</Button>
					</Form.Item>
				</Form>

				{/* forgot password */}
				<Link href={'/auth/forgot_password'}>
					<a className="text-sm text-blue-800">Forgot your passwor?</a>
				</Link>

				{/* Register */}
				<p className="text-base">
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
