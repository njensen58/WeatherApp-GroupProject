const express = require('express');
const axios = require('axios');
const TOKEN = process.env.PIC_TOKEN;
const photoRoute = express.Router();


photoRoute.get("/", (req, res) => {
    let city = req.query.address.length > 1 ? req.query.address.split(' ').join('+') : req.query.address;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${TOKEN}`).then(response => {
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        return {lat: lat, lng: lng}
    }).then(coordinates => {
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&radius=500&key=${TOKEN}`).then(response => {
            console.log(response.data.results[0].photos[0])
            let photoRef = response.data.results[0].photos[0].photo_reference;
            return photoRef;
        }).then(photo => {
            res.send({image: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo}&maxheight=300&key=${TOKEN}`})
        })
    })
})



module.exports = photoRoute;
