import { ShoppingCart, User } from 'interfaces';
import { Session } from 'next-auth';
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from 'react-query';

export interface Layout_Props {
	className?: string;
	isLoading?: string;

	// Props for header
	withHeader?: boolean;
	custom_header_color?: string;

	// Props for footer
	withFooter?: boolean;
	custom_footer_color?: string;

	// Actual session
	session?: Session | null;
	user?: User;

	// Shopping cart
	shoppingCart_data?: ShoppingCart | undefined;
	shoppingCart_refetch?: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<ShoppingCart | undefined, unknown>>;
	shoppingCart_isLoading?: boolean;
}
