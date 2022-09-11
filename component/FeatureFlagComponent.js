import React from 'react'

const featureFlagStyle = {
    width: '100%',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '0',
    paddingBottom:'20%',
    backgroundSize: '100%'
}

const imageStyle = {
    width: '100%'
};

const FeatureFlagComponent = ({...props}) => {

    const { userId, optimizelyClient, clientId } = props;

    const addEvent = () => {
        optimizelyClient?.track('button_click', userId);
    }

    return (
        <div className="container" id="feature-flag" onClick={featureFlagStyle} style={imageStyle}>
            <img src={`images/${clientId}/feature.png`} style={imageStyle} alt="feature-flag" />
        </div>
    )
}

export default FeatureFlagComponent