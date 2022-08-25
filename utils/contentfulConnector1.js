


export async function fetchEntry(id) {

    const client = require('contentful').createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
    const entry = await client.getEntry(id);

    return {
        entry: entry
    }
}
