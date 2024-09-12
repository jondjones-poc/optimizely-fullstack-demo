import { v4 as uuidv4 } from 'uuid';
import file from '../data/datafile.json';

export async function getOptimizelyProjectsDataFile() {


    if (process.env.NEXT_PUBLIC_USE_LOCAL_DATAFILE === true) {
      console.log('Using Local Data File');
      return file;
    }

    const dataFileUrl = `https://cdn.optimizely.com/datafiles/${process.env.NEXT_PUBLIC_OPTIMIZELY_SDK_KEY}.json`;
    const response = await fetch(dataFileUrl);
    const dataFile = await response.json();

    return dataFile;
}

export async function getContentfulProjectsDataFile() {

  const dataFileUrl = `https://cdn.optimizely.com/datafiles/${process.env.NEXT_PUBLIC_OPTIMIZELY_SDK_KEY_CONTENTFUL_PROJECT}.json`;

  const response = await fetch(dataFileUrl);
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
