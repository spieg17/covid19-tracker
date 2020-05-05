
const request = require('request')

const getiso = ( callback) => {

    const url = 'https://covid-api.com/api/regions'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {body} )
        }
    })
}


module.exports = getiso
