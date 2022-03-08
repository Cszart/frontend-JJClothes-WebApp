import * as React from 'react';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

// Interfaces
import { Images, User_Rol } from 'interfaces';

// Antd
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useToasts } from 'react-toast-notifications';
import { post_user_add } from 'api';

interface Form_Register_Data {
	email: string;
	name: string;
	lastname: string;
	password: string;
	repeat_email: string;
	repeat_password: string;
	date_birth: string;
}

const Register = () => {
	const [form] = Form.useForm();
	const { addToast } = useToasts();
	const router = useRouter();
	const [isLoading, setisLoading] = React.useState<boolean>(false);

	const onFinish = async (values: Form_Register_Data): Promise<void> => {
		setisLoading(true);

		// Check matching passwords
		if (values.password != values.repeat_password) {
			addToast("Passwords doesn't match", { appearance: 'error' });
			return;
		}

		// Format submit data
		const submit_data = {
			firstname: values.name,
			lastname: values.lastname,
			email: values.email,
			password: values.password,
			birth_date: values.date_birth,
			rol: User_Rol.NATURAL,
		};

		const register_response = await post_user_add(submit_data);
		console.log('\n\n', register_response);

		setisLoading(false);
		router.push('/');
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
						name="repeat_email"
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
						name="repeat_password"
						label="Repeat password"
						rules={[{ required: true, message: 'Please repeat your password' }]}
						className="pb-6"
					>
						<Input type="password" className="input-modified" />
					</Form.Item>

					{/* Date of birth */}
					<Form.Item
						name="date_birth"
						label="Date of birth"
						rules={[
							{ required: true, message: 'Please set the date of your birth' },
						]}
						className="pb-6"
					>
						<Input name="date" type="date" className="input-modified" />
					</Form.Item>

					<Form.Item className="w-full pb-3">
						<Button
							htmlType="submit"
							type="primary"
							loading={isLoading}
							className="btn-modified"
						>
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
