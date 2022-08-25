import React from 'react'

const sectionStyle = {
    width: '100%',
    backgroundImage: `url(images/${process.env.NEXT_PUBLIC_CLIENT}feature.png)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '425px'
  };

const FeatureFlagComponent = ({...props}) => {

    const { userId, optimizelyClient } = props;

    const addEvent = () => {
        optimizelyClient?.track('button_click', userId);
    }

    return (
        <div className="container">
            <div id="feature-flag" onClick={addEvent} style={ sectionStyle }>
            </div>
        </div>
    )
}

export default FeatureFlagComponent