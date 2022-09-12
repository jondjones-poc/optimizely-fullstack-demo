import { useEffect, useState } from "react";
import { fetchContentfulEntry } from '../utils/contentfulConnector';

const VariationContainerRenderer = ({...props}) => {

    let [ variationItem, setVariationContent ] = useState('');

    const { item, variationId, userId, optimizelyClient } = props;
    const { content } = item;

    const entityId = content?.fields?.meta[variationId];

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchContentfulEntry(entityId);
            setVariationContent(result);
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
                    {variationItem.title}
                </h2>
            </header>

            <a href="#" className="image featured">
                <img src={variationItem?.heroImage?.fields.file.url} alt={item.slug} />
            </a>

            <div className="header" dangerouslySetInnerHTML={{ __html: variationItem.content }} />

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