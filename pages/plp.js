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
  const [ categoryFilterVersion, setCategoryFilterVersion ] = useState();
  const [ sizeFilterVersion, setSizeFilterVersion ] = useState();

  const optimizelyClient = createInstance({
    datafile: datafile,
  });

  const router = useRouter()
  const { segment = '' } = router.query
  const userId = getUserId(router);

  console.log('Segments', segment)

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

  const handleClick = (e) => {
      const url = e.target["src"].toString();

      if(url.includes('filter-size-2') && !url.includes('filter-size-2-a')) {
        e.target["src"] = 'images/filter-size-2-a.png';
      } else if (url.includes('filter-size-2') && url.includes('filter-size-2-a')){
        e.target["src"] = 'images/filter-size-2.png';
      }
  };

  return (
    <>
      <DiscountBanner discount={discountAmount}
                      componentMessage={componentMessage} />

      <section id="feature" style={featureStyle}>
        <div className="container">
						<div className="row">
              <div id="sidebar" className="col-3 col-12-medium">

                <div>
                  <img src={`images/filter-cat-${categoryFilterVersion}.png`} alt="Category Filter" style={imageStyle} />
							  </div>
                <div>
                  <img src={`images/filter-size-${sizeFilterVersion}.png`} alt="Size Filter" style={imageStyle} onClick={(e) => handleClick(e)} />
							  </div>
                <div>
                  <div id="header-sidebar">
                    Segments
                  </div>
                  <Link href="/plp?segment=vip">
                    <a>
                      <p className="tag">VIP</p>
                    </a>
                  </Link>
                  <Link href="/plp?segment=new">
                    <a>
                      <p className="tag">NEW</p>
                    </a>
                  </Link>
                  <Link href="/plp?segment=premier">
                    <a>
                    <p className="tag">PREMIER</p>
                    </a>
                  </Link>
                  <div id="header-sidebar">
                    Users
                   </div>
                  <Link href="/plp?id=1">
                    <a>
                      <p className="tag">User One</p>
                    </a>
                  </Link>
                  <Link href="/plp?id=2">
                    <a>
                      <p className="tag">User Two</p>
                    </a>
                  </Link>
                  <Link href="/plp?id=3">
                    <a>
                    <p className="tag">User Three</p>
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