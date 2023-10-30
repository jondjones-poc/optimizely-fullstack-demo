import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { getOptimizelyProjectsDataFile, getUserId } from "../utils/optimizelyConnector";
import { createInstance } from "@optimizely/optimizely-sdk";
import BannerForPlpFilter from "../component/BannerForPlpFilter";
import BannerForPlpSegments from "../component/BannerForPlpSegments";

const imageStyle = {
  width: '100%'
};

const featureStyle = {
  paddingBottom: '5rem'
};

export default function Landing({...props}) {

  const { datafile, clientId } = props;

  const [ componentMessage, setComponentMessage ] = useState();
  const [ discountAmount, setDiscountAmount ] = useState();
  const [ categoryFilterVersion, setCategoryFilterVersion ] = useState(0);
  const [ sizeFilterVersion, setSizeFilterVersion ] = useState(0);

  const optimizelyClient = createInstance({
    datafile: datafile,
  });

  const router = useRouter()
  const { segment = '', utc_campaign = '', algorithm = '' } = router.query
  console.log('Segments', segment)
  console.log('UTC campaign', utc_campaign)

  // Demo of setting IDS to variations, useful for integration testing
  const userId = algorithm || getUserId(router);
  let optimizelyUserContext;

  optimizelyClient.onReady().then(() => {
    optimizelyUserContext = optimizelyClient.createUserContext(
      userId,

      // Passing attributes for personalization
      {
        algorithm: algorithm,
        segment: segment,
        user: segment,
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

        const filtertestDecision  = optimizelyUserContext.decide('plp_-_filter_tests');
        console.log('plp_-_filter_tests', filtertestDecision);

        const categoryFilterVersion = filtertestDecision.variables.category_filter_version;
        const sizeFilterVersion = filtertestDecision.variables.size_filter_version;

        if (discountAmount && discountAmount >= 0) {
          setDiscountAmount(discountAmount);
        }

        setCategoryFilterVersion(categoryFilterVersion);
        setSizeFilterVersion(sizeFilterVersion);
        setComponentMessage(componentMessage);
      });
  }, [optimizelyUserContext, optimizelyClient]);

  return (
    <>


      <section id="feature" style={featureStyle}>
        <div className="container">

            <BannerForPlpFilter />

            <BannerForPlpSegments discount={discountAmount} componentMessage={componentMessage} />

						<div className="row">
              <div id="sidebar" className="col-3 col-12-medium">

                <div>
                  <img src={`images/filter-cat-${categoryFilterVersion}.png`} alt="Category Filter" style={imageStyle} />
							  </div>
                <div>
                  <img src={`images/filter-size-${sizeFilterVersion}.png`} alt="Size Filter" style={imageStyle} />
							  </div>
              </div>
              <div id="content" className="col-9 col-12-medium imp-medium">
                <div className="row">
                  <div className="col-4 col-6-medium col-12-small">
                      <section>
                        <a href="#" className="image featured">
                          <img src={`images/${clientId}/item.png`} alt="Item 1" />
                        </a>
                        <p><img src={`images/landing1.png`} alt="Item 1" /></p>
                      </section>
                  </div>
                  <div className="col-4 col-6-medium col-12-small">
                      <section>
                        <a href="#" className="image featured">
                          <img src={`images/${clientId}/item.png`} alt="Item 2" />
                        </a>
                        <p><img src={`images/landing2.png`} alt="Item 2" /></p>
                      </section>
                  </div>
                  <div className="col-4 col-6-medium col-12-small">
                      <section>
                        <a href="#" className="image featured">
                          <img src={`images/${clientId}/item.png`} alt="Item 3" />
                        </a>
                        <p><img src={`images/landing3.png`} alt="Item 3" /></p>
                      </section>
                  </div>
                </div>
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