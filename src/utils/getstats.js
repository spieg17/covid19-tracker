const request = require('request')



const getstats = ( iso , fpDate, callback) => {

    const url = 'https://covid-api.com/api/reports?iso=' + iso + '&date=' + fpDate

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.data.length === 0) {
            callback('Unable to find location/date combination. Try another search.', {body})
        } else {
            callback(undefined, {body} )
        }
    })
}



module.exports = getstats 
