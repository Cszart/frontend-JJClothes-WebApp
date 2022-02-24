import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Product, ShoppingCart, User } from 'interfaces';

// Local components
import { Item_Inline, Item_type_1, Item_type_2, Item_type_3 } from '.';
import { Divider } from 'components/divider';
import {
	RefetchOptions,
	RefetchQueryFilters,
	QueryObserverResult,
} from 'react-query';

interface Items_Displayer_Props {
	className?: string;
	className_product_item?: string;

	title?: string;

	orientation?: 'vertical' | 'horizontal';
	product_type?: 'type1' | 'type2' | 'type3' | 'inline';

	products_list: Product[];
	show_rows?: number;

	user?: User;

	// Shopping cart
	shoppingCart_data?: ShoppingCart | undefined;
	shoppingCart_refetch?: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<ShoppingCart | undefined, unknown>>;
	shoppingCart_isLoading?: boolean;
}

export const Items_Displayer: React.FC<Items_Displayer_Props> = ({
	className,
	className_product_item,

	title,

	orientation = 'horizontal',
	product_type = 'type1',

	products_list = [],
	show_rows = 1,

	user,

	shoppingCart_refetch,
}) => {
	return (
		<div
			className={clsx(
				'displayer flex flex-wrap',
				{ 'flex-row': orientation === 'horizontal' },
				{ 'flex-col': orientation === 'vertical' },
				className
			)}
		>
			{title && (
				<div className="flex items-center gap-4 w-full">
					<Divider className="w-[70px]" />
					<h1 className="text-4xl font-extrabold">{title}</h1>
					<Divider className="w-[70px]" />
				</div>
			)}

			{product_type === 'type1' &&
				products_list.map((product_item: Product, key: number) => {
					if (key < show_rows * 4) {
						return (
							<Item_type_1
								key={key}
								id={key}
								className={className_product_item}
								product_item={product_item}
								user={user}
							/>
						);
					}
				})}

			{product_type === 'type2' &&
				products_list.map((product_item: Product, key: number) => {
					if (key < show_rows * 4) {
						return (
							<Item_type_2
								key={key}
								id={key}
								className={className_product_item}
								product_item={product_item}
								user={user}
								shoppingCart_refetch={shoppingCart_refetch}
							/>
						);
					}
				})}

			{product_type === 'type3' &&
				products_list.map((product_item: Product, key: number) => {
					return (
						<Item_type_3
							key={key}
							id={key}
							className={className_product_item}
							product_item={product_item}
							user={user}
						/>
					);
				})}

			{product_type === 'inline' &&
				products_list.map((product_item: Product, key: number) => {
					return (
						<Item_Inline
							key={key}
							id={key}
							className={className_product_item}
							product_item={product_item}
							user={user}
						/>
					);
				})}
		</div>
	);
};

export default Items_Displayer;
