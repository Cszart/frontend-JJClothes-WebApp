import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Item_Props } from 'interfaces';
import { Divider } from 'components/divider';
import Link from 'next/link';
import { calculate_PriceDiscount, calculate_roundUp } from 'lib';

export const Item_Inline: React.FC<Item_Props> = ({
	id,
	className,
	product_item,
}) => {
	const [isEnterMouse, setIsEnterMouse] = React.useState<boolean>(false);
	return (
		<Link href={`/product?product_id=${product_item._id}`}>
			<div
				className={clsx(
					`Item_1_${id}`,
					'flex flex-wrap gap-3 max-w-[345px]',
					className
				)}
			>
				{/* image */}
				<img
					src={
						!isEnterMouse ? product_item.gallery[0] : product_item.gallery[1]
					}
					onMouseEnter={() => setIsEnterMouse(true)}
					onMouseLeave={() => setIsEnterMouse(false)}
					className="w-[130px] h-[130px]"
				/>

				<div className="w-[200px] flex flex-col">
					{/* title */}
					<h3 className="text-lg font-medium text-gray-701 mb-2">
						{product_item.title}
					</h3>

					{/* discount */}
					{product_item.discount > 0 && (
						<div className="flex flex-col relative">
							<p className="text-xs text-gray-400">{`${product_item.price} $`}</p>
							<Divider
								custom_divider_color="#D93F3F"
								className="absolute bottom-[8px] w-[35px]"
							/>
						</div>
					)}

					{/* price */}
					<h3 className="text-xl font-medium text-gray-701 mb-6">
						{calculate_roundUp(
							calculate_PriceDiscount(product_item.price, product_item.discount)
						)}{' '}
						$
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default Item_Inline;
