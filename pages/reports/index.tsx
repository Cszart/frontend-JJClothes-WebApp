import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { Session } from 'next-auth';
import clsx from 'clsx';
import moment from 'moment';

// Local components
import { Layout } from 'components/layout';

// Headless ui lib
import { Disclosure, Transition } from '@headlessui/react';

// Antd
import { DownOutlined } from '@ant-design/icons';
import { Button, DatePicker, Table, Tooltip as Tooltip_Antd } from 'antd';

// Interfaces
import {
	CategoryByAmount_response,
	OrdersByDate_response,
	OrdersByUser_response,
	User,
} from 'interfaces';

// API
import {
	get_bottomTen_products,
	get_bottomTen_tags_products,
	get_category_by_amount,
	get_orders_by_date,
	get_orders_by_users,
	get_shoppingCart_byID,
	get_topTen_products,
	get_topTen_tags_products,
} from 'api';

// Graphics
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	RadialBar,
	RadialBarChart,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import {
	CategoryByAmount_Columns,
	OrdersByDate_Columns,
	OrdersByUser_Columns,
	Products_Columns,
} from 'components/reports';

// Scatter type
type ScatterData_type = {
	x?: string | number;
	y?: string | number;
};

// Line chart type
type ChartData_Type = {
	name?: string;
	uv?: number;
	pv?: number;
	amt?: number;
	fill?: string;
};

// Format date selected
const dateFormat = 'YYYY/MM/DD';

// Select options
enum Report_Options {
	CLIENTS_REQUEST_QTY = 'Clientes sorted by orders quantity',

	CATEGORY_TOTAL = 'Categories sorted by total amount order',
	CATEGORY_TOPTEN = 'Top ten best selling products by category',
	CATEGORY_BOTTOMTEN = 'Bottom ten least sold products by category',

	TAG_TOPTEN = 'Top ten best selling products by tag',
	TAG_BOTTOMTEN = 'Bottom ten least sold products by tag',

	ORDER_BY_DATE = 'Purchase orders by date range',
}

// Colors to charts
const colors_palette_chart = [
	'#8884d8',
	'#83a6ed',
	'#8dd1e1',
	'#82ca9d',
	'#a4de6c',
	'#d0ed57',
	'#ffc658',
	'#8884d8',
	'#83a6ed',
	'#8dd1e1',
];

// Props
interface Reports_Props {
	session: Session | null;
	user: User;
}

