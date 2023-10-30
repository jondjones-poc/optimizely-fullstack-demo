import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { createInstance } from "@optimizely/optimizely-sdk";
import { getOptimizelyProjectsDataFile, getUserId, getContentfulProjectsDataFile } from "../utils/optimizelyConnector";
import { fetchContentfulEntries } from '../utils/contentfulConnector';

import ContentRecommendations from '../component/ContentRecommendations'
import VariationContainerRenderer from '../component/VariationContainerRenderer';

const News = ({...props}) => {

    const { fields, optimizelyDatafile, contentfulDatafile, clientId } = props;

    let [ variationId, SetVariationId ] = useState('');
    let [ contentRecsKey, setContentRecsKey ] = useState('');

    const optimizelyClient = createInstance({datafile: optimizelyDatafile});
    const ContentfulProjectOptimizelyClient = createInstance({datafile: contentfulDatafile});

    let optimizelyUserContext;
    optimizelyClient.onReady().then(() => {
      optimizelyUserContext = optimizelyClient.createUserContext(
        userId
      );
    });

    const router = useRouter();
    const userId = getUserId(router);

    useEffect(() => {

        ContentfulProjectOptimizelyClient.onReady().then(() => {

            // Separate datafile required to access v1 contentful project
            const usersVariationId = ContentfulProjectOptimizelyClient.activate('a_b', userId);
            console.log('Users Variation Id', usersVariationId);
            SetVariationId(usersVariationId)

            // This shows how to pass app settings from FX into your code
            const recommendations = optimizelyUserContext.decide('recommendations');
            console.log('recommendations', recommendations);
            setContentRecsKey(recommendations?.variables.contentRecsKey);
        });
    }, [optimizelyUserContext, ContentfulProjectOptimizelyClient, userId]);

    return (
        <>
            <section id="main">
                <div className="container">
                    <div className="row">
                        <div className="col-12">

                            <div id="header-large">
                                News and Stories
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id="content" className="col-8 col-12-medium imp-medium">

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


export async function getServerSideProps() {

    const optimizelyDatafile = await getOptimizelyProjectsDataFile();
    const contentfulDatafile = await getContentfulProjectsDataFile();

    const contentfulResponse = await fetchContentfulEntries();
    let data = contentfulResponse.items.filter(() => function() {
        return item.sys.contentType.sys.id === 'page'
    });

    const fields = data.map((item) => item.fields );

    return {
        props: {
            fields: fields,
            data: data,
            optimizelyDatafile: optimizelyDatafile,
            contentfulDatafile: contentfulDatafile
        }
    }

}

export default News;