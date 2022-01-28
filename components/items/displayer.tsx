import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Product } from 'interfaces';

// Local components
import { Item_Inline, Item_type_1, Item_type_2, Item_type_3 } from '.';

interface Items_Displayer_Props {
	className?: string;
	className_product_item?: string;
	orientation?: 'vertical' | 'horizontal';
	product_type?: 'type1' | 'type2' | 'type3' | 'inline';
	products_list: Product[];
}

export const Items_Displayer: React.FC<Items_Displayer_Props> = ({
	className,
	orientation = 'horizontal',
	product_type = 'type1',
	products_list = [],
}) => {
	return (
		<div
			className={clsx(
				'flex flex-wrap gap-5',
				{ 'flex-row': orientation === 'horizontal' },
				{ 'flex-col': orientation === 'vertical' },
				className
			)}
		>
			{product_type === 'type1' &&
				products_list.map((product_item: Product, key: number) => {
					return <Item_type_1 key={key} id={key} product_item={product_item} />;
				})}

			{product_type === 'type2' &&
				products_list.map((product_item: Product, key: number) => {
					return <Item_type_2 key={key} id={key} product_item={product_item} />;
				})}

			{product_type === 'type3' &&
				products_list.map((product_item: Product, key: number) => {
					return <Item_type_3 key={key} id={key} product_item={product_item} />;
				})}

			{product_type === 'inline' &&
				products_list.map((product_item: Product, key: number) => {
					return <Item_Inline key={key} id={key} product_item={product_item} />;
				})}
		</div>
	);
};

export default Items_Displayer;
