const request = require('request')

const forecastData = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.API_KEY  + '&query=' + address

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,' It is currently ' + response.body.current.temperature + '°c out, ' + response.body.current.weather_descriptions[0]+ 
            '. There is a ' + response.body.current.precip  + '% chance of rain at '+ response.body.location.name + ', ' + response.body.location.region + ' in ' + response.body.location.country + '.')
            
        }
    })
}

module.exports = forecastData