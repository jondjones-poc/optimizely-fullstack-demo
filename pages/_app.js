import '../styles/globals.css'
import TopHeader from '../layout/TopHeader'
import Layout from "../layout/Layout";
import stylesheet from '../styles/main.scss'

function MyApp({ Component, pageProps, props}) {
  return (<>
            <TopHeader />

            <Layout {...stylesheet} clientId={props.clientId} >

                  <Component {...pageProps} clientId={props.clientId} />

            </Layout>
      </>)
}

export default MyApp;

MyApp.getInitialProps  = async (context) => {

      const clientId = context.ctx.req.headers.client ?? "default";
      return {
        props: {
            clientId: clientId
        }
      };
    };
