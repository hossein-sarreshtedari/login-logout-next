import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>

    <Head>

      <title>Main title</title>
      


    </Head>


    <Component {...pageProps} />



  </>
}
