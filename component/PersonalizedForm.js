import React from 'react'
import { updateOdpProfileData, getOdpProfileData } from "../utils/odpConnector";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import styles from '../styles/PersonalizedForm.module.css';
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

function resetCookies(router) {
  Cookies.remove('state');
  Cookies.remove('email');

  router.reload(window.location.pathname)
}

const PersonalizedForm = ({email, state}) => {

  const router = useRouter();
  const displayLocation = (state == null || state?.length === 0) &&
                          (email != null || email?.length > 0)

  return (
    <>
      <form className={styles.formContainer} onSubmit={(e) => submitForm(e, router)}>

          <InputFields componentId="username" placeholder="Add email" defaultValue={email} display={true} />

          <InputFields componentId="location" placeholder="Add location" display={displayLocation} />

          <div className={`${styles.contentArea}`}>
            Optimizely will store and process your personal data as described in our Privacy Policy. You can opt out at any time.
          </div>

          <button type="submit" className={`${styles.signupBtn}`}>
            Sign Up
          </button>

      </form>


      <button onClick={() => resetCookies(router)} >
        Reset cookies
      </button>
    </>
  )
}

export default PersonalizedForm;