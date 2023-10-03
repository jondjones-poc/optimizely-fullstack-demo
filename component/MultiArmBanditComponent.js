import React from 'react'
import Link from "next/link";

const MultiArmBanditComponent = ({...props}) => {

    const { userId, postId, optimizelyClient, clientId } = props;

    const bannerClicked = () => {
        optimizelyClient?.track('banner_click', userId, {variation: postId});
        console.log(`Banner ${postId} clicked`)
    }

    return (
        <div className="container">
              <div id="multi-arm-bandit" style={{width: '100%'}}>

              </div>
        </div>
    )
}

export default MultiArmBanditComponent