const Reports: React.FC<Reports_Props> = ({ session, user }) => {
	//////////// React query ////////////////////
	// Get shopping cart info
	const {
		data: shoppingCart_data,
		refetch: shoppingCart_refetch,
		isFetching: shoppingCart_isLoading,
	} = useQuery(['Shopping_Cart', session?.userData, user], () =>
		get_shoppingCart_byID(user?.shoppingCart._id)
	);

	// Get orders number by user
	const {
		data: orderByUser_data,
		refetch: orderByUser_refetch,
		isFetching: orderByUser_isLoading,
	} = useQuery(['Orders_By_User', session?.userData, user], () =>
		get_orders_by_users('2022-01-01', '2022-12-01')
	);

	// Get orders number by date
	const {
		data: orderbyDate_data,
		refetch: orderbyDate_refetch,
		isFetching: orderbyDate_isLoading,
	} = useQuery(['Orders_By_Date', session?.userData, user], () =>
		get_orders_by_date('2022-01-01', '2022-12-01')
	);

	// Get categories by billing amount
	const {
		data: categoryByAmount_data,
		refetch: categoryByAmount_refetch,
		isFetching: categoryByAmount_isLoading,
	} = useQuery(['Category_By_Amount', session?.userData, user], () =>
		get_category_by_amount('2022-01-01', '2022-12-01')
	);

	// Get top ten products by category
	const {
		data: topTenProductsByCategory_data,
		refetch: topTenProductsByCategory_refetch,
		isFetching: topTenProductsByCategory_isLoading,
	} = useQuery(['TopTen_Products_Category', session?.userData, user], () =>
		get_topTen_products('2022-01-01', '2022-12-01')
	);

	// Get bottom ten products by category
	const {
		data: bottomTenProductsByCategory_data,
		refetch: bottomTenProductsByCategory_refetch,
		isFetching: bottomTenProductsByCategory_isLoading,
	} = useQuery(['BottomTen_Products_Category', session?.userData, user], () =>
		get_bottomTen_products('2022-01-01', '2022-12-01')
	);

	// Get top ten products by tag
	const {
		data: topTenProductsByTags_data,
		refetch: topTenProductsByTags_refetch,
		isFetching: topTenProductsByTags_isLoading,
	} = useQuery(['TopTen_Products_Tags', session?.userData, user], () =>
		get_topTen_tags_products('2022-01-01', '2022-12-01')
	);

	// Get bottom ten products by tag
	const {
		data: bottomTenProductsByTags_data,
		refetch: bottomTenProductsByTags_refetch,
		isFetching: bottomTenProductsByTags_isLoading,
	} = useQuery(['BottomTen_Products_Tags', session?.userData, user], () =>
		get_bottomTen_tags_products('2022-01-01', '2022-12-01')
	);

	//////////////////////////////////////////////////////////////////////////

	///////////// DATA //////////////////////////

	const [orderByUser_Formated, setOrderByUser_Formated] =
		React.useState<ScatterData_type[]>();
	const [orderByUser_columns_data, setOrderByUser_columns_data] =
		React.useState<any[]>();

	const [orderByDate_Formated, setOrderByDate_Formated] =
		React.useState<ChartData_Type[]>();
	const [orderByDate_columns_data, setOrderByDate_columns_data] =
		React.useState<any[]>();

	const [categoryByAmount_Formated, setCategoryByAmount_Formated] =
		React.useState<ChartData_Type[]>();
	const [categoryByAmount_columns_data, setcategoryByAmount_columns_data] =
		React.useState<any[]>();

	// Top ten category
	const [
		topTenProductsByCategory_Formated,
		settopTenProductsByCategory_Formated,
	] =
		React.useState<
			{ category_name: string; formated_category_products: ChartData_Type[] }[]
		>();
	const [
		topTenProductsByCategory_columns_data,
		settopTenProductsByCategory_columns_data,
	] = React.useState<
		{
			category_name: string;
			columns_category_products: any[];
		}[]
	>();

	// Bottom ten category
	const [
		bottomTenProductsByCategory_Formated,
		setbottomTenProductsByCategory_Formated,
	] = React.useState<
		{
			category_name: string;
			formated_category_products: ChartData_Type[];
		}[]
	>();
	const [
		bottomTenProductsByCategory_columns_data,
		setbottomTenProductsByCategory_columns_data,
	] = React.useState<
		{
			category_name: string;
			columns_category_products: any[];
		}[]
	>();

	// Top ten tags
	const [topTenProductsByTags_Formated, settopTenProductsByTags_Formated] =
		React.useState<
			{ tag_name: string; formated_tags_products: ChartData_Type[] }[]
		>();
	const [
		topTenProductsByTags_columns_data,
		settopTenProductsByTags_columns_data,
	] = React.useState<
		{
			tag_name: string;
			columns_tags_products: any[];
		}[]
	>();

	// Bottom ten tags
	const [
		bottomTenProductsByTags_Formated,
		setbottomTenProductsByTags_Formated,
	] =
		React.useState<
			{ tag_name: string; formated_tags_products: ChartData_Type[] }[]
		>();
	const [
		bottomTenProductsByTags_columns_data,
		setbottomTenProductsByTags_columns_data,
	] = React.useState<
		{
			tag_name: string;
			columns_tags_products: any[];
		}[]
	>();
	////////////////////////////////////////////

	//////////// UTILS vars /////////////////////
	const [option_selected, setOption_Selected] = React.useState<Report_Options>(
		Report_Options.CLIENTS_REQUEST_QTY
	);

	//////////////////////////////////////

	////////// FUNCTIONS /////////////////
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onChange_RangePicker = (values: any, dateString: any) => {
		console.log('-- Reports page, Range picker change values --', values);
		console.log(
			'-- Reports page, Range picker change dateStrings --',
			dateString
		);
	};

	// Refetch all data
	const onRefresh_button = () => {
		orderByUser_refetch();
		orderbyDate_refetch();
		categoryByAmount_refetch();
		topTenProductsByTags_refetch();
		bottomTenProductsByTags_refetch();
		topTenProductsByCategory_refetch();
		bottomTenProductsByCategory_refetch();
	};
	/////////////////////////////////////

	////////// UseEffects /////////////
	// When an option changes
	React.useEffect(() => {
		// Option selected
		console.log(
			'\n\n-- Reports page, option selected change --',
			option_selected
		);

		/////// Log info ///////
		console.log('-- Reports page, orders by user data --', orderByUser_data);
		console.log('-- Reports page, orders by date data --', orderbyDate_data);
		console.log(
			'-- Reports page, categories by billing amount data --',
			categoryByAmount_data
		);
		console.log(
			'-- Reports page, top ten products by category data --',
			topTenProductsByCategory_data
		);
		console.log(
			'-- Reports page, bottom ten products by category data --',
			bottomTenProductsByCategory_data
		);
		console.log(
			'-- Reports page, top ten products by tag data --',
			topTenProductsByTags_data
		);
		console.log(
			'-- Reports page, bottom ten products by tag data --',
			bottomTenProductsByTags_data
		);
	}, [option_selected]);

	// Formaters
	// When orders by user data changes
	React.useEffect(() => {
		if (orderByUser_data) {
			// Format data for graphic
			const format_data: ScatterData_type[] = orderByUser_data.map(
				(item: OrdersByUser_response) => {
					return { x: item.user.firstname, y: item.count };
				}
			);

			// Format data for table
			const format_table_data = orderByUser_data.map(
				(item: OrdersByUser_response) => {
					return {
						fullname: `${item.user.firstname} ${item.user.lastname}`,
						nrOrders: item.count,
					};
				}
			);

			setOrderByUser_Formated(format_data);
			setOrderByUser_columns_data(format_table_data);
		}
	}, [orderByUser_data]);

	// When orders by date data changes
	React.useEffect(() => {
		if (orderbyDate_data) {
			// Format data for graphic
			const format_data: ChartData_Type[] = orderbyDate_data.map(
				(item: OrdersByDate_response) => {
					return { name: item.purchase_date, uv: item.count };
				}
			);

			// Format data for table
			const format_table_data = orderbyDate_data.map(
				(item: OrdersByDate_response) => {
					return {
						purchaseDate: item.purchase_date,
						nrOrders: item.count,
					};
				}
			);

			setOrderByDate_Formated(format_data);
			setOrderByDate_columns_data(format_table_data);
		}
	}, [orderbyDate_data]);

	// When category by amount changes
	React.useEffect(() => {
		if (categoryByAmount_data) {
			// Format data for graphic
			const format_data: ChartData_Type[] = categoryByAmount_data.map(
				(item: CategoryByAmount_response) => {
					return { name: item.category_name, uv: item.category_amount };
				}
			);

			// Format data for table
			const format_table_data = categoryByAmount_data.map(
				(item: CategoryByAmount_response) => {
					return {
						category_name: item.category_name,
						category_amount: item.category_amount,
						category_items: item.category_items,
					};
				}
			);

			setCategoryByAmount_Formated(format_data);
			setcategoryByAmount_columns_data(format_table_data);
		}
	}, [categoryByAmount_data]);

	// When top ten by category changes
	React.useEffect(() => {
		if (topTenProductsByCategory_data) {
			// Format data for graphic
			const formated_data: {
				category_name: string;
				formated_category_products: ChartData_Type[];
			}[] = topTenProductsByCategory_data.map((item) => {
				//
				// For every category format products
				const category_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const formated_products: ChartData_Type[] =
					category_products_sorted.map((item_product, index: number) => {
						return {
							name: item_product.title,
							uv: item_product.initial_stock - item_product.stock,
							fill: colors_palette_chart[index],
						};
					});

				// Then return an array with category name and products formated
				return {
					category_name: item.category_name,
					formated_category_products: formated_products,
				};
			});

			// Format data for tables
			const formated_table_data: {
				category_name: string;
				columns_category_products: any[];
			}[] = topTenProductsByCategory_data.map((item) => {
				//
				// For every category format products
				const category_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const columns_formated = category_products_sorted.map(
					(item_product) => {
						return {
							title: item_product.title,
							price: item_product.price,
							sold: item_product.initial_stock - item_product.stock,
						};
					}
				);

				// Then return an array with category name and products formated
				return {
					category_name: item.category_name,
					columns_category_products: columns_formated,
				};
			});

			// save formated data
			settopTenProductsByCategory_Formated(formated_data);
			settopTenProductsByCategory_columns_data(formated_table_data);
		}
	}, [topTenProductsByCategory_data]);

	// When bottom ten by category changes
	React.useEffect(() => {
		if (bottomTenProductsByCategory_data) {
			// Format data for graphic
			const formated_data: {
				category_name: string;
				formated_category_products: ChartData_Type[];
			}[] = bottomTenProductsByCategory_data.map((item) => {
				//
				// For every category format products
				const category_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const formated_products: ChartData_Type[] =
					category_products_sorted.map((item_product, index: number) => {
						return {
							name: item_product.title,
							uv: item_product.initial_stock - item_product.stock,
							fill: colors_palette_chart[index],
						};
					});

				// Then return an array with category name and products formated
				return {
					category_name: item.category_name,
					formated_category_products: formated_products,
				};
			});

			// Format data for tables
			const formated_table_data: {
				category_name: string;
				columns_category_products: any[];
			}[] = bottomTenProductsByCategory_data.map((item) => {
				//
				// For every category format products
				const category_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const columns_formated = category_products_sorted.map(
					(item_product) => {
						return {
							title: item_product.title,
							price: item_product.price,
							sold: item_product.initial_stock - item_product.stock,
						};
					}
				);

				// Then return an array with category name and products formated
				return {
					category_name: item.category_name,
					columns_category_products: columns_formated,
				};
			});

			// save formated data
			setbottomTenProductsByCategory_Formated(formated_data);
			setbottomTenProductsByCategory_columns_data(formated_table_data);
		}
	}, [bottomTenProductsByCategory_data]);

	// When top ten by tags changes
	React.useEffect(() => {
		if (topTenProductsByTags_data) {
			// Format data for graphic
			const formated_data: {
				tag_name: string;
				formated_tags_products: ChartData_Type[];
			}[] = topTenProductsByTags_data.map((item) => {
				//
				// For every tags format products
				const tags_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const formated_products: ChartData_Type[] = tags_products_sorted.map(
					(item_product, index: number) => {
						return {
							name: item_product.title,
							uv: item_product.initial_stock - item_product.stock,
							fill: colors_palette_chart[index],
						};
					}
				);

				// Then return an array with tags name and products formated
				return {
					tag_name: item.category_name,
					formated_tags_products: formated_products,
				};
			});

			// Format data for tables
			const formated_table_data: {
				tag_name: string;
				columns_tags_products: any[];
			}[] = topTenProductsByTags_data.map((item) => {
				//
				// For every tags format products
				const tags_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const columns_formated = tags_products_sorted.map((item_product) => {
					return {
						title: item_product.title,
						price: item_product.price,
						sold: item_product.initial_stock - item_product.stock,
					};
				});

				// Then return an array with tags name and products formated
				return {
					tag_name: item.category_name,
					columns_tags_products: columns_formated,
				};
			});

			// save formated data
			settopTenProductsByTags_Formated(formated_data);
			settopTenProductsByTags_columns_data(formated_table_data);
		}
	}, [topTenProductsByTags_data]);

	// When bottom ten by tags changes
	React.useEffect(() => {
		if (bottomTenProductsByTags_data) {
			// Format data for graphic
			const formated_data: {
				tag_name: string;
				formated_tags_products: ChartData_Type[];
			}[] = bottomTenProductsByTags_data.map((item) => {
				//
				// For every tags format products
				const tags_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const formated_products: ChartData_Type[] = tags_products_sorted.map(
					(item_product, index: number) => {
						return {
							name: item_product.title,
							uv: item_product.initial_stock - item_product.stock,
							fill: colors_palette_chart[index],
						};
					}
				);

				// Then return an array with tags name and products formated
				return {
					tag_name: item.category_name,
					formated_tags_products: formated_products,
				};
			});

			// Format data for tables
			const formated_table_data: {
				tag_name: string;
				columns_tags_products: any[];
			}[] = bottomTenProductsByTags_data.map((item) => {
				//
				// For every tags format products
				const tags_products_sorted = item.category_products.sort(
					(a, b) => a.initial_stock - a.stock - (b.initial_stock - b.stock)
				);

				const columns_formated = tags_products_sorted.map((item_product) => {
					return {
						title: item_product.title,
						price: item_product.price,
						sold: item_product.initial_stock - item_product.stock,
					};
				});

				// Then return an array with tags name and products formated
				return {
					tag_name: item.category_name,
					columns_tags_products: columns_formated,
				};
			});

			// save formated data
			setbottomTenProductsByTags_Formated(formated_data);
			setbottomTenProductsByTags_columns_data(formated_table_data);
		}
	}, [bottomTenProductsByTags_data]);
	////////////////////////////////////////////////////////////////////////////////

	return (
		<Layout
			withHeader
			className_Header="mb-0"
			withFooter
			className="layout flex flex-row flex-wrap h-full"
			// Session
			session={session}
			user={user}
			// Shopping cart
			shoppingCart_data={shoppingCart_data}
			shoppingCart_refetch={shoppingCart_refetch}
			shoppingCart_isLoading={shoppingCart_isLoading}
		>
			{/* Divide layout */}
			{/* Options panel */}
			<div
				className={clsx(
					'options_panel flex flex-col bg-white',
					'w-[20%] pt-[20px] pb-[56px]'
				)}
			>
				{/* Title */}
				<h1 className="text-xl font-bold text-black ml-4 mb-4">
					Reports Options
				</h1>

				{/* Option - Clients */}
				<Disclosure as={'div'}>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={clsx(
									'flex justify-between w-full px-4 py-2',
									'hover:bg-slate-500',
									'text-sm font-medium text-left text-gray-700 hover:text-white',
									'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
								)}
							>
								<span>Clients</span>
								<DownOutlined
									className={`${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-gray-500 hover:text-white`}
								/>
							</Disclosure.Button>

							<Transition
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Disclosure.Panel
									onClick={() =>
										setOption_Selected(Report_Options.CLIENTS_REQUEST_QTY)
									}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									Requests quantity
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>

				{/* Option - Categoria */}
				<Disclosure as={'div'}>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={clsx(
									'flex justify-between w-full px-4 py-2',
									'hover:bg-slate-500',
									'text-sm font-medium text-left text-gray-700 hover:text-white',
									'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
								)}
							>
								<span>Categories</span>
								<DownOutlined
									className={`${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-gray-500 hover:text-white`}
								/>
							</Disclosure.Button>

							<Transition
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Disclosure.Panel
									onClick={() =>
										setOption_Selected(Report_Options.CATEGORY_TOTAL)
									}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									Order total
								</Disclosure.Panel>

								<Disclosure.Panel
									onClick={() =>
										setOption_Selected(Report_Options.CATEGORY_TOPTEN)
									}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									Top ten products
								</Disclosure.Panel>

								<Disclosure.Panel
									onClick={() =>
										setOption_Selected(Report_Options.CATEGORY_BOTTOMTEN)
									}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									Bottom ten products
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>

				{/* Option - Tags */}
				<Disclosure as={'div'}>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={clsx(
									'flex justify-between w-full px-4 py-2',
									'hover:bg-slate-500',
									'text-sm font-medium text-left text-gray-700 hover:text-white',
									'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
								)}
							>
								<span>Tags</span>
								<DownOutlined
									className={`${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-gray-500 hover:text-white`}
								/>
							</Disclosure.Button>

							<Transition
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Disclosure.Panel
									onClick={() => setOption_Selected(Report_Options.TAG_TOPTEN)}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									Top ten products
								</Disclosure.Panel>

								<Disclosure.Panel
									onClick={() =>
										setOption_Selected(Report_Options.TAG_BOTTOMTEN)
									}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									Bottom ten products
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>

				{/* Option - Orders */}
				<Disclosure as={'div'}>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={clsx(
									'flex justify-between w-full px-4 py-2',
									'hover:bg-slate-500',
									'text-sm font-medium text-left text-gray-700 hover:text-white',
									'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
								)}
							>
								<span>Orders</span>
								<DownOutlined
									className={`${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-gray-500 hover:text-white`}
								/>
							</Disclosure.Button>

							<Transition
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<Disclosure.Panel
									onClick={() =>
										setOption_Selected(Report_Options.ORDER_BY_DATE)
									}
									className="text-sm text-gray-500 hover:text-gray-800 hover:font-bold cursor-pointer px-4 pt-4 pb-2"
								>
									By date
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>
			</div>

			{/*  */}
			{/* Content, graphics etc */}
			<div className="content_graphics flex flex-col bg-slate-100 w-[80%] pt-[20px]">
				{/* Title selected */}
				<h1 className="text-4xl font-bold text-center mb-10">
					{option_selected}
				</h1>

				<div className="container-antd flex flex-wrap justify-center gap-4 mb-4">
					{/* Datepicker */}
					<DatePicker.RangePicker
						defaultValue={[
							moment('2022/01/01', dateFormat),
							moment('2022/03/30', dateFormat),
						]}
						format={dateFormat}
						onChange={onChange_RangePicker}
						className="max-w-[300px]"
					/>

					{/* Refresh button */}
					<div className="container-antd">
						<Tooltip_Antd title="Refetch data">
							<div className="container-antd">
								<Button
									loading={
										orderByUser_isLoading ||
										orderbyDate_isLoading ||
										categoryByAmount_isLoading ||
										topTenProductsByTags_isLoading ||
										bottomTenProductsByTags_isLoading ||
										topTenProductsByCategory_isLoading ||
										bottomTenProductsByCategory_isLoading
									}
									onClick={onRefresh_button}
								>
									Refresh
								</Button>
							</div>
						</Tooltip_Antd>
					</div>
				</div>

				{/* Content, graphics */}
				{/* Client Content */}
				{option_selected == Report_Options.CLIENTS_REQUEST_QTY && (
					<>
						<ScatterChart
							width={730}
							height={250}
							margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
							className="self-center mb-10"
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="x" name="Name" />
							<YAxis dataKey="y" name="Orders" />
							<Tooltip cursor={{ strokeDasharray: '3 3' }} />
							<Legend />
							<Scatter
								name="Users"
								data={orderByUser_Formated}
								fill="#8884d8"
							/>
						</ScatterChart>

						<div className="flex flex-col w-full mb-4 px-12">
							{/* Legend / details */}
							<h2 className="text-xl text-left text-gray-900 font-bold mb-4">
								Details
							</h2>

							{/* Table */}
							<Table
								columns={OrdersByUser_Columns}
								dataSource={orderByUser_columns_data}
							/>
						</div>
					</>
				)}

				{/* Order date Content */}
				{option_selected == Report_Options.ORDER_BY_DATE && (
					<>
						<LineChart
							width={730}
							height={250}
							data={orderByDate_Formated}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
							className="self-center"
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
						</LineChart>

						<div className="flex flex-col w-full mb-4 px-12">
							{/* Legend / details */}
							<h2 className="text-xl text-left text-gray-900 font-bold mb-4">
								Details
							</h2>

							{/* Table */}
							<Table
								columns={OrdersByDate_Columns}
								dataSource={orderByDate_columns_data}
							/>
						</div>
					</>
				)}

				{/* Category total Content */}
				{option_selected == Report_Options.CATEGORY_TOTAL && (
					<>
						<BarChart
							width={730}
							height={250}
							data={categoryByAmount_Formated}
							className="self-center"
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>

						<div className="flex flex-col w-full mb-4 px-12">
							{/* Legend / details */}
							<h2 className="text-xl text-left text-gray-900 font-bold mb-4">
								Details
							</h2>

							{/* Table */}
							<Table
								columns={CategoryByAmount_Columns}
								dataSource={categoryByAmount_columns_data}
							/>
						</div>
					</>
				)}

				{/* Category top Content */}
				{option_selected == Report_Options.CATEGORY_TOPTEN && (
					<div className="category_topTen flex flex-col gap-10">
						{/* Iterate categories */}
						{/* Show Graphs first */}
						<div className="flex flex-wrap justify-center w-full gap-8">
							{topTenProductsByCategory_Formated?.map(
								(item_formated, key: number) => {
									return (
										<div
											key={key}
											className={clsx(
												`category_${item_formated.category_name}`,
												'flex flex-col gap-4'
											)}
										>
											<h1 className="text-xl text-gray-800 font-medium">
												{item_formated.category_name}
											</h1>

											<RadialBarChart
												width={500}
												height={500}
												innerRadius="10%"
												outerRadius="80%"
												data={item_formated.formated_category_products}
												startAngle={180}
												endAngle={0}
											>
												<RadialBar
													label={{ fill: '#666', position: 'insideStart' }}
													background
													dataKey="uv"
												/>
												<Legend
													iconSize={10}
													width={125}
													layout="vertical"
													verticalAlign="top"
													align="left"
												/>
												<Tooltip />
											</RadialBarChart>
										</div>
									);
								}
							)}
						</div>

						{/* Show Tables */}
						<div className="flex flex-col justify-center w-full gap-8">
							{topTenProductsByCategory_columns_data?.map(
								(item_column, key: number) => {
									return (
										<div key={key} className="flex flex-col w-full px-12">
											{/* Legend / details */}
											<h2 className="text-xl text-left text-gray-900 font-bold mb-4">
												{`Category ${item_column.category_name}`}
											</h2>

											{/* Table */}
											<Table
												columns={Products_Columns}
												dataSource={item_column.columns_category_products}
											/>
										</div>
									);
								}
							)}
						</div>
					</div>
				)}

				{/* Category bottom Content */}
				{option_selected == Report_Options.CATEGORY_BOTTOMTEN && (
					<div className="category_bottomTen flex flex-col gap-10">
						{/* Iterate categories */}
						{/* Show Graphs first */}
						<div className="flex flex-wrap justify-center w-full gap-8">
							{bottomTenProductsByCategory_Formated?.map(
								(item_formated, key: number) => {
									return (
										<div
											key={key}
											className={clsx(
												`category_${item_formated.category_name}`,
												'flex flex-col gap-4'
											)}
										>
											<h1 className="text-xl text-gray-800 font-medium">
												{item_formated.category_name}
											</h1>

											<RadialBarChart
												width={500}
												height={500}
												innerRadius="10%"
												outerRadius="80%"
												data={item_formated.formated_category_products}
												startAngle={180}
												endAngle={0}
											>
												<RadialBar
													label={{ fill: '#666', position: 'insideStart' }}
													background
													dataKey="uv"
												/>
												<Legend
													iconSize={10}
													width={125}
													layout="vertical"
													verticalAlign="top"
													align="left"
												/>
												<Tooltip />
											</RadialBarChart>
										</div>
									);
								}
							)}
						</div>

						{/* Show Tables */}
						<div className="flex flex-col justify-center w-full gap-8">
							{bottomTenProductsByCategory_columns_data?.map(
								(item_column, key: number) => {
									return (
										<div key={key} className="flex flex-col w-full px-12">
											{/* Legend / details */}
											<h2 className="text-xl text-left text-gray-900 font-bold mb-4">
												{`Category ${item_column.category_name}`}
											</h2>

											{/* Table */}
											<Table
												columns={Products_Columns}
												dataSource={item_column.columns_category_products}
											/>
										</div>
									);
								}
							)}
						</div>
					</div>
				)}

				{/* Tag top Content */}
				{option_selected == Report_Options.TAG_TOPTEN && (
					<div className="tags_topTen">
						{/* Iterate categories */}
						{/* Show Graphs first */}
						<div className="flex flex-wrap justify-evenly w-full">
							{topTenProductsByTags_Formated?.map(
								(item_formated, key: number) => {
									return (
										<div
											key={key}
											className={clsx(
												`tags_${item_formated.tag_name}`,
												'flex flex-col gap-4'
											)}
										>
											<h1 className="text-xl text-gray-800 font-medium">
												{item_formated.tag_name}
											</h1>

											<RadialBarChart
												width={500}
												height={400}
												innerRadius="10%"
												outerRadius="80%"
												data={item_formated.formated_tags_products}
												startAngle={180}
												endAngle={0}
											>
												<RadialBar
													label={{ fill: '#666', position: 'insideStart' }}
													background
													dataKey="uv"
												/>
												<Legend
													iconSize={10}
													width={125}
													layout="vertical"
													verticalAlign="top"
													align="left"
												/>
												<Tooltip />
											</RadialBarChart>

											{/* Table */}
											{topTenProductsByTags_columns_data && (
												<Table
													columns={Products_Columns}
													dataSource={
														topTenProductsByTags_columns_data[key]
															.columns_tags_products
													}
													className="relative top-[-10%]"
												/>
											)}
										</div>
									);
								}
							)}
						</div>
					</div>
				)}

				{/* Tag bottom Content */}
				{option_selected == Report_Options.TAG_BOTTOMTEN && (
					<div className="tags_bottomTen">
						{/* Iterate categories */}
						{/* Show Graphs first */}
						<div className="flex flex-wrap justify-evenly w-full">
							{bottomTenProductsByTags_Formated?.map(
								(item_formated, key: number) => {
									return (
										<div
											key={key}
											className={clsx(
												`tags_${item_formated.tag_name}`,
												'flex flex-col gap-4'
											)}
										>
											<h1 className="text-xl text-gray-800 font-medium">
												{item_formated.tag_name}
											</h1>

											<RadialBarChart
												width={500}
												height={400}
												innerRadius="10%"
												outerRadius="80%"
												data={item_formated.formated_tags_products}
												startAngle={180}
												endAngle={0}
											>
												<RadialBar
													label={{ fill: '#666', position: 'insideStart' }}
													background
													dataKey="uv"
												/>
												<Legend
													iconSize={10}
													width={125}
													layout="vertical"
													verticalAlign="top"
													align="left"
												/>
												<Tooltip />
											</RadialBarChart>

											{/* Table */}
											{bottomTenProductsByTags_columns_data && (
												<Table
													columns={Products_Columns}
													dataSource={
														bottomTenProductsByTags_columns_data[key]
															.columns_tags_products
													}
													className="relative top-[-10%]"
												/>
											)}
										</div>
									);
								}
							)}
						</div>
					</div>
				)}
			</div>
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

export default Reports;
