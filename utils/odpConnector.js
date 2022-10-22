import axios from 'axios';
import randomWords from 'random-words';
axios.defaults.headers.common['x-api-key'] = process.env.NEXT_PUBLIC_ODP_KEY;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function getOdpSegmentData(segment) {

  console.log('getOdpSegmentData', segment);

  axios.get(`https://api.zaius.com/v3/segments/${segment}`)
      .then((response) => {
        console.log('odp', response);
      }).catch(exception => {
        console.log('getOdpSegmentData - error', exception);
      });
}

export async function updateOdpProfileData(email) {

  const url = `https://api.zaius.com/v3/profiles`;

  axios.defaults.headers.common = {
    "X-API-Key": process.env.NEXT_PUBLIC_ODP_KEY,
  };

  const response = await axios({
          method: "post",
          url: url,
          config,
          data: {
            attributes: {
              email: email,
              requested_sales_pack: "true",
              first_name: randomWords(),
              last_name: randomWords(),
              job_title: "Marketing",
              state: "London"
            }
          }
        })
      .then(response => response.data)
      .catch(err => console.error(err));

      return response;
}

export async function getOdpProfileData(email) {

  const url = `https://api.zaius.com/v3/profiles?email=${email}`;

  axios.defaults.headers.common = {
    "X-API-Key": process.env.NEXT_PUBLIC_ODP_KEY,
  };

  var profileData = await axios({
          method: "get",
          url: url,
          config,
        })
      .then(response => response.data)
      .then(data => data.attributes)
      .catch(err => console.error(err));

  console.log('getOdpProfileData API:', email, profileData);

  return profileData;
}

export async function trackEvent(type = 'enquiry', email) {

  console.log('trackEvent', email);

  axios.post(`https://api.zaius.com/v3/segments/${email}`, {
      "type": "booked_a_demo",
      "action": "send_details",
      "identifiers": {
        "email": email
      },
      "data": {
        "productType": type
    }
    }).then(response => {
      console.log('trackEvent', response);
    }).catch(exception => {
      console.log('trackEventError', exception);
    });
}