import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Product_Item } from 'interfaces';
import { Divider } from 'components/divider';
import { Button } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface ShoppingCart_Item_Props {
	product_item: Product_Item;
	remove_from_shoppingCart: (product_id: string) => Promise<void>;
	add_quantity: (product_id: string) => Promise<void>;
	substract_quantity: (product_id: string) => Promise<void>;
}

export const ShoppingCart_Item: React.FC<ShoppingCart_Item_Props> = ({
	product_item,
	remove_from_shoppingCart,
	add_quantity,
	substract_quantity,
}) => {
	const { quantity, product } = product_item;

	const discount_amount = (product.price * product.discount) / 100;

	const [current_quantity, setCurrent_Quantity] =
		React.useState<number>(quantity);

	const change_quantity = (product_id: string, action: string) => {
		if (action == 'add') {
			add_quantity(product_id);
			setCurrent_Quantity(current_quantity + 1);
		}

		if (action == 'substract') {
			substract_quantity(product_id);
			setCurrent_Quantity(current_quantity - 1);
		}
	};

	return (
		<div
			className={clsx(
				`Item_${product._id}`,
				'flex flex-wrap bg-white w-full px-8 py-6'
			)}
		>
			{/* Item detail */}
			<div className="flex gap-4 w-1/2">
				{/* image */}
				<img
					src={product.gallery[0]}
					className="w-[140px] h-[140px] rounded-lg"
				/>

				<div className="flex flex-col">
					{/* title */}
					<h3 className="text-xl font-medium text-gray-701 mb-2">
						{product.title}
					</h3>

					{/* discount */}
					{product.discount > 0 && (
						<div className="flex flex-col relative">
							<p className="text-base text-gray-400">{`${product.price} $`}</p>
							<Divider
								custom_divider_color="#D93F3F"
								className="absolute bottom-[12px] w-[50px]"
							/>
						</div>
					)}

					{/* price */}
					<h3 className="text-2xl font-semibold text-gray-701 mb-6">
						{`${
							Math.round(
								(product.price - discount_amount + Number.EPSILON) * 100
							) / 100
						} $`}
					</h3>
				</div>
			</div>

			{/* Functional buttons */}
			<div className="flex items-center justify-end gap-6 w-1/2">
				{/* Minus button */}
				<Button
					type="primary"
					icon={<MinusOutlined />}
					onClick={() => change_quantity(product._id, 'substract')}
					className="flex justify-center items-center w-[30px] h-[30px]"
				/>

				{/* Quantity */}
				<h1 className="text-2xl font-medium">{current_quantity}</h1>

				{/* Plus button */}
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => change_quantity(product._id, 'add')}
					className="flex justify-center items-center w-[30px] h-[30px]"
				/>

				{/* Total price */}
				<h1 className="text-2xl font-medium">
					{`${
						Math.round(
							(product.price * current_quantity + Number.EPSILON) * 100
						) / 100
					} $`}
				</h1>

				{/* Delete button */}
				<Button
					type="primary"
					ghost
					icon={<DeleteOutlined />}
					onClick={() => remove_from_shoppingCart(product._id)}
					className="flex justify-center items-center w-[30px] h-[30px]"
				/>
			</div>
		</div>
	);
};

export default ShoppingCart_Item;
