import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

// API
import {
	get_products_byID,
	get_shoppingCart_byID,
	patch_shoppingCart_update,
	post_create_shipmentOrder,
	get_all_statesPricing,
	post_order_add,
	get_bank_all_responses,
} from 'api';

// Local components
import { Layout } from 'components/layout';
import {
	PaymentBilling,
	PaymentConfirmation,
	PaymentPage,
} from 'components/payment';

// Interfaces
import {
	Bill,
	Order,
	Payment,
	Post_Shipment_data,
	Product_Item,
	Shipping_States,
	ShoppingCart_Update,
	User,
} from 'interfaces';
import { calculate_roundUp, calculate_PriceDiscount } from 'lib';

const Payment: React.FC<{ user: User }> = ({ user }) => {
	const router = useRouter();

	////////// React query //////////////
	// Get shopping cart info //
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	// Get states and pricing info //
	const { data: venezuela_states } = useQuery(['Venezuela_States', user], () =>
		get_all_statesPricing()
	);

	// Get states and pricing info //
	const { data: bank_responses } = useQuery(['Bank_Responses', user], () =>
		get_bank_all_responses()
	);

	///////// Variables ///////////////
	// Forms steps
	const [form_step, setForm_Step] = React.useState<
		'billing' | 'payment' | 'confirmation'
	>('billing');

	// Forms data
	const [billing_data, setBilling_Data] = React.useState<Bill>();
	const [order_response_data, setOrder_Response_Data] = React.useState<Order>();

	// Current data
	const [current_state, setCurrent_State] = React.useState<string>();
	const [current_ShipCost, setCurrent_ShipCost] = React.useState<number>();
	const [current_items, setCurrent_Items] = React.useState<Product_Item[]>([]);
	const [current_subtotal, setCurrent_subtotal] = React.useState<number>(0);
	const [current_BankResponses, setCurrent_BankResponses] =
		React.useState<number>(0);
	const [current_ProceedPayment, setCurrent_ProceedPayment] =
		React.useState<boolean>(true);

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	//////////// FUNCTIONs ////////////////
	// Billing
	const onFinish_Billing = (values: Bill) => {
		console.log('-- Payment Billing, form values --', values);
		setBilling_Data(values);

		// Next Step
		setForm_Step('payment');
	};

	// Proceed payment
	const onFinish_Proceed_Payment = async () => {
		setIsLoading(true);

		console.log(
			'-- Payment page, proceed payment with items --',
			current_items
		);

		// Formar Query params
		let query_params = '';
		current_items.forEach((item: Product_Item) => {
			// Put name
			query_params = query_params.concat(
				`name=${item.product.title.replace(/\s/g, '+')}&`
			);
			// put image
			query_params = query_params.concat(`image=${item.product.gallery[0]}&`);
			// put price
			query_params = query_params.concat(
				`amount=${calculate_roundUp(
					calculate_PriceDiscount(item.product.price, item.product.discount)
				)}&`
			);
			// put quantity
			query_params = query_params.concat(`num=${item.quantity}&`);
		});

		// put order
		query_params = query_params.concat(`order=${5}&`);
		// put key
		query_params = query_params.concat(
			'key=JmGfhBJMYVTRW8mAa599oSLnjsjVu4O6bRpROuOIGKnG&'
		);
		// put reason
		query_params = query_params.concat('reason=compra');

		console.log('-- Payment page, query params --', query_params);

		let url_to_bank = 'https://bank.vittorioadesso.com/paygateway?';
		url_to_bank = url_to_bank.concat(query_params);

		window.open(url_to_bank, '_blank');

		setIsLoading(false);
	};

	// succes Payment
	const onFinish_Payment = async () => {
		setIsLoading(true);

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
			//////////// CREATE SHIPMENT ORDER //
			// Format the items from product_item to {quantity: number , name: string (product name)}
			const current_items_shipment_formated = current_items.map(
				(item: Product_Item) => {
					return { quantity: item.quantity, name: item.product.title };
				}
			);

			// Format submit data to shipment endpoint
			const submit_shipment_data: Post_Shipment_data = {
				productquantity_set: current_items_shipment_formated,
				target_address: {
					state: billing_data.state,
					city: billing_data.city,
					street: billing_data.street,
					zipcode: billing_data.zip_code,
				},
				commerce: 'jjcclothes',
			};
			console.log(
				'-- Payment page, create shipment order submit data --',
				submit_shipment_data
			);

			const shipment_order_response = await post_create_shipmentOrder(
				submit_shipment_data
			);
			console.log(
				'-- Payment page, create shipment order response --',
				shipment_order_response
			);

			///////////////////// CREATE ORDER on db //
			// Format submit data
			const submit_data: Order = {
				shipping_cost: current_ShipCost ?? 33,
				user: user._id,
				bill_info: billing_data,
				payment_info: {
					bank: 1,
					card_number: 'bank1',
					security_digits: 'bank1',
					expiring_date: 'bank1',
				},
				items: current_items_formated,
			};
			console.log('-- Payment page, create order submit data --', submit_data);

			// Call backend api
			const order_response = await post_order_add(submit_data);
			console.log('-- Payment page, create order response --', order_response);
			setOrder_Response_Data({
				...order_response.data,
				_id: shipment_order_response.data.id,
			});

			////////////////// UPDATE SHOPPING CART //
			// Remove pucharsed items from cart
			if (user && user.access_token && shoppingCart_data) {
				const new_items_filtered: Product_Item[] = [];

				// Items in the shoppingCart that were bought
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

				// Call backend api
				const empty_response = await patch_shoppingCart_update(
					user.access_token,
					shoppingCart_data._id,
					new_shoppingCart
				);

				if (empty_response.status == 200) {
					shoppingCart_refetch();
				}
			}

			setIsLoading(false);
			// Next step
			setForm_Step('confirmation');
		}
	};

	/////////////////// useEffects
	// Set current Items
	React.useEffect(() => {
		// if user is only buying one item
		if (form_step != 'confirmation') {
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
		}
	}, [router, shoppingCart_data]);

	// Calculate current total
	React.useEffect(() => {
		// if items is not undefined
		if (current_items) {
			let new_total = 0;
			current_items.forEach((item: Product_Item) => {
				new_total +=
					calculate_PriceDiscount(item.product.price, item.product.discount) *
					item.quantity;
			});
			setCurrent_subtotal(new_total);
		}
	}, [current_items]);

	// Find shipping cost
	React.useEffect(() => {
		// if state is defined
		if (current_state && venezuela_states) {
			const state_selected = venezuela_states.filter(
				(itemState: Shipping_States) => {
					return itemState.name === current_state;
				}
			);

			setCurrent_ShipCost(state_selected[0].price);
		}
	}, [current_state]);

	// When bank responses change
	React.useEffect(() => {
		console.log('-- Payment page, bank responses --', bank_responses);

		// if bank is defined and current bank hasnt been initialized
		if (bank_responses && current_BankResponses == 0) {
			console.log(
				'-- Payment page, current bank not init --',
				current_BankResponses
			);
			setCurrent_BankResponses(bank_responses.length);
		}

		// current bank was init
		if (bank_responses && current_BankResponses > 0) {
			if (bank_responses.length > current_BankResponses) {
				console.log(
					'-- Payment page, succeed current bank ',
					current_BankResponses,
					'bank responses ',
					bank_responses
				);

				setCurrent_ProceedPayment(false);
			}
		}
	}, [bank_responses]);

	return (
		<Layout
			withHeader
			withFooter
			show_banks_logos
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
					venezuela_states={venezuela_states ?? []}
					//Detail Order
					subtotal={current_subtotal}
					shippingCost={current_ShipCost}
					// state
					setCurrent_State={setCurrent_State}
					// onFinish
					onFinish_Billing={onFinish_Billing}
				/>
			)}

			{form_step === 'payment' && (
				<PaymentPage
					user={user}
					// Data
					billing_data={billing_data}
					current_items={current_items}
					setCurrent_Items={setCurrent_Items}
					isLoading={isLoading}
					proceedPayment={current_ProceedPayment}
					//Detail Order
					subtotal={current_subtotal}
					shipping_cost={current_ShipCost}
					// onFinish
					onFinish_Payment={onFinish_Payment}
					onFinish_Proceed_Payment={onFinish_Proceed_Payment}
				/>
			)}

			{form_step === 'confirmation' && (
				<PaymentConfirmation
					user={user}
					// Data
					billing_data={billing_data}
					items={current_items}
					//Detail Order
					subtotal={current_subtotal}
					shipping_cost={current_ShipCost}
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
