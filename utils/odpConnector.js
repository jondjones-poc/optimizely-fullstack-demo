import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = process.env.NEXT_PUBLIC_ODP_kEY;

export async function getOdpSegmentData(segment) {

  axios.get(`https://api.zaius.com/v3/segments/${segment}`)
      .then((response) => {
        console.log('odp', response);
      }).catch((e) => {
          console.log(e);
      });
}

export async function getOdpProfileData(email) {

  axios.get(`https://api.zaius.com/v3/profile/${email}`)
      .then((response) => {
        console.log('odp', response);
      }).catch((e) => {
          console.log(e);
      });
}

export async function trackEvent(type = 'enquiry', email) {

  axios.post(`https://api.zaius.com/v3/segments/${email}`, {
      "type": "booked_a_demo",
      "action": "send_details",
      "identifiers": {
        "email": email
      },
      "data": {
        "productType": type
    }
    }).then((response) => {
      console.log('odp', response);
    }).catch((e) => {
      console.log(e);
    });
}