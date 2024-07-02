import React from 'react';
import Head from 'next/head';

interface AppProps {
      Component: React.ComponentType;
      pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
      return (
            <div>
                  <Head>
                        <link rel="shortcut icon" href="favicon.ico" />
                        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                        <link rel="icon" type="image/png" sizes="16x16" href="/imagesfavicon-16x16.png" />
                  </Head>
                  <Component {...pageProps} />
            </div>
      );
}