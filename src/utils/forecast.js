const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3eafcc4f418363d1dd6894481da1ebe7&query=${lat},${lon}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else {
      if (callback)
        callback(
          undefined,
          `It is currently ${response.body.current.temperature} degrees out. There is ${response.body.current.precip}% chance of rain.`
        );
    }
  });
};

module.exports = forecast;
