import type { AppProps } from 'next/app';
import * as React from 'react';

// Styles
import '../styles/globals.css';
import '../styles/global-tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className="font-taviraj min-h-screen text-black transition-colors duration-1000">
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
