import type { AppProps } from 'next/app';
import * as React from 'react';

// Styles
import '../styles/globals.css';
import '../styles/global-tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
