import '../styles/globals.css'
import TopHeader from '../component/TopHeader'
import Layout from "../component/Layout";
import stylesheet from '../styles/main.scss'

function MyApp({ Component, pageProps }) {

const props = {...stylesheet, ...pageProps};

  return (<>
            <TopHeader />
            <Layout {...props}>

                  <Component {...pageProps} />

            </Layout>
      </>)
}

export default MyApp;
