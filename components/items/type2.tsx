import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { patch_shoppingCart_add_product } from 'api';

// Interfaces
import { Item_Props } from 'interfaces';
import { Divider } from 'components/divider';
import { calculate_roundUp, calculate_PriceDiscount } from 'lib';

export const Item_type_2: React.FC<Item_Props> = ({
	id,
	className,
	product_item,
	user,
	shoppingCart_refetch,
}) => {
	const [isEnterMouse, setIsEnterMouse] = React.useState<boolean>(false);

	const add_to_shoppingCart = async () => {
		const product_data = { quantity: 1, product: product_item._id };

		if (user && user.access_token) {
			const add_response = await patch_shoppingCart_add_product(
				user.access_token,
				user.shoppingCart._id,
				product_data
			);

			if (shoppingCart_refetch) {
				shoppingCart_refetch();
			}

			if (add_response.status != 200) {
				console.log(
					'-- Item type2 component, add to shopping cart response --',
					add_response
				);
			}
		}
	};

	return (
		<div
			className={clsx(
				`Item_1_${id}`,
				'bg-white flex flex-col max-w-[260px] p-6',
				'hover:drop-shadow-xl',
				className
			)}
		>
			{/* image */}
			<Link href={`/product?product_id=${product_item._id}`}>
				<img
					src={
						!isEnterMouse ? product_item.gallery[0] : product_item.gallery[1]
					}
					onMouseEnter={() => setIsEnterMouse(true)}
					onMouseLeave={() => setIsEnterMouse(false)}
					className="w-[220px] h-[210px] relative top-[-50px] left-[5px] drop-shadow-lg"
				/>
			</Link>

			{/* title */}
			<h3 className="text-xl font-medium text-gray-701 mb-2">
				{product_item.title}
			</h3>

			{/* discount */}
			{product_item.discount > 0 && (
				<div className="flex flex-col">
					{/* discount percentage */}
					<p className="text-sm text-gray-400 mb-2">
						{`${product_item.discount}% Off`}
					</p>

					{/* discount with red line */}
					<div className="flex flex-col relative mb-2">
						<p className="text-sm text-gray-400">{`${product_item.price} $`}</p>
						<Divider
							custom_divider_color="#D93F3F"
							className="absolute bottom-[10px] w-[40px]"
						/>
					</div>
				</div>
			)}

			{/* price */}
			<h3 className="text-xl font-medium text-gray-701 mb-6">
				{calculate_roundUp(
					calculate_PriceDiscount(product_item.price, product_item.discount)
				)}{' '}
				$
			</h3>

			{/* add to cart */}
			<button
				onClick={add_to_shoppingCart}
				className={clsx(
					'w-full h-10 px-14',
					'align-center',
					'text-white font-taviraj text-center text-base',
					'mt-auto',
					{ 'bg-purple-301': product_item.new_item },
					{ 'bg-esmerald-201': !product_item.new_item }
				)}
			>
				Add to cart
			</button>
		</div>
	);
};

export default Item_type_2;
