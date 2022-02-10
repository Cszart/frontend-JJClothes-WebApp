import * as React from 'react';
import { Layout } from 'components/layout';	// Local components
import { Images } from 'interfaces';				// Interfaces
import { Button, Form, Input } from 'antd';	// Antd


const Forgot_password = () => {
	const [form] = Form.useForm();
	const custom_btn_color = '#0EBEA6';

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	return (
		<Layout className="flex flex-row">

			{/* Side image halfscreen */}
			<div className="w-1/2">
				<img src={Images.forgot_password_picture} className="w-full h-full object-cover"/>
			</div>

			{/* Data halfscreen */}
			<div className="flex flex-col p-36 w-1/2">
				{/* text */}
				<div className="text-modified pb-6">
					<h1 className="text-3xl text-gray-900 font-bold">Forgot your password?</h1>
					<h3 className="text-base text-gray-800">Write your email so we can send you an email with steps to recover your password</h3>
				</div>

				{/* Form */}
				<Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
					{/* Email */}
					<Form.Item
						name="email"
						label="Email" 
						rules={[{ required: true, message: 'Please input your email!' }]}
						className="pb-3"
					>
						<Input className="input-modified"/>
					</Form.Item>
					<Form.Item className="w-full pb-3">
						<Button htmlType="submit" className="btn-modified" style={{background:custom_btn_color}}>
							Recover password
						</Button>
					</Form.Item>
				</Form>
			</div>

		</Layout>
	);
};

export default Forgot_password;
