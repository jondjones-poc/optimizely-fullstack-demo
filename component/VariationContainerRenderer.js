import { useEffect, useState } from "react";
import { fetchEntry } from '../utils/contentfulConnector';

const VariationContainerRenderer = ({...props}) => {

    let [ htmlContent, setHtmlContent ] = useState('');

    const { item, variationToUse } = props;
    const { title, content, heroImage } = item;

    const entityId = content?.fields?.meta[variationToUse];

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchEntry(entityId);
            setHtmlContent(result.htmlContent);
          }
          fetchData().catch(console.error);
    }, [entityId]);

    const buttonClicked = (optimizelyClient) => {
        optimizelyClient?.track('blog_post_click', userId, {variation: entityId});
        console.log(`Blog post button  ${postId} clicked`)
    }

    return (
        <article className="box post">
            <header>
                <h2>
                    {title}
                </h2>
            </header>

            <a href="#" className="image featured">
                <img src={heroImage?.fields.file.url} alt={item.slug} />
            </a>

            <div className="header" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            <ul className="actions" >
                <li>
                    <div className="button icon solid fa-file" onClick={() => buttonClicked(optimizelyClient)}>
                        Continue Reading...
                    </div>
                </li>
            </ul>
        </article>
    )
}

export default VariationContainerRenderer;