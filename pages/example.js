import { useEffect, useState } from "react";
import { createInstance } from "@optimizely/optimizely-sdk";

export default function Example() {

  let [ isFeatureEnabled, renderIsFeatureEnabled ] = useState(false);

  const optimizelyClient = createInstance({
    sdkKey: 'CPCdyJVM8Xe4sBDNjot53'
  });

  let optimizelyUserContext;

  optimizelyClient.onReady().then(() => {
    optimizelyUserContext = optimizelyClient.createUserContext(
      "user-id"
    );
  });

  useEffect(() => {

    optimizelyClient.onReady().then(() => {
      const featureFlag = optimizelyUserContext.decide('');
      renderIsFeatureEnabled(featureFlag.enabled);
    });
  }, []);

  return (
    <>
     {isFeatureEnabled && <div>On</div>}
    </>
  )
}