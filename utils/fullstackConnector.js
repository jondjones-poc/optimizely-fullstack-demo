import { v4 as uuidv4 } from 'uuid';

export async function getDataFile(sdkKey = process.env.NEXT_PUBLIC_SDK_KEY) {

    const dataFileUrl = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;

    const response = await fetch(dataFileUrl);
    const dataFile = await response.json();

    return dataFile;
}

  // Got user Id either via query-string, or, create a random one
export function getUserId(router) {

    const { id } = router.query
    const userId = id || uuidv4();
    console.log(`userId`, userId);

    return userId;
}

