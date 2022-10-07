import { getDataFile } from "../utils/fullstackConnector";
import React, { useEffect, useState } from "react";
import { updateOdpProfileData, getOdpProfileData } from "../utils/odpConnector";
import { createInstance } from "@optimizely/optimizely-sdk";

import PersonalizedBanner from "../component/PersonalizedBanner";

import styles from './signup.module.css';
import Cookies from 'js-cookie';

const userId = 'random';

async function callOdp(event, setEmail) {

    event.preventDefault();

    const email = event?.target?.username?.value;
    console.log('Submitted email', email);

    if (email) {
        const profileData = await updateOdpProfileData(email);
        console.log(profileData);

        Cookies.set('email', email);
        setEmail(email);
    }

    return;
}

const Signup = (props) => {

    const { datafile } = props;

    const [ displayPersonalizedBanner, setDisplayPersonalizedBanner ] = useState(false);
    const [ email, setEmail ] = useState(Cookies.get('email'));
    const [ profileData, setProfileData ] = useState({});

    const optimizelyClient = createInstance({datafile: datafile});

    useEffect(() => {

        const fetchOdpData = async (email) => {
            const profileData = await getOdpProfileData(email);
            console.log('getOdpProfileData', profileData);

            const requestedSalesPack = profileData?.requested_sales_pack;
            console.log('requestedSalesPack', requestedSalesPack);

            return profileData;
         };

         const fetchData = async (email) => {

            const profileData = await fetchOdpData(email).catch(console.error);
            setProfileData(profileData);

            optimizelyClient.onReady().then(() => {

                const optimizelyUserContext = optimizelyClient.createUserContext(
                      userId,
                      {
                        hasRequestedSalesPack: true
                      }
                );

                const decision  = optimizelyUserContext.decide('odp');
                console.log('odp feature - decision', decision.enabled);

                setDisplayPersonalizedBanner(decision.enabled);
            });
         };
         if (email) {
            fetchData(email);
         }

    }, [email]);

    useEffect(() => {

    }, [email]);

    return (
        <>
            {displayPersonalizedBanner ?
                <PersonalizedBanner profileData={profileData} />
                : null
            }
            <section id="main">
                <div className={`container ${styles.signUpContainer}`}>
                    <div className="row">
                        <div className="col-6 col-12-medium imp-medium">
                            Welcome text.  Clear cookie.
                        </div>
                        <div id="content" className="col-6 col-12-medium imp-medium">
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <h1>
                                Register For Event
                            </h1>
                            <form className={styles.signupStyle} onSubmit={(e) => callOdp(e, setEmail)}>
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
            datafile: datafile
        }
    }
}

export default Signup;