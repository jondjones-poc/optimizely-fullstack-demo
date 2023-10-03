import { v4 as uuidv4 } from 'uuid';

export async function getDataFile(sdkKey = process.env.NEXT_PUBLIC_SDK_KEY) {

  console.log(sdkKey)
    const dataFileUrl = `https://cdn.optimizely.com/datafiles/CPCdyJVM8Xe4sBDNjot53.json`;

    const response = await fetch(dataFileUrl);
    console.log(response);
    const dataFile = await response.json();



    return dataFile;
}

export async function getFeatureFlagStatus(optimizelyClient, userId, attributes, flagName) {
  let flagData;

  await optimizelyClient.onReady().then(() => {
    const optimizelyUserContext = optimizelyClient.createUserContext(
          userId,
          attributes
    );

    const decision  = optimizelyUserContext.decide(flagName);

    flagData = decision;
    console.log(`${flagName} feature - decision`, decision);
  })

  return flagData;

};

  // Got user Id either via query-string, or, create a random one
export function getUserId(router) {

    const { id } = router.query
    const userId = id || uuidv4();
    console.log(`userId`, userId);

    return userId;
}
