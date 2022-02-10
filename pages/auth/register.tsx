import * as React from 'react';
import { Layout } from 'components/layout';	// Local components
import { Images } from 'interfaces';				// Interfaces
import { Button, Form, Input } from 'antd';	// Antd


const Register = () => {
	const [form] = Form.useForm();
	const custom_btn_color = '#E2A9FD';

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout className="flex flex-row">

			{/* Side image halfscreen */}
			<div className="w-1/2">
				<img src={Images.register_picture} className="w-full h-full object-cover"/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col p-36 w-1/2">
				{/* text */}
				<div className="text-modified pb-6">
					<h3 className="text-base text-gray-800">Welcome</h3>
					<h1 className="text-3xl text-gray-900 font-bold">Register your new account</h1>
				</div>

				{/* Form */}
				<Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
					{/* Name */}
					<Form.Item
						name="name"
						label="Name" 
						rules={[{ required: true, message: 'Please input your name!' }]}
						className="pb-3"
					>
						<Input className="input-modified"/>
					</Form.Item>
					{/* Lastname */}
					<Form.Item
						name="lastname"
						label="Lastname" 
						rules={[{ required: true, message: 'Please input your lastname!' }]}
						className="pb-3"
					>
						<Input className="input-modified"/>
					</Form.Item>
					{/* Email */}
					<Form.Item
						name="email"
						label="Email" 
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified"/>
					</Form.Item>
					{/* Repeat email */}
					<Form.Item
						name="repeat email"
						label="Repeat email" 
						rules={[{ required: true, message: 'Please repeat your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified"/>
					</Form.Item>
					{/* Password */}
					<Form.Item
						name="password"
						label="Password"
						rules={[{ required: true, message: 'Please set your password' }]}
						className="pb-6"
					>
						<Input type="password" className="input-modified"/>
					</Form.Item>
					{/* Repeat password */}
					<Form.Item
						name="repeat password"
						label="Repeat password"
						rules={[{ required: true, message: 'Please repeat your password' }]}
						className="pb-6"
					>
						<Input type="password" className="input-modified"/>
					</Form.Item>
					{/* Date of birth */}
					<Form.Item
						name="date of birth"
						label="Date of birth"
						rules={[{ required: true, message: 'Please set the date of your birth' }]}
						className="pb-6"
					>
						<Input name="date" type="date" className="input-modified"/>
					</Form.Item>
					<Form.Item className="w-full pb-3">
						<Button htmlType="submit" className="btn-modified" style={{background:custom_btn_color}}>
							Register now
						</Button>
					</Form.Item>
				</Form>
			</div>

		</Layout>
	);
};

export default Register;
