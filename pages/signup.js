import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { getOptimizelyProjectsDataFile, getUserId } from "../utils/optimizelyConnector";
import { createInstance } from "@optimizely/optimizely-sdk";
import SegmentationQueryStringBanner from "../component/SegmentationQueryStringBanner";
import SegmentationUrlFilter from "../component/SegmentationUrlFilter";
import Image from 'next/image';

const featureStyle = {
  paddingBottom: '5rem'
};

const bannerStyle = {
  textAlign: 'center'
};

export default function ProductListingPage({...props}) {

  const { datafile, clientId } = props;

  const [ componentMessage, setComponentMessage ] = useState();
  const [ discountAmount, setDiscountAmount ] = useState();
  const [ deviceType, setDeviceType ] = useState();

  const optimizelyClient = createInstance({
    datafile: datafile,
  });

  const router = useRouter()
  const { device_type = '', utc_campaign = '', algorithm = '' } = router.query
  console.log('Device_type', device_type)
  console.log('UTC Campaign', utc_campaign)
  console.log('Algorithm', algorithm)

  // Demo of setting IDS to variations, useful for integration testing
  const userId = algorithm || getUserId(router);
  let optimizelyUserContext;

  optimizelyClient.onReady().then(() => {
    optimizelyUserContext = optimizelyClient.createUserContext(
      userId,
      // Passing attributes for personalization
      {
        devicetype: device_type,
        utc_campaign: utc_campaign
      }
    );
  });

  useEffect(() => {
      optimizelyClient.onReady().then(() => {

        const personalisationDecision  = optimizelyUserContext.decide('personalisation');
        console.log('personalisationDecision', personalisationDecision);

        const componentMessage = personalisationDecision.variables.component_message;
        const discountAmount = personalisationDecision.variables.discount_amount;

        setDiscountAmount(discountAmount);
        setComponentMessage(componentMessage);
      });
  }, [optimizelyUserContext, optimizelyClient]);

  return (
    <>

      <section id="feature" style={featureStyle}>
        <div className="container">

            <SegmentationUrlFilter />

						<div className="row">

              <div id="content" className="col-12 col-12-medium imp-medium">

                <SegmentationQueryStringBanner discount={discountAmount} componentMessage={componentMessage} />

              </div>
              <div id="content" className="col-12 col-12-medium imp-medium" style={bannerStyle}>

                <Image src={`/images/hero.png`}
                    width="1200"
                    height="400"
                    alt="feature-flag" />

              </div>

					</div>

					</div>
        </section>
    </>
  )
}

export async function getServerSideProps(context) {

  const datafile = await getOptimizelyProjectsDataFile();

  return {
    props: {
      datafile
    }
  }
}