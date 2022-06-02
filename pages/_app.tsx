import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/layout'
import { Provider } from 'jotai'
import { userAtom } from '@/lib/store/user'
import 'github-markdown-css'

function MyApp({ Component, pageProps }: AppProps) {
  const { initialStoreState } = pageProps

  return (
    <ThemeProvider enableSystem attribute='class'>
      <Provider
        initialValues={initialStoreState && [[userAtom, initialStoreState]]}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
