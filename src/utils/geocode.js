const request = require('request');

const geocode = (address, callbac) => {
  const geocodeURL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoidXRpbGl6YXRlciIsImEiOiJja2tvb3BhNm8wNHRwMnVxc2ZuYTJvbmx4In0.YJm2pivnZvsRIVkh49lqkg&limit=1';

  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callbac('Unable to connect to location services!');
    } else if (response.body.features.length === 0) {
      callbac('Unable to find location. Try another search.');
    } else {
      const longitude = response.body.features[0].center[0];
      const latitude = response.body.features[0].center[1];
      const location = response.body.features[0].place_name;
      callbac(null, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
