import React from 'react'
import {
    createInstance
  } from "@optimizely/optimizely-sdk";

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;
const optimizelyClient = createInstance({
    sdkKey: sdkKey,

});

const ComponentA = ({...props}) => {

    const addEvent = () => {
        optimizelyClient.track('button_click', props.userId);
    }

    return (
        <div className="container" id="component-a">
            <div className="row aln-center" id="component-a-row" onClick={addEvent}>
                <img src="images/body.png" alt="" />
            </div>
        </div>
    )
}

export default ComponentA