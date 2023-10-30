import { useEffect, useState } from "react";
import { fetchContentfulEntry } from '../utils/contentfulConnector';

const VariationContainerRenderer = ({...props}) => {

    let [ contentFieldData, setContentFieldData ] = useState('');

    console.log('VariationContainerRenderer props', props)

    const { item, variationId, userId, optimizelyClient } = props;
    const { title, content } = item;

    // This is the Contentful ID of the content property we want to render
    if (!variationId) {
        console.log('MISSING VARIATION ID');
    }

    const entityId = content?.fields?.meta[variationId];
    if (!entityId) {
        console.log('MISSING EVENT ID');
    }

    useEffect(() => {
        const fetchData = async () => {

            const contentFieldData = await fetchContentfulEntry(entityId);
            console.log('Contentful content prop data', contentFieldData);

            setContentFieldData(contentFieldData);
          }
          fetchData().catch(console.error);
    }, [entityId]);

    const buttonClicked = (optimizelyClient, userId, entityId) => {
        optimizelyClient?.track('blog_post_click', userId, {variation: entityId});
        console.log(`Blog post ${entityId} clicked`)
    }

    return (
        <article className="box post">
            <header>
                <h2>
                    {title}
                </h2>
            </header>

            <a href="#" className="image featured">
                <img src={contentFieldData?.heroImage?.fields.file.url} alt={item.slug} />
            </a>

            <div className="header" dangerouslySetInnerHTML={{ __html: contentFieldData?.content }} />

            <ul className="actions" >
                <li>
                    <div className="button icon solid fa-file" onClick={() => buttonClicked(optimizelyClient, userId, entityId)}>
                        Continue Reading...
                    </div>
                </li>
            </ul>
        </article>
    )
}

export default VariationContainerRenderer;