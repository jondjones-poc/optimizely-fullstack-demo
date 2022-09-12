import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { getDataFile, getUserId } from "../utils/fullstackConnector";
import { createInstance } from "@optimizely/optimizely-sdk";

import DiscountBanner from "../component/DiscountBanner";

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

  const optimizelyClient = createInstance({
    datafile: datafile,
  });

  const router = useRouter()
  const { segment = '' } = router.query
  console.log('segment', segment)

  const userId = getUserId(router);

  let optimizelyUserContext;

  optimizelyClient.onReady().then(() => {
    optimizelyUserContext = optimizelyClient.createUserContext(
      userId,
      {
        segment: segment,
        user: segment
      }
    );
  });

  useEffect(() => {
      optimizelyClient.onReady().then(() => {

        const decision  = optimizelyUserContext.decide('personalisation');
        console.log('personalisation-flag', decision);

        const componentMessage = decision.variables.component_message;
        const discountAmount = decision.variables.discount_amount;

        if (discountAmount && discountAmount >= 0) {
          setDiscountAmount(discountAmount);
        }

        setComponentMessage(componentMessage);
      });
  }, [optimizelyUserContext, optimizelyClient]);

  console.log(discountAmount)
  return (
    <>
      <DiscountBanner discount={discountAmount}
                      componentMessage={componentMessage} />

      <section id="feature" style={featureStyle}>
        <div className="container">
						<div className="row">
              <div id="sidebar" className="col-3 col-12-medium">

                <div>
                  <img src="images/filter-1.png" alt="Filter 1" style={imageStyle} />
							  </div>
                <div>
                  <img src="images/filter-2.png" alt="Filter 2" style={imageStyle} />
							  </div>
                <div>
                  <Link href="/landing?segment=vip">
                    <a>
                      <img src="images/filter-3-1.png" alt="Filter 3" style={imageStyle} />
                    </a>
                  </Link>
                  <Link href="/landing?segment=new">
                    <a>
                    <img src="images/filter-3-2.png" alt="Filter 3" style={imageStyle} />
                    </a>
                  </Link>
                  <Link href="/landing?segment=premier">
                    <a>
                      <img src="images/filter-3-3.png" alt="Filter 3" style={imageStyle} />
                    </a>
                  </Link>

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

  const datafile = await getDataFile();

  return {
    props: {
      datafile
    }
  }
}