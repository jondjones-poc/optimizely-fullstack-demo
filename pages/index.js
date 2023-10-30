import { useEffect, useState } from "react";
import { createInstance } from "@optimizely/optimizely-sdk";
import { useRouter } from 'next/router'
import { getOptimizelyProjectsDataFile, getUserId } from "../utils/optimizelyConnector";

import Banner from "../component/Banner";
import FeatureFlagComponent from "../component/FeatureFlagComponent";

export default function Home({...props}) {

  const { datafile, clientId } = props;

  let [ isFeatureEnabled, renderIsFeatureEnabled ] = useState(false);
  let [ backgroundColor, setBackgroundColor ] = useState('');
  let [ componentTitle, setComponentTitle ] = useState('');
  let [ bannerText, setBannerText ] = useState('');
  let [ buttonUrl, setButtonUrl ] = useState('');

  const optimizelyClient = createInstance({
    datafile: datafile,
  });

  const router = useRouter()
  const userId = getUserId(router);

  let optimizelyUserContext;

  optimizelyClient.onReady().then(() => {
    optimizelyUserContext = optimizelyClient.createUserContext(
      userId,
      {
        location: "london",
        deviceType: "ios"
      }
    );
  });

  useEffect(() => {

    optimizelyClient.onReady().then(() => {

      // Feature flag code
      const featureFlag = optimizelyUserContext.decide('feature_flag');
      console.log('featureFlag', featureFlag);
      renderIsFeatureEnabled(featureFlag.enabled);

      // AB Testing Code
      const abTestFlag = optimizelyUserContext.decide('ab_test');
      console.log('abTest', abTestFlag);

      setBackgroundColor(abTestFlag.variables.backgroundcolour);
      setComponentTitle(abTestFlag.variables.component_title);
      setBannerText(abTestFlag.variables.button_text);
      setButtonUrl(abTestFlag.variables.button_url);
    });
  }, []);

  return (
    <>
      <FeatureFlagComponent userId={userId}
                            optimizelyClient={optimizelyClient}
                            clientId={clientId}
                            isFeatureEnabled={isFeatureEnabled} />

      <section id="main">

        {componentTitle &&
          <Banner key={`${componentTitle}${backgroundColor}`}
                        userId={userId}
                        optimizelyClient={optimizelyClient}
                        backgroundColor={backgroundColor}
                        componentTitle={componentTitle}
                        bannerText={bannerText}
                        buttonUrl={buttonUrl} />
        }

      </section>
    </>
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