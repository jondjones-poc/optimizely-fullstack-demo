import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export async function fetchEntries() {

    const entries = await client.getEntries({
        content_type: "blogPost"
    });

    if (entries.items)
        return {
            items: entries.items
        }
}

export async function fetchEntry(id) {

    const entry = await client.getEntry(id);
    const rawRichTextField = entry.fields.main;
    const htmlContent = documentToHtmlString(rawRichTextField);

    return {
        htmlContent: htmlContent
    }
}
