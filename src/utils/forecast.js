const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=00631d0a0cc582232debfcf9acfe7501&query=' + longitude + ',' + latitude 

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'In ' + body.location.name + ' It is currently ' + body.current.weather_descriptions 
            + ' and ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}


module.exports = forecast