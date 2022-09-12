import { useEffect, useState } from "react";
import { createInstance } from "@optimizely/optimizely-sdk";
import { useRouter } from 'next/router'
import { getDataFile, getUserId } from "../utils/fullstackConnector";

import ABComponent from "../component/ABComponent";
import FeatureFlagComponent from "../component/FeatureFlagComponent";
import MultiArmBanditComponent from "../component/MultiArmBanditComponent";

export default function Home({...props}) {

  const { datafile, clientId } = props;

  let [ isFeatureEnabled, renderIsFeatureEnabled ] = useState(false);
  let [ backgroundColor, setBackgroundColor ] = useState('');
  let [ componentTitle, setComponentTitle ] = useState('');
  let [ bannerText, setBannerText ] = useState('');
  let [ buttonUrl, setButtonUrl ] = useState('');
  let [ postData, setPostData ] = useState({});

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

      /// Multi-arm bandit code
      const apiDataJson = optimizelyClient.getFeatureVariable('multi-arm_bandit', 'api_data', userId);
      const apiUrl = apiDataJson?.url;

      const fetchData = async () => {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setPostData(json);
      }
      fetchData().catch(console.error);
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
          <ABComponent  key={`${componentTitle}${backgroundColor}`}
                        userId={userId}
                        optimizelyClient={optimizelyClient}
                        backgroundColor={backgroundColor}
                        componentTitle={componentTitle}
                        bannerText={bannerText}
                        buttonUrl={buttonUrl} />
        }

        <MultiArmBanditComponent  key={postData.id}
                                  userId={userId}
                                  optimizelyClient={optimizelyClient}
                                  clientId={clientId}
                                  postId={postData.id}
                                  title={postData.title} />
      </section>
    </>
  )
}

export async function getServerSideProps() {

  const datafile = await getDataFile();

  return {
    props: {
      datafile
    }
  }
}