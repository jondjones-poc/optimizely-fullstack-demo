import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { createInstance } from "@optimizely/optimizely-sdk";
import { getDataFile, getUserId } from "../utils/fullstackConnector";
import { fetchContentfulEntries } from '../utils/contentfulConnector';

import ContentRecommendations from '../component/ContentRecommendations'
import VariationContainerRenderer from '../component/VariationContainerRenderer';

const News = (props) => {

    const { fields, datafile, contentfulDatafile } = props;

    let [ variationId, setVariationToUse ] = useState('');
    let [ contentRecsKey, setContentRecsKey ] = useState('');

    const optimizelyClient = createInstance({datafile: datafile});
    const optimizelyContentfulClient = createInstance({datafile: contentfulDatafile});

    let optimizelyUserContext;

    optimizelyClient.onReady().then(() => {
      optimizelyUserContext = optimizelyClient.createUserContext(
        userId
      );
    });

    const router = useRouter();
    const userId = getUserId(router);

    useEffect(() => {
        optimizelyClient.onReady().then(() => {
            const variationToUse = optimizelyContentfulClient.activate('a_b', userId);
            setVariationToUse(variationToUse);

            const recommendations = optimizelyUserContext.decide('recommendations');
            console.log('recommendations', recommendations);
            setContentRecsKey(recommendations?.variables.contentRecsKey);
        });
    }, [optimizelyUserContext, optimizelyContentfulClient, userId]);

    return (
        <>
            <section id="main">
                <div className="container">
                    <div className="row">
                        <div id="content" className="col-8 col-12-medium imp-medium">

                            <div id="header-large">
                                News and Stories
                            </div>

                            {fields.map((item, index) =>
                                <VariationContainerRenderer
                                    key={index}
                                    item={item}
                                    userId={userId}
                                    optimizelyClient={optimizelyClient}
                                    variationId={variationId} />
                            )}
                        </div>
                        <div id="sidebar" className="col-4 col-12-medium">
                            {contentRecsKey ?
                                <ContentRecommendations contentRecsKey={contentRecsKey} /> :
                                <img src={`images/sidebar.png`} alt="sidebar" style={{width: '100%'}} />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticProps() {

    const datafile = await getDataFile();
    const contentfulDatafile = await getDataFile(process.env.NEXT_PUBLIC_OPTIMIZELY_SDK_KEY_CONTENTFUL_PROJECT);

    const contentfulResponse = await fetchContentfulEntries();

    let data = contentfulResponse.items.filter(() => function() {
    return item.sys.contentType.sys.id === 'page'})
    const fields = data.map((item) => item.fields );

    return {
        props: {
            fields: fields,
            data: data,
            datafile: datafile,
            contentfulDatafile: contentfulDatafile
        }
    }

}

export default News;