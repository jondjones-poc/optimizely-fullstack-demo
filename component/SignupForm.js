import React from 'react'
import { updateOdpProfileData, getOdpProfileData } from "../utils/odpConnector";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import styles from '../styles/SignupForm.module.css';
import InputFields from './InputFields'

const fetchOdpData = async (email) => {
  return await getOdpProfileData(email);
};

async function submitForm(event, router) {

  event.preventDefault();

  const email = event?.target?.username?.value;
  const location = event?.target?.location?.value;

  if (email) {
      const response = await updateOdpProfileData(email, location);
      console.log('submitForm', response, email);

      const profileData = await fetchOdpData(email).catch(console.error);
      const requestedSalesPack = profileData?.requested_sales_pack;
      const state = profileData?.state;

      if (state) {
        Cookies.set('state', state);
      }
      if (requestedSalesPack) {
        Cookies.set('requestedSalesPack', true);
      }

      Cookies.set('email', email);

      router.reload(window.location.pathname)
  }

  return;
}

const SignupForm = ({email, state}) => {

  const router = useRouter();

  return (
    <div className={`container ${styles.signUpContainer}`}>
      <div className="row" >
        <div id="content" className={`col-7 col-12-medium ${styles.reset}`}>
              <div className={`${styles.formContainer}`}>
                  <div className={`${styles.textContainer}`}>
                      Subscribe or Enquire Now!
                  </div>
              </div>
          </div>
          <div id="content" className={`col-5 col-12-medium ${styles.blueBackground}`}>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <h1 className={`${styles.formTitle}`}>
                      Register For Event
                  </h1>
                  <form className={styles.formContainer} onSubmit={(e) => submitForm(e, router)}>

                    <InputFields componentId="username" placeholder="Add email" defaultValue={email} display={true} />

                    <button type="submit" className={`${styles.signupBtn}`}>
                      Sign Up
                    </button>

                    <div className={`${styles.contentArea}`}>
                      Optimizely will store and process your personal data as described in our Privacy Policy. You can opt out at any time.
                    </div>

                  </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignupForm;