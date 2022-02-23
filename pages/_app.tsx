import * as React from 'react';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from 'react-toast-notifications';

// Styles
import '../styles/globals.css';
import '../styles/global-tailwind.css';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<ToastProvider autoDismiss placement="bottom-center">
					<div className="font-taviraj min-h-screen text-black transition-colors duration-1000">
						<Component {...pageProps} />
					</div>
				</ToastProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
