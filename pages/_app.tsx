import * as React from 'react';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from 'react-toast-notifications';

// Styles
import '../styles/globals.css';
import '../styles/global-tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ToastProvider autoDismiss placement="bottom-center">
				<div className="font-taviraj min-h-screen text-black transition-colors duration-1000">
					<Component {...pageProps} />
				</div>
			</ToastProvider>
		</SessionProvider>
	);
}

export default MyApp;
