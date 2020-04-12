const request = require('request')

const forecast = (latitude, longitude, callback) => {
            
    const url = 'http://api.weatherstack.com/current&access_key=55d39c9498fcdda35fc7182a63f694dd&query='+ latitude +','+ longitude
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.location.localtime + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.weather_descriptions)
        }
    })
}

module.exports = forecast