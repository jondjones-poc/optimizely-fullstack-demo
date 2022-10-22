import { useEffect, useState } from "react";
import { createInstance } from "@optimizely/optimizely-sdk";
import { useRouter } from 'next/router'

import { getDataFile, getFeatureFlagStatus } from "../utils/fullstackConnector";
import { updateOdpProfileData, getOdpProfileData } from "../utils/odpConnector";

import MapContainer from "../component/MapContainer";

import styles from '../styles/signup.module.css';
import Cookies from 'js-cookie';

const userId = 'random';

const fetchOdpData = async (email) => {
    const profileData = await getOdpProfileData(email);
    const requestedSalesPack = profileData?.requested_sales_pack;

    console.log('requestedSalesPack', profileData, requestedSalesPack);

    return profileData;
 };

async function submitForm(event, setEmail, router) {

    event.preventDefault();

    const email = event?.target?.username?.value;
    console.log('Submitted email', email);

    if (email) {
        const response = await updateOdpProfileData(email);
        console.log('submitForm', response);

        const profileData = await fetchOdpData(email).catch(console.error);

        Cookies.set('state', profileData.state);
        Cookies.set('email', email);
        setEmail(email);

        router.reload(window.location.pathname)
    }

    return;
}

const Signup = (props) => {

    const { datafile, mapCords, address } = props;

    const [ displayPersonalizedBanner, setDisplayPersonalizedBanner ] = useState(false);
    const [ email, setEmail ] = useState(Cookies.get('email'));
    const router = useRouter()

    const optimizelyClient = createInstance({datafile: datafile});

    useEffect(() => {

         const fetchData = async () => {

            const decision = await getFeatureFlagStatus(
                optimizelyClient,
                userId, {
                    hasRequestedSalesPack: true
                },
                'odp');


            console.log("ddd", decision)
            setDisplayPersonalizedBanner(true);
         };

         if (email) {
            fetchData(email);
         }

    }, [email]);

    return (
        <>
            {displayPersonalizedBanner ?
                <MapContainer mapCords={mapCords} address={address} />
                : null
            }

            <section id="main">
                <div className={`container ${styles.signUpContainer}`}>
                    <div className="row">
                        <div className="col-6 col-12-medium imp-medium">
                            Welcome text
                        </div>
                        <div id="content" className="col-6 col-12-medium imp-medium">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <h1>
                                Register For Event
                            </h1>
                            <form className={styles.signupStyle} onSubmit={(e) => submitForm(e, setEmail, router)}>
                                <div className={`mb-3 ${styles.signupStyle}`} >
                                    <input
                                        type="text"
                                        id="username"
                                        className={styles.formControl}
                                        placeholder="Add email"
                                    />
                                </div>
                                <div className={`d-grid ${styles.signupBtn}`}>
                                    <button type="submit" className="btn" >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const datafile = await getDataFile();
    return {
        props: {
            address: 'Missoula, MT, US',
            mapCords: { lat: 46.8721, lng: -113.994 },
            datafile: datafile,
        }
    }
}

export default Signup;
