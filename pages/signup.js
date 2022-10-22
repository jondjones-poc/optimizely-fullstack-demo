import { useEffect, useState } from "react";
import { createInstance } from "@optimizely/optimizely-sdk";

import { getDataFile, getFeatureFlagStatus } from "../utils/fullstackConnector";

import MapContainer from "../component/MapContainer";
import PersonalizedForm from "../component/PersonalizedForm";

import styles from '../styles/signup.module.css';
import Cookies from 'js-cookie';

const userId = 'random';

const Signup = (props) => {

    const { datafile, mapCords, address } = props;

    const [ featureDecisionData, setFeatureDecisionData ] = useState({});
    const [ displayMap, setDisplayMap ] = useState(false);

    const email = Cookies.get('email');
    const state = Cookies.get('state') ?? null;
    const requestedSalesPack = Cookies.get('requestedSalesPack') ?? false;


    useEffect(() => {

         const fetchData = async () => {

            const optimizelyClient = createInstance({datafile: datafile});
            const featureDecisionData = await getFeatureFlagStatus(
                optimizelyClient,
                userId, {
                    hasRequestedSalesPack: requestedSalesPack,
                    location: state
                },
                'odp');

            setFeatureDecisionData(featureDecisionData);
            setDisplayMap(featureDecisionData?.enabled && (mapCords.lat !== null || mapCords.lng !== null))
         };

         if (email) {
            fetchData(email);
         }

    }, [email, state, requestedSalesPack, mapCords]);

    return (

        <>
            {displayMap ?
                <MapContainer mapCords={mapCords} address={address} featureDecisionData={featureDecisionData} />
                : null
            }
            <section id="main" className={`${styles.mainContainer}`}>
                <div className={`container ${styles.signUpContainer}`}>
                    <div className="row">
                        <div id="content" className={`col-8 col-12-medium ${styles.reset}`}>
                            <div className={`${styles.formContainer}`}>
                                <div className={`${styles.textContainer}`}>
                                    See how we can help you
                                    increase your ROI
                                </div>
                            </div>
                        </div>
                        <div id="content" className={`col-4 col-12-medium ${styles.blueBackground}`}>
                            <div className={`${styles.formContainer}`}>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <h1 className={`${styles.formTitle}`}>
                                        Register For Event
                                    </h1>
                                    <PersonalizedForm email={email} state={state} />
                                </div>
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
            address: '',
            mapCords: { lat: null, lng: null },
            datafile: datafile,
        }
    }
}

export default Signup;
