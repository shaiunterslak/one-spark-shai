import { FormProvider } from '@/context/form-context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
        />
        <link rel='icon' href='/o.svg' />
        <title>OneSpark Signup</title>
      </Head>
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </>
  );
}
