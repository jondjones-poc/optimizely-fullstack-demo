import React from 'react'
import Link from "next/link";

const sectionStyle = {
  width: '100%'
};

const imageStyle = {
  width: '100%'
};

const MultiArmBanditComponent = ({...props}) => {

    const { userId, postId, optimizelyClient, clientId } = props;

    const bannerClicked = () => {
        optimizelyClient?.track('banner_click', userId, {variation: postId});
        console.log(`Banner ${postId} clicked`)
    }

    return (
        <div className="container">
              <header>
                <h2>
                  <strong>
                    {`Multi-arm Bandit Example: ${postId}`}
                  </strong>
                </h2>
              </header>

              <div id="multi-arm-bandit" style={sectionStyle}>
                <Link href="/">
                  <a onClick={() => bannerClicked(optimizelyClient)}>
                    <img src={`images/${clientId}/${postId}.png`} style={imageStyle} alt="multi-arm bandit" />
                  </a>
                </Link>{" "}
              </div>
        </div>
    )
}

export default MultiArmBanditComponent