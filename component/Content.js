import { useEffect } from "react";
import { fetchEntry } from '../utils/contentfulConnector1';

const Content = ({...props}) => {

    const { content, variationToUse } = props;

    const entityId = content?.fields?.meta[variationToUse];
    console.log('**', entityId, variationToUse);

    useEffect(() => {
        console.log('entries');
        const fetchData = async () => {
            const entries = await fetchEntry(entityId);
            console.log('entries', entries);
          }
          fetchData().catch(console.error);

    }, [entityId]);

    return (
        <div className="header" >

            CONTENT

        </div>
    )
}

export default Content