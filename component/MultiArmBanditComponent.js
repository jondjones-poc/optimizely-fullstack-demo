import { useEffect, useState } from 'react'
import {
    OptimizelyExperiment,
    OptimizelyVariation,
    withOptimizely
  } from '@optimizely/react-sdk';

import Feature from "../component/Feature";

const MultiArmBanditComponent = ({...props}) => {

    let { optimizelyClient, userId } = props;
    let [ postData, setPostData ] = useState('');

    useEffect(() => {

        optimizelyClient.onReady().then(() => {

          var variationKey = optimizelyClient.activate('latestnews', userId);
          console.log('latestnews variation ID', variationKey);

          var variables = optimizelyClient.getAllFeatureVariables('multi-arm_bandit', userId);
          let { api_data } = variables;
          console.log('latestnews variables', api_data);
          const apiUrl = api_data?.url;

          const fetchData = async () => {
            const response = await fetch(apiUrl);
            const json = await response.json();
            console.log('Content Feed Data', json);

            setPostData(json.title);
          }

          fetchData().catch(console.error);
        });
      }, [optimizelyClient, userId]);

      const bannerClicked = () => {
        optimizelyClient?.track('banner_click', userId);
        console.log(`Banner clicked`)
      }

    console.log('Content Feed Data', postData);
    return (
        <article class="box post"  onClick={() => bannerClicked(optimizelyClient, userId)} >
            <header>
                <h2>
                    {postData}
                </h2>
            </header>
            <span class="image featured"></span>
        </article>
    )
}

export default MultiArmBanditComponent;