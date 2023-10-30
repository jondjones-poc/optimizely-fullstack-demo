import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,

})

export async function fetchContentfulEntries() {

    const entries = await client.getEntries({
        content_type: "blogPost"
    });

    console.log('fetchContentfulEntries', entries);

    if (entries.items) {
        return {
            items: entries.items
        }
    }
}

export async function fetchContentfulEntry(id) {

    try {
        const entry = await client.getEntry(id);
        const rawRichTextField = entry.fields.main;
        const title = entry.fields.title;
        const heroImage = entry.fields.heroImage;
        const htmlContent = documentToHtmlString(rawRichTextField);

        return {
            content: htmlContent,
            title: title,
            heroImage: heroImage
        }
      }
      catch(err) {
        console.log('fetchContentfulEntry error', id, err);
      }
}
