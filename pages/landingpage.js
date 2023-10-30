import { useEffect} from "react";
import { useRouter } from 'next/router';

import {
  createInstance,
  OptimizelyProvider,
} from '@optimizely/react-sdk';

import { getOptimizelyProjectsDataFile, getUserId } from "../utils/optimizelyConnector";
import { getOdpProfileData } from "../utils/odpConnector";
import SubscribePage from "../component/SubscribePage"

import Cookies from 'js-cookie';

const fetchOdpData = async (email) => {
  return await getOdpProfileData(email);
};

const Landing = ({...props}) => {

    const { datafile, clientId } = props;

    const router = useRouter()
    const email = Cookies.get('email');
    const userId = Cookies.get('id') ?? getUserId(router);
    Cookies.set('id', userId);

    const requestedSalesPack = Cookies.get('requestedSalesPack') ?? false;

    const optimizelyClient = createInstance({
        datafile: datafile,
      });

    useEffect(() => {

        const fetchData = async () => {

            const profileData = await fetchOdpData(email).catch(console.error);
            const requestedSalesPack = profileData?.requested_sales_pack;

            console.log('requestedSalesPack', requestedSalesPack)
            console.log('email', profileData?.email);
         };

         if (email) {
            fetchData(email);
         }

    }, [email,  requestedSalesPack]);

    const user = {
        id: userId,
        attributes: {
            loggedin: email != null
        },
    };

    return (

        <OptimizelyProvider optimizely={optimizelyClient} user={user} >
            <SubscribePage user={user}/>
        </OptimizelyProvider>
    )
}

export async function getServerSideProps() {

    let datafile = await getOptimizelyProjectsDataFile();

    return {
      props: {
        datafile
      }
    }
  }

export default Landing;
