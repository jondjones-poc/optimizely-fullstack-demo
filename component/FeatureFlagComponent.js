import React from 'react'

const sectionStyle = {
    width: '100%',
    backgroundImage: `url(images/feature.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '50vh'
  };

const FeatureFlagComponent = ({...props}) => {

    const addEvent = () => {
        props.optimizelyClient.track('button_click', props.userId);
    }

    return (
        <div className="container" id="feature-flag">
            <div id="feature-flag" onClick={addEvent} style={ sectionStyle }>

            </div>
        </div>
    )
}

export default FeatureFlagComponent