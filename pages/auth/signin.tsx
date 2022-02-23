import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { useToasts } from 'react-toast-notifications';

// Local components

// Interfaces
import { Images } from 'interfaces';

// Antd library
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';

const SignIn = () => {
	const [form] = Form.useForm();
	const { addToast } = useToasts();

	const onFinish = async (values: any) => {
		try {
			const response = await signIn('credentials', {
				redirect: true,
				email: values.email,
				password: values.password,
				callbackUrl: '/',
			});
			console.log('-- Log in page, sign In response --', response);
		} catch (error) {
			addToast('An error ocurred', { appearance: 'error' });
		}
	};

	return (
		<div className="flex flex-row">
			{/* Side image halfscreen */}
			<div className="w-1/2">
				<img
					src={Images.login_collage}
					className="w-full max-h-[100vh] object-cover"
				/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col p-36 w-1/2">
				{/* Back icon */}
				<ArrowLeftOutlined
					onClick={() => Router.back()}
					className="w-10 h-10"
				/>

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
						key={'email'}
						name="email"
						label="Email"
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="mb-6"
					>
						<Input className="w-[95%] h-[50px] input-modified" />
					</Form.Item>
					{/* Password */}
					<Form.Item
						key={'password'}
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please input your password' }]}
						className="mb-10"
					>
						<Input.Password className="w-95-percent h-50px" />
					</Form.Item>

					<Form.Item key={'loginbutton'} className="w-[95%]">
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
					<a className="text-sm text-blue-800 text-center mb-4 w-[95%]">
						Forgot your password?
					</a>
				</Link>

				{/* Register */}
				<p className="text-base text-center mt-auto">
					Don&apos;t have an acoount?{' '}
					<Link href={'/auth/register'}>
						<a className="font-medium text-blue-800 w-[95%]">
							Join Free Today!
						</a>
					</Link>
				</p>
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

export default SignIn;
