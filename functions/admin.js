const data = require('./data.json')
const headers = {
    'content-type': 'application/json' ,
    'Access-Control-Allow-Origin': "*"
};


exports.handler = async (event, context) => {
    // const axios = require('axios');
    // axios.defaults.headers.common['Authorization'] = sdkKey;

    // const sdkKey = process.env.NEXT_PUBLIC_API_KEY;
    // const projectId = process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID;

    // axios.get(`https://api.optimizely.com/v2/environments?project_id=${projectId}`)
    // .then((response) => {
    //   response.data.map(x => {
    //     return {
    //       name: x.name,
    //       datafile: JSON.stringify(x.datafile)
    //     };
    //   })
    // });

    return {
        body: JSON.stringify(data),
        statusCode: 200,
        headers: headers
    };
};