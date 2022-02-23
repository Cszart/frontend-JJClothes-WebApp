import { Session } from 'next-auth';
import { User } from './user';

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
	user: User;
}
