import * as React from 'react';
import clsx from 'clsx';

// Interfaces
import { Layout_Props } from 'interfaces';

// Local components
import { Header } from 'components/header';
import { Footer } from 'components/footer';
import { ShoppingCart_Modal } from 'components/shopping_cart';

export const Layout: React.FC<Layout_Props> = ({
	children,

	className,
	isLoading = false,

	// Header
	withHeader = false,
	custom_header_color,

	// Footer
	withFooter = false,
	custom_footer_color,
	show_banks_logos = false,

	user,

	// Shopping cart
	shoppingCart_data,
	shoppingCart_refetch,
	shoppingCart_isLoading,
}) => {
	// Show / Hide shopping cart modal
	const [show_shoppingCart, setShow_ShoppingCart] =
		React.useState<boolean>(false);

	// UseEffects
	React.useEffect(() => {
		console.log(
			'-- LAYOUT, shopping cart data --',
			shoppingCart_data,
			shoppingCart_isLoading
		);
	}, [shoppingCart_data]);

	// If is loading then return loading
	if (isLoading) {
		return <div className="isLoading">loading ...</div>;
	}

	return (
		<div className="layout w-screen min-h-screen flex flex-col bg-zinc-101">
			{withHeader && (
				<Header
					setShow_ShoppingCart={setShow_ShoppingCart}
					custom_header_color={custom_header_color}
					user={user}
					shoppinCart_items_count={shoppingCart_data?.items.length}
				/>
			)}

			<div className={clsx('w-full', className)}>{children}</div>

			{withFooter && (
				<Footer
					custom_footer_color={custom_footer_color}
					show_banks_logos={show_banks_logos}
				/>
			)}

			{/* Shopping cart modal */}
			{shoppingCart_data && (
				<ShoppingCart_Modal
					isOpen={show_shoppingCart}
					setIsOpen={setShow_ShoppingCart}
					shoppingCart_data={shoppingCart_data}
					shoppingCart_refetch={shoppingCart_refetch}
					user={user}
				/>
			)}
		</div>
	);
};

export default Layout;
