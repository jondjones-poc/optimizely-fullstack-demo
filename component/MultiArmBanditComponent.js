import React from 'react'

const sectionStyle = (client, imageId) => (
{
  width: '100%',
  backgroundImage: `url(images/${client}${imageId}.png)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '45vh'
});

const MultiArmBanditComponent = ({...props}) => {

    const { userId, postId, optimizelyClient } = props;
    console.log("MAB", props);

    const bannerClicked = () => {
        optimizelyClient.track('banner_click', userId, {variation: postId});
        console.log(`Banner ${variationId} clicked`)
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

              <div id="multi-arm-bandit" style={sectionStyle(process.env.NEXT_PUBLIC_CLIENT, postId)} onClick={bannerClicked}>

              </div>
        </div>
    )
}

export default MultiArmBanditComponent