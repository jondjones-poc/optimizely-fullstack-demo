import { fetchEntries } from '../utils/contentfulConnector';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import Content from '../component/Content';
import { useRouter } from 'next/router'
import { createInstance } from "@optimizely/optimizely-sdk";

const sdkKey = process.env.NEXT_PUBLIC_OPTIMIZELY_SDK_KEY_CONTENTFUL_PROJECT;
const dataFileUrl = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;

const Home = (props) => {

    let [ variationId, setVariationToUse ] = useState('');

    const { fields, datafile } = props;
    const router = useRouter();

    const optimizelyClient = createInstance({
        datafile: datafile,
    });

    const { id } = router.query
    const userId = id || uuidv4();
    console.log(`userId`, userId);

    useEffect(() => {
        optimizelyClient.onReady().then(() => {
            const variationToUse = optimizelyClient.activate('a_b', userId);
            setVariationToUse(variationToUse)
            console.log('result', variationToUse);
        });
    }, [optimizelyClient, variationId]);

    return (
        <section id="main">
            <div className="container">
                <div id="content" className="col-8 col-12-medium">

                {fields.map((item, index) => {

                    return (
                    <article className="box post" key={index}>
                        <header>
                            <h2>
                                {item.title}
                            </h2>
                        </header>
                        <a href="#" className="image featured">
                            <img src={item?.heroImage.fields.file.url} alt={item.slug} />
                        </a>
                        <Content content={item.content} variationToUse={variationId} />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.body,
                            }}
                        />

                        <ul className="actions">
                            <li>
                                <a href="#" className="button icon solid fa-file">
                                    Continue Reading
                                </a>
                            </li>
                        </ul>
                    </article>
                )})
                }
            </div>
        </div>
        </section>
    )
}

export async function getStaticProps() {

    const response = await fetch(dataFileUrl);
    const datafile = await response.json();

    const entries = await fetchEntries();
    let data = entries.items.filter(() => function() {
    return item.sys.contentType.sys.id === 'page'})
    const fields = data.map((item) => item.fields );

    return {
        props: {
            fields: fields,
            data: data,
            datafile: datafile
        }
    }

}

export default Home;