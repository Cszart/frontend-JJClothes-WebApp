import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Item_Props } from 'interfaces';

// Local components
import { Divider } from 'components/divider';
import Link from 'next/link';

interface Item_Tag_Props {
	className?: string;
	new_item?: boolean;
	discount_amount?: number;
}

export const Item_Tag: React.FC<Item_Tag_Props> = ({
	className,
	new_item = false,
	discount_amount,
}) => {
	return (
		<div
			className={clsx(
				'tag px-4',
				{ 'bg-purple-301': new_item },
				{ 'bg-teal-501': discount_amount },
				className
			)}
		>
			<p className="text-base font-medium text-white font-taviraj">
				{new_item ? 'NEW ' : ''}
				{discount_amount ? `${discount_amount}% OFF` : ''}
			</p>
		</div>
	);
};

export const Item_type_1: React.FC<Item_Props> = ({
	id,
	className,
	product_item,
}) => {
	const discount_amount = (product_item.price * product_item.discount) / 100;

	const [isEnterMouse, setIsEnterMouse] = React.useState<boolean>(false);

	return (
		<Link href={`/product?product_id=${product_item._id}`}>
			<div
				className={clsx(
					`Item_1_${id}`,
					'bg-white flex flex-col max-w-[256px] ',
					'relative p-7',
					className
				)}
			>
				{/* tag */}
				{(product_item.new_item || product_item.discount > 0) && (
					<Item_Tag
						new_item={product_item.new_item}
						discount_amount={product_item.discount}
						className="absolute top-[-10px] left-[90px]"
					/>
				)}

				{/* image */}
				<img
					src={
						!isEnterMouse ? product_item.gallery[0] : product_item.gallery[1]
					}
					onMouseEnter={() => setIsEnterMouse(true)}
					onMouseLeave={() => setIsEnterMouse(false)}
					className="w-[200px] h-[200px] mb-[62px]"
				/>

				{/* title */}
				<h3 className="text-xl font-medium text-gray-701 mb-2">
					{product_item.title}
				</h3>

				{/* discount */}
				{product_item.discount > 0 && (
					<div className="flex flex-col relative mb-2">
						<p className="text-sm text-gray-400">{`${product_item.price} $`}</p>
						<Divider
							custom_divider_color="#D93F3F"
							className="absolute bottom-[10px] w-[40px]"
						/>
					</div>
				)}

				{/* price */}
				<h3 className="text-xl text-gray-701">
					{`${
						Math.round(
							(product_item.price - discount_amount + Number.EPSILON) * 100
						) / 100
					} $`}
				</h3>
			</div>
		</Link>
	);
};

export default Item_type_1;
