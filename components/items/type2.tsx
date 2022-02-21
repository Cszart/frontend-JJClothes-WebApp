import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Item_Props } from 'interfaces';
import { Divider } from 'components/divider';

export const Item_type_2: React.FC<Item_Props> = ({
	id,
	className,
	product_item,
}) => {
	const discount_amount = (product_item.price * product_item.discount) / 100;

	const [isEnterMouse, setIsEnterMouse] = React.useState<boolean>(false);
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
			<img
				src={!isEnterMouse ? product_item.gallery[0] : product_item.gallery[1]}
				onMouseEnter={() => setIsEnterMouse(true)}
				onMouseLeave={() => setIsEnterMouse(false)}
				className="w-[220px] h-[210px] relative top-[-50px] left-[5px] drop-shadow-lg"
			/>

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
				{`${
					Math.round(
						(product_item.price - discount_amount + Number.EPSILON) * 100
					) / 100
				} $`}
			</h3>

			{/* add to cart */}
			<button
				onClick={() => alert('Added to cart')}
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
