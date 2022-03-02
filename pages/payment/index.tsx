import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useQuery } from 'react-query';

// API
import {
	get_products_byID,
	get_shoppingCart_byID,
	patch_shoppingCart_update,
	post_order_add,
} from 'api';

// Local components
import { Layout } from 'components/layout';
import {
	PaymentBilling,
	PaymentConfirmation,
	PaymentPage,
} from 'components/payment';
import {
	Bill,
	Order,
	Payment,
	Product_Item,
	ShoppingCart_Update,
	User,
} from 'interfaces';
import { useRouter } from 'next/router';

const Payment: React.FC<{ user: User }> = ({ user }) => {
	const router = useRouter();

	// Get shopping cart info
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	// Forms steps
	const [form_step, setForm_Step] = React.useState<
		'billing' | 'payment' | 'confirmation'
	>('billing');

	// Forms data
	const [billing_data, setBilling_Data] = React.useState<Bill>();
	const [order_response_data, setOrder_Response_Data] = React.useState<Order>();
	const [current_items, setCurrent_Items] = React.useState<Product_Item[]>([]);
	const [current_subtotal, setCurrent_subtotal] = React.useState<number>(0);

	// FUNCTIONs
	// Billing
	const onFinish_Billing = (values: Bill) => {
		console.log('-- Payment Billing, form values --', values);
		setBilling_Data(values);
		setForm_Step('payment');
	};

	// Payment
	const onFinish_Payment = async (values: Payment, bank_selected: number) => {
		console.log('-- Payment page, form values --', {
			...values,
			bank: bank_selected,
		});

		// Format the items from product_item to {quantity: number , product: string (id)}
		const current_items_formated = current_items.map((item: Product_Item) => {
			return { quantity: item.quantity, product: item.product._id };
		});

		// If there are items to buy and as succesfully filled billing form
		if (
			billing_data &&
			current_items_formated &&
			current_items_formated.length > 0
		) {
			// Format submit data
			const submit_data: Order = {
				shipping_cost: 111,
				user: user._id,
				bill_info: billing_data,
				payment_info: { ...values, bank: bank_selected },
				items: current_items_formated,
			};

			// Call to backend
			const order_response = await post_order_add(submit_data);
			console.log('-- Payment, create order response --', order_response);
			setOrder_Response_Data(order_response.data);

			// Remove pucharsed items from cart
			if (user && user.access_token && shoppingCart_data) {
				const new_items_filtered: Product_Item[] = [];

				// For each item on shopping cart
				for (let index = 0; index < shoppingCart_data.items.length; index++) {
					const element = shoppingCart_data.items[index];
					const elements_filtered = current_items.filter(
						(cItem: Product_Item) => {
							return element.product._id == cItem.product._id;
						}
					);

					// If filter len is 0 then this item is not on current items so we must keep it in cart
					if (elements_filtered.length == 0) {
						new_items_filtered.push(element);
					}
				}

				// Format Product Item to shopping cart backend call
				const new_shoppingCart: ShoppingCart_Update = {
					items: new_items_filtered.map((item: Product_Item) => {
						return { quantity: item.quantity, product: item.product._id };
					}),
				};

				const empty_response = await patch_shoppingCart_update(
					user.access_token,
					shoppingCart_data._id,
					new_shoppingCart
				);

				if (empty_response.status == 200) {
					shoppingCart_refetch();
				}
			}

			setForm_Step('confirmation');
		}
	};

	// useEffects
	// Set Items
	React.useEffect(() => {
		// if user is only buying one item
		if (router.query.product_id && router.query.quantity) {
			const single_product_id = router.query.product_id as string;
			const single_product_quantity = parseInt(
				router.query.quantity as string,
				10
			);

			// Fetch the product data
			get_products_byID(single_product_id).then((response) => {
				setCurrent_Items([
					{ quantity: single_product_quantity, product: response.data },
				]);
			});
		} else {
			if (shoppingCart_data && shoppingCart_data.items) {
				setCurrent_Items(shoppingCart_data.items);
			}
		}
	}, [shoppingCart_data]);

	// Calculate current total
	React.useEffect(() => {
		// if items is not undefined
		if (current_items) {
			let new_total = 0;
			current_items.forEach((item: Product_Item) => {
				new_total =
					new_total +
					(item.product.price - item.product.discount) * item.quantity;
			});
			setCurrent_subtotal(new_total);
		}
	}, [current_items]);

	return (
		<Layout
			withHeader
			withFooter
			// Session
			user={user}
			// Shopping cart
			shoppingCart_data={shoppingCart_data}
			shoppingCart_refetch={shoppingCart_refetch}
			shoppingCart_isLoading={shoppingCart_isLoading}
		>
			{form_step === 'billing' && (
				<PaymentBilling
					user={user}
					//Detail Order
					subtotal={current_subtotal}
					shipping_cost={111}
					// onFinish
					onFinish_Billing={onFinish_Billing}
				/>
			)}

			{form_step === 'payment' && (
				<PaymentPage
					user={user}
					billing_data={billing_data}
					//Detail Order
					subtotal={current_subtotal}
					shipping_cost={111}
					current_items={current_items}
					setCurrent_Items={setCurrent_Items}
					// onFinish
					onFinish_Payment={onFinish_Payment}
				/>
			)}

			{form_step === 'confirmation' && (
				<PaymentConfirmation
					user={user}
					billing_data={billing_data}
					items={current_items}
					//Detail Order
					subtotal={current_subtotal}
					shipping_cost={111}
					delivery_time={'11'}
					track_number={order_response_data?._id}
				/>
			)}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session) {
		const user = session.userData;

		return {
			props: { session, user },
		};
	}

	return {
		props: { session },
	};
};

export default Payment;
