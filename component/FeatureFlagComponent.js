import React from 'react'

const featureFlagStyle = {
    width: '100%',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    paddingBottom:'1rem',
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

            {isFeatureEnabled &&
                <div
                     id="feature-flag"
                     onClick={() => addEvent(optimizelyClient, userId)} style={featureFlagStyle}>

                    <img src={`images/${clientId}/feature.png`}
                         style={{width: '100%'}}
                         alt="feature-flag" />
                </div>
            }
      </section>
    )
}

export default FeatureFlagComponent





