import React from 'react'

const featureFlagStyle = {
    width: '100%',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '0',
    paddingBottom:'30%',
    backgroundSize: '100%'
}

const FeatureFlagComponent = ({...props}) => {

    const { userId, optimizelyClient, clientId, isFeatureEnabled } = props;

    const addEvent = (optimizelyClient, userId) => {
        optimizelyClient?.track('button_click', userId);
        console.log('feature_flag_component_click')
    }

    return (
        <section id="features">
            <div className="container" id="feature-container">

            {isFeatureEnabled &&
                <div className="container"
                     id="feature-flag"
                     onClick={() => addEvent(optimizelyClient, userId)} style={featureFlagStyle}>


                    <img src={`images/${clientId}/1.png`}
                         style={{width: '100%'}}
                         alt="feature-flag" />
                </div>
            }


            </div>
      </section>
    )
}

export default FeatureFlagComponent