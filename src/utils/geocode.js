const request = require('request')

//Solución para sustituir la propiedad length
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxmbXBnIiwiYSI6ImNrOHN5cXUzczBrYzMza2xvYzNzZXpibHcifQ.mL9kJ-Z8mA_pxT2UzbiQkw&limit=1'
    request({ url, json: true }, (error, {body}) => {
        var size = Object.size(body.features);
        console.log(size)
        if (error) {
            callback('Unable to connect to location services!', undefined)
//Aqui es donde me falla no puedo poner body.features.length === 0
        } else if (size === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